"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { AnimatedBackground } from "./animated-background";
import { NavControls, ProgressBar, SlideMenu } from "./controls";
import { CinematicTransition } from "./cinematic-transition";

/**
 * Transition par défaut entre diapositives :
 * glissement horizontal + léger recul de profondeur (effet « caméra »).
 */
const variants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 90 : -90,
    scale: 0.96,
    filter: "blur(6px)",
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -90 : 90,
    scale: 0.96,
    filter: "blur(6px)",
  }),
};

const HIDE_DELAY = 2600; // ms d'inactivité avant masquage en plein écran

export function PresentationShell({ slides }: { slides: React.ReactNode[] }) {
  const total = slides.length;
  const [[index, direction], setState] = React.useState<[number, number]>([0, 0]);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  // Overlay cinématique : rejoué à CHAQUE passage diapo 1 → 2.
  // `runId` force le remontage (donc le replay) du composant à chaque déclenchement.
  const [cinematic, setCinematic] = React.useState(false);
  const [cinematicRun, setCinematicRun] = React.useState(0);

  // Visibilité de la barre de navigation (auto-masquée en plein écran).
  const [chromeVisible, setChromeVisible] = React.useState(true);
  const hideTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const paginate = React.useCallback(
    (dir: number) => {
      setState(([cur]) => {
        const next = Math.min(Math.max(cur + dir, 0), total - 1);
        // Déclenche la séquence cinématique à chaque passage 1 → 2.
        if (cur === 0 && next === 1) {
          setCinematicRun((r) => r + 1);
          setCinematic(true);
        }
        return [next, dir];
      });
    },
    [total]
  );

  const goTo = React.useCallback((i: number) => {
    setState(([cur]) => [i, i > cur ? 1 : -1]);
    setMenuOpen(false);
  }, []);

  const toggleFullscreen = React.useCallback(() => {
    if (typeof document === "undefined") return;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }, []);

  // Synchronise l'état plein écran avec le navigateur.
  React.useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  /**
   * Auto-masquage de la barre de navigation.
   *  - hors plein écran : toujours visible.
   *  - plein écran : visible uniquement si la souris touche le bas de l'écran,
   *    puis masquée après HIDE_DELAY d'inactivité.
   */
  React.useEffect(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);

    if (!isFullscreen) {
      setChromeVisible(true);
      return;
    }

    // À l'entrée en plein écran, on masque après un court délai.
    setChromeVisible(true);
    hideTimer.current = setTimeout(() => setChromeVisible(false), HIDE_DELAY);

    const REVEAL_ZONE = 90; // px depuis le bas

    const onMove = (e: MouseEvent) => {
      const nearBottom = e.clientY >= window.innerHeight - REVEAL_ZONE;
      if (nearBottom) {
        setChromeVisible(true);
        if (hideTimer.current) clearTimeout(hideTimer.current);
        hideTimer.current = setTimeout(() => setChromeVisible(false), HIDE_DELAY);
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [isFullscreen]);

  // Maintient la barre visible tant que le menu/sommaire est ouvert.
  React.useEffect(() => {
    if (menuOpen) setChromeVisible(true);
  }, [menuOpen]);

  // Navigation clavier.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
        case " ":
          e.preventDefault();
          if (!menuOpen) paginate(1);
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          if (!menuOpen) paginate(-1);
          break;
        case "Home":
          e.preventDefault();
          goTo(0);
          break;
        case "End":
          e.preventDefault();
          goTo(total - 1);
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
        case "g":
        case "G":
          setMenuOpen((o) => !o);
          break;
        case "Escape":
          setMenuOpen(false);
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paginate, goTo, toggleFullscreen, total, menuOpen]);

  // En plein écran, la barre cachée → on masque aussi le curseur.
  const hideCursor = isFullscreen && !chromeVisible && !menuOpen;

  return (
    <main
      className="relative h-[100dvh] w-full overflow-hidden"
      style={hideCursor ? { cursor: "none" } : undefined}
    >
      <AnimatedBackground />
      <ProgressBar current={index} total={total} />

      <AnimatePresence mode="wait" custom={direction}>
        <motion.section
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 240, damping: 30 },
            opacity: { duration: 0.35 },
            scale: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
            filter: { duration: 0.4 },
          }}
          className="absolute inset-0"
        >
          {slides[index]}
        </motion.section>
      </AnimatePresence>

      {/* Séquence cinématique d'intro (diapo 1 → 2), rejouée à chaque passage */}
      <AnimatePresence>
        {cinematic && (
          <CinematicTransition
            key={cinematicRun}
            onComplete={() => setCinematic(false)}
          />
        )}
      </AnimatePresence>

      {/* Barre de navigation — auto-masquée en plein écran */}
      <AnimatePresence>
        {chromeVisible && (
          <NavControls
            current={index}
            total={total}
            onPrev={() => paginate(-1)}
            onNext={() => paginate(1)}
            onToggleMenu={() => setMenuOpen((o) => !o)}
            onToggleFullscreen={toggleFullscreen}
            isFullscreen={isFullscreen}
          />
        )}
      </AnimatePresence>

      {/* Zone sensible en bas de l'écran (révèle la barre en plein écran) */}
      {isFullscreen && (
        <div
          aria-hidden
          className="fixed inset-x-0 bottom-0 z-30 h-20"
          onMouseEnter={() => setChromeVisible(true)}
        />
      )}

      <SlideMenu
        open={menuOpen}
        current={index}
        onClose={() => setMenuOpen(false)}
        onSelect={goTo}
      />

      {/* Indice clavier — uniquement hors plein écran, s'estompe après quelques secondes */}
      <AnimatePresence>
        {!isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 6, times: [0, 0.1, 0.8, 1] }}
            className="pointer-events-none fixed right-5 top-5 z-40 hidden items-center gap-2 rounded-full glass px-4 py-2 text-xs text-muted-foreground md:flex"
          >
            ← → naviguer · F plein écran · G sommaire
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

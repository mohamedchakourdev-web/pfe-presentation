"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { OfpptBadge } from "./ofppt-logo";

/**
 * Séquence d'intro cinématique jouée à chaque passage diapo 1 → 2.
 * Qualité « lancement produit » (Apple / Tesla / BMW keynote) :
 *  1. l'écran s'assombrit, légère poussée caméra (zoom)
 *  2. le logo OFPPT se matérialise au centre, lumière volumétrique
 *  3. anneaux rotatifs, particules en orbite, ondes d'énergie, rayons
 *  4. l'intensité décroît, les particules s'estompent
 *  5. le logo disparaît doucement → la diapo 2 apparaît
 *
 * Durée ~3.3s. `onComplete` retire l'overlay.
 * Géométrie déterministe (trigonométrie sur l'index) → aucun souci d'hydratation.
 */

const ORBIT_COLORS = ["#2f9e57", "#9aa6b2", "#1f73d0", "#46c7f0"];

// Easing « premium » réutilisé partout (sortie douce et longue).
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

// 22 particules réparties sur l'orbite (légère streak via box-shadow étirée)
const PARTICLES = Array.from({ length: 22 }, (_, i) => {
  const angle = (i / 22) * Math.PI * 2;
  const radius = 148 + (i % 4) * 24;
  return {
    id: i,
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
    color: ORBIT_COLORS[i % ORBIT_COLORS.length],
    size: 2.5 + (i % 4),
    delay: 0.2 + (i % 7) * 0.045,
  };
});

// 16 rayons de lumière volumétrique en éventail
const RAYS = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  rotate: (i / 16) * 360,
  delay: 0.35 + (i % 5) * 0.04,
  long: i % 2 === 0,
}));

// 3 ondes d'énergie concentriques
const WAVES = [
  { id: 0, delay: 0.15 },
  { id: 1, delay: 0.55 },
  { id: 2, delay: 0.95 },
];

export function CinematicTransition({ onComplete }: { onComplete: () => void }) {
  React.useEffect(() => {
    const t = setTimeout(onComplete, 3300);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: EASE_OUT }}
    >
      {/* Assombrissement progressif + teinte bleu nuit */}
      <motion.div
        className="absolute inset-0 bg-[#05152a]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.97, 0.97, 0.92, 0] }}
        transition={{ duration: 3.3, times: [0, 0.16, 0.6, 0.86, 1] }}
      />

      {/* ── Poussée caméra : toute la scène zoome légèrement ── */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 1.14 }}
        animate={{ scale: [1.14, 1, 1.0, 1.06] }}
        transition={{ duration: 3.3, times: [0, 0.34, 0.72, 1], ease: EASE_OUT }}
      >
        {/* Lueur radiale centrale (profondeur) */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(31,115,208,0.26),transparent_55%)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3.3, times: [0, 0.24, 0.7, 1] }}
        />

        {/* Lumière volumétrique : deux larges faisceaux croisés */}
        <motion.div
          aria-hidden
          className="absolute h-[160vh] w-[26rem] bg-gradient-to-b from-transparent via-brand-sky/12 to-transparent blur-2xl"
          style={{ rotate: "22deg" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0.5, 0] }}
          transition={{ duration: 3.3, times: [0, 0.3, 0.7, 1], ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute h-[160vh] w-[22rem] bg-gradient-to-b from-transparent via-brand-green/10 to-transparent blur-2xl"
          style={{ rotate: "-26deg" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0.45, 0] }}
          transition={{ duration: 3.3, times: [0, 0.32, 0.7, 1], ease: "easeInOut" }}
        />

        {/* Halos d'énergie pulsants derrière le logo */}
        <motion.div
          aria-hidden
          className="absolute h-[36rem] w-[36rem] rounded-full bg-brand-blue/25 blur-[130px]"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: [0.4, 1.12, 1, 0.7], opacity: [0, 0.95, 0.8, 0] }}
          transition={{ duration: 3.3, times: [0, 0.3, 0.7, 1], ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute h-[23rem] w-[23rem] rounded-full bg-brand-green/22 blur-[95px]"
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: [0.3, 1, 0.9, 0.6], opacity: [0, 0.85, 0.7, 0] }}
          transition={{ duration: 3.3, times: [0, 0.32, 0.7, 1], ease: "easeInOut" }}
        />

        {/* Scène centrale (logo + orbites) */}
        <div className="relative grid h-[28rem] w-[28rem] place-items-center">
          {/* Ondes d'énergie concentriques */}
          {WAVES.map((w) => (
            <motion.div
              key={w.id}
              aria-hidden
              className="absolute rounded-full border border-brand-sky/40"
              style={{ width: "9rem", height: "9rem" }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [0.5, 2.6], opacity: [0, 0.5, 0] }}
              transition={{
                duration: 2.4,
                delay: w.delay,
                times: [0, 0.15, 1],
                ease: EASE_OUT,
                repeat: 1,
                repeatDelay: 0.1,
              }}
            />
          ))}

          {/* Anneaux de lumière rotatifs */}
          <motion.div
            aria-hidden
            className="absolute h-[25rem] w-[25rem] rounded-full border border-brand-blue/30"
            style={{ borderTopColor: "rgba(70,199,240,0.95)" }}
            initial={{ rotate: 0, opacity: 0, scale: 0.7 }}
            animate={{ rotate: 360, opacity: [0, 1, 1, 0], scale: 1 }}
            transition={{
              rotate: { duration: 6.5, ease: "linear" },
              opacity: { duration: 3.3, times: [0, 0.25, 0.7, 1] },
              scale: { duration: 1.1, ease: EASE_OUT },
            }}
          />
          <motion.div
            aria-hidden
            className="absolute h-[20rem] w-[20rem] rounded-full border border-brand-green/30"
            style={{ borderBottomColor: "rgba(55,176,106,0.95)" }}
            initial={{ rotate: 0, opacity: 0, scale: 0.7 }}
            animate={{ rotate: -360, opacity: [0, 1, 1, 0], scale: 1 }}
            transition={{
              rotate: { duration: 7.5, ease: "linear" },
              opacity: { duration: 3.3, times: [0, 0.28, 0.7, 1] },
              scale: { duration: 1.2, ease: EASE_OUT },
            }}
          />
          <motion.div
            aria-hidden
            className="absolute h-[14.5rem] w-[14.5rem] rounded-full border border-dashed border-white/20"
            initial={{ rotate: 0, opacity: 0 }}
            animate={{ rotate: 360, opacity: [0, 0.7, 0.7, 0] }}
            transition={{
              rotate: { duration: 10, ease: "linear" },
              opacity: { duration: 3.3, times: [0, 0.3, 0.7, 1] },
            }}
          />

          {/* Rayons de lumière volumétrique en éventail */}
          {RAYS.map((r) => (
            <motion.span
              key={r.id}
              aria-hidden
              className="absolute w-px origin-bottom bg-gradient-to-t from-transparent via-brand-sky/55 to-transparent"
              style={{
                height: r.long ? "12rem" : "9rem",
                rotate: `${r.rotate}deg`,
                translateY: r.long ? "-6rem" : "-4.5rem",
              }}
              initial={{ opacity: 0, scaleY: 0.3 }}
              animate={{ opacity: [0, 0.7, 0.45, 0], scaleY: [0.3, 1, 1, 0.5] }}
              transition={{
                duration: 2.7,
                delay: r.delay,
                times: [0, 0.3, 0.7, 1],
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Particules en orbite (légère traînée) */}
          <motion.div
            aria-hidden
            className="absolute inset-0"
            initial={{ rotate: 0 }}
            animate={{ rotate: 200 }}
            transition={{ duration: 3.3, ease: EASE_OUT }}
          >
            {PARTICLES.map((p) => (
              <motion.span
                key={p.id}
                className="absolute left-1/2 top-1/2 rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                  boxShadow: `0 0 12px 1.5px ${p.color}`,
                }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={{
                  x: [0, p.x, p.x * 1.2],
                  y: [0, p.y, p.y * 1.2],
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1, 1, 0.4],
                }}
                transition={{
                  duration: 3,
                  delay: p.delay,
                  times: [0, 0.35, 0.7, 1],
                  ease: EASE_OUT,
                }}
              />
            ))}
          </motion.div>

          {/* Le logo OFPPT — point focal */}
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, scale: 0.62, filter: "blur(10px)" }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.62, 1, 1.03, 1.1],
              filter: ["blur(10px)", "blur(0px)", "blur(0px)", "blur(7px)"],
            }}
            transition={{
              duration: 3.3,
              times: [0, 0.33, 0.72, 1],
              ease: EASE_OUT,
            }}
          >
            <motion.div
              animate={{
                filter: [
                  "drop-shadow(0 0 0px rgba(70,199,240,0))",
                  "drop-shadow(0 0 34px rgba(70,199,240,0.65)) drop-shadow(0 0 60px rgba(47,158,87,0.35))",
                  "drop-shadow(0 0 16px rgba(70,199,240,0.25))",
                ],
              }}
              transition={{ duration: 3.3, times: [0, 0.4, 1] }}
            >
              <OfpptBadge priority className="h-40 w-40 md:h-48 md:w-48" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Léger grain de lumière (vignette inversée) pour la profondeur */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(2,10,24,0.75)_100%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.9, 0.9, 0] }}
        transition={{ duration: 3.3, times: [0, 0.2, 0.7, 1] }}
      />
    </motion.div>
  );
}

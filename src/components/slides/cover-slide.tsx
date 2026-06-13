"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Users,
  UserCheck,
  CalendarDays,
  MapPin,
  ChevronDown,
  Sparkles,
  User,
  UserRound,
} from "lucide-react";

import { OfpptBadge } from "@/components/presentation/ofppt-logo";
import { projectInfo } from "@/config/presentation";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Les couches décoratives (particules, faisceaux, maillons flottants)
 * utilisent des styles inline calculés (positions flottantes, tailles
 * numériques, couleurs hex) que framer-motion normalise différemment
 * côté client → divergence d'hydratation. On ne les rend donc qu'APRÈS
 * le montage : aucun HTML serveur à comparer, et l'apparition reste
 * invisible puisque ces éléments s'animent en fondu de toute façon.
 */
function useMounted() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return mounted;
}

/* ── Géométries déterministes (SSR-safe : aucune valeur aléatoire) ──
 * Toutes les dimensions du médaillon sont exprimées en POURCENTAGE de
 * la scène (LogoStage), elle-même dimensionnée en clamp(vh). L'ensemble
 * se met donc à l'échelle du viewport — aucune valeur en rem figée. */

// Particules en orbite — rayon en % de la scène
const ORBIT_COLORS = ["#37b06a", "#9aa6b2", "#1f73d0", "#46c7f0"];
const ORBIT_PARTICLES = Array.from({ length: 18 }, (_, i) => {
  const angle = (i / 18) * Math.PI * 2;
  const r = 42 + (i % 3) * 5; // % du rayon de la scène
  return {
    id: i,
    left: `${50 + Math.cos(angle) * r}%`,
    top: `${50 + Math.sin(angle) * r}%`,
    size: 2.5 + (i % 4),
    color: ORBIT_COLORS[i % ORBIT_COLORS.length],
    delay: (i % 6) * 0.4,
    dur: 3 + (i % 5),
  };
});

// Faisceaux de lumière en éventail (couleurs du logo) — hauteur en % de la scène
const BEAMS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  rotate: (i / 12) * 360,
  long: i % 2 === 0,
  delay: (i % 4) * 0.5,
  color: ["#37b06a", "#9aa6b2", "#1f73d0", "#46c7f0"][i % 4],
}));

// Maillons fantômes flottants (rappel du motif du logo)
const FLOATING_LINKS = [
  { id: 0, left: "14%", top: "20%", size: 56, color: "#37b06a", dur: 22, drift: 22, rot: 45 },
  { id: 1, left: "88%", top: "16%", size: 76, color: "#1f73d0", dur: 26, drift: -26, rot: 12 },
  { id: 2, left: "82%", top: "64%", size: 46, color: "#46c7f0", dur: 20, drift: 20, rot: 30 },
  { id: 3, left: "9%", top: "74%", size: 52, color: "#9aa6b2", dur: 24, drift: -18, rot: 18 },
];

// Particules ambiantes plein cadre
const AMBIENT = Array.from({ length: 22 }, (_, i) => {
  const seed = (i * 137.5) % 100;
  return {
    id: i,
    left: `${(seed * 1.0) % 100}%`,
    top: `${(i * 47) % 100}%`,
    size: 1.5 + (i % 3),
    dur: 10 + (i % 8),
    delay: (i % 9) * 0.7,
    drift: (i % 2 === 0 ? 1 : -1) * (14 + (i % 5) * 7),
    color: ["#46c7f0", "#37b06a", "#1f73d0"][i % 3],
    opacity: 0.18 + (i % 4) * 0.1,
  };
});

/**
 * Avatar par genre — rendu conditionnel via une table de correspondance
 * (aucune logique basée sur le nom ; pilotée par le champ `gender` des
 * données). Homme → bleu OFPPT, Femme → magenta/violet élégant.
 * Lucide ne fournit pas d'icône explicitement genrée : on distingue donc
 * le genre par la couleur (exigence) + une nuance d'icône (User / UserRound).
 */
type Gender = "male" | "female";

const GENDER_AVATAR: Record<
  Gender,
  { Icon: typeof User; gradient: string; ring: string; icon: string }
> = {
  male: {
    Icon: User,
    gradient: "from-brand-blue/35 to-brand-sky/30",
    ring: "ring-brand-blue/40",
    icon: "text-brand-sky",
  },
  female: {
    Icon: UserRound,
    gradient: "from-[#d65db1]/35 to-[#9b5de5]/30",
    ring: "ring-[#d65db1]/45",
    icon: "text-[#ef88cf]",
  },
};

function GenderAvatar({ gender }: { gender: Gender }) {
  const a = GENDER_AVATAR[gender];
  const Icon = a.Icon;
  return (
    <span
      className={cn(
        "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br ring-1",
        a.gradient,
        a.ring
      )}
    >
      <Icon className={cn("h-5 w-5", a.icon)} />
    </span>
  );
}

/* ── Le « médaillon » : logo officiel + halo, rayons, orbites ──
 * Désormais ancré dans le coin supérieur gauche (élément institutionnel).
 * Hors flux (positionnement absolu via le parent) → ne consomme plus de
 * hauteur au centre. Scène carrée en clamp(vh) ; tout l'intérieur (en %)
 * suit l'échelle. */
function LogoStage() {
  const mounted = useMounted();
  return (
    <div className="relative grid aspect-square h-[clamp(11rem,24vh,18rem)] place-items-center">
      {/* Halos de profondeur pulsants */}
      <motion.div
        aria-hidden
        className="absolute h-[122%] w-[122%] rounded-full bg-brand-blue/20 blur-[70px]"
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute h-[88%] w-[88%] rounded-full bg-brand-green/18 blur-[50px]"
        animate={{ scale: [1.08, 0.94, 1.08], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Couronne de rayons conique en rotation lente */}
      <motion.div
        aria-hidden
        className="conic-rays absolute h-[112%] w-[112%] rounded-full opacity-70 blur-[2px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Faisceaux de lumière en éventail (rotation autour du centre) */}
      {mounted &&
        BEAMS.map((b) => (
          <motion.span
            key={b.id}
            aria-hidden
            className="absolute bottom-1/2 left-1/2 w-px origin-bottom"
            style={{
              height: b.long ? "46%" : "36%",
              rotate: `${b.rotate}deg`,
              background: `linear-gradient(to top, transparent, ${b.color}88, transparent)`,
            }}
            animate={{ opacity: [0.15, 0.55, 0.15], scaleY: [0.85, 1.05, 0.85] }}
            transition={{
              duration: 5,
              delay: b.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

      {/* Anneaux orbitaux */}
      <motion.div
        aria-hidden
        className="absolute h-full w-full rounded-full border border-brand-sky/15"
        style={{ borderTopColor: "rgba(70,199,240,0.6)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        aria-hidden
        className="absolute h-[78%] w-[78%] rounded-full border border-dashed border-white/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
      />

      {/* Particules en orbite */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {mounted &&
          ORBIT_PARTICLES.map((p) => (
            <motion.span
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                boxShadow: `0 0 10px 1px ${p.color}`,
              }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1.15, 0.7] }}
              transition={{
                duration: p.dur,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
      </motion.div>

      {/* Le logo officiel — pièce maîtresse */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.7, filter: "blur(12px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1, ease: EASE }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="logo-glow"
        >
          <OfpptBadge
            priority
            className="h-[clamp(8rem,17vh,13.5rem)] w-[clamp(8rem,17vh,13.5rem)]"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export function CoverSlide() {
  const mounted = useMounted();
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-6 py-[clamp(1rem,3vh,2rem)]">
      {/* Maillons fantômes flottants (rappel du logo) */}
      {mounted &&
        FLOATING_LINKS.map((s) => (
          <motion.div
            key={s.id}
            aria-hidden
            className="pointer-events-none absolute rounded-[22%] border-2"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              borderColor: `${s.color}40`,
            }}
            animate={{
              y: [0, s.drift, 0],
              rotate: [s.rot, s.rot + 24, s.rot],
              opacity: [0.25, 0.5, 0.25],
            }}
            transition={{ duration: s.dur, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

      {/* Particules ambiantes */}
      {mounted &&
        AMBIENT.map((p) => (
          <motion.span
            key={p.id}
            aria-hidden
            className="pointer-events-none absolute rounded-full"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              boxShadow: `0 0 6px 1px ${p.color}`,
            }}
            animate={{
              y: [0, p.drift, 0],
              opacity: [0, p.opacity, 0],
              scale: [0.6, 1, 0.6],
            }}
            transition={{
              duration: p.dur,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

      {/* ── LOGO INSTITUTIONNEL — coin supérieur gauche (hors flux) ── */}
      <motion.div
        initial={{ opacity: 0, x: -24, y: -12, filter: "blur(6px)" }}
        animate={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.85, ease: EASE }}
        className="absolute left-[clamp(0.75rem,3vw,3.5rem)] top-[clamp(0.5rem,2.5vh,2rem)] z-20"
      >
        <LogoStage />
      </motion.div>

      {/* ── CONTENU PRINCIPAL — centré horizontalement, équilibré ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-[clamp(0.6rem,1.9vh,1.4rem)] text-center">
        {/* Pastille diplôme · année */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.6, ease: EASE }}
          className="inline-flex items-center gap-2.5 rounded-full glass-strong px-5 py-2 text-[clamp(0.78rem,1.4vw,0.92rem)] font-medium tracking-wide text-foreground/90"
        >
          <Sparkles className="h-4 w-4 text-brand-gold" />
          {projectInfo.diploma}
          <span className="h-1 w-1 rounded-full bg-brand-sky/70" />
          {projectInfo.academicYear}
        </motion.div>

        {/* ── ZONE TITRE : keynote ── */}
        <div className="relative">
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-24 max-w-3xl -translate-y-1/2 rounded-full bg-brand-blue/10 blur-3xl"
            animate={{ opacity: [0.4, 0.85, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: EASE }}
            className="text-[clamp(0.6rem,1.3vw,0.75rem)] font-semibold uppercase tracking-[0.42em] text-brand-sky"
          >
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.14, delayChildren: 0.4 } },
            }}
            className="title-glow relative mt-[clamp(0.3rem,1.2vh,0.75rem)] text-balance text-[clamp(2.2rem,5.2vw,5.5rem)] font-bold leading-[1.0] tracking-tight"
          >
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 38, filter: "blur(10px)" },
                show: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.9, ease: EASE },
                },
              }}
              className="block text-gradient"
            >
              Plateforme de
            </motion.span>
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 38, filter: "blur(10px)" },
                show: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.9, ease: EASE },
                },
              }}
              className="block text-gradient-teal"
            >
              Gestion des Absences
            </motion.span>
          </motion.h1>
        </div>

        {/* Filet + sous-titre */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.8, ease: EASE }}
          className="h-px w-56 bg-gradient-to-r from-transparent via-brand-sky/70 to-transparent"
        />
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.7, ease: EASE }}
          className="max-w-3xl text-balance text-[clamp(0.95rem,1.7vw,1.25rem)] text-muted-foreground"
        >
          {projectInfo.subtitle}
        </motion.p>

        {/* ── CARTES ÉQUIPE / ENCADREMENT (côte à côte, premium glass) ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7, ease: EASE }}
          className="mt-[clamp(0.25rem,1vh,0.75rem)] grid w-full max-w-5xl gap-[clamp(0.9rem,2vh,1.75rem)] sm:grid-cols-2"
        >
          {/* Réalisé par */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="border-gradient-brand card-sheen group relative overflow-hidden rounded-2xl p-[clamp(0.95rem,2vh,1.5rem)] text-left shadow-[0_20px_60px_-20px_rgba(5,21,42,0.8)]"
          >
            <div className="mb-[clamp(0.6rem,1.4vh,1rem)] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-green/15 text-brand-green ring-1 ring-brand-green/30">
                  <Users className="h-5 w-5" />
                </span>
                <span className="text-base font-semibold text-foreground/90">
                  Réalisé par
                </span>
              </div>
              <span className="rounded-full bg-brand-green/15 px-3 py-1 text-[11px] font-medium text-brand-emerald ring-1 ring-brand-green/25">
                Équipe {projectInfo.teamName}
              </span>
            </div>
            <ul className="space-y-[clamp(0.35rem,0.9vh,0.6rem)]">
              {projectInfo.team.map((m, i) => (
                <li key={i} className="flex items-center gap-3">
                  <GenderAvatar gender={m.gender} />
                  <span className="text-base font-medium text-foreground">
                    {m.name}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Encadré par */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="border-gradient-brand card-sheen group relative overflow-hidden rounded-2xl p-[clamp(0.95rem,2vh,1.5rem)] text-left shadow-[0_20px_60px_-20px_rgba(5,21,42,0.8)]"
          >
            <div className="mb-[clamp(0.6rem,1.4vh,1rem)] flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-blue/15 text-brand-sky ring-1 ring-brand-blue/30">
                <UserCheck className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold text-foreground/90">
                Encadré par
              </span>
            </div>
            <ul className="space-y-[clamp(0.35rem,0.9vh,0.6rem)]">
              {projectInfo.supervisors.map((m, i) => (
                <li key={i} className="flex items-center gap-3">
                  <GenderAvatar gender={m.gender} />
                  <span className="flex flex-col">
                    <span className="text-base font-medium text-foreground">
                      {m.name}
                    </span>
                    <span className="text-xs capitalize text-muted-foreground">
                      {m.role}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* ── FOOTER : méta établissement ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.7 }}
          className="mt-[clamp(0.25rem,1vh,0.75rem)] flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-[clamp(0.72rem,1.3vw,0.875rem)] text-muted-foreground"
        >
          <span className="inline-flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-brand-green" />
            {projectInfo.establishment}
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-border sm:inline-block" />
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-brand-blue" />
            {projectInfo.school}
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-border sm:inline-block" />
          <span className="inline-flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-brand-gold" />
            {projectInfo.academicYear}
          </span>
        </motion.div>

        {/* Indice « commencer » */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-[clamp(0.1rem,0.8vh,0.5rem)] flex justify-center"
        >
          <motion.div
            className="flex flex-col items-center gap-1 text-muted-foreground/70"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[10px] uppercase tracking-[0.25em]">
              Commencer
            </span>
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

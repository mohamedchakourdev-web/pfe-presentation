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
  User,
  UserRound,
  ShieldCheck,
} from "lucide-react";

import { OfpptBadge } from "@/components/presentation/ofppt-logo";
import { projectInfo } from "@/config/presentation";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ────────────────────────────────────────────────────────────────
 *  PARTI PRIS — COUVERTURE DE SOUTENANCE INSTITUTIONNELLE
 *  Lecture en 3 niveaux : Institution (en-tête) → Titre du projet
 *  (foyer unique) → Zone de confiance (équipe / encadrement).
 *  Le décor recule volontairement : 2 halos lents + une grille
 *  discrète. Toute la « vie » sert l'entrée, pas la distraction.
 *  Toutes les valeurs décoratives sont DÉTERMINISTES (SSR-safe).
 * ──────────────────────────────────────────────────────────────── */

/**
 * Avatar par genre — table de correspondance pilotée par le champ
 * `gender` des données (aucune logique basée sur le nom).
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
      <Icon className={cn("h-[1.15rem] w-[1.15rem]", a.icon)} />
    </span>
  );
}

/* Carte « zone de confiance » réutilisable (équipe / encadrement). */
function TrustCard({
  icon,
  iconClass,
  title,
  badge,
  badgeClass,
  delay,
  children,
}: {
  icon: React.ReactNode;
  iconClass: string;
  title: string;
  badge?: string;
  badgeClass?: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: EASE }}
      whileHover={{ y: -5 }}
      className="border-gradient-brand card-sheen group relative overflow-hidden rounded-2xl p-[clamp(0.95rem,2vh,1.5rem)] text-left shadow-[0_24px_70px_-28px_rgba(5,21,42,0.9)]"
    >
      <div className="mb-[clamp(0.6rem,1.4vh,1rem)] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span
            className={cn(
              "grid h-10 w-10 place-items-center rounded-xl ring-1",
              iconClass
            )}
          >
            {icon}
          </span>
          <span className="text-[clamp(0.9rem,1.5vw,1.05rem)] font-semibold text-foreground/90">
            {title}
          </span>
        </div>
        {badge && (
          <span
            className={cn(
              "shrink-0 rounded-full px-3 py-1 text-[11px] font-medium ring-1",
              badgeClass
            )}
          >
            {badge}
          </span>
        )}
      </div>
      {children}
    </motion.div>
  );
}

export function CoverSlide() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden px-[clamp(1.25rem,4vw,4rem)] py-[clamp(1rem,3vh,2.25rem)]">
      {/* ── DÉCOR — volontairement discret (2 halos lents + grille) ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0 opacity-[0.5]" />
        <motion.div
          className="absolute -left-[12%] -top-[18%] h-[55vh] w-[55vh] rounded-full bg-brand-blue/15 blur-[120px]"
          animate={{ opacity: [0.45, 0.7, 0.45], scale: [1, 1.08, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-[20%] -right-[10%] h-[50vh] w-[50vh] rounded-full bg-brand-green/12 blur-[120px]"
          animate={{ opacity: [0.35, 0.6, 0.35], scale: [1.06, 0.96, 1.06] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Filet supérieur signature (or → vert → bleu OFPPT) */}
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand-gold/70 via-brand-green/70 to-brand-blue/70" />
      </div>

      {/* ════════════ NIVEAU 1 — EN-TÊTE INSTITUTIONNEL ════════════ */}
      <motion.header
        initial={{ opacity: 0, y: -16, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative z-10 flex items-start justify-between"
      >
        {/* Bloc gauche */}
        <div className="flex items-start gap-5">
          <img
            src="/ofppt.jpg"
            alt="OFPPT"
            className="h-28 w-28 rounded-3xl border border-white/10 bg-white p-2 shadow-3xl"
          />

          <div className="flex flex-col pt-2">
            <h2 className="font-display text-4xl font-bold tracking-[0.15em] text-white">
              OFPPT
            </h2>

            <span className="text-base font-semibold text-slate-400">
              Institut Spécialisé de Technologie
            </span>

            <span className="text-base font-semibold text-slate-400">
              Appliquée ISTA Tiznit
            </span>
          </div>
        </div>

        {/* Bloc droite */}
        <div className="inline-flex items-center gap-3 rounded-full glass-strong px-8 py-6">
          <GraduationCap className="h-9 w-5 shrink-0 text-brand-gold mb-6" />

          <div className="flex flex-col">
            <span className="font-semibold text-white">
              Projet de Fin de Formation
            </span>

            <span className="font-semibold text-white/90">
              Développement Digital • Promotion 2024 — 2026
            </span>
          </div>
        </div>
      </motion.header>

      {/* ════════════ NIVEAU 2 — TITRE DU PROJET (foyer) ════════════ */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center text-center">
        {/* Eyebrow institutionnel (corrige l'élément vide d'origine) */}
        

        <div className="relative mt-[clamp(0.5rem,1.6vh,1rem)]">
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-28 max-w-3xl -translate-y-1/2 rounded-full bg-brand-blue/10 blur-3xl"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.h1
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.14, delayChildren: 0.45 } },
            }}
            className="title-glow font-display relative text-balance text-[clamp(2.3rem,5.4vw,5.75rem)] font-bold leading-[1.02] tracking-tight"
          >
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 36, filter: "blur(10px)" },
                show: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.9, ease: EASE },
                },
              }}
              className="block text-gradient"
            >
              Plateforme de Gestion
            </motion.span>
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 36, filter: "blur(10px)" },
                show: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.9, ease: EASE },
                },
              }}
              className="block text-gradient-teal"
            >
              des Absences
            </motion.span>
          </motion.h1>
        </div>

        {/* Filet signature : or académique + vert OFPPT */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.95, duration: 0.8, ease: EASE }}
          className="mt-[clamp(0.7rem,1.8vh,1.25rem)] h-[2px] w-[clamp(9rem,22vw,16rem)] bg-gradient-to-r from-transparent via-brand-gold/80 to-transparent"
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.7, ease: EASE }}
          className="mt-[clamp(0.6rem,1.6vh,1.1rem)] max-w-3xl text-balance text-[clamp(0.95rem,1.7vw,1.25rem)] leading-relaxed text-muted-foreground"
        >
          {projectInfo.subtitle}
        </motion.p>
      </main>

      {/* ════════════ NIVEAU 3 — ZONE DE CONFIANCE ════════════ */}
      <div className="relative z-10 mx-auto grid w-full max-w-5xl gap-[clamp(0.9rem,2vh,1.6rem)] sm:grid-cols-2">
        {/* Réalisé par */}
        <TrustCard
          delay={1.2}
          title="Réalisé par"
          icon={<Users className="h-5 w-5" />}
          iconClass="bg-brand-green/15 text-brand-green ring-brand-green/30"
          badge={`Équipe ${projectInfo.teamName}`}
          badgeClass="bg-brand-green/15 text-brand-emerald ring-brand-green/25"
        >
          <ul className="grid grid-cols-2 gap-x-4 gap-y-[clamp(0.4rem,1vh,0.65rem)]">
            {projectInfo.team.map((m, i) => (
              <li key={i} className="flex items-center gap-2.5">
                <GenderAvatar gender={m.gender} />
                <span className="text-[clamp(0.85rem,1.4vw,1rem)] font-medium text-foreground">
                  {m.name}
                </span>
              </li>
            ))}
          </ul>
        </TrustCard>

        {/* Encadré par */}
        <TrustCard
          delay={1.32}
          title="Encadré par"
          icon={<UserCheck className="h-5 w-5" />}
          iconClass="bg-brand-blue/15 text-brand-sky ring-brand-blue/30"
          badge="Jury & Encadrement"
          badgeClass="bg-brand-blue/15 text-brand-sky ring-brand-blue/25"
        >
          <ul className="space-y-[clamp(0.4rem,1vh,0.65rem)]">
            {projectInfo.supervisors.map((m, i) => (
              <li key={i} className="flex items-center gap-3">
                <GenderAvatar gender={m.gender} />
                <span className="flex flex-col leading-tight">
                  <span className="text-[clamp(0.85rem,1.4vw,1rem)] font-medium text-foreground">
                    {m.name}
                  </span>
                  <span className="text-xs capitalize text-muted-foreground">
                    {m.role}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </TrustCard>
      </div>

      {/* ── FOOTER : ancrage contextuel (établissement · lieu · année) ── */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.7 }}
        className="relative z-10 mt-[clamp(0.7rem,1.8vh,1.25rem)] flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-[clamp(0.7rem,1.3vw,0.85rem)] text-muted-foreground"
      >
        <span className="inline-flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-brand-green" />
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
      </motion.footer>

      {/* Indice « commencer » */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.8 }}
        className="relative z-10 mt-[clamp(0.2rem,0.9vh,0.6rem)] flex justify-center"
      >
        <motion.div
          className="flex flex-col items-center gap-1 text-muted-foreground/70"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[10px] uppercase tracking-[0.25em]">Commencer</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </div>
  );
}

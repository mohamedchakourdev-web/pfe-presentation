"use client";

import { motion } from "framer-motion";
import {
  Workflow,
  Monitor,
  Server,
  Database,
  ShieldCheck,
  UserCog,
  GraduationCap,
  LogIn,
  PencilLine,
  BarChart3,
  ArrowRight,
} from "lucide-react";

import { SlideLayout } from "@/components/presentation/slide-layout";
import { fadeUp } from "@/components/presentation/motion-primitives";

const layers = [
  {
    icon: Monitor,
    title: "Front-end",
    desc: "Next.js · React · Tailwind",
    note: "Interface utilisateur",
    accent: "text-brand-teal",
    border: "border-brand-teal/30",
  },
  {
    icon: Server,
    title: "Back-end / API",
    desc: "API REST · Authentification",
    note: "Logique métier",
    accent: "text-brand-blue",
    border: "border-brand-blue/30",
  },
  {
    icon: Database,
    title: "Base de données",
    desc: "PostgreSQL · Prisma",
    note: "Persistance",
    accent: "text-brand-violet",
    border: "border-brand-violet/30",
  },
];

const actors = [
  { icon: ShieldCheck, name: "Directeur", desc: "Supervision & pilotage" },
  { icon: UserCog, name: "Gestionnaire", desc: "Administration & saisie" },
  { icon: GraduationCap, name: "Formateur", desc: "Pointage & consultation" },
];

const flow = [
  { icon: LogIn, label: "Connexion sécurisée" },
  { icon: PencilLine, label: "Saisie des absences" },
  { icon: Database, label: "Enregistrement centralisé" },
  { icon: BarChart3, label: "Statistiques & suivi" },
];

export function ConceptionSlide({ index, total }: { index: number; total: number }) {
  return (
    <SlideLayout
      index={index}
      total={total}
      eyebrow="Conception du système"
      title="Architecture & flux"
      icon={Workflow}
      accent="violet"
    >
      {/* Architecture layers */}
      <motion.div variants={fadeUp} className="mb-6">
        <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Architecture en couches
        </h3>
        <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
          {layers.map((l, i) => (
            <div key={l.title} className="flex flex-1 items-center gap-3">
              <div
                className={`glass card-sheen flex flex-1 items-center gap-4 rounded-2xl border ${l.border} p-4`}
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/5">
                  <l.icon className={`h-5 w-5 ${l.accent}`} />
                </span>
                <div>
                  <p className="font-semibold">{l.title}</p>
                  <p className="text-xs text-muted-foreground">{l.desc}</p>
                  <p className={`text-[11px] ${l.accent}`}>{l.note}</p>
                </div>
              </div>
              {i < layers.length - 1 && (
                <ArrowRight className="hidden h-5 w-5 shrink-0 text-muted-foreground md:block" />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Actors */}
        <motion.div variants={fadeUp} className="glass card-sheen rounded-2xl p-6">
          <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Acteurs du système
          </h3>
          <div className="space-y-3">
            {actors.map((a) => (
              <div key={a.name} className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-violet/15 text-brand-violet">
                  <a.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium">{a.name}</p>
                  <p className="text-xs text-muted-foreground">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Workflow */}
        <motion.div variants={fadeUp} className="glass card-sheen rounded-2xl p-6">
          <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Flux de fonctionnement
          </h3>
          <ol className="space-y-3">
            {flow.map((f, i) => (
              <li key={f.label} className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-teal/15 font-mono text-xs text-brand-teal">
                  {i + 1}
                </span>
                <f.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{f.label}</span>
              </li>
            ))}
          </ol>
        </motion.div>
      </div>
    </SlideLayout>
  );
}

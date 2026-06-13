"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Crown,
  ClipboardCheck,
  Presentation,
  Target,
  Gauge,
  Lock,
  Workflow,
} from "lucide-react";

import { SlideLayout } from "@/components/presentation/slide-layout";
import { fadeUp } from "@/components/presentation/motion-primitives";

const roles = [
  {
    icon: Crown,
    name: "Directeur",
    tag: "Pilotage",
    accent: "text-brand-amber",
    dot: "bg-brand-amber",
    ring: "border-brand-amber/30 bg-brand-amber/5",
    points: [
      "Tableau de bord & statistiques globales",
      "Gestion des utilisateurs & des rôles",
      "Supervision de l'ensemble des données",
    ],
  },
  {
    icon: ClipboardCheck,
    name: "Gestionnaire",
    tag: "Administration",
    accent: "text-brand-teal",
    dot: "bg-brand-teal",
    ring: "border-brand-teal/30 bg-brand-teal/5",
    points: [
      "Filières, groupes & stagiaires",
      "Saisie des absences et des retards",
      "Création des demandes d'autorisation",
    ],
  },
  {
    icon: Presentation,
    name: "Formateur",
    tag: "Terrain",
    accent: "text-brand-blue",
    dot: "bg-brand-blue",
    ring: "border-brand-blue/30 bg-brand-blue/5",
    points: [
      "Consultation de ses groupes & stagiaires",
      "Suivi des absences de ses groupes",
      "Validation ou refus des autorisations",
    ],
  },
];

const value = [
  { icon: Target, label: "Centralisée", desc: "Une seule source de vérité" },
  { icon: Gauge, label: "Temps réel", desc: "Suivi & notifications instantanés" },
  { icon: Lock, label: "Sécurisée", desc: "Accès par rôles & permissions" },
  { icon: Workflow, label: "Structurée", desc: "Circuit de validation tracé" },
];

export function SolutionSlide({ index, total }: { index: number; total: number }) {
  return (
    <SlideLayout
      index={index}
      total={total}
      eyebrow="Solution proposée"
      title="Une plateforme web unifiée & multi-rôles"
      icon={Sparkles}
      accent="teal"
    >
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        {/* Vision + value */}
        <motion.div variants={fadeUp} className="space-y-5">
          <p className="text-lg leading-relaxed text-muted-foreground">
            Une application <span className="font-medium text-foreground">web responsive</span>{" "}
            qui digitalise l'intégralité du processus&nbsp;: du{" "}
            <span className="font-medium text-foreground">référentiel pédagogique</span>{" "}
            à la <span className="font-medium text-foreground">validation des justificatifs</span>,
            avec une expérience adaptée à chaque acteur.
          </p>

          <div className="glass card-sheen rounded-2xl p-5">
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-brand-teal">
              <ShieldCheck className="h-4 w-4" />
              Valeur apportée
            </div>
            <div className="grid grid-cols-2 gap-3">
              {value.map((v) => (
                <div key={v.label} className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/5 text-brand-teal">
                    <v.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{v.label}</p>
                    <p className="text-xs text-muted-foreground">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Roles */}
        <div className="grid gap-3">
          {roles.map((r) => (
            <motion.div
              key={r.name}
              variants={fadeUp}
              whileHover={{ x: 4 }}
              className={`glass card-sheen rounded-2xl border ${r.ring} p-4`}
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5">
                  <r.icon className={`h-5 w-5 ${r.accent}`} />
                </span>
                <div className="flex flex-1 items-center justify-between">
                  <h3 className="text-base font-semibold">{r.name}</h3>
                  <span className={`text-[11px] font-medium uppercase tracking-wider ${r.accent}`}>
                    {r.tag}
                  </span>
                </div>
              </div>
              <ul className="mt-3 grid gap-1.5 pl-[52px]">
                {r.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${r.dot}`} />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}

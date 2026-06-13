"use client";

import { motion } from "framer-motion";
import {
  Hammer,
  PencilRuler,
  Code2,
  TestTube2,
  Rocket,
  Users,
  CalendarClock,
  FileCheck2,
  BarChart3,
  Bell,
  Lightbulb,
} from "lucide-react";

import { SlideLayout } from "@/components/presentation/slide-layout";
import { fadeUp } from "@/components/presentation/motion-primitives";

const steps = [
  { icon: PencilRuler, label: "Analyse & conception" },
  { icon: Code2, label: "Développement" },
  { icon: TestTube2, label: "Tests & validation" },
  { icon: Rocket, label: "Déploiement" },
];

const modules = [
  { icon: Users, label: "Gestion des utilisateurs & rôles" },
  { icon: CalendarClock, label: "Saisie & pointage des absences" },
  { icon: FileCheck2, label: "Demandes d'autorisation" },
  { icon: BarChart3, label: "Tableaux de bord & statistiques" },
  { icon: Bell, label: "Notifications" },
];

const challenges = [
  {
    problem: "Gestion fine des droits selon les rôles",
    solution: "Mise en place d'un contrôle d'accès par rôle et de routes protégées.",
  },
  {
    problem: "Cohérence des données entre entités liées",
    solution: "Modélisation relationnelle rigoureuse et validations côté serveur.",
  },
  {
    problem: "Performance sur de grands volumes",
    solution: "Pagination, requêtes optimisées et mise en cache des données.",
  },
];

export function RealisationSlide({ index, total }: { index: number; total: number }) {
  return (
    <SlideLayout
      index={index}
      total={total}
      eyebrow="Réalisation de l'application"
      title="Du concept au produit"
      icon={Hammer}
      accent="blue"
    >
      {/* Process */}
      <motion.div variants={fadeUp} className="mb-6">
        <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Processus de développement
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {steps.map((s, i) => (
            <div
              key={s.label}
              className="glass card-sheen relative flex flex-col items-center gap-2 rounded-2xl p-4 text-center"
            >
              <span className="absolute right-3 top-2 font-mono text-xs text-white/10">
                0{i + 1}
              </span>
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-blue/15 text-brand-blue">
                <s.icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium">{s.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Modules */}
        <motion.div variants={fadeUp} className="glass card-sheen rounded-2xl p-6">
          <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Modules implémentés
          </h3>
          <div className="space-y-2.5">
            {modules.map((m) => (
              <div key={m.label} className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                <m.icon className="h-4 w-4 text-brand-teal" />
                <span className="text-sm">{m.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Challenges & solutions */}
        <motion.div variants={fadeUp} className="glass card-sheen rounded-2xl p-6">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            <Lightbulb className="h-4 w-4 text-brand-amber" />
            Défis & solutions
          </h3>
          <div className="space-y-4">
            {challenges.map((c) => (
              <div key={c.problem} className="border-l-2 border-l-brand-amber/40 pl-4">
                <p className="text-sm font-medium text-foreground">{c.problem}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  → {c.solution}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </SlideLayout>
  );
}

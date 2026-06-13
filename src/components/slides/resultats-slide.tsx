"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Timer,
  Zap,
  CheckCircle2,
  Smile,
  LineChart,
} from "lucide-react";

import { SlideLayout, StatCard } from "@/components/presentation/slide-layout";
import { fadeUp } from "@/components/presentation/motion-primitives";

const benefits = [
  {
    icon: Zap,
    title: "Automatisation",
    points: [
      "Calculs d'absences instantanés",
      "Statistiques générées automatiquement",
      "Fin des tâches répétitives de pointage",
    ],
    accent: "text-brand-amber",
  },
  {
    icon: LineChart,
    title: "Performance",
    points: [
      "Accès à l'information en temps réel",
      "Données centralisées et cohérentes",
      "Recherche et filtrage instantanés",
    ],
    accent: "text-brand-blue",
  },
  {
    icon: Smile,
    title: "Avantages utilisateurs",
    points: [
      "Interface simple et intuitive",
      "Accessible sur tous les appareils",
      "Suivi clair pour chaque acteur",
    ],
    accent: "text-brand-teal",
  },
];

export function ResultatsSlide({ index, total }: { index: number; total: number }) {
  return (
    <SlideLayout
      index={index}
      total={total}
      eyebrow="Résultats obtenus"
      title="Un impact concret"
      icon={TrendingUp}
      accent="teal"
    >
      {/* Headline stats (indicatifs) */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard value="-80%" label="Temps de traitement" icon={Timer} accent="teal" />
        <StatCard value="100%" label="Données centralisées" icon={CheckCircle2} accent="blue" />
        <StatCard value="Temps réel" label="Suivi de l'assiduité" icon={Zap} accent="violet" />
        <StatCard value="0" label="Perte d'information" icon={TrendingUp} accent="amber" />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {benefits.map((b) => (
          <motion.div
            key={b.title}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            className="glass card-sheen flex flex-col gap-4 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/5">
                <b.icon className={`h-5 w-5 ${b.accent}`} />
              </span>
              <h3 className="text-lg font-semibold">{b.title}</h3>
            </div>
            <ul className="space-y-2.5">
              {b.points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${b.accent}`} />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.p
        variants={fadeUp}
        className="mt-5 text-xs text-muted-foreground"
      >
        * Indicateurs illustratifs reflétant les gains observés par rapport à la gestion
        manuelle.
      </motion.p>
    </SlideLayout>
  );
}

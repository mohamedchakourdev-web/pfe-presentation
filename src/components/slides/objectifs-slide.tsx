"use client";

import { motion } from "framer-motion";
import {
  Target,
  Database,
  LineChart,
  ShieldCheck,
  Timer,
  Eye,
} from "lucide-react";

import { SlideLayout } from "@/components/presentation/slide-layout";
import { fadeUp } from "@/components/presentation/motion-primitives";

const objectives = [
  {
    icon: Database,
    title: "Centraliser",
    body: "Regrouper toutes les absences, justificatifs et autorisations dans une plateforme unique et structurée.",
    accent: "text-brand-teal",
    ring: "group-hover:shadow-brand-teal/20",
  },
  {
    icon: Eye,
    title: "Améliorer le suivi",
    body: "Offrir une visibilité en temps réel sur l'assiduité des stagiaires, par groupe, filière ou période.",
    accent: "text-brand-blue",
    ring: "group-hover:shadow-brand-blue/20",
  },
  {
    icon: LineChart,
    title: "Générer des statistiques",
    body: "Produire automatiquement des tableaux de bord et des indicateurs fiables pour piloter les décisions.",
    accent: "text-brand-violet",
    ring: "group-hover:shadow-brand-violet/20",
  },
  {
    icon: ShieldCheck,
    title: "Sécuriser les données",
    body: "Garantir l'intégrité, la confidentialité et la traçabilité des informations via authentification et rôles.",
    accent: "text-brand-emerald",
    ring: "group-hover:shadow-brand-emerald/20",
  },
  {
    icon: Timer,
    title: "Gagner du temps",
    body: "Automatiser le pointage, les calculs et les rapports pour libérer les équipes des tâches répétitives.",
    accent: "text-brand-amber",
    ring: "group-hover:shadow-brand-amber/20",
  },
  {
    icon: Target,
    title: "Fiabiliser",
    body: "Éliminer les erreurs de saisie et les pertes de données grâce à un système robuste et cohérent.",
    accent: "text-brand-rose",
    ring: "group-hover:shadow-brand-rose/20",
  },
];

export function ObjectifsSlide({ index, total }: { index: number; total: number }) {
  return (
    <SlideLayout
      index={index}
      total={total}
      eyebrow="Objectifs du projet"
      title="Ce que nous voulons accomplir"
      icon={Target}
      accent="teal"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {objectives.map((o, i) => (
          <motion.div
            key={o.title}
            variants={fadeUp}
            whileHover={{ y: -6, scale: 1.02 }}
            className={`glass card-sheen group flex flex-col gap-3 rounded-2xl p-6 shadow-lg transition-shadow ${o.ring}`}
          >
            <div className="flex items-center justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/5">
                <o.icon className={`h-6 w-6 ${o.accent}`} />
              </span>
              <span className="font-mono text-3xl font-bold text-white/5">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="text-lg font-semibold">{o.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{o.body}</p>
          </motion.div>
        ))}
      </div>
    </SlideLayout>
  );
}

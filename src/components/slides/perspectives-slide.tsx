"use client";

import { motion } from "framer-motion";
import {
  Telescope,
  Smartphone,
  BrainCircuit,
  BellRing,
  FileBarChart,
  QrCode,
  Mail,
} from "lucide-react";

import { SlideLayout } from "@/components/presentation/slide-layout";
import { fadeUp } from "@/components/presentation/motion-primitives";
import { Badge } from "@/components/ui/badge";

const perspectives = [
  {
    icon: Smartphone,
    title: "Application mobile",
    desc: "Une app native pour pointer les présences et consulter les absences en mobilité, à tout moment.",
    accent: "text-brand-teal",
    tag: "Mobilité",
  },
  {
    icon: BrainCircuit,
    title: "Analytique par IA",
    desc: "Détection précoce du décrochage et prédiction des risques d'absentéisme grâce au machine learning.",
    accent: "text-brand-violet",
    tag: "Intelligence",
  },
  {
    icon: BellRing,
    title: "Système de notifications",
    desc: "Alertes automatiques par e-mail et SMS aux stagiaires et responsables dès le seuil critique atteint.",
    accent: "text-brand-amber",
    tag: "Communication",
  },
  {
    icon: FileBarChart,
    title: "Reporting avancé",
    desc: "Rapports personnalisables et exports PDF / Excel enrichis pour le pilotage et les bilans périodiques.",
    accent: "text-brand-blue",
    tag: "Décision",
  },
  {
    icon: QrCode,
    title: "Pointage par QR Code",
    desc: "Marquage de présence rapide et sans erreur via scan, directement en début de séance.",
    accent: "text-brand-emerald",
    tag: "Automatisation",
  },
  {
    icon: Mail,
    title: "Intégrations",
    desc: "Connexion aux outils de l'établissement et synchronisation avec les emplois du temps.",
    accent: "text-brand-rose",
    tag: "Écosystème",
  },
];

export function PerspectivesSlide({ index, total }: { index: number; total: number }) {
  return (
    <SlideLayout
      index={index}
      total={total}
      eyebrow="Perspectives d'évolution"
      title="Vers une plateforme encore plus intelligente"
      icon={Telescope}
      accent="violet"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {perspectives.map((p) => (
          <motion.div
            key={p.title}
            variants={fadeUp}
            whileHover={{ y: -6, scale: 1.02 }}
            className="glass card-sheen flex flex-col gap-3 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/5">
                <p.icon className={`h-6 w-6 ${p.accent}`} />
              </span>
              <Badge variant="glass" className="text-[10px]">
                {p.tag}
              </Badge>
            </div>
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </SlideLayout>
  );
}

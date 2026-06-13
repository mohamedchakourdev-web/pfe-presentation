"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  FileWarning,
  Hourglass,
  SearchX,
  ShieldAlert,
  Layers3,
} from "lucide-react";

import { SlideLayout } from "@/components/presentation/slide-layout";
import { Reveal, fadeUp } from "@/components/presentation/motion-primitives";

const problems = [
  {
    icon: FileWarning,
    title: "Registres dispersés",
    body: "Feuilles de présence papier et fichiers isolés : une information éclatée, difficile à consolider et à sauvegarder.",
  },
  {
    icon: Hourglass,
    title: "Validation lente",
    body: "La justification d'une absence circule manuellement entre gestionnaire et formateur, sans circuit clair ni traçabilité.",
  },
  {
    icon: SearchX,
    title: "Aucune vision globale",
    body: "Impossible de connaître en un coup d'œil le volume d'absences et de retards par stagiaire, groupe ou filière.",
  },
  {
    icon: ShieldAlert,
    title: "Données fragiles",
    body: "Risque d'erreurs, de doublons et de pertes : aucune garantie d'intégrité ni d'historique fiable des modifications.",
  },
  {
    icon: Layers3,
    title: "Rôles non cloisonnés",
    body: "Pas de séparation claire des droits entre direction, gestion et formateurs sur des données sensibles.",
  },
  {
    icon: AlertTriangle,
    title: "Réactivité limitée",
    body: "Les absences et retards répétés sont détectés trop tard, faute d'alertes, de notifications et de statistiques.",
  },
];

export function ProblematiqueSlide({
  index,
  total,
}: {
  index: number;
  total: number;
}) {
  return (
    <SlideLayout
      index={index}
      total={total}
      eyebrow="Problématique"
      title="Une gestion manuelle qui montre ses limites"
      icon={AlertTriangle}
      accent="rose"
    >
      <Reveal variants={fadeUp}>
        <p className="mb-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          Comment <span className="font-medium text-foreground">fiabiliser</span>,{" "}
          <span className="font-medium text-foreground">centraliser</span> et{" "}
          <span className="font-medium text-foreground">accélérer</span> le suivi des
          absences tout en garantissant un circuit de validation clair entre chaque
          acteur de l'établissement&nbsp;?
        </p>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {problems.map((p) => (
          <motion.div
            key={p.title}
            variants={fadeUp}
            whileHover={{ y: -5 }}
            className="glass card-sheen group flex gap-4 rounded-2xl p-5 transition-shadow hover:shadow-xl hover:shadow-brand-rose/10"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-rose/10 text-brand-rose transition-transform group-hover:scale-110">
              <p.icon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="mb-1 text-base font-semibold">{p.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideLayout>
  );
}

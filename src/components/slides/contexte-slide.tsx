"use client";

import { motion } from "framer-motion";
import {
  Building2,
  GraduationCap,
  ClipboardList,
  Rocket,
  Network,
} from "lucide-react";

import { SlideLayout } from "@/components/presentation/slide-layout";
import { fadeUp } from "@/components/presentation/motion-primitives";



export function ContexteSlide({ index, total }: { index: number; total: number }) {
  return (
    <SlideLayout
      index={index}
      total={total}
      eyebrow="Contexte général"
      title="Gestion de l'Assiduité à l'ISTA Tiznit"
      icon={GraduationCap}
      accent="teal"
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Narrative */}
        <motion.div variants={fadeUp} className="space-y-5 lg:col-span-2">
          <div className="bg-white/60 dark:bg-slate-900/60 border-l-4 border-teal-500 p-6 rounded-lg shadow-sm">
            <p className="text-lg leading-relaxed text-muted-foreground text-justify first-letter:float-left first-letter:mr-3 first-letter:text-5xl first-letter:font-bold">
              L'Office de la Formation Professionnelle et de la Promotion du Travail (OFPPT) joue un rôle essentiel dans la formation des futurs professionnels au Maroc. Au sein des établissements de formation tels que l'ISTA Tiznit, la gestion quotidienne des stagiaires nécessite un suivi rigoureux de leur assiduité afin d'assurer le bon déroulement du processus pédagogique.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-justify">
              Dans ce contexte, plusieurs acteurs interviennent dans le suivi administratif et pédagogique des stagiaires, notamment le directeur, le gestionnaire et les formateurs. Ces acteurs doivent collaborer pour gérer les informations relatives aux filières, groupes, stagiaires, absences, retards et autorisations.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-justify">
              Avec l'augmentation du nombre de stagiaires et la multiplication des données à traiter, la modernisation des outils de gestion devient une nécessité. La transformation numérique des processus administratifs permet d'améliorer l'organisation, la fiabilité des informations et l'efficacité des opérations quotidiennes au sein du centre de formation.
            </p>
          </div>
        </motion.div>

        

      </div>
    </SlideLayout>
  );
}

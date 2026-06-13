"use client";

import { motion } from "framer-motion";
import { Flag } from "lucide-react";

import { SlideLayout } from "@/components/presentation/slide-layout";
import { fadeUp } from "@/components/presentation/motion-primitives";

export function ConclusionSlide({
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
      eyebrow="Conclusion"
      title="Conclusion"
      icon={Flag}
      accent="teal"
    >
      <motion.div variants={fadeUp} className="space-y-5 lg:col-span-2">
        <div className="bg-white/60 dark:bg-slate-900/60 border-l-4 border-teal-500 p-6 rounded-lg shadow-sm">
          <p className="text-lg md:text-xl leading-relaxed text-foreground/90 text-justify first-letter:float-left first-letter:mr-1  first-letter:text-3xl first-letter:font-bold">
            Ce projet a permis de développer une application web moderne dédiée à la gestion des absences et des autorisations au sein de l'ISTA Tiznit. La solution proposée contribue à la digitalisation des processus administratifs, à l'amélioration du suivi des stagiaires et à l'optimisation du travail des différents acteurs de l'établissement.
          </p>

          <p className="mt-4 text-lg md:text-xl leading-relaxed text-foreground/90 text-justify">
            Grâce aux technologies modernes utilisées et aux fonctionnalités mises en œuvre, cette application constitue une solution fiable, évolutive et adaptée aux besoins de l'environnement de formation professionnelle.
          </p>
        </div>

        <motion.div
          variants={fadeUp}
          className="mt-10 h-px w-28 bg-gradient-to-r from-brand-green via-brand-blue to-transparent"
        />
      </motion.div>
    </SlideLayout>
  );
}

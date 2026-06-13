"use client";

import { motion } from "framer-motion";
import { Rocket, Cpu, ClipboardCheck, AlertTriangle } from "lucide-react";

import { SlideLayout } from "@/components/presentation/slide-layout";
import { Reveal, fadeUp } from "@/components/presentation/motion-primitives";

const cards = [
  {
    icon: Cpu,
    title: "Transformation digitale",
    body: "Les établissements de formation s'engagent dans une dynamique de modernisation où les processus papier laissent place à des outils numériques performants, accessibles et collaboratifs.",
    accent: "text-brand-blue",
  },
  {
    icon: ClipboardCheck,
    title: "Un enjeu pédagogique majeur",
    body: "Le suivi de l'assiduité conditionne la réussite des stagiaires. Une gestion fiable des absences permet d'agir tôt, d'accompagner et de prévenir le décrochage.",
    accent: "text-brand-teal",
  },
  {
    icon: AlertTriangle,
    title: "Les limites du manuel",
    body: "Registres papier et fichiers dispersés génèrent erreurs, pertes d'information et retards. L'information n'est ni centralisée, ni exploitable en temps réel.",
    accent: "text-brand-amber",
  },
];

export function IntroductionSlide({ index, total }: { index: number; total: number }) {
  return (
    <SlideLayout
      index={index}
      total={total}
      eyebrow="Introduction"
      title="Contexte du projet"
      icon={Rocket}
      accent="blue"
    >
      <Reveal variants={fadeUp}>
        <p className="mb-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          Dans un monde en pleine{" "}
          <span className="font-medium text-foreground">transformation digitale</span>, la
          gestion administrative des établissements de formation doit gagner en{" "}
          <span className="font-medium text-foreground">efficacité</span> et en{" "}
          <span className="font-medium text-foreground">fiabilité</span>. Le suivi des
          absences, longtemps réalisé manuellement, représente un terrain idéal pour
          l'innovation numérique.
        </p>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-3">
        {cards.map((c) => (
          <motion.div
            key={c.title}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            className="glass card-sheen flex flex-col gap-3 rounded-2xl p-6"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/5">
              <c.icon className={`h-5 w-5 ${c.accent}`} />
            </span>
            <h3 className="text-lg font-semibold">{c.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{c.body}</p>
          </motion.div>
        ))}
      </div>

      <Reveal variants={fadeUp} className="mt-8">
        <div className="glass rounded-2xl border-l-2 border-l-brand-blue p-5">
          <p className="text-sm leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">Notre projet</span> répond à ce
            besoin en proposant une application web moderne, centralisant l'ensemble du
            processus de gestion des absences au sein de l'établissement.
          </p>
        </div>
      </Reveal>
    </SlideLayout>
  );
}

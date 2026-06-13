"use client";

import { motion } from "framer-motion";
import { Scale, NotebookPen, Sheet, Globe, Check, X, Minus } from "lucide-react";

import { SlideLayout } from "@/components/presentation/slide-layout";
import { fadeUp } from "@/components/presentation/motion-primitives";
import { Badge } from "@/components/ui/badge";

type Verdict = "yes" | "no" | "partial";

const criteria = [
  "Centralisation des données",
  "Suivi en temps réel",
  "Statistiques automatiques",
  "Sécurité & traçabilité",
  "Accès multi-utilisateurs",
  "Gain de temps",
];

const solutions: {
  name: string;
  icon: typeof NotebookPen;
  tag: string;
  accent: string;
  highlight?: boolean;
  scores: Verdict[];
}[] = [
  {
    name: "Méthode manuelle",
    icon: NotebookPen,
    tag: "Papier",
    accent: "text-brand-rose",
    scores: ["no", "no", "no", "no", "no", "no"],
  },
  {
    name: "Fichiers Excel",
    icon: Sheet,
    tag: "Tableur",
    accent: "text-brand-amber",
    scores: ["partial", "no", "partial", "no", "partial", "partial"],
  },
  {
    name: "Solution web proposée",
    icon: Globe,
    tag: "Notre projet",
    accent: "text-brand-teal",
    highlight: true,
    scores: ["yes", "yes", "yes", "yes", "yes", "yes"],
  },
];

function VerdictIcon({ v }: { v: Verdict }) {
  if (v === "yes")
    return (
      <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-emerald/15 text-brand-emerald">
        <Check className="h-3.5 w-3.5" />
      </span>
    );
  if (v === "partial")
    return (
      <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-amber/15 text-brand-amber">
        <Minus className="h-3.5 w-3.5" />
      </span>
    );
  return (
    <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-rose/15 text-brand-rose">
      <X className="h-3.5 w-3.5" />
    </span>
  );
}

export function EtudeExistantSlide({ index, total }: { index: number; total: number }) {
  return (
    <SlideLayout
      index={index}
      total={total}
      eyebrow="Étude de l'existant"
      title="Comparaison des approches"
      icon={Scale}
      accent="amber"
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {solutions.map((s) => (
          <motion.div
            key={s.name}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            className={`card-sheen relative flex flex-col rounded-2xl p-6 ${
              s.highlight
                ? "glass-strong glow-ring ring-1 ring-brand-teal/40"
                : "glass"
            }`}
          >
            {s.highlight && (
              <Badge variant="teal" className="absolute -top-3 left-6">
                Recommandé
              </Badge>
            )}
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/5">
                <s.icon className={`h-5 w-5 ${s.accent}`} />
              </span>
              <div>
                <h3 className="text-base font-semibold leading-tight">{s.name}</h3>
                <span className="text-xs text-muted-foreground">{s.tag}</span>
              </div>
            </div>

            <ul className="space-y-3">
              {criteria.map((c, i) => (
                <li
                  key={c}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span
                    className={
                      s.scores[i] === "yes"
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }
                  >
                    {c}
                  </span>
                  <VerdictIcon v={s.scores[i]} />
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={fadeUp}
        className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground"
      >
        <span className="inline-flex items-center gap-2">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-emerald/15 text-brand-emerald">
            <Check className="h-3 w-3" />
          </span>
          Pris en charge
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-amber/15 text-brand-amber">
            <Minus className="h-3 w-3" />
          </span>
          Partiel / limité
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-rose/15 text-brand-rose">
            <X className="h-3 w-3" />
          </span>
          Non couvert
        </span>
      </motion.div>
    </SlideLayout>
  );
}

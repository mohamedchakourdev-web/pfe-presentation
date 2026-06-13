"use client";

import { motion } from "framer-motion";
import { Database, KeyRound, Link2 } from "lucide-react";

import { SlideLayout } from "@/components/presentation/slide-layout";
import { fadeUp } from "@/components/presentation/motion-primitives";

type Entity = {
  name: string;
  accent: string;
  badge: string;
  fields: { name: string; key?: "pk" | "fk" }[];
};

const entities: Entity[] = [
  {
    name: "Utilisateur",
    accent: "text-brand-teal",
    badge: "bg-brand-teal/15 text-brand-teal",
    fields: [
      { name: "id", key: "pk" },
      { name: "nom, email" },
      { name: "mot_de_passe" },
      { name: "rôle" },
    ],
  },
  {
    name: "Filière",
    accent: "text-brand-blue",
    badge: "bg-brand-blue/15 text-brand-blue",
    fields: [
      { name: "id", key: "pk" },
      { name: "intitulé" },
      { name: "diplome_id", key: "fk" },
    ],
  },
  {
    name: "Groupe",
    accent: "text-brand-indigo",
    badge: "bg-brand-indigo/15 text-brand-indigo",
    fields: [
      { name: "id", key: "pk" },
      { name: "nom, niveau" },
      { name: "filiere_id", key: "fk" },
    ],
  },
  {
    name: "Stagiaire",
    accent: "text-brand-violet",
    badge: "bg-brand-violet/15 text-brand-violet",
    fields: [
      { name: "id", key: "pk" },
      { name: "nom, prénom, CIN" },
      { name: "groupe_id", key: "fk" },
    ],
  },
  {
    name: "Absence",
    accent: "text-brand-rose",
    badge: "bg-brand-rose/15 text-brand-rose",
    fields: [
      { name: "id", key: "pk" },
      { name: "date, séance" },
      { name: "statut, justifiée" },
      { name: "stagiaire_id", key: "fk" },
    ],
  },
  {
    name: "Autorisation",
    accent: "text-brand-amber",
    badge: "bg-brand-amber/15 text-brand-amber",
    fields: [
      { name: "id", key: "pk" },
      { name: "motif, période" },
      { name: "statut" },
      { name: "stagiaire_id", key: "fk" },
    ],
  },
];

const relations = [
  "Un diplôme regroupe plusieurs filières (1 — N)",
  "Une filière contient plusieurs groupes (1 — N)",
  "Un groupe rassemble plusieurs stagiaires (1 — N)",
  "Un stagiaire possède plusieurs absences (1 — N)",
  "Un stagiaire peut déposer plusieurs autorisations (1 — N)",
];

export function BaseDonneesSlide({ index, total }: { index: number; total: number }) {
  return (
    <SlideLayout
      index={index}
      total={total}
      eyebrow="Base de données"
      title="Modèle de données"
      icon={Database}
      accent="violet"
    >
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* ER diagram */}
        <motion.div variants={fadeUp} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {entities.map((e) => (
            <motion.div
              key={e.name}
              whileHover={{ y: -5 }}
              className="glass card-sheen overflow-hidden rounded-2xl"
            >
              <div
                className={`flex items-center justify-between border-b border-white/10 px-4 py-2.5 ${e.badge}`}
              >
                <span className="text-sm font-semibold">{e.name}</span>
                <Database className="h-3.5 w-3.5 opacity-70" />
              </div>
              <ul className="divide-y divide-white/5 px-4 py-2">
                {e.fields.map((f) => (
                  <li
                    key={f.name}
                    className="flex items-center gap-2 py-1.5 font-mono text-xs text-muted-foreground"
                  >
                    {f.key === "pk" && (
                      <KeyRound className="h-3 w-3 text-brand-amber" />
                    )}
                    {f.key === "fk" && (
                      <Link2 className="h-3 w-3 text-brand-blue" />
                    )}
                    {!f.key && <span className="h-3 w-3" />}
                    <span className={f.key === "pk" ? "text-foreground" : ""}>
                      {f.name}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Relationships */}
        <motion.div variants={fadeUp} className="glass card-sheen rounded-2xl p-6">
          <div className="mb-4 flex items-center gap-2">
            <Link2 className="h-5 w-5 text-brand-blue" />
            <h3 className="text-base font-semibold">Relations principales</h3>
          </div>
          <ul className="space-y-3">
            {relations.map((r) => (
              <li
                key={r}
                className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" />
                {r}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-3 border-t border-white/10 pt-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <KeyRound className="h-3.5 w-3.5 text-brand-amber" /> Clé primaire
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Link2 className="h-3.5 w-3.5 text-brand-blue" /> Clé étrangère
            </span>
          </div>
        </motion.div>
      </div>
    </SlideLayout>
  );
}

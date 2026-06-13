"use client";

import { motion } from "framer-motion";
import {
  ListChecks,
  Cog,
  Users,
  Lock,
  Gauge,
  Smartphone,
  Check,
  ShieldCheck,
} from "lucide-react";

import { SlideLayout } from "@/components/presentation/slide-layout";
import { fadeUp } from "@/components/presentation/motion-primitives";

const functional = [
  "Authentification et gestion des rôles (directeur, gestionnaire, formateur)",
  "Saisie et pointage des absences par séance et par groupe",
  "Gestion des justificatifs et des demandes d'autorisation",
  "Gestion des stagiaires, groupes, filières et diplômes",
  "Tableaux de bord et statistiques d'assiduité",
  "Notifications et historique des actions",
];

const nonFunctional = [
  { icon: Gauge, label: "Performance", desc: "Temps de réponse rapide même avec un volume important de données." },
  { icon: ShieldCheck, label: "Sécurité", desc: "Authentification, contrôle d'accès par rôle et protection des données." },
  { icon: Smartphone, label: "Ergonomie & responsive", desc: "Interface intuitive, accessible sur ordinateur, tablette et mobile." },
  { icon: Cog, label: "Maintenabilité", desc: "Architecture modulaire et code structuré, évolutif dans le temps." },
];

const users = [
  { role: "Directeur", need: "Vision globale, supervision et pilotage statistique de l'établissement." },
  { role: "Gestionnaire", need: "Administration des stagiaires, groupes, absences et autorisations." },
  { role: "Formateur", need: "Pointage rapide des présences et consultation de ses groupes." },
];

export function AnalyseBesoinsSlide({ index, total }: { index: number; total: number }) {
  return (
    <SlideLayout
      index={index}
      total={total}
      eyebrow="Analyse des besoins"
      title="Besoins fonctionnels & techniques"
      icon={ListChecks}
      accent="blue"
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Functional */}
        <motion.div variants={fadeUp} className="glass card-sheen rounded-2xl p-6">
          <div className="mb-4 flex items-center gap-2">
            <ListChecks className="h-5 w-5 text-brand-teal" />
            <h3 className="text-lg font-semibold">Besoins fonctionnels</h3>
          </div>
          <ul className="space-y-3">
            {functional.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-brand-teal/15 text-brand-teal">
                  <Check className="h-3 w-3" />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Non-functional */}
        <motion.div variants={fadeUp} className="glass card-sheen rounded-2xl p-6">
          <div className="mb-4 flex items-center gap-2">
            <Cog className="h-5 w-5 text-brand-violet" />
            <h3 className="text-lg font-semibold">Besoins non fonctionnels</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {nonFunctional.map((n) => (
              <div key={n.label} className="rounded-xl bg-white/5 p-4">
                <div className="mb-1 flex items-center gap-2">
                  <n.icon className="h-4 w-4 text-brand-violet" />
                  <span className="text-sm font-medium text-foreground">{n.label}</span>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">{n.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Users */}
      <motion.div variants={fadeUp} className="mt-5">
        <div className="mb-3 flex items-center gap-2">
          <Users className="h-5 w-5 text-brand-amber" />
          <h3 className="text-lg font-semibold">Besoins des utilisateurs</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {users.map((u) => (
            <div key={u.role} className="glass rounded-2xl p-5">
              <span className="text-sm font-semibold text-brand-amber">{u.role}</span>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{u.need}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="mt-5">
        <div className="glass flex items-start gap-3 rounded-2xl border-l-2 border-l-brand-rose p-5">
          <Lock className="mt-0.5 h-5 w-5 shrink-0 text-brand-rose" />
          <div>
            <h4 className="text-sm font-semibold">Contraintes du système</h4>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Disponibilité continue, confidentialité des données personnelles,
              compatibilité multi-navigateurs, sauvegardes régulières et conformité aux
              règles internes de l'établissement.
            </p>
          </div>
        </div>
      </motion.div>
    </SlideLayout>
  );
}

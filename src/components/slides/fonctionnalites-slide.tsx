"use client";

import { motion } from "framer-motion";
import {
  LayoutGrid,
  Lock,
  UsersRound,
  FolderTree,
  GraduationCap,
  FileUp,
  CalendarX2,
  CheckSquare,
  Bell,
  BarChart3,
  History,
  UserCog,
} from "lucide-react";

import { SlideLayout } from "@/components/presentation/slide-layout";
import { fadeUp } from "@/components/presentation/motion-primitives";

const features = [
  {
    icon: Lock,
    title: "Authentification sécurisée",
    desc: "Connexion par token Sanctum, mot de passe temporaire par e-mail, comptes actifs / inactifs.",
    accent: "text-brand-teal",
  },
  {
    icon: UserCog,
    title: "Rôles & permissions",
    desc: "Directeur, Gestionnaire et Formateur — droits cloisonnés via Spatie Permission.",
    accent: "text-brand-amber",
  },
  {
    icon: FolderTree,
    title: "Référentiel pédagogique",
    desc: "Gestion des filières, groupes (niveau, année, capacité) et types de diplôme.",
    accent: "text-brand-blue",
  },
  {
    icon: GraduationCap,
    title: "Gestion des stagiaires",
    desc: "Fiches complètes (CEF, CIN, contact, photo) avec recherche et pagination.",
    accent: "text-brand-violet",
  },
  {
    icon: FileUp,
    title: "Import Excel en masse",
    desc: "Création groupée de stagiaires à partir d'un fichier, avec suivi de progression.",
    accent: "text-brand-emerald",
  },
  {
    icon: UsersRound,
    title: "Affectation formateurs",
    desc: "Association des formateurs aux groupes qu'ils encadrent et suivent.",
    accent: "text-brand-blue",
  },
  {
    icon: CalendarX2,
    title: "Absences & retards",
    desc: "Saisie par demi-journée (matin / après-midi), minutes de retard et remarque.",
    accent: "text-brand-rose",
  },
  {
    icon: CheckSquare,
    title: "Workflow d'autorisations",
    desc: "Demande de justificatif adressée au formateur, qui valide ou refuse (en attente / validée / refusée).",
    accent: "text-brand-teal",
  },
  {
    icon: Bell,
    title: "Notifications in-app",
    desc: "Alertes ciblées (absence, autorisation, système) avec compteur de non-lus.",
    accent: "text-brand-amber",
  },
  {
    icon: BarChart3,
    title: "Tableau de bord & KPIs",
    desc: "Vue d'ensemble : utilisateurs, filières, groupes, stagiaires, absences, autorisations en attente.",
    accent: "text-brand-blue",
  },
  {
    icon: History,
    title: "Traçabilité & corbeille",
    desc: "Audit créé / modifié / supprimé par, soft delete et restauration des données.",
    accent: "text-brand-violet",
  },
  {
    icon: UserCog,
    title: "Profil & sécurité",
    desc: "Mise à jour des informations, avatar et changement de mot de passe.",
    accent: "text-brand-emerald",
  },
];

export function FonctionnalitesSlide({
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
      eyebrow="Fonctionnalités principales"
      title="Tout le cycle de l'assiduité digitalisé"
      icon={LayoutGrid}
      accent="teal"
    >
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <motion.div
            key={f.title}
            variants={fadeUp}
            whileHover={{ y: -5 }}
            className="group glass card-sheen rounded-2xl p-4 transition-shadow hover:shadow-xl hover:shadow-black/30"
          >
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5 transition-transform group-hover:scale-110">
                <f.icon className={`h-5 w-5 ${f.accent}`} />
              </span>
              <div>
                <h3 className="text-sm font-semibold leading-snug">{f.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {f.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideLayout>
  );
}

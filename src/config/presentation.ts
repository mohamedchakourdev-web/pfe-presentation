/**
 * ────────────────────────────────────────────────────────────────
 *  CONFIGURATION DE LA PRÉSENTATION
 *  Modifiez les informations ci-dessous (équipe, encadrants, année).
 *  Les valeurs marquées « À COMPLÉTER » doivent être personnalisées.
 * ────────────────────────────────────────────────────────────────
 */

export const projectInfo = {
  appName: "OFPPT — Gestion des Absences",
  title: "Plateforme de Gestion des Absences",
  subtitle:
    "Digitalisation du suivi des absences, des retards et des autorisations en centre de formation ista Tiznit.",
  establishment:
    "OFPPT — Office de la Formation Professionnelle et de la Promotion du Travail",
  school: "ISTA Tiznit",
  diploma: "Projet de Fin de Formation",
  academicYear: "2025 — 2026",
  version: "v1.0.0",

  /** Nom de l'équipe (affiché sur la couverture). */
  teamName: "Developers",

  // ── À COMPLÉTER ────────────────────────────────────────────────
  team: [
    { name: "Mohamed Chakour", gender: "male" },
    { name: "Samir Aibi", gender: "male" },
    { name: "yassine Boulhaoua", gender: "male" },
    { name: "Samia Karim", gender: "female" },
  ],
  supervisors: [
    { name: "Mr.Arrab Hafid", role: "formateur", gender: "male" },
    { name: "Mme.Amkane Oumaima", role: "formatrice", gender: "female" },
  ],
} as const;

export type SlideMeta = {
  id: string;
  /** Short label shown in the navigation dots / menu */
  label: string;
};

/**
 * Order + labels for the slide menu and progress indicator.
 * Doit rester synchronisé avec `src/app/page.tsx`.
 */
export const slideMeta: SlideMeta[] = [
  { id: "cover", label: "Page de présentation" },
  { id: "contexte", label: "Contexte général" },
  { id: "problematique", label: "Problématique" },
  { id: "solution", label: "Solution proposée" },
  { id: "architecture", label: "Architecture" },
  { id: "fonctionnalites", label: "Fonctionnalités" },
  { id: "technologies", label: "Technologies" },
  { id: "demonstration", label: "Démonstration" },
  { id: "conclusion", label: "Conclusion" },
  { id: "merci", label: "Merci" },
];

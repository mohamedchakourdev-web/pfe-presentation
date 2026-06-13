# Soutenance PFE — Plateforme OFPPT de Gestion des Absences

Présentation interactive de soutenance (Projet de Fin de Formation), conçue comme une
alternative moderne et élégante à PowerPoint — style keynote.

Construite avec **Next.js 15**, **TypeScript**, **Tailwind CSS**, **Framer Motion**,
**shadcn/UI** et **Lucide Icons**.

> Tout le contenu est tiré de l'implémentation réelle du projet `ofppt-v2`
> (backend **Laravel 11 + Sanctum + Spatie Permission + MySQL**, frontend
> **Next.js + React Query + Zustand**).

## Démarrage

```bash
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) puis passez en plein écran (`F`).

## Navigation

| Action                  | Raccourci                    |
| ----------------------- | ---------------------------- |
| Diapositive suivante    | `→` · `Espace` · `PageDown`  |
| Diapositive précédente  | `←` · `PageUp`               |
| Première / dernière     | `Home` / `End`               |
| Plein écran             | `F`                          |
| Sommaire (aller à…)     | `G`                          |
| Fermer le sommaire      | `Échap`                      |

Les boutons en bas de l'écran offrent les mêmes contrôles à la souris,
avec la barre de progression et le compteur de diapositives.

## Plan de la présentation (10 écrans)

1. **Page de présentation** — titre, équipe, encadrants, année
2. **Contexte général** — OFPPT, suivi d'assiduité, transformation numérique
3. **Problématique** — limites de la gestion manuelle
4. **Solution proposée** — vision, objectifs, rôles, valeur
5. **Architecture** — schéma 3-tiers animé + cycle de vie d'une requête
6. **Fonctionnalités** — fonctionnalités réellement implémentées
7. **Technologies** — stack frontend & backend détectée
8. **Démonstration** — écran de transition (démo live par le présentateur)
9. **Conclusion** — objectifs atteints, impact, perspectives
10. **Merci** — écran de clôture

## À personnaliser avant la soutenance

Ouvrez **`src/config/presentation.ts`** et remplacez les valeurs
« À COMPLÉTER » :

- **`team`** — noms des membres de l'équipe « Developers »
- **`supervisors`** — nom(s) du / des encadrant(s)

Optionnel : insérez des **captures d'écran** de la démo dans
`src/components/slides/demonstration-slide.tsx` (déposez vos PNG dans `public/`),
et remplacez le logo stylisé par le logo officiel dans
`src/components/presentation/ofppt-logo.tsx`.

## Structure

```
src/
├─ app/                      # layout, page racine (ordre des slides), styles globaux
├─ config/presentation.ts    # métadonnées éditables (équipe, plan…)
├─ components/
│  ├─ ui/                     # primitives shadcn (button, card, badge)
│  ├─ presentation/           # shell, contrôles, fond animé, layout de slide, logo
│  └─ slides/                 # les 10 diapositives actives
└─ lib/utils.ts
```

> Remarque : d'anciennes diapositives (introduction, objectifs, etude-existant, etc.)
> subsistent dans `src/components/slides/` mais **ne sont plus utilisées** ; le deck
> n'affiche que les 10 slides référencées dans `src/app/page.tsx`. Vous pouvez les
> supprimer sans risque.

## Build de production

```bash
npm run build
npm run start
```

## Thème & couleurs

Variables CSS dans `src/app/globals.css` (glassmorphism, dégradés aurora,
`text-gradient`) et palette `brand.*` dans `tailwind.config.ts`.

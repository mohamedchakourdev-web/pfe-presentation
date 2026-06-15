"use client";

import { cn } from "@/lib/utils";

/**
 * ────────────────────────────────────────────────────────────────
 *  IDENTITÉ VISUELLE — LOGO OFFICIEL OFPPT
 * ────────────────────────────────────────────────────────────────
 *
 *  Le logo officiel (badge circulaire complet : anneau argenté,
 *  trois maillons entrelacés, mot-symbole « OFPPT » et signature
 *  « La Voie de l'Avenir ») est servi depuis /public.
 *
 *  Source par défaut : la reproduction vectorielle fidèle
 *        presentation/public/ofppt-logo.svg
 *  → toujours disponible, aucune requête 404.
 *
 *  Pour basculer sur un PNG officiel, déposez-le dans /public et
 *  passez-le via la prop `src` de <OfpptBadge/> (ou changez la
 *  constante SVG_SRC ci-dessous).
 *
 *  Composants :
 *   • <OfpptBadge/>  → le logo officiel complet (pièce maîtresse).
 *   • <OfpptMark/>   → uniquement les 3 maillons (décor / filigranes).
 *   • <OfpptLogo/>   → badge + signature texte (en-têtes secondaires).
 * ────────────────────────────────────────────────────────────────
 */

const SVG_SRC = "/ofppt.jpg";

/**
 * Logo officiel complet.
 *
 * Source par défaut : la reproduction vectorielle fidèle
 * (`/ofppt-logo.svg`) — toujours présente, aucune requête 404.
 *
 * Pour utiliser un PNG officiel à la place, déposez-le dans /public
 * (ex. /ofppt-logo.png) et passez-le via la prop `src`.
 */
export function OfpptBadge({
  className,
  priority = false,
  src = SVG_SRC,
}: {
  className?: string;
  priority?: boolean;
  src?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Logo officiel OFPPT — La Voie de l'Avenir"
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      draggable={false}
      className={cn("h-auto w-full select-none object-contain", className)}
    />
  );
}

/**
 * Trois maillons entrelacés (vert / gris / bleu) — version vectorielle
 * légère, utilisée comme motif décoratif (filigranes, particules de
 * marque) où l'image complète serait trop chargée.
 */
export function OfpptMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 96"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Maillons OFPPT"
    >
      <rect
        x="14"
        y="22"
        width="52"
        height="52"
        rx="8"
        transform="rotate(45 40 48)"
        stroke="#2f9e57"
        strokeWidth="13"
      />
      <rect
        x="154"
        y="22"
        width="52"
        height="52"
        rx="8"
        transform="rotate(45 180 48)"
        stroke="#1f73d0"
        strokeWidth="13"
      />
      <rect
        x="84"
        y="22"
        width="52"
        height="52"
        rx="8"
        transform="rotate(45 110 48)"
        stroke="#9aa6b2"
        strokeWidth="13"
      />
    </svg>
  );
}

/**
 * Badge officiel + signature texte alignés horizontalement.
 * `variant="full"`  → pastille glass (sur fond clair/secondaire).
 * `variant="plain"` → sans pastille (sur fond sombre).
 */
export function OfpptLogo({
  className,
  variant = "full",
}: {
  className?: string;
  variant?: "full" | "plain";
}) {
  const Lockup = (
    <div className="flex items-center gap-3 ">
      <OfpptBadge className="h-12 w-12 shrink-0" />
      <div className="flex flex-col leading-none">
        <span className="font-display text-xl font-bold tracking-[0.12em] text-foreground">
          OFPPT
        </span>
        <span className="mt-0.5 text-[10px] italic tracking-wide text-brand-sky">
          La Voie de l&apos;Avenir
        </span>
      </div>
    </div>
  );

  if (variant === "plain") {
    return <div className={className}>{Lockup}</div>;
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-2xl glass-strong px-5 py-3",
        className
      )}
    >
      {Lockup}
    </div>
  );
}

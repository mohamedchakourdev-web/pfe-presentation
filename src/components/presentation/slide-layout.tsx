"use client";

import * as React from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Stagger, fadeUp } from "./motion-primitives";

/**
 * Consistent chrome for every content slide:
 *  - centred, max-width column
 *  - vertically scrollable when content overflows (keeps long slides usable)
 *  - animated eyebrow + title header
 */
export function SlideLayout({
  index,
  total,
  eyebrow,
  title,
  icon: Icon,
  accent = "teal",
  children,
  className,
}: {
  index: number;
  total: number;
  eyebrow: string;
  title: React.ReactNode;
  icon?: LucideIcon;
  accent?: "teal" | "blue" | "violet" | "amber" | "rose";
  children: React.ReactNode;
  className?: string;
}) {
  const accentMap: Record<string, string> = {
    teal: "text-brand-teal",
    blue: "text-brand-blue",
    violet: "text-brand-violet",
    amber: "text-brand-amber",
    rose: "text-brand-rose",
  };

  return (
    <div className="no-scrollbar h-full w-full overflow-y-auto px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col justify-center">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 md:mb-10"
        >
          <div className="mb-3 flex items-center gap-3">
            {Icon && (
              <span
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-xl glass",
                  accentMap[accent]
                )}
              >
                <Icon className="h-5 w-5" />
              </span>
            )}
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
              {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
              <span className="mx-2 text-border">•</span>
              <span className={accentMap[accent]}>{eyebrow}</span>
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            <span className="text-gradient">{title}</span>
          </h2>
          <div
            className={cn(
              "mt-4 h-px w-24 bg-gradient-to-r",
              accent === "teal" && "from-brand-teal to-transparent",
              accent === "blue" && "from-brand-blue to-transparent",
              accent === "violet" && "from-brand-violet to-transparent",
              accent === "amber" && "from-brand-amber to-transparent",
              accent === "rose" && "from-brand-rose to-transparent"
            )}
          />
        </motion.header>

        {/* Body */}
        <Stagger className={cn("w-full", className)}>{children}</Stagger>
      </div>
    </div>
  );
}

/** Small labelled stat / metric chip used across slides. */
export function StatCard({
  value,
  label,
  icon: Icon,
  accent = "teal",
}: {
  value: string;
  label: string;
  icon?: LucideIcon;
  accent?: "teal" | "blue" | "violet" | "amber" | "rose";
}) {
  const map: Record<string, string> = {
    teal: "text-brand-teal",
    blue: "text-brand-blue",
    violet: "text-brand-violet",
    amber: "text-brand-amber",
    rose: "text-brand-rose",
  };
  return (
    <motion.div
      variants={fadeUp}
      className="glass card-sheen flex flex-col gap-1 rounded-2xl p-5"
    >
      <div className="flex items-center gap-2">
        {Icon && <Icon className={cn("h-4 w-4", map[accent])} />}
        <span className={cn("text-3xl font-bold tracking-tight", map[accent])}>
          {value}
        </span>
      </div>
      <span className="text-sm text-muted-foreground">{label}</span>
    </motion.div>
  );
}

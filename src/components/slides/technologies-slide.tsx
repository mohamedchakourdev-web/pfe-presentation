"use client";

import { motion } from "framer-motion";
import {
  Layers,
  Code2,
  Palette,
  Database,
  KeyRound,
  Component,
  Server,
  ShieldCheck,
  Boxes,
  RefreshCw,
  Atom,
  MonitorSmartphone,
} from "lucide-react";

import { SlideLayout } from "@/components/presentation/slide-layout";
import { fadeUp } from "@/components/presentation/motion-primitives";

const frontend = [
  { icon: Layers, name: "Next.js 15", role: "Framework React", color: "#ffffff" },
  { icon: Atom, name: "React 19", role: "Bibliothèque UI", color: "#38bdf8" },
  { icon: Code2, name: "TypeScript", role: "Typage statique", color: "#3b82f6" },
  { icon: Palette, name: "Tailwind CSS 4", role: "Design system", color: "#14b8a6" },
  { icon: RefreshCw, name: "TanStack Query", role: "Données serveur", color: "#f43f5e" },
  { icon: Component, name: "shadcn/ui · Radix", role: "Composants UI", color: "#8b5cf6" },
];

const backend = [
  { icon: Server, name: "Laravel 11", role: "Framework PHP", color: "#f43f5e" },
  { icon: KeyRound, name: "Sanctum", role: "Auth par tokens", color: "#f59e0b" },
  { icon: ShieldCheck, name: "Spatie Permission", role: "Rôles & accès", color: "#10b981" },
  { icon: Boxes, name: "Eloquent ORM", role: "Accès aux données", color: "#8b5cf6" },
  { icon: Database, name: "MySQL", role: "Base relationnelle", color: "#6366f1" },
  { icon: MonitorSmartphone, name: "API REST", role: "JSON · stateless", color: "#14b8a6" },
];

function TechGroup({
  label,
  items,
}: {
  label: string;
  items: typeof frontend;
}) {
  return (
    <div>
      <motion.div
        variants={fadeUp}
        className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
      >
        <span className="h-px w-6 bg-gradient-to-r from-brand-teal to-transparent" />
        {label}
      </motion.div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((t) => (
          <motion.div
            key={t.name}
            variants={fadeUp}
            whileHover={{ y: -5, scale: 1.03 }}
            className="glass card-sheen group flex items-center gap-3 rounded-2xl p-3.5"
          >
            <span
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5 transition-transform group-hover:scale-110"
              style={{ color: t.color }}
            >
              <t.icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold">{t.name}</h3>
              <span className="text-xs text-muted-foreground">{t.role}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function TechnologiesSlide({
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
      eyebrow="Technologies utilisées"
      title="Une stack moderne typée & robuste"
      icon={Layers}
      accent="teal"
    >
      <div className="grid gap-7">
        <TechGroup label="Frontend" items={frontend} />
        <TechGroup label="Backend & Données" items={backend} />
      </div>

      <motion.p
        variants={fadeUp}
        className="mt-7 max-w-3xl text-sm leading-relaxed text-muted-foreground"
      >
        Architecture <span className="text-foreground">découplée</span> : un frontend
        Next.js / React communique en <span className="text-foreground">REST / JSON</span>{" "}
        avec une API Laravel sécurisée par <span className="text-foreground">Sanctum</span>{" "}
        et un contrôle d'accès <span className="text-foreground">par rôles</span>, le tout
        persisté dans MySQL via Eloquent.
      </motion.p>
    </SlideLayout>
  );
}

"use client";

import { motion } from "framer-motion";
import {
  Network,
  MonitorSmartphone,
  Server,
  Database,
  KeyRound,
  ShieldCheck,
  FileJson,
  ArrowRight,
} from "lucide-react";

import { SlideLayout } from "@/components/presentation/slide-layout";
import { fadeUp } from "@/components/presentation/motion-primitives";

const tiers = [
  {
    icon: MonitorSmartphone,
    label: "Client",
    sub: "Navigateur · SPA",
    accent: "text-brand-blue",
    chip: "bg-brand-blue/10 text-brand-blue border-brand-blue/30",
    items: ["Next.js 15 · React 19", "TanStack Query", "Zustand (auth)", "Axios"],
  },
  {
    icon: Server,
    label: "API REST",
    sub: "Backend applicatif",
    accent: "text-brand-teal",
    chip: "bg-brand-teal/10 text-brand-teal border-brand-teal/30",
    items: ["Laravel 11 (PHP 8)", "Controllers & Services", "Form Requests", "API Resources"],
  },
  {
    icon: Database,
    label: "Données",
    sub: "Persistance",
    accent: "text-brand-violet",
    chip: "bg-brand-violet/10 text-brand-violet border-brand-violet/30",
    items: ["MySQL", "Eloquent ORM", "Migrations", "Soft deletes + audit"],
  },
];

const lifecycle = [
  { icon: KeyRound, label: "Sanctum", desc: "Token Bearer" },
  { icon: ShieldCheck, label: "Middleware", desc: "rôle · actif · permission" },
  { icon: Server, label: "Controller", desc: "logique métier" },
  { icon: FileJson, label: "Resource", desc: "réponse JSON" },
];

function Connector() {
  return (
    <div className="relative hidden h-px flex-1 self-center lg:block">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/40 via-brand-teal/40 to-brand-violet/40" />
      <motion.span
        aria-hidden
        className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-brand-teal shadow-[0_0_12px_2px] shadow-brand-teal/60"
        animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export function ArchitectureSlide({
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
      eyebrow="Architecture de l'application"
      title="Une architecture découplée & sécurisée"
      icon={Network}
      accent="blue"
    >
      {/* 3-tier diagram */}
      <motion.div
        variants={fadeUp}
        className="flex flex-col items-stretch gap-4 lg:flex-row"
      >
        {tiers.map((t, i) => (
          <div key={t.label} className="contents">
            <motion.div
              whileHover={{ y: -6 }}
              className="glass card-sheen flex-1 rounded-2xl p-5"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/5">
                  <t.icon className={`h-5 w-5 ${t.accent}`} />
                </span>
                <div>
                  <h3 className="text-base font-semibold leading-tight">{t.label}</h3>
                  <span className="text-xs text-muted-foreground">{t.sub}</span>
                </div>
              </div>
              <ul className="space-y-2">
                {t.items.map((it) => (
                  <li
                    key={it}
                    className={`inline-flex w-full items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs ${t.chip}`}
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </motion.div>
            {i < tiers.length - 1 && <Connector />}
          </div>
        ))}
      </motion.div>

      {/* Flow labels */}
      <motion.div
        variants={fadeUp}
        className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground"
      >
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-brand-blue" />
          HTTPS · JSON · Authorization: Bearer
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-brand-violet" />
          Eloquent · requêtes SQL optimisées
        </span>
      </motion.div>

      {/* Request lifecycle */}
      <motion.div variants={fadeUp} className="mt-8">
        <div className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Cycle de vie d'une requête authentifiée
        </div>
        <div className="glass flex flex-col items-stretch gap-2 rounded-2xl p-4 sm:flex-row sm:items-center">
          {lifecycle.map((s, i) => (
            <div key={s.label} className="flex flex-1 items-center gap-2">
              <div className="flex flex-1 items-center gap-3 rounded-xl bg-white/[0.03] px-3 py-2.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/5 text-brand-teal">
                  <s.icon className="h-4 w-4" />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-semibold">{s.label}</p>
                  <p className="text-[11px] text-muted-foreground">{s.desc}</p>
                </div>
              </div>
              {i < lifecycle.length - 1 && (
                <ArrowRight className="hidden h-4 w-4 shrink-0 text-muted-foreground sm:block" />
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </SlideLayout>
  );
}

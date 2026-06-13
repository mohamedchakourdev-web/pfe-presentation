"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  LayoutGrid,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { slideMeta } from "@/config/presentation";

/** Thin top progress bar reflecting deck position. */
export function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = total > 1 ? (current / (total - 1)) * 100 : 0;
  return (
    <div className="fixed inset-x-0 top-0 z-40 h-[3px] bg-white/5">
      <motion.div
        className="h-full bg-gradient-to-r from-brand-teal via-brand-blue to-brand-violet"
        initial={false}
        animate={{ width: `${pct}%` }}
        transition={{ type: "spring", stiffness: 120, damping: 24 }}
      />
    </div>
  );
}

/** Bottom-centre navigation cluster: prev / counter / next. */
export function NavControls({
  current,
  total,
  onPrev,
  onNext,
  onToggleMenu,
  onToggleFullscreen,
  isFullscreen,
}: {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onToggleMenu: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, y: 28, x: "-50%" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-5 left-1/2 z-40 flex items-center gap-2 rounded-full glass-strong px-2 py-2 shadow-2xl shadow-black/50"
    >
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={onPrev}
        disabled={current === 0}
        aria-label="Diapositive précédente"
        className="rounded-full"
      >
        <ChevronLeft />
      </Button>

      <div className="flex min-w-[68px] items-center justify-center gap-1.5 px-2 font-mono text-sm tabular-nums">
        <span className="font-semibold text-foreground">
          {String(current + 1).padStart(2, "0")}
        </span>
        <span className="text-muted-foreground">/</span>
        <span className="text-muted-foreground">
          {String(total).padStart(2, "0")}
        </span>
      </div>

      <Button
        variant="ghost"
        size="icon-sm"
        onClick={onNext}
        disabled={current === total - 1}
        aria-label="Diapositive suivante"
        className="rounded-full"
      >
        <ChevronRight />
      </Button>

      <div className="mx-1 h-5 w-px bg-border" />

      <Button
        variant="ghost"
        size="icon-sm"
        onClick={onToggleMenu}
        aria-label="Sommaire"
        className="rounded-full"
      >
        <LayoutGrid />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={onToggleFullscreen}
        aria-label="Plein écran"
        className="rounded-full"
      >
        {isFullscreen ? <Minimize /> : <Maximize />}
      </Button>
    </motion.div>
  );
}

/** Slide-out grid menu (sommaire) for jumping to any section. */
export function SlideMenu({
  open,
  current,
  onClose,
  onSelect,
}: {
  open: boolean;
  current: number;
  onClose: () => void;
  onSelect: (i: number) => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/70 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 top-1/2 z-50 mx-auto max-h-[80vh] max-w-3xl -translate-y-1/2 overflow-y-auto rounded-3xl glass-strong p-6 shadow-2xl no-scrollbar"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-semibold tracking-tight">Sommaire</h3>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={onClose}
                aria-label="Fermer le sommaire"
                className="rounded-full"
              >
                <X />
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {slideMeta.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => onSelect(i)}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-left transition-all hover:border-white/10 hover:bg-white/5",
                    i === current && "border-brand-teal/40 bg-brand-teal/10"
                  )}
                >
                  <span
                    className={cn(
                      "grid h-7 w-7 shrink-0 place-items-center rounded-lg font-mono text-xs",
                      i === current
                        ? "bg-brand-teal text-primary-foreground"
                        : "bg-white/5 text-muted-foreground group-hover:text-foreground"
                    )}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={cn(
                      "text-sm",
                      i === current ? "font-medium text-foreground" : "text-muted-foreground group-hover:text-foreground"
                    )}
                  >
                    {s.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

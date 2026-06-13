"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

/**
 * Écran de transition minimaliste vers la démonstration en direct.
 * Le présentateur quitte la présentation pour montrer l'application réelle.
 */
export function DemonstrationSlide({
  index,
  total,
}: {
  index: number;
  total: number;
}) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden px-6">
      {/* Halo doux et pulsant */}
      <motion.div
        aria-hidden
        className="absolute h-[46vw] w-[46vw] rounded-full bg-brand-blue/15 blur-[130px]"
        animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />



      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Pastille « live » */}
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full glass-strong px-5 py-2"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-70" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-green" />
          </span>
          <span className="text-sm font-medium tracking-wide text-foreground">
            <a
              href="https://ista-tiznit.vercel.app/login"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Lancer la démonstration
            </a>
          </span>
          <Play className="h-3.5 w-3.5 text-brand-sky" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-balance text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl"
        >
          <span className="text-gradient-teal">Démonstration</span>
        </motion.h1>



        {/* Filet décoratif animé */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 h-px w-40 bg-gradient-to-r from-transparent via-brand-sky/60 to-transparent"
        />
      </div>
    </div>
  );
}

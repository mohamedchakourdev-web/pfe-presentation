"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Lightbulb,
  PenTool,
  Compass,
  Atom,
} from "lucide-react";

/**
 * Fond ambiant partagé par toutes les diapositives — identité OFPPT & éducation :
 *  - aurores douces bleu / vert / cyan (les couleurs des maillons)
 *  - « réseau de la connaissance » : nœuds reliés (apprentissage, transformation digitale)
 *  - glyphes académiques très discrets en lévitation (toque, livre, idée…)
 *  - fine grille académique en mouvement lent + vignette
 * Purement décoratif, rendu une seule fois derrière le deck.
 */

/* Réseau de connaissance — nœuds déterministes reliés par des arêtes douces. */
const NODES = [
  { id: 0, x: 12, y: 26 },
  { id: 1, x: 26, y: 58 },
  { id: 2, x: 20, y: 82 },
  { id: 3, x: 84, y: 22 },
  { id: 4, x: 72, y: 50 },
  { id: 5, x: 88, y: 74 },
  { id: 6, x: 50, y: 14 },
  { id: 7, x: 58, y: 88 },
];
const EDGES = [
  [0, 1],
  [1, 2],
  [1, 4],
  [3, 4],
  [4, 5],
  [6, 0],
  [6, 3],
  [4, 7],
  [2, 7],
];

/* Glyphes académiques flottants (très faibles). */
const GLYPHS = [
  { Icon: GraduationCap, left: "9%", top: "18%", size: 30, dur: 17, drift: 16, delay: 0 },
  { Icon: BookOpen, left: "85%", top: "30%", size: 26, dur: 21, drift: -14, delay: 1.5 },
  { Icon: Lightbulb, left: "78%", top: "78%", size: 24, dur: 19, drift: 18, delay: 0.8 },
  { Icon: PenTool, left: "15%", top: "76%", size: 22, dur: 23, drift: -12, delay: 2.2 },
  { Icon: Compass, left: "46%", top: "12%", size: 22, dur: 20, drift: 14, delay: 1.1 },
  { Icon: Atom, left: "54%", top: "84%", size: 26, dur: 24, drift: -16, delay: 0.4 },
];

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* Aurore verte (maillon gauche) */}
      <motion.div
        aria-hidden
        className="absolute -left-1/4 top-[-12%] h-[55vw] w-[55vw] rounded-full bg-brand-green/20 blur-[130px]"
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Aurore bleue (maillon droit) */}
      <motion.div
        aria-hidden
        className="absolute right-[-15%] top-[8%] h-[52vw] w-[52vw] rounded-full bg-brand-blue/22 blur-[130px]"
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 50, -20, 0],
          scale: [1, 0.92, 1.08, 1],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Aurore cyan (liant) */}
      <motion.div
        aria-hidden
        className="absolute bottom-[-22%] left-[22%] h-[46vw] w-[46vw] rounded-full bg-brand-sky/16 blur-[140px]"
        animate={{
          x: [0, 40, -40, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Réseau de la connaissance — arêtes + nœuds pulsants */}
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full opacity-[0.5]"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {EDGES.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke="url(#edge-grad)"
            strokeWidth={0.12}
            initial={{ opacity: 0.1 }}
            animate={{ opacity: [0.08, 0.32, 0.08] }}
            transition={{
              duration: 6 + (i % 4),
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 5) * 0.6,
            }}
          />
        ))}
        {NODES.map((n, i) => (
          <motion.circle
            key={n.id}
            cx={n.x}
            cy={n.y}
            r={0.5}
            fill={i % 2 === 0 ? "#37b06a" : "#3ea7e6"}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 0.9, 0.3], r: [0.45, 0.7, 0.45] }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 6) * 0.5,
            }}
          />
        ))}
        <defs>
          <linearGradient id="edge-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#37b06a" />
            <stop offset="100%" stopColor="#1f73d0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Glyphes académiques en lévitation (discrets) */}
      {GLYPHS.map((g, i) => (
        <motion.div
          key={i}
          aria-hidden
          className="absolute text-white/[0.05]"
          style={{ left: g.left, top: g.top }}
          animate={{ y: [0, g.drift, 0], rotate: [0, i % 2 === 0 ? 6 : -6, 0] }}
          transition={{
            duration: g.dur,
            delay: g.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <g.Icon style={{ width: g.size, height: g.size }} strokeWidth={1.25} />
        </motion.div>
      ))}

      {/* Grille académique en lent défilement */}
      <div className="absolute inset-0 bg-grid opacity-70 animate-grid-pan" />

      {/* Voile / vignette pour la lisibilité */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,hsl(213_58%_4%/_0.72)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60" />
    </div>
  );
}

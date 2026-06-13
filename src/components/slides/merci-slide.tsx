"use client";

import { motion } from "framer-motion";
import { MessageCircleQuestion } from "lucide-react";

import { OfpptBadge } from "@/components/presentation/ofppt-logo";
import { projectInfo } from "@/config/presentation";

/* Particules flottantes (géométrie déterministe → SSR-safe) */
const PARTICLES = Array.from({ length: 22 }, (_, i) => {
  const seed = (i * 137.5) % 100;
  return {
    id: i,
    left: `${(seed * 1.0) % 100}%`,
    top: `${(i * 53) % 100}%`,
    size: 2 + (i % 4),
    duration: 9 + (i % 7),
    delay: (i % 10) * 0.6,
    drift: (i % 2 === 0 ? 1 : -1) * (16 + (i % 5) * 8),
    color: ["#46c7f0", "#37b06a", "#1f73d0", "#d4b24c"][i % 4],
    opacity: 0.25 + (i % 4) * 0.12,
  };
});

/* Formes géométriques en dérive lente */
const SHAPES = [
  { id: 0, left: "12%", top: "22%", size: 64, rot: 45, color: "#2f9e57", dur: 26, drift: 28 },
  { id: 1, left: "82%", top: "28%", size: 88, rot: 12, color: "#1f73d0", dur: 30, drift: -34 },
  { id: 2, left: "74%", top: "70%", size: 52, rot: 30, color: "#46c7f0", dur: 24, drift: 24 },
  { id: 3, left: "18%", top: "72%", size: 72, rot: 18, color: "#d4b24c", dur: 32, drift: -22 },
];

export function MerciSlide() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden px-6">
      {/* Halos lumineux en mouvement continu */}
      <motion.div
        aria-hidden
        className="absolute h-[58vw] w-[58vw] rounded-full bg-brand-blue/14 blur-[130px]"
        animate={{ scale: [1, 1.16, 1], opacity: [0.4, 0.7, 0.4], x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute h-[40vw] w-[40vw] rounded-full bg-brand-green/12 blur-[120px]"
        animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.35, 0.6, 0.35], x: [0, -36, 0], y: [0, 30, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Formes géométriques flottantes (contours) */}
      {SHAPES.map((s) => (
        <motion.div
          key={s.id}
          aria-hidden
          className="absolute rounded-2xl border"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            borderColor: `${s.color}55`,
          }}
          animate={{
            y: [0, s.drift, 0],
            rotate: [s.rot, s.rot + 18, s.rot],
            opacity: [0.3, 0.55, 0.3],
          }}
          transition={{ duration: s.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Particules + traînées lumineuses */}
      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          aria-hidden
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 8px 1px ${p.color}`,
          }}
          animate={{
            y: [0, p.drift, 0],
            x: [0, p.drift * 0.4, 0],
            opacity: [0, p.opacity, 0],
            scale: [0.6, 1, 0.6],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Voile pour la lisibilité du texte */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,hsl(213_58%_5%/_0.55)_100%)]" />

      <div className="relative z-10 flex flex-col items-center text-center">
       

        <motion.h1
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 text-balance text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl"
        >
          <span className="text-gradient-teal">Merci</span>{" "}
          <span className="text-gradient">pour votre</span>
          <br />
          <span className="text-gradient">attention</span>
        </motion.h1>
      </div>
    </div>
  );
}

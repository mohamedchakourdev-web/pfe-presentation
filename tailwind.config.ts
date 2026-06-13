import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        /**
         * ── Identité visuelle OFPPT ──────────────────────────────
         * Les clés héritées (teal, emerald, indigo, violet…) sont
         * « re-teintées » vers la palette OFPPT (bleu / vert / or)
         * afin que l'ensemble du deck adopte l'identité sans churn.
         */
        brand: {
          // Bleu OFPPT (couleur primaire)
          blue: "#1f73d0",
          navy: "#0e3f78",
          sky: "#3ea7e6",
          cyan: "#46c7f0",
          // Vert OFPPT (accent principal — anciennement "teal")
          teal: "#2f9e57",
          emerald: "#37b06a",
          green: "#2f9e57",
          // Or académique (excellence — anciennement "amber")
          amber: "#caa24a",
          gold: "#d4b24c",
          // Bleus de soutien (anciennement "indigo"/"violet")
          indigo: "#2f6fc4",
          violet: "#4f86d8",
          // Alerte (problématique)
          rose: "#e2576b",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "aurora-shift": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(3%, -4%) scale(1.05)" },
          "66%": { transform: "translate(-3%, 3%) scale(0.97)" },
        },
        "grid-pan": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "40px 40px" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "aurora-shift": "aurora-shift 18s ease-in-out infinite",
        "grid-pan": "grid-pan 8s linear infinite",
        shimmer: "shimmer 3s linear infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 22s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

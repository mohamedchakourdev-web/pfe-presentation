import type { Metadata } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Soutenance — Gestion des Absences | OFPPT",
  description:
    "Présentation de soutenance du projet de fin de formation : Application Web de Gestion des Absences (OFPPT).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body
        className={`${inter.variable} ${sora.variable} ${jetbrains.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}

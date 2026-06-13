import { PresentationShell } from "@/components/presentation/presentation-shell";
import { slideMeta } from "@/config/presentation";

import { CoverSlide } from "@/components/slides/cover-slide";
import { ContexteSlide } from "@/components/slides/contexte-slide";
import { ProblematiqueSlide } from "@/components/slides/problematique-slide";
import { SolutionSlide } from "@/components/slides/solution-slide";
import { ArchitectureSlide } from "@/components/slides/architecture-slide";
import { FonctionnalitesSlide } from "@/components/slides/fonctionnalites-slide";
import { TechnologiesSlide } from "@/components/slides/technologies-slide";
import { DemonstrationSlide } from "@/components/slides/demonstration-slide";
import { ConclusionSlide } from "@/components/slides/conclusion-slide";
import { MerciSlide } from "@/components/slides/merci-slide";

export default function Home() {
  const total = slideMeta.length;

  // Order must match `slideMeta` in src/config/presentation.ts
  const slides = [
    <CoverSlide key="cover" />,
    <ContexteSlide key="contexte" index={2} total={total} />,
    <ProblematiqueSlide key="problematique" index={3} total={total} />,
    <SolutionSlide key="solution" index={4} total={total} />,
    <ArchitectureSlide key="architecture" index={5} total={total} />,
    <FonctionnalitesSlide key="fonctionnalites" index={6} total={total} />,
    <TechnologiesSlide key="technologies" index={7} total={total} />,
    <DemonstrationSlide key="demonstration" index={8} total={total} />,
    <ConclusionSlide key="conclusion" index={9} total={total} />,
    <MerciSlide key="merci" />,
  ];

  return <PresentationShell slides={slides} />;
}

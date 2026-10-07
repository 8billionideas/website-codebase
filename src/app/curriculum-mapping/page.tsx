import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import CurriculumExplorer from "@/components/curriculum/CurriculumExplorer";
import CurriculumHero from "@/components/curriculum/CurriculumHero";
import ImplementationSupportSection from "@/components/curriculum/ImplementationSupportSection";
import LessonPlatformShowcase from "@/components/curriculum/LessonPlatformShowcase";
import PillarProgrammeExplorer from "@/components/curriculum/PillarProgrammeExplorer";
import StudentProgressionShowcase from "@/components/curriculum/StudentProgressionShowcase";
import { Eyebrow } from "@/components/home/SectionHeading";
import { curriculumMapping } from "@/content/curriculumMapping";
import DemoTrigger from "@/components/demo/DemoTrigger";

export const metadata: Metadata = {
  title: "Our Curriculum | 8billionideas",
  description:
    "See how our eight pillars connect to the subjects you already teach, and how schools fit 8billionideas into their timetable.",
};

export default function CurriculumMappingPage() {
  const { heading, intro, footnote } = curriculumMapping;

  return (
    <>
      <CurriculumHero />

      {/* Pillar programme explorer — its own section, above the mapping. */}
      <div className="bg-paper py-16 md:py-24">
        <Container>
          <h2 className="mx-auto max-w-[900px] text-balance text-center text-[30px] font-light leading-[1.15] tracking-[-0.01em] text-ink md:text-[44px]">
            Each pillar is built into a clear sequence of lessons for every year
            group
          </h2>
          <p className="mx-auto mt-5 max-w-[760px] text-center text-[18px] leading-[1.6] text-ink/70">
            For each year group, every pillar is broken into five 40-60 minute
            lessons that build on one another and form a complete programme of
            learning.
          </p>

          <PillarProgrammeExplorer />
        </Container>
      </div>

      <LessonPlatformShowcase />

      <div className="py-16 md:py-24">
        <Container>
          <Eyebrow variant="light" className="!text-accent">
            CURRICULUM MAPPING
          </Eyebrow>
          <h2 className="mt-4 max-w-[900px] text-balance text-display text-ink">{heading}</h2>
          <p className="mt-4 max-w-[720px] text-body-lg text-muted">{intro}</p>

          <div id="mapping">
            <CurriculumExplorer />
          </div>

          <p className="mt-12 max-w-2xl text-body text-muted md:mt-16">
            {footnote.pre}
            <DemoTrigger
              className="font-normal text-ink underline decoration-ink/30 underline-offset-2 hover:decoration-accent"
            >
              {footnote.linkLabel}
            </DemoTrigger>
            {footnote.post}
          </p>
        </Container>
      </div>

      <StudentProgressionShowcase />

      {/* Both this section and the progression band above use a paper
          background, so a thin divider keeps them reading as separate
          sections instead of blending together. */}
      <div className="h-px w-full bg-ink/[0.08]" aria-hidden="true" />

      <ImplementationSupportSection />
    </>
  );
}

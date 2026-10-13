import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import CurriculumConnections from "@/components/curriculum/CurriculumConnections";
import CurriculumHero from "@/components/curriculum/CurriculumHero";
import ImplementationSupportSection from "@/components/curriculum/ImplementationSupportSection";
import LessonPlatformShowcase from "@/components/curriculum/LessonPlatformShowcase";
import LessonExplorer from "@/components/curriculum/LessonExplorer";
import StudentProgressionShowcase from "@/components/curriculum/StudentProgressionShowcase";
import { curriculumMapping } from "@/content/curriculumMapping";
import DemoTrigger from "@/components/demo/DemoTrigger";

export const metadata: Metadata = {
  title: "Our Curriculum | 8billionideas",
  description:
    "See how our eight pillars connect to the subjects you already teach, and how schools fit 8billionideas into their timetable.",
};

export default function CurriculumMappingPage() {
  const { footnote } = curriculumMapping;

  return (
    <>
      <CurriculumHero />

      {/* Lesson explorer — its own section, above the mapping. */}
      <div className="bg-paper py-16 md:py-24">
        <Container>
          <LessonExplorer />
        </Container>
      </div>

      <LessonPlatformShowcase />

      {/* Curriculum mapping: subject-and-stage explorer. The hero's "Explore how it maps
          to your subjects" link scrolls to #mapping. */}
      <section id="mapping" className="bg-paper py-16 md:py-24">
        <Container>
          <CurriculumConnections />

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
      </section>

      <StudentProgressionShowcase />

      {/* Both this section and the progression band above use a paper
          background, so a thin divider keeps them reading as separate
          sections instead of blending together. */}
      <div className="h-px w-full bg-ink/[0.08]" aria-hidden="true" />

      <ImplementationSupportSection />
    </>
  );
}

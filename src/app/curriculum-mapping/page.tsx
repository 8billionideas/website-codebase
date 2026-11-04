import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import CurriculumConnections from "@/components/curriculum/CurriculumConnections";
import CurriculumHero from "@/components/curriculum/CurriculumHero";
import ImplementationSupportSection from "@/components/curriculum/ImplementationSupportSection";
import LessonPlatformShowcase from "@/components/curriculum/LessonPlatformShowcase";
import LessonExplorer from "@/components/curriculum/LessonExplorer";
import StudentProgressionShowcase from "@/components/curriculum/StudentProgressionShowcase";
import { LESSON_EXPLORER_ID } from "@/lib/lesson-explorer-link";

export const metadata: Metadata = {
  title: "Our Curriculum | 8billionideas",
  description:
    "See how our eight pillars connect to the subjects you already teach, and how schools fit 8billionideas into their timetable.",
};

export default function CurriculumMappingPage() {
  return (
    <>
      <CurriculumHero />

      {/* Lesson explorer — its own section, above the mapping. The mapping panels' Explore links
          scroll here (the section's top padding clears the sticky nav) and move focus to it. */}
      <div id={LESSON_EXPLORER_ID} tabIndex={-1} className="bg-paper py-section focus:outline-none">
        <Container>
          <LessonExplorer />
        </Container>
      </div>

      <LessonPlatformShowcase />

      {/* Curriculum mapping: subject-and-stage explorer. */}
      <section id="mapping" className="bg-paper py-section">
        <Container>
          <CurriculumConnections />
        </Container>
      </section>

      {/* Navy band; the paper section below needs no divider. */}
      <StudentProgressionShowcase />

      <ImplementationSupportSection />
    </>
  );
}

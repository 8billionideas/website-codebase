import Link from "next/link";
import Container from "@/components/layout/Container";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import CurriculumTabs from "@/components/sections/CurriculumTabs";
import { home } from "@/content/home";

export default function CrossCurricularAlignment() {
  const { subjectAlignment, curriculumAlignment, cta } = home.crossCurricular;

  return (
    <section className="py-16 md:py-24">
      <Container>
        <h2 className="max-w-2xl text-h2 text-ink">{subjectAlignment.heading}</h2>
        <p className="mt-4 max-w-2xl text-body-lg text-muted">
          {subjectAlignment.body}
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {subjectAlignment.subjects.map((subject) => (
            <li
              key={subject}
              className="rounded-full border border-ink/15 px-3 py-1 text-caption font-medium text-ink"
            >
              {subject}
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-2xl bg-surface p-8 md:p-10">
          <h3 className="max-w-2xl text-h3 text-ink">
            {curriculumAlignment.heading}
          </h3>
          <p className="mt-4 max-w-2xl text-body-lg text-muted">
            {curriculumAlignment.body}
          </p>

          <CurriculumTabs items={curriculumAlignment.items} />

          <div className="mt-10 border-t border-ink/10 pt-8">
            <p className="max-w-2xl text-body-lg font-semibold text-ink">
              {curriculumAlignment.examPartner.heading}
            </p>
          </div>

          <p className="mt-6 text-body text-muted">
            {curriculumAlignment.contactLine.pre}
            <Link
              href={curriculumAlignment.contactLine.href}
              className="font-medium text-ink underline decoration-ink/30 underline-offset-2 hover:decoration-accent"
            >
              {curriculumAlignment.contactLine.linkLabel}
            </Link>
            {curriculumAlignment.contactLine.post}
          </p>
        </div>

        <div className="mt-10">
          <PrimaryCTA href={cta.href}>{cta.label}</PrimaryCTA>
        </div>
      </Container>
    </section>
  );
}

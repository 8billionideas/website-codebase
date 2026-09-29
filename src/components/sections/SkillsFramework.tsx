import { ArrowRight } from "lucide-react";
import Container from "@/components/layout/Container";
import { skillsFramework } from "@/content/skillsFramework";
import type { SkillsFrameworkColumn } from "@/content/skillsFramework";

function SkillPill({ skill }: { skill: string }) {
  return (
    <span className="inline-flex items-center justify-center rounded-full border border-accent px-3 py-1.5 text-center text-caption font-normal text-ink">
      {skill}
    </span>
  );
}

function Column({ column }: { column: SkillsFrameworkColumn }) {
  const firstFour = column.skills.slice(0, 4);
  const rest = column.skills.slice(4);

  return (
    <div className="px-6 py-10 md:py-0">
      <p className="text-caption font-normal text-accent">{column.number}</p>
      <h3 className="mt-2 text-h3 text-ink">{column.heading}</h3>
      <p className="mt-5 text-body-lg text-ink">{column.intro}</p>

      <p className="mt-12 text-caption uppercase tracking-wide text-muted">
        {column.skillsLabel}
      </p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {firstFour.map((skill) => (
          <SkillPill key={skill} skill={skill} />
        ))}
      </div>
      {rest.length > 0 && (
        <div className="mt-3 flex justify-center">
          {rest.map((skill) => (
            <SkillPill key={skill} skill={skill} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SkillsFramework() {
  const { eyebrow, heading, subheading, columns } = skillsFramework;

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="text-center">
          <p className="text-caption uppercase tracking-[0.2em] text-muted">
            {eyebrow}
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-display text-ink">{heading}</h2>
          <p className="mx-auto mt-4 max-w-xl text-body-lg text-muted">
            {subheading}
          </p>
        </div>

        <div className="relative mt-16 grid grid-cols-1 divide-y divide-ink/10 md:grid-cols-3 md:divide-x md:divide-y-0">
          {columns.map((column) => (
            <Column key={column.number} column={column} />
          ))}

          {/* Connecting arrows on the two internal dividers — desktop only. */}
          <span
            aria-hidden="true"
            className="absolute left-1/3 top-1/2 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent bg-paper text-accent md:flex"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
          <span
            aria-hidden="true"
            className="absolute left-2/3 top-1/2 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent bg-paper text-accent md:flex"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </Container>
    </section>
  );
}

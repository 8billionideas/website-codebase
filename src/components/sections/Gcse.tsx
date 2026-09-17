import Container from "@/components/layout/Container";
import SecondaryCTA from "@/components/cta/SecondaryCTA";
import GcseFindOutMoreButton from "@/components/sections/GcseFindOutMoreButton";
import { home } from "@/content/home";

export default function Gcse() {
  const {
    eyebrow,
    pillarsLink,
    headline,
    projectSplit,
    stat,
    platformLine,
    primaryCta,
    secondaryCta,
  } = home.gcse;

  return (
    <section className="relative bg-paper py-20 md:py-28">
      {/* Picks up the converging pillar-spine line where CriticalCurriculum's
          own bottom-padding stub leaves off (112px = md:py-28), so it runs
          unbroken into the box's top border below. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 hidden h-28 w-px -translate-x-1/2 bg-accent md:block"
      />
      <Container>
        {/* Accent outline signals continuity with the Critical Curriculum
            section above — one system, not a separate block. */}
        <div className="rounded-2xl border-2 border-accent p-8 md:p-12">
          <p className="text-h2 text-ink">{eyebrow}</p>
          <p className="mt-4 max-w-2xl text-body-lg text-muted">{pillarsLink}</p>
          <h2 className="mt-6 max-w-2xl text-h2 text-ink">{headline}</h2>

          <p className="mt-6 max-w-2xl text-body-lg text-muted">{projectSplit}</p>

          <p className="mt-4 max-w-2xl border-l-2 border-brand py-1 pl-4 text-body-lg text-ink">
            {stat.stat}{" "}
            <span className="text-caption text-muted">— {stat.source}</span>
          </p>

          <p className="mt-6 max-w-2xl text-body-lg text-muted">{platformLine}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <GcseFindOutMoreButton label={primaryCta.label} />
            <SecondaryCTA href={secondaryCta.href}>
              {secondaryCta.label}
            </SecondaryCTA>
          </div>
        </div>
      </Container>
    </section>
  );
}

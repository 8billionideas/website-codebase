import Container from "@/components/layout/Container";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import SecondaryCTA from "@/components/cta/SecondaryCTA";
import { home } from "@/content/home";

export default function Gcse() {
  const { eyebrow, headline, projectSplit, stat, platformLine, primaryCta, secondaryCta } =
    home.gcse;

  return (
    <section className="bg-surface py-16 md:py-24">
      <Container>
        <p className="text-caption text-brand">{eyebrow}</p>
        <h2 className="mt-3 max-w-2xl text-h2 text-ink">{headline}</h2>

        <p className="mt-6 max-w-2xl text-body-lg text-muted">{projectSplit}</p>

        <p className="mt-4 max-w-2xl border-l-2 border-brand py-1 pl-4 text-body-lg text-ink">
          {stat.stat}{" "}
          <span className="text-caption text-muted">— {stat.source}</span>
        </p>

        <p className="mt-6 max-w-2xl text-body-lg text-muted">{platformLine}</p>

        <div className="mt-8 flex flex-wrap gap-4">
          <PrimaryCTA href={primaryCta.href}>{primaryCta.label}</PrimaryCTA>
          <SecondaryCTA href={secondaryCta.href}>
            {secondaryCta.label}
          </SecondaryCTA>
        </div>
      </Container>
    </section>
  );
}

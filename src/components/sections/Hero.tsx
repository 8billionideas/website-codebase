import Container from "@/components/layout/Container";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import SecondaryCTA from "@/components/cta/SecondaryCTA";
import { home } from "@/content/home";

export default function Hero() {
  const { headline, subhead, primaryCta, secondaryCta } = home.hero;

  return (
    <section className="py-20 md:py-28">
      <Container>
        <h1 className="max-w-3xl text-display text-ink">{headline}</h1>
        <p className="mt-6 max-w-2xl text-body-lg text-muted">{subhead}</p>
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

import Container from "@/components/layout/Container";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import SecondaryCTA from "@/components/cta/SecondaryCTA";
import { home } from "@/content/home";

export default function FinalCta() {
  const { headline, primaryCta, secondaryCta } = home.finalCta;

  return (
    <section className="bg-ink py-16 md:py-24">
      <Container className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="max-w-xl text-h2 text-white">{headline}</h2>
        <div className="flex flex-wrap gap-4">
          <PrimaryCTA href={primaryCta.href}>{primaryCta.label}</PrimaryCTA>
          <SecondaryCTA href={secondaryCta.href} variant="dark">
            {secondaryCta.label}
          </SecondaryCTA>
        </div>
      </Container>
    </section>
  );
}

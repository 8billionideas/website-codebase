import Container from "@/components/layout/Container";
import { home } from "@/content/home";

export default function Pricing() {
  const { headline, subhead } = home.pricing;

  return (
    <section className="py-16 md:py-24">
      <Container>
        <h2 className="text-h2 text-ink">{headline}</h2>
        <p className="mt-4 max-w-2xl text-body-lg text-muted">{subhead}</p>

        <div className="mt-10 rounded-lg border border-dashed border-muted/60 p-8 text-center text-body italic text-muted">
          Pricing tiers placeholder
        </div>
      </Container>
    </section>
  );
}

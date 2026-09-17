import Container from "@/components/layout/Container";
import PricingConfigurator from "@/components/sections/PricingConfigurator";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import { pricing } from "@/content/pricing";

export default function PricingPage() {
  const { headline, subhead, included, budget, cta } = pricing;

  return (
    <>
      <div className="py-16 md:py-24">
        <Container>
          <h1 className="text-display text-ink">{headline}</h1>
          <p className="mt-4 max-w-2xl text-body-lg text-muted">{subhead}</p>

          <PricingConfigurator />
        </Container>
      </div>

      <div className="bg-surface py-16 md:py-24">
        <Container>
          <h2 className="text-h2 text-ink">{included.heading}</h2>
          <ul className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {included.items.map((item) => (
              <li key={item.name}>
                <h3 className="text-h3 text-ink">{item.name}</h3>
                <p className="mt-2 text-body-lg text-muted">{item.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      <div className="py-16 md:py-24">
        <Container>
          <h2 className="text-h2 text-ink">{budget.heading}</h2>
          <ul className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {budget.items.map((item) => (
              <li key={item.name}>
                <h3 className="text-h3 text-ink">{item.name}</h3>
                <p className="mt-2 text-body-lg text-muted">{item.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      <div className="bg-ink py-16 md:py-24">
        <Container className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="max-w-xl text-h2 text-white">{cta.headline}</h2>
          <PrimaryCTA href={cta.primaryCta.href}>{cta.primaryCta.label}</PrimaryCTA>
        </Container>
      </div>
    </>
  );
}

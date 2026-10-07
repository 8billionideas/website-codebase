import Image from "next/image";
import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import PricingCalculator from "@/components/pricing/PricingCalculator";
import WhatsIncluded from "@/components/pricing/WhatsIncluded";
import Faq from "@/components/sections/Faq";
import { pricing } from "@/content/pricing";

export const metadata: Metadata = {
  title: "Pricing | 8billionideas",
  description:
    "Indicative pricing for the Critical Curriculum and the OxfordAQA International GCSE Global Skills Projects.",
};

export default function PricingPage() {
  const { hero } = pricing;

  return (
    <div className="bg-paper">
      <section className="relative isolate flex min-h-[460px] items-center overflow-hidden bg-paper lg:min-h-[520px]">
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          preload
          sizes="100vw"
          className="object-cover object-[80%_center] mix-blend-multiply lg:object-right"
        />
        <div
          className="absolute inset-0 lg:hidden"
          style={{ backgroundColor: "rgba(255,253,250,0.85)" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,253,250,0.95) 0%, rgba(255,253,250,0.85) 35%, rgba(255,253,250,0) 60%)",
          }}
          aria-hidden="true"
        />
        <Container className="relative z-10 w-full py-16 md:py-20 lg:py-24">
          <div className="max-w-[600px] text-left">
            <p className="text-[12px] uppercase tracking-[0.25em] text-accent">{hero.eyebrow}</p>
            <h1 className="mt-4 text-[36px] font-light leading-[1.1] tracking-[-0.01em] text-ink text-balance md:text-[56px]">
              {hero.headlineLead}
              <br />
              <em className="text-accent">{hero.headlineEmphasis}</em>
            </h1>
            <p className="mt-6 max-w-[560px] text-[18px] leading-[1.6] text-ink/75">{hero.intro}</p>
          </div>
        </Container>
      </section>

      <Container className="pb-16 md:pb-24">
        {/* Combined pricing calculator */}
        <PricingCalculator />
      </Container>

      <WhatsIncluded />

      <Faq includeSchema={false} hideLinksTo="/pricing" tone="paper" />
    </div>
  );
}

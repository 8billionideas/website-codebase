import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  TrendingUp,
  LayoutGrid,
  Rocket,
  Users,
  Lightbulb,
  Briefcase,
  Coins,
  Heart,
  Activity,
  Leaf,
  Cpu,
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/layout/Container";
import { Eyebrow, SectionH2, SectionBody } from "@/components/home/SectionHeading";
import PartnerCards from "@/components/shared/PartnerCards";
import ChampionSchools from "@/components/sections/ChampionSchools";
import Faq from "@/components/sections/Faq";
import { gcse } from "@/content/gcse";
import { gcseSchools } from "@/content/schools";
import { homepageFaqs, type HomepageFaq } from "@/lib/homepage-faqs";

export const metadata: Metadata = {
  title: "OxfordAQA International GCSE Global Skills Projects | 8billionideas",
  description:
    "A real qualification built on real projects, developed with OxfordAQA and delivered by 8billionideas.",
};

const DEMO_HREF = "#book-a-demo";

// Same icon choices as the homepage pillar carousel (PillarCarousel.tsx),
// duplicated locally since that component is client-only.
const PILLAR_ICONS: Record<string, LucideIcon> = {
  Entrepreneurship: Lightbulb,
  Careers: Briefcase,
  "Financial Literacy": Coins,
  Wellbeing: Heart,
  "Health & Performance": Activity,
  Leadership: Users,
  Sustainability: Leaf,
  Technology: Cpu,
};

const PLATFORM_ICONS: Record<string, LucideIcon> = {
  BookOpen,
  TrendingUp,
  LayoutGrid,
};

const WHY_US_ICONS: Record<string, LucideIcon> = {
  Rocket,
  BookOpen,
  Users,
};

const globalSkillsFaq = homepageFaqs.find(
  (faq) => faq.question === "Can schools following any curriculum offer the Global Skills GCSE?"
)!;

const gcseFaqItems: HomepageFaq[] = [...gcse.faq.items, globalSkillsFaq];

function RequestDemoButton({
  className = "",
  hoverVariant = "ink",
}: {
  className?: string;
  hoverVariant?: "ink" | "light";
}) {
  const hoverClasses =
    hoverVariant === "light" ? "hover:bg-white hover:text-ink" : "hover:bg-ink hover:text-white";
  return (
    <Link
      href={DEMO_HREF}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-body font-medium text-ink transition-colors ${hoverClasses} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 md:w-auto ${className}`}
    >
      Request a demo
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

export default function GcsePage() {
  const { hero, whatItIs, howItWorks, projectThemes, platform, partnership, whyUs, quotesLabel, quotes, recognition, championSchoolsHeadline } =
    gcse;

  return (
    <>
      {/* 1. Hero */}
      <section className="relative flex min-h-[540px] items-center overflow-hidden bg-ink md:min-h-[600px]">
        <Image
          src="/images/gcse-hero.webp"
          alt="Secondary students smiling as they read their qualification results together"
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover object-[75%_center] lg:object-right"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(22,33,61,0.2)" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 lg:hidden"
          style={{ backgroundColor: "rgba(22,33,61,0.75)" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(22,33,61,0.95) 0%, rgba(22,33,61,0.8) 35%, rgba(22,33,61,0.3) 60%, rgba(22,33,61,0) 80%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(22,33,61,0) 70%, rgba(22,33,61,1) 100%)",
          }}
          aria-hidden="true"
        />
        <Container className="relative z-10 w-full py-16 md:py-20">
          {hero.launchDate && (
            <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-caption uppercase tracking-[0.2em] text-white/70">
              FIRST TEACHING FROM {hero.launchDate}
            </span>
          )}
          <Eyebrow variant="dark" className={hero.launchDate ? "mt-6" : ""}>
            {hero.eyebrow}
          </Eyebrow>
          <h1 className="mt-4 max-w-[620px] text-[36px] font-light leading-[1.1] tracking-[-0.01em] text-white md:text-[56px]">
            {hero.headingLine1}
            <br />
            <em className="text-accent">{hero.headingLine2}</em>
          </h1>
          <p className="mt-6 max-w-[620px] text-[18px] leading-[1.6] text-white/85">
            {hero.subline}
          </p>
          <div className="mt-8">
            <RequestDemoButton
              hoverVariant="light"
              className="focus-visible:ring-white focus-visible:ring-offset-ink"
            />
          </div>
        </Container>
      </section>

      {/* 2. What it is */}
      <div className="py-16 md:py-24">
        <Container>
          <Eyebrow variant="light">{whatItIs.eyebrow}</Eyebrow>
          <SectionH2 variant="light" className="mt-4">
            {whatItIs.headingLine1}
            <br />
            <em className="text-accent">{whatItIs.headingLine2}</em>
          </SectionH2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {whatItIs.paragraphs.map((paragraph, i) => (
              <p key={i} className="text-[18px] leading-[1.6] text-ink/75">
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </div>

      {/* 3. How it works */}
      <div className="bg-surface py-16 md:py-24">
        <Container>
          <Eyebrow variant="light">{howItWorks.eyebrow}</Eyebrow>
          <SectionH2 variant="light" className="mt-4">
            {howItWorks.headingLine1}
            <br />
            <em className="text-accent">{howItWorks.headingLine2}</em>
          </SectionH2>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {howItWorks.cards.map((card) => (
              <div
                key={card.label}
                className="rounded-2xl border border-ink/10 bg-paper p-8"
              >
                <p className="text-caption uppercase tracking-[0.2em] text-accent">
                  {card.label}
                </p>
                <h3 className="mt-3 text-h3 text-ink">{card.title}</h3>
                <p className="mt-3 text-body-lg text-muted">{card.line}</p>
                <p className="mt-4 text-body text-ink/75">
                  {card.taughtHours} taught learning hours + {card.guidedHours} guided
                  learning hours
                </p>

                <p className="mt-6 text-caption uppercase tracking-wide text-muted">
                  Key outcomes
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {card.outcomes.map((outcome) => (
                    <li
                      key={outcome}
                      className="rounded-full bg-accent/10 px-3 py-1 text-caption font-normal text-ink"
                    >
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* 4. Project themes */}
      <div className="py-16 md:py-24">
        <Container>
          <Eyebrow variant="light">{projectThemes.eyebrow}</Eyebrow>
          <SectionH2 variant="light" className="mt-4">
            {projectThemes.headingLine1}
            <br />
            <em className="text-accent">{projectThemes.headingLine2}</em>
          </SectionH2>

          <h3 className="mt-10 text-h3 text-ink">{projectThemes.firstYearHeading}</h3>
          <p className="mt-2 text-body-lg text-muted">{projectThemes.firstYearLine}</p>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {projectThemes.pillars.map((pillar) => {
              const Icon = PILLAR_ICONS[pillar.name];
              return (
                <div key={pillar.name} className="rounded-2xl border border-ink/10 p-6">
                  <Icon className="h-6 w-6 text-accent" strokeWidth={1.5} aria-hidden="true" />
                  <p className="mt-4 text-body-lg text-ink">{pillar.name}</p>
                  <p className="mt-2 text-body italic text-muted">
                    &ldquo;{pillar.question}&rdquo;
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl bg-accent/[0.08] p-8 md:p-12">
            <h3 className="text-h3 text-ink">{projectThemes.secondYearHeading}</h3>
            <p className="mt-3 max-w-2xl text-body-lg text-muted">
              {projectThemes.secondYearLine}
            </p>
          </div>
        </Container>
      </div>

      {/* 5. The platform */}
      <div className="bg-surface py-16 md:py-24">
        <Container>
          <Eyebrow variant="light">{platform.eyebrow}</Eyebrow>
          <SectionH2 variant="light" className="mt-4">
            {platform.headingLine1}
            <br />
            <em className="text-accent">{platform.headingLine2}</em>
          </SectionH2>
          <SectionBody variant="light" className="mt-5">
            {platform.body}
          </SectionBody>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {platform.points.map((point) => {
              const Icon = PLATFORM_ICONS[point.icon];
              return (
                <div key={point.title} className="flex items-center gap-3">
                  <Icon
                    className="h-5 w-5 shrink-0 text-accent"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <p className="text-body-lg text-ink">{point.title}</p>
                </div>
              );
            })}
          </div>

          {platform.showPlatformVideo && (
            <div className="mt-10">
              <Link
                href={DEMO_HREF}
                className="inline-flex items-center gap-2 rounded-full border border-accent px-7 py-3 text-body font-medium text-ink transition-colors hover:bg-accent"
              >
                See the platform
              </Link>
              <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-2xl border-2 border-accent/40 bg-ink/5" />
            </div>
          )}
        </Container>
      </div>

      {/* 6. Qualification and delivery */}
      <div className="bg-ink py-16 md:py-24">
        <Container>
          <Eyebrow variant="dark">{partnership.eyebrow}</Eyebrow>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-0 md:divide-x md:divide-white/10">
            <div className="md:pr-12">
              <p className="text-h3 text-balance font-light text-white">
                A recognised qualification,{" "}
                <em className="text-accent">fully supported from start to finish</em>
              </p>
            </div>
            <div className="md:pl-12">
              <p className="max-w-md text-body-lg text-white/70">
                OxfordAQA provides the qualification, while we make it easier
                for schools to deliver through ready-to-teach learning,
                resources and support.
              </p>
            </div>
          </div>

          <PartnerCards />
        </Container>
      </div>

      {/* 7. Why partner with 8billionideas */}
      <div className="py-16 md:py-24">
        <Container>
          <Eyebrow variant="light">{whyUs.eyebrow}</Eyebrow>
          <SectionH2 variant="light" className="mt-4">
            {whyUs.headingLine1}
            <br />
            <em className="text-accent">{whyUs.headingLine2}</em>
          </SectionH2>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {whyUs.points.map((point) => {
              const Icon = WHY_US_ICONS[point.icon];
              return (
                <div key={point.title}>
                  <Icon className="h-6 w-6 text-accent" strokeWidth={1.5} aria-hidden="true" />
                  <p className="mt-4 text-h3 text-ink">{point.title}</p>
                  <p className="mt-2 text-body-lg text-muted">{point.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </div>

      {/* 8. Quotes */}
      <div className="bg-surface py-16 md:py-24">
        <Container>
          <Eyebrow variant="light">{quotesLabel}</Eyebrow>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {quotes.map((item) => {
              const isPlaceholder = item.quote.startsWith("[Paste");
              return (
                <div
                  key={item.name}
                  className={`rounded-2xl p-8 ${
                    isPlaceholder
                      ? "border border-dashed border-ink/20 bg-paper"
                      : "border border-ink/10 bg-paper"
                  }`}
                >
                  {isPlaceholder ? (
                    <p className="italic text-muted">Quote to be added.</p>
                  ) : (
                    <p className="font-light italic text-ink">&ldquo;{item.quote}&rdquo;</p>
                  )}
                  <p className="mt-4 text-caption text-ink">{item.name}</p>
                  <p className="text-caption text-muted">{item.role}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </div>

      {/* 9. Recognition */}
      <div className="py-12 md:py-16">
        <Container>
          <div className="border-t border-b border-ink/10 py-8 text-center">
            <Eyebrow variant="light">{recognition.eyebrow}</Eyebrow>
            <p className="mt-3 text-[22px] font-light text-ink">{recognition.line}</p>
          </div>
        </Container>
      </div>

      {/* 10. Champion schools */}
      <ChampionSchools schools={gcseSchools} headline={championSchoolsHeadline} />

      {/* 11. FAQ */}
      <Faq headline={gcse.faq.heading} faqs={gcseFaqItems} />

      {/* 12. Closing CTA */}
      <div className="py-16 md:py-24 text-center">
        <Container>
          <SectionH2 variant="light" className="mx-auto">
            {gcse.closingCta.headingLine1}
            <br />
            <em className="text-accent">{gcse.closingCta.headingLine2}</em>
          </SectionH2>
          <div className="mt-8 flex justify-center">
            <RequestDemoButton className="focus-visible:ring-ink sm:w-auto" />
          </div>
        </Container>
      </div>
    </>
  );
}

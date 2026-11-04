import Image from "next/image";
import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import { Eyebrow } from "@/components/home/SectionHeading";
import { gcse, SHOW_GCSE_QUOTE } from "@/content/gcse";
import GettingStarted from "@/components/gcse/GettingStarted";
import WhySchoolsChooseIt from "@/components/gcse/WhySchoolsChooseIt";
import CurriculumFitSection from "@/components/gcse/CurriculumFitSection";
import HowQualificationWorks from "@/components/gcse/HowQualificationWorks";
import ReadyToDeliver from "@/components/gcse/ReadyToDeliver";
import ProjectThemes from "@/components/gcse/ProjectThemes";
import QuoteBreak from "@/components/gcse/QuoteBreak";
import DemoTrigger from "@/components/demo/DemoTrigger";
import QuoteBand from "@/components/shared/QuoteBand";
import PlatformBand from "@/components/shared/PlatformBand";
import { withCriticalCurriculum } from "@/components/shared/CriticalCurriculumName";

export const metadata: Metadata = {
  title: "OxfordAQA International GCSE Global Skills Projects | 8billionideas",
  description:
    "A real qualification built on real projects, developed with OxfordAQA and delivered by 8billionideas.",
  alternates: { canonical: "/qualifications" },
};


function RequestDemoButton({ className = "" }: { className?: string }) {
  return (
    <DemoTrigger trackingLocation="gcse_hero" appearance="button" className={`w-full md:w-auto ${className}`}>
      Request a demo
    </DemoTrigger>
  );
}

export default function GcsePage() {
  const { hero, platform } = gcse;

  return (
    <>
      {/* 01. Hero */}
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
          className="absolute inset-0 hidden xl:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(22,33,61,0.95) 0%, rgba(22,33,61,0.8) 35%, rgba(22,33,61,0.3) 60%, rgba(22,33,61,0) 80%)",
          }}
          aria-hidden="true"
        />
        {/* 1024–1279px: the text covers more of the photo, so the fade reaches a little further. */}
        <div
          className="absolute inset-0 hidden lg:block xl:hidden"
          style={{
            background:
              "linear-gradient(90deg, rgba(22,33,61,0.95) 0%, rgba(22,33,61,0.85) 40%, rgba(22,33,61,0.5) 65%, rgba(22,33,61,0) 85%)",
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
            {withCriticalCurriculum(hero.subline)}
          </p>
          <div className="mt-8">
            <RequestDemoButton />
          </div>
        </Container>
      </section>

      {/* 02. Curriculum fit */}
      <CurriculumFitSection />

      {/* Quote band (the homepage band's component). Photo and navy, so no divider either side. */}
      <QuoteBand
        quote="When we introduced the Global Skills Project at DBS Emirates Hills, the response from parents and students was incredible. Families immediately understood the value of developing these essential skills while working towards a recognised GCSE. With the large majority of our Year 9 students signing up to complete the GCSE qualification, the enthusiasm has been overwhelming. Seeing students so engaged in their learning, exploring their own interests has been fantastic. Our collaboration with 8billionideas, alongside their resources and hands-on support, helped us move quickly from the initial idea to launching the qualification, bringing our vision to life in a short space of time."
        name="Julia Maltby"
        role="Deputy Head of Secondary, DBS Emirates Hills"
      />

      {/* 03. How the qualification works */}
      <HowQualificationWorks />

      {/* Project themes: a navy header band (so no divider above) and two project rows. */}
      <ProjectThemes />

      {/* 04. Ready to deliver */}
      <ReadyToDeliver />

      {/* SECTION 05: quote break (PLACEHOLDER quote, see SHOW_GCSE_QUOTE in src/content/gcse.ts).
          When it's switched off, a thin divider separates the two dark sections (04 and 06). */}
      {SHOW_GCSE_QUOTE ? (
        <QuoteBreak />
      ) : (
        <div className="h-px w-full bg-ink" aria-hidden="true">
          <div className="h-full bg-white/10" />
        </div>
      )}

      {/* 06. The platform (shared with /curriculum's lesson platform band). Band colour
          sampled from the annotated image's left and right edges (#010e2a). */}
      <PlatformBand
        background="#010e2a"
        eyebrow={platform.eyebrow}
        headingLine1={platform.headingLine1}
        headingLine2={platform.headingLine2}
        body={platform.body}
        audiences={platform.audiences}
        image={platform.image}
      >
        {platform.showPlatformVideo && (
          <div className="mt-10">
            <DemoTrigger trackingLocation="gcse_platform" appearance="button" arrow={false}>
              See the platform
            </DemoTrigger>
            <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-2xl border-2 border-accent/40 bg-white/5" />
          </div>
        )}
      </PlatformBand>

      {/* 07. Getting started */}
      <GettingStarted />

      <div className="h-px w-full bg-ink/[0.08]" aria-hidden="true" />

      {/* 09. Why schools choose it */}
      <WhySchoolsChooseIt />
    </>
  );
}

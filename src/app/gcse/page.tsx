import Image from "next/image";
import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import { Eyebrow } from "@/components/home/SectionHeading";
import { gcse } from "@/content/gcse";
import { PILLARS, type PillarName } from "@/content/curriculumMapping";
import PillarQuestionSelector from "@/components/gcse/PillarQuestionSelector";
import GettingStarted from "@/components/gcse/GettingStarted";
import WhySchoolsChooseIt from "@/components/gcse/WhySchoolsChooseIt";
import CurriculumFitSection from "@/components/gcse/CurriculumFitSection";
import HowQualificationWorks from "@/components/gcse/HowQualificationWorks";
import ReadyToDeliver from "@/components/gcse/ReadyToDeliver";
import DemoTrigger from "@/components/demo/DemoTrigger";

export const metadata: Metadata = {
  title: "OxfordAQA International GCSE Global Skills Projects | 8billionideas",
  description:
    "A real qualification built on real projects, developed with OxfordAQA and delivered by 8billionideas.",
};


function RequestDemoButton({ className = "" }: { className?: string }) {
  return (
    <DemoTrigger appearance="button" className={`w-full md:w-auto ${className}`}>
      Request a demo
    </DemoTrigger>
  );
}

export default function GcsePage() {
  const { hero, projectThemes, platform } = gcse;
  const orderedPillars = [...projectThemes.pillars].sort(
    (x, y) => PILLARS.indexOf(x.name as PillarName) - PILLARS.indexOf(y.name as PillarName)
  );

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
          {/* Reassurance points: a row from md (kept within the darker left side of the image),
              stacked on mobile. */}
          <ul className="mt-10 grid max-w-[760px] list-none grid-cols-1 gap-6 p-0 md:grid-cols-3">
            {hero.points.map((point) => (
              <li key={point.number}>
                <p className="text-[14px] leading-[1.4] text-accent">{point.number}</p>
                <p className="mt-1 text-[16px] font-medium leading-[1.35] text-white">{point.title}</p>
                <p className="mt-1 text-[14px] leading-[1.5] text-white/75">{point.line}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <RequestDemoButton />
          </div>
        </Container>
      </section>

      {/* 02. Curriculum fit */}
      <CurriculumFitSection />

      {/* Thin divider between the two light sections. */}
      <div className="h-px w-full bg-ink/[0.08]" aria-hidden="true" />

      {/* 03. How the qualification works */}
      <HowQualificationWorks />

      <div className="h-px w-full bg-ink/[0.08]" aria-hidden="true" />

      {/* Project themes */}
      <section className="relative isolate bg-paper">
        {/* Height = text + 56px, or the brief image (capped at 430px) if that's taller, so the
            pills sit just below the text without running into the document. */}
        <div className="relative xl:min-h-[min(28.97vw,430px)]">
          {/* Contained in a right-hand box (not cover) so the brief stays clear of the text;
              the mask fades its cut edges into the paper. */}
          <div
            className="absolute top-0 right-0 hidden aspect-[2057/764] max-h-[430px] w-[78%] mix-blend-multiply xl:block"
            style={{
              maskImage:
                "linear-gradient(to bottom, black 62%, transparent 100%), linear-gradient(to right, transparent 0%, black 14%)",
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
          >
            <Image
              src={projectThemes.image.src}
              alt={projectThemes.image.alt}
              fill
              loading="lazy"
              sizes="78vw"
              className="object-cover object-[right_top]"
            />
          </div>
          <div
            className="absolute inset-0 hidden xl:block"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,253,250,0.95) 0%, rgba(255,253,250,0.8) 35%, rgba(255,253,250,0) 55%)",
            }}
            aria-hidden="true"
          />
          <Container className="relative z-10 pt-16 md:pt-24 xl:pb-14">
            <div className="max-w-[640px] text-left">
              <p className="text-[12px] uppercase tracking-[0.25em] text-ink/60">{projectThemes.eyebrow}</p>
              <h2 className="mt-4 text-balance text-[36px] font-light leading-[1.1] tracking-[-0.01em] text-ink md:text-[56px]">
                {projectThemes.headingLine1}
                <br />
                <em className="text-accent">{projectThemes.headingLine2}</em>
              </h2>
              <p className="mt-5 max-w-[540px] text-[18px] leading-[1.6] text-ink/70">{projectThemes.intro}</p>
            </div>
          </Container>
          <div className="relative mt-8 aspect-[4/3] w-full mix-blend-multiply md:mt-14 xl:hidden">
            <Image
              src={projectThemes.image.src}
              alt={projectThemes.image.alt}
              fill
              loading="lazy"
              sizes="100vw"
              className="object-cover object-[right_top]"
            />
          </div>
        </div>

        <Container className="relative z-10 mt-8 md:mt-14 xl:mt-0">
          <PillarQuestionSelector
            pillars={orderedPillars}
            eyebrow={projectThemes.firstYearEyebrow}
            label={projectThemes.questionLabel}
          />
        </Container>

        {/* Second year band. Background is the globe image's own mint so there is no seam. */}
        <div className="relative isolate mt-16 flex items-center overflow-hidden bg-[#F0F5F1] py-16 xl:min-h-[360px] xl:py-0">
          {/* The source crops the globe flat at its top edge; the mask fades that edge into the mint. */}
          <div
            className="absolute inset-0 opacity-30 xl:opacity-100"
            style={{ maskImage: "linear-gradient(to bottom, transparent 12%, black 45%)" }}
            aria-hidden="true"
          >
            <Image
              src={projectThemes.globeImage}
              alt=""
              aria-hidden="true"
              fill
              loading="lazy"
              sizes="100vw"
              className="object-cover object-right xl:object-contain xl:object-[right_bottom]"
            />
          </div>
          <Container className="relative z-10 w-full">
            <div className="max-w-[560px] text-left xl:py-16">
              <p className="text-[12px] uppercase tracking-[0.25em] text-ink/60">{projectThemes.secondYear.eyebrow}</p>
              <h3 className="mt-4 text-[34px] font-light leading-[1.1] tracking-[-0.01em] text-ink md:text-[44px]">
                {projectThemes.secondYear.title}
              </h3>
              <p className="mt-2 text-[22px] font-light italic leading-[1.3] text-[#1A9E74] md:text-[28px]">
                {projectThemes.secondYear.subtitle}
              </p>
              <p className="mt-5 text-[18px] leading-[1.6] text-ink/70">{projectThemes.secondYear.line}</p>
            </div>
          </Container>
        </div>
      </section>


      {/* 04. Ready to deliver */}
      <ReadyToDeliver />

      {/* SECTION 05: quote / white break, awaiting approved quote */}
      {/* Until then, a thin divider separates the two dark sections (04 and 06). */}
      <div className="h-px w-full bg-ink" aria-hidden="true">
        <div className="h-full bg-white/10" />
      </div>

      {/* 06. The platform */}
      {/* Band colour sampled from the image's left side so the stacked image has no seam. */}
      <section className="relative isolate overflow-hidden bg-[#051739] xl:flex xl:min-h-[640px] xl:items-center">
        {/* Contained (not cover) so the laptop stays clear of the text; the photo's flat
            navy edges blend into the band, and the mask softens the lit desk reflection. */}
        <div
          className="absolute top-1/2 right-0 hidden aspect-[1862/845] max-h-full w-[78%] -translate-y-1/2 xl:block"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)",
          }}
        >
          <Image
            src={platform.image.src}
            alt={platform.image.alt}
            fill
            loading="lazy"
            sizes="78vw"
            className="object-contain object-right"
          />
        </div>
        <div
          className="absolute inset-0 hidden xl:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(22,33,61,0.9) 0%, rgba(22,33,61,0.6) 35%, rgba(22,33,61,0) 55%)",
          }}
          aria-hidden="true"
        />
        <Container className="relative z-10 w-full py-16 md:py-24">
          <div className="max-w-[620px] text-left">
            <p className="text-[12px] uppercase tracking-[0.25em] text-white/65">{platform.eyebrow}</p>
            <h2 className="mt-4 text-balance text-[36px] font-light leading-[1.1] tracking-[-0.01em] text-white md:text-[56px]">
              {platform.headingLine1}
              <br />
              <em className="text-accent">{platform.headingLine2}</em>
            </h2>
            <p className="mt-5 text-[18px] leading-[1.6] text-white/80">{platform.body}</p>

            {/* For teachers / For students: side by side from md, stacked below. */}
            <ul className="mt-10 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2">
              {platform.audiences.map((audience) => (
                <li key={audience.title} className="rounded-[10px] border border-white/40 p-6">
                  <h3 className="text-[18px] font-medium leading-[1.35] text-white">{audience.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.6] text-white/80">{audience.text}</p>
                </li>
              ))}
            </ul>

            {platform.showPlatformVideo && (
              <div className="mt-10">
                <DemoTrigger appearance="button" arrow={false}>
                  See the platform
                </DemoTrigger>
                <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-2xl border-2 border-accent/40 bg-white/5" />
              </div>
            )}
          </div>
        </Container>
        <div className="relative aspect-video w-full xl:hidden">
          <Image
            src={platform.image.src}
            alt={platform.image.alt}
            fill
            loading="lazy"
            sizes="100vw"
            className="object-cover object-right"
          />
        </div>
      </section>

      {/* 07. Getting started */}
      <GettingStarted />

      <div className="h-px w-full bg-ink/[0.08]" aria-hidden="true" />

      {/* 09. Why schools choose it */}
      <WhySchoolsChooseIt />
    </>
  );
}

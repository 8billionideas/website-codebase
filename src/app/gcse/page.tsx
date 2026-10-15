import Image from "next/image";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
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
            {hero.subline}
          </p>
          <div className="mt-8">
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

      {/* 06. The platform */}
      {/* Band colour sampled from the image's left side so the stacked image has no seam. */}
      <section className="@container relative isolate overflow-hidden bg-[#051739] xl:flex xl:min-h-[640px] xl:items-center">
        {/* The dashboard mock-up (1672×941). Its laptop and panel fill x 25.7–92.6% and
            y 14.4–89% of the image; around them is a lit dark-blue background (#000a1b to
            #061f44 at the edges, with a desk reflection below), so all four edges fade out
            inside that margin and no rectangle shows against the band (#051739).
            From xl the device starts 40px after the 620px text column and ends 24px from the
            screen edge (at most 640px wide), vertically centred. */}
        <div
          className="absolute top-1/2 hidden aspect-[1672/941] -translate-y-1/2 xl:block"
          style={
            {
              "--device-left": "calc(max(0px, (100cqw - 75rem) / 2) + 3rem + 660px)",
              "--image-width": "calc(min(640px, 100cqw - var(--device-left) - 24px) / 0.6698)",
              width: "var(--image-width)",
              left: "calc(var(--device-left) - var(--image-width) * 0.2566)",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 22%, black 94%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 13%, black 88%, transparent 100%)",
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            } as CSSProperties
          }
        >
          <Image
            src={platform.image.src}
            alt={platform.image.alt}
            fill
            loading="lazy"
            sizes="(min-width: 1280px) 960px, 100vw"
            className="object-contain"
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
        {/* Below xl: under the text at full width. The image is drawn at 125% and centred on
            the device (so it fills about 84% of the width), with the same soft edge fades. */}
        <div
          className="relative aspect-[100/66] w-full overflow-hidden xl:hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 7%, black 93%, transparent 100%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        >
          <div className="absolute aspect-[1672/941] w-[125%]" style={{ left: "-23.9%", top: "-5.1%" }}>
            <Image
              src={platform.image.src}
              alt={platform.image.alt}
              fill
              loading="lazy"
              sizes="125vw"
              className="object-contain"
            />
          </div>
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

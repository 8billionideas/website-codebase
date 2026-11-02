import Image from "next/image";

import Container from "@/components/layout/Container";
import { home } from "@/content/home";
import DemoTrigger from "@/components/demo/DemoTrigger";
import { withCriticalCurriculum } from "@/components/shared/CriticalCurriculumName";

// Splits a heading line after its first n words (for the desktop-only line breaks).
function splitAfter(text: string, n: number): [string, string] {
  const words = text.split(" ");
  return [words.slice(0, n).join(" "), words.slice(n).join(" ")];
}

export default function Hero() {
  const { headlineLine1, headlineLine2, subhead } = home.hero;
  // From xl (1280px) the heading sits on three balanced lines: "Working alongside" / "schools to
  // shape the" / "future of learning", the green italic starting at "shape". Below xl it keeps its
  // two-part break and wraps naturally.
  const [line1Start, line1End] = splitAfter(headlineLine1, 2);
  const [line2Start, line2End] = splitAfter(headlineLine2, 2);

  return (
    <section className="relative flex min-h-[560px] items-center overflow-hidden md:min-h-[640px]">
      <Image
        src="/images/hero-students.webp"
        alt="Secondary students discussing a project around a classroom table"
        fill
        priority
        sizes="100vw"
        quality={85}
        className="object-cover object-[70%_center] lg:object-right"
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
            "linear-gradient(90deg, rgba(22,33,61,0.95) 0%, rgba(22,33,61,0.85) 35%, rgba(22,33,61,0.35) 60%, rgba(22,33,61,0) 80%)",
        }}
        aria-hidden="true"
      />
      {/* 1024–1279px: the paragraph covers more of the photo, so the fade reaches further. */}
      <div
        className="absolute inset-0 hidden lg:block xl:hidden"
        style={{
          background:
            "linear-gradient(90deg, rgba(22,33,61,0.95) 0%, rgba(22,33,61,0.88) 50%, rgba(22,33,61,0.6) 70%, rgba(22,33,61,0) 92%)",
        }}
        aria-hidden="true"
      />
      <Container className="relative z-10 w-full py-16 text-left md:py-20">
        <h1 className="max-w-[620px] text-display font-light text-white text-balance">
          {line1Start}
          <br className="hidden xl:inline" /> {line1End}
          <br className="xl:hidden" />{" "}
          {/* 768–1279px: the green line is balanced on its own, so "learning" isn't left alone. */}
          <em className="text-accent md:max-xl:inline-block md:max-xl:text-balance">
            {line2Start}
            <br className="hidden xl:inline" /> {line2End}
          </em>
        </h1>
        {/* 560px from xl keeps the line ends over the dark part of the fade (at 620px they reached
            the brighter photo, dropping contrast to ~2.7:1). */}
        <p className="mt-6 max-w-[620px] text-[18px] leading-[1.6] text-white/85 xl:max-w-[560px]">{withCriticalCurriculum(subhead)}</p>
        <div className="mt-8">
          <DemoTrigger trackingLocation="hero" appearance="button" className="w-full md:w-auto">
            Request a demo
          </DemoTrigger>
        </div>
      </Container>
    </section>
  );
}

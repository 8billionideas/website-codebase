import type { Metadata } from "next";
import Image from "next/image";

import Container from "@/components/layout/Container";
import OurStorySection from "@/components/about/OurStorySection";
import TrustSection from "@/components/about/TrustSection";
import WorkWithUsSection from "@/components/about/WorkWithUsSection";

export const metadata: Metadata = {
  title: "About Us | 8billionideas",
  description:
    "Our mission is to give every student on the planet the skills and belief to change the world.",
  alternates: { canonical: "/about" },
};


// hero-v2 (1942×809, soft focus, already faded to white on the left). The earlier hero is kept.
const HERO_IMAGE = {
  src: "/images/about/hero-v2.webp",
  alt: "Colleagues smiling and working together around a table in a bright, plant-filled office",
};

const WHY_WE_CARE_COLUMNS = [
  "Young people spend years learning what they need to know, but we believe being ready for the world takes more than knowledge. It takes confidence to speak up, judgement to make decisions, resilience when things go wrong and the belief that you can make something happen.",
  "Those things can be harder to teach, harder to timetable and harder to measure, which means they can too easily be treated as extras. We've never believed they are. For us, they are a fundamental part of what education should give every young person.",
];

// The previous sets (why-we-care-1 to -4 and why-we-care-v2-1 to -4) are kept in
// public/images/about as backups. position: object-position classes chosen so each presenter
// stays in frame at every tile shape (wide on desktop, 4/3 on mobile, near-square on tablet).
const WHY_WE_CARE_PHOTOS: { src: string; alt: string; position?: string }[] = [
  {
    src: "/images/about/why-we-care-v3-1.webp",
    alt: "A member of the 8billionideas team leading a lesson with young students sitting on the classroom floor",
    position: "object-[38%_center]",
  },
  {
    // Portrait: the presenter is low on the left, below the slide.
    src: "/images/about/why-we-care-v3-2.webp",
    alt: "A member of the 8billionideas team presenting on stage at a school event",
    position: "object-[20%_75%]",
  },
  {
    // Portrait: the presenter stands on the right, head at about 20% from the top.
    src: "/images/about/why-we-care-v3-3.webp",
    alt: "A member of the 8billionideas team presenting the Tech Toolkit to a class",
    position: "object-[70%_30%]",
  },
  {
    src: "/images/about/why-we-care-v3-4.webp",
    alt: "8billionideas founder David Harkin speaking to secondary students in a school theatre",
    position: "object-[25%_center]",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="relative isolate overflow-hidden bg-paper xl:flex xl:min-h-[560px] xl:items-center">
        {/* Desktop: the photo full width, sized by the width (not the hero's height, which would
            push the people left under the text at 1280px), right centre, multiplied into the paper.
            It's already faded to white on the left, where the text sits, and the paper gradient
            below softens it further; soft top and bottom fades hide its edges where it's shorter
            than the hero. */}
        <div
          className="absolute inset-x-0 top-1/2 hidden aspect-[1942/809] w-full -translate-y-1/2 mix-blend-multiply xl:block"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
          }}
        >
          <Image
            src={HERO_IMAGE.src}
            alt={HERO_IMAGE.alt}
            fill
            preload
            sizes="100vw"
            quality={85}
            className="object-cover object-[right_center]"
          />
        </div>
        <div
          className="absolute inset-0 hidden xl:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,253,250,0.95) 0%, rgba(255,253,250,0.85) 38%, rgba(255,253,250,0) 55%)",
          }}
          aria-hidden="true"
        />
        <Container className="relative z-10 w-full py-14 md:py-20 xl:py-24">
          <div className="max-w-[560px] text-left">
            <p className="text-[12px] uppercase tracking-[0.25em] text-accent">ABOUT 8BILLIONIDEAS</p>
            <h1 className="mt-4 text-balance text-[32px] font-light leading-[1.15] tracking-[-0.01em] text-ink md:text-[48px]">
              We believe education should prepare students for the world they&apos;re actually going into
            </h1>
            <p className="mt-6 text-[17px] leading-[1.6] text-ink/70">
              We&apos;re a team of educators, creators and people who care deeply about what happens to
              young people beyond the classroom, and everything we build comes back to giving them more
              of the skills, confidence and experiences they&apos;ll need to shape whatever comes next.
            </p>
          </div>
        </Container>
        {/* Tablet and mobile: stacked, photo below the text. */}
        <div className="relative aspect-[16/10] w-full mix-blend-multiply xl:hidden">
          <Image
            src={HERO_IMAGE.src}
            alt={HERO_IMAGE.alt}
            fill
            loading="eager"
            sizes="100vw"
            quality={85}
            className="object-cover object-right"
          />
        </div>
      </section>

      {/* 2. Mission band (ink) */}
      <section className="bg-ink py-section">
        <Container>
          {/* Centred on purpose, for this band only. */}
          <p className="text-center text-[12px] uppercase tracking-[0.25em] text-accent">OUR MISSION</p>
          <h2 className="mx-auto mt-eyebrow text-balance text-center text-[32px] font-light leading-[1.3] tracking-[-0.01em] text-white md:text-[52px]">
            Give every student on the planet the{" "}
            <em className="text-accent">skills, belief and values</em> to change the world.
          </h2>
        </Container>
      </section>

      {/* 3. Why we care */}
      <section className="bg-paper py-section">
        <Container>
          <p className="text-[12px] uppercase tracking-[0.25em] text-accent">WHY WE CARE</p>
          <h2 className="mt-eyebrow max-w-[1000px] text-balance text-[32px] font-light leading-[1.15] tracking-[-0.01em] text-ink md:text-[52px]">
            We care about the parts of education
            <br />
            <em className="text-accent">that are hardest to measure</em>
          </h2>

          {/* Two equal columns with a centred hairline between them from md. */}
          <div className="relative mt-content grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-16">
            <div
              className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-ink/12 md:block"
              aria-hidden="true"
            />
            {WHY_WE_CARE_COLUMNS.map((text) => (
              <p key={text.slice(0, 20)} className="max-w-[520px] text-[18px] leading-[1.7] text-ink/75">
                {text}
              </p>
            ))}
          </div>
        </Container>

        {/* Photo strip — edge to edge; the 4px gaps show the paper. 2×2 on mobile. */}
        <div className="mt-12 grid grid-cols-2 gap-1 md:mt-[72px] md:grid-cols-4">
          {WHY_WE_CARE_PHOTOS.map((photo) => (
            <div key={photo.src} className="relative aspect-[4/3] md:aspect-auto md:h-[200px] lg:h-[260px]">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                loading="lazy"
                sizes="(min-width: 768px) 25vw, 50vw"
                className={`object-cover ${photo.position ?? "object-center"}`}
              />
            </div>
          ))}
        </div>

        {/* Closing statement — centred on purpose, for this line only. */}
        <Container className="mt-12 text-center md:mt-[72px]">
          {/* 1000px max so each half fits on one line at 36px (985px / 920px); 32px on tablet. */}
          <p className="mx-auto max-w-[1000px] text-balance text-[24px] font-light leading-[1.3] tracking-[-0.01em] text-ink md:text-[32px] xl:text-[36px]">
            <span className="md:block">We want students to leave school not just knowing more</span>{" "}
            <em className="text-accent md:block">but believing they can do more with what they know</em>
          </p>
          <div className="mx-auto mt-6 h-0.5 w-12 bg-accent" aria-hidden="true" />
        </Container>
      </section>

      {/* The next section is also on paper, so a hairline separates them. */}
      <div className="h-px w-full bg-ink/[0.08]" aria-hidden="true" />

      {/* 4. Our story */}
      <OurStorySection />

      {/* Our story ends on navy (chapter 06), so no divider before the trust section's mint top. */}
      {/* 5. Trust: mint top part (stats, champion schools) and the ink testimonial band.
          Paper follows the ink band, so no divider after it. */}
      <TrustSection />

      {/* 6. What it's like to work with us (paper). It follows the trust section's ink testimonial
          band and is followed by the shared dark "Book a demonstration" band, so no dividers. */}
      <WorkWithUsSection />
    </>
  );
}

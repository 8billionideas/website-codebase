import type { Metadata } from "next";
import Image from "next/image";

import Container from "@/components/layout/Container";
import { Eyebrow, SectionBody, SectionH2 } from "@/components/home/SectionHeading";

export const metadata: Metadata = {
  title: "About Us | 8billionideas",
  description:
    "Our mission is to give every student on the planet the skills and belief to change the world.",
};


const timeline: { year: string; text?: string; placeholder?: boolean }[] = [
  {
    year: "2021",
    text: "In the wake of the pandemic, a survey of more than 1,000 parents revealed that over a third felt their college-age children were ill-prepared for professional life. 8billionideas was created to meet the needs of thousands of students and educators worldwide.",
  },
  {
    year: "2022",
    text: "We reached over 150,000 students and launched the Future Jobs Kit, a free resource designed to equip students with the skills and knowledge required for the jobs of tomorrow.",
  },
  {
    year: "2023",
    text: "We formed a strategic partnership with APEX2100 to introduce Perform Better, the best performance programme, to students worldwide.",
  },
  {
    year: "2024",
    text: "We reached 350 schools and over half a million students, and created nearly 400 pieces of in-house content.",
  },
  { year: "2025", placeholder: true },
  {
    year: "Today",
    text: "Over 1 million students reached across 350+ schools worldwide.",
  },
];

const recognitions = [
  "The History of Parliament Trust",
  "British Schools in the Middle East",
  "Council of British International Schools",
  "Times Education Supplement (TES)",
  "Edufuturist Awards",
];

const givingBack = [
  {
    title: "KYGN",
    text: "A Tanzanian organisation improving educational opportunities for young girls in the Kilimanjaro Region. We've supported KYGN's work for several years.",
  },
  {
    title: "Lions ROAR",
    text: "Our partnership with Lions Club International has reached 25,000+ students through ROAR, a primary programme building future-proof skills in line with the national curriculum and PSHE education.",
  },
  {
    title: "African Promise",
    text: "A charity improving the quality of education in rural Kenyan primary schools. We've raised over £11,500, with our team running three marathons so far.",
  },
];

const HERO_IMAGE = {
  src: "/images/about/hero.webp",
  alt: "Members of the 8billionideas team talking and laughing together around a table",
};

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="relative isolate overflow-hidden bg-paper xl:flex xl:min-h-[560px] xl:items-center">
        {/* Desktop: the photo sits in a right-hand box rather than full-bleed cover, so all four
            people stay clear of the text; its cut edges fade into the paper. */}
        <div
          className="absolute top-1/2 right-0 hidden aspect-[1923/818] w-[64%] -translate-y-1/2 mix-blend-multiply xl:block"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%), linear-gradient(to right, transparent 0%, black 12%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        >
          <Image
            src={HERO_IMAGE.src}
            alt={HERO_IMAGE.alt}
            fill
            preload
            sizes="64vw"
            quality={85}
            className="object-cover object-right"
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
      <section className="bg-ink py-14 md:py-20">
        <Container>
          <p className="text-[12px] uppercase tracking-[0.25em] text-accent">OUR MISSION</p>
          <h2 className="mt-5 max-w-[1100px] text-balance text-[32px] font-light leading-[1.2] tracking-[-0.01em] text-white md:text-[52px]">
            Give every student on the planet the{" "}
            <em className="text-accent">skills, belief and values</em> to change the world.
          </h2>
          <div className="mt-8 h-px w-20 bg-white/15" aria-hidden="true" />
          <p className="mt-6 text-[17px] leading-[1.6] text-white/75">
            We have partnered with over 350 schools. Small to big. Cross-curriculum. Globally.
          </p>
        </Container>
      </section>

      <div className="bg-paper py-16 md:py-24">
        <Container>
          {/* 3. Our story */}
          <Eyebrow variant="light">HISTORY</Eyebrow>
          <SectionH2 variant="light" className="mt-4">
            We&apos;ve come
            <br />
            <em className="text-accent">so far.</em>
          </SectionH2>

          <div className="mt-12 space-y-12 border-l border-accent pl-8">
            {timeline.map((entry) => (
              <div key={entry.year} className="relative">
                <span
                  className="absolute left-0 top-1.5 h-2 w-2 -translate-x-1/2 rounded-full bg-accent"
                  aria-hidden="true"
                />
                <p className="text-[32px] font-light text-ink">{entry.year}</p>
                {entry.placeholder ? (
                  <div className="mt-3 max-w-[640px] rounded-2xl border-2 border-dashed border-ink/20 bg-surface p-6">
                    <p className="text-[18px] italic leading-[1.6] text-muted">
                      Details to come.
                    </p>
                  </div>
                ) : (
                  <p className="mt-3 max-w-[640px] text-[18px] leading-[1.6] text-ink/75">
                    {entry.text}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* 4. Why we exist */}
          <div className="mt-20 md:mt-28">
            <SectionH2 variant="light">
              Education hasn&apos;t kept pace with the world
              <br />
              <em className="text-accent">students are entering</em>
            </SectionH2>
            <SectionBody variant="light" className="mt-5 max-w-[640px]">
              Schools want to teach the skills students will actually need,
              like thinking critically, managing money and working with
              others, but don&apos;t have the time to build it themselves. So
              we built it for them: a flexible, ready-to-teach curriculum that
              fits around what each school already does.
            </SectionBody>
          </div>

          {/* 5. Student quote */}
          <div className="mt-20 text-center md:mt-28">
            <div className="mx-auto h-px w-16 bg-accent" aria-hidden="true" />
            <p className="mx-auto mt-8 max-w-3xl text-[22px] font-light italic leading-[1.4] text-ink md:text-[28px]">
              &ldquo;It definitely helped with team work skills and presenting
              skills because it was something I had no interest in before, I
              always avoided it.&rdquo;
            </p>
            <p className="mt-6 text-[12px] uppercase tracking-[0.25em] text-ink/55">
              YEAR 11 STUDENT · THE INTERNSHIP PROGRAMME
            </p>
          </div>

          {/* 6. Recognitions */}
          <div className="mt-20 md:mt-28">
            <Eyebrow variant="light">RECOGNITIONS</Eyebrow>
            <SectionH2 variant="light" className="mt-4">
              A company with
              <br />
              <em className="text-accent">credentials.</em>
            </SectionH2>
            <SectionBody variant="light" className="mt-5 max-w-[640px]">
              We&apos;ve been recognised by organisations both inside and
              outside of the education sector for our forward-thinking
              approach and creation of unique learning experiences.
            </SectionBody>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {recognitions.map((name) => (
                <div
                  key={name}
                  className="flex items-center justify-center rounded-2xl border border-ink/10 p-6 text-center"
                >
                  <p className="text-[16px] font-normal text-ink">{name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 7. Giving back */}
          <div className="mt-20 md:mt-28">
            <Eyebrow variant="light">CORPORATE RESPONSIBILITY</Eyebrow>
            <SectionH2 variant="light" className="mt-4">
              We believe in giving back
              <br />
              <em className="text-accent">for education.</em>
            </SectionH2>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {givingBack.map(({ title, text }) => (
                <div key={title} className="rounded-2xl border border-ink/10 p-8">
                  <p className="text-body-lg text-ink">{title}</p>
                  <p className="mt-2 text-body text-muted">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

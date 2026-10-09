import Container from "@/components/layout/Container";
import { Eyebrow, SectionBody, SectionH2 } from "@/components/home/SectionHeading";

// Sections removed from /about (Oct 2026) but kept, unchanged, for possible reuse.
// Nothing renders these at the moment.

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

export function StudentQuote() {
  return (
    <div className="text-center">
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
  );
}

export function RecognitionsSection() {
  return (
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
  );
}

export function GivingBackSection() {
  return (
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
  );
}

// The original /about block, with all three in order on paper.
export default function AboutLegacySections() {
  return (
    <div className="bg-paper py-16 md:py-24">
      <Container>
        <StudentQuote />
        <RecognitionsSection />
        <GivingBackSection />
      </Container>
    </div>
  );
}

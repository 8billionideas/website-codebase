import Container from "@/components/layout/Container";
import { howLearningWorks } from "@/content/skills";

// Full-width ink band between homepage Sections 3 and 4 (no section number).
export default function HowLearningWorks() {
  const { eyebrow, headingLine1, headingLine2, stages } = howLearningWorks;

  return (
    <section className="relative isolate overflow-hidden bg-ink py-section">
      {/* Large, very faint ring partly off the right edge (decorative). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -right-[360px] -z-10 hidden h-[900px] w-[900px] -translate-y-1/2 rounded-full border-[80px] border-white/[0.04] md:block"
      />
      <Container>
        <p className="text-[12px] uppercase tracking-[0.25em] text-accent">{eyebrow}</p>
        <h2 className="mt-eyebrow max-w-[1100px] text-balance text-[32px] font-light leading-[1.15] tracking-[-0.01em] text-white md:text-[52px]">
          {headingLine1}
          <br />
          <em className="text-accent">{headingLine2}</em>
        </h2>

        {/* The four areas of learning: white cards, 2×2 from md, one column below. */}
        <ul className="mt-content grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2 md:gap-6">
          {stages.map((stage) => (
            <li key={stage.title} className="rounded-xl border border-ink/10 bg-white p-6 md:p-8">
              {/* The darker green: accent green fails contrast on white at this size. */}
              <p className="text-[14px] font-medium leading-[1.4] text-[#0E7C5A]">{stage.number}</p>
              <h3 className="mt-3 text-[24px] font-normal leading-[1.25] text-ink">{stage.title}</h3>
              <p className="mt-3 max-w-[480px] text-[17px] leading-[1.6] text-ink/70">{stage.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

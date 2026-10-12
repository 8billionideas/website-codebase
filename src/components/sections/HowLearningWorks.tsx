import Container from "@/components/layout/Container";
import { howLearningWorks } from "@/content/skills";

// Full-width ink band between homepage Sections 3 and 4 (no section number).
export default function HowLearningWorks() {
  const { eyebrow, headingLine1, headingLine2, stages } = howLearningWorks;

  return (
    <section className="relative isolate overflow-hidden bg-ink py-16 md:py-24">
      {/* Large, very faint ring partly off the right edge (decorative). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -right-[360px] -z-10 hidden h-[900px] w-[900px] -translate-y-1/2 rounded-full border-[80px] border-white/[0.04] md:block"
      />
      <Container>
        <p className="text-[12px] uppercase tracking-[0.25em] text-accent">{eyebrow}</p>
        <h2 className="mt-4 max-w-[1100px] text-balance text-[32px] font-light leading-[1.15] tracking-[-0.01em] text-white md:text-[52px]">
          {headingLine1}
          <br />
          <em className="text-accent">{headingLine2}</em>
        </h2>

        <ul className="mt-14 grid list-none grid-cols-1 gap-8 p-0 md:grid-cols-3 md:gap-12">
          {stages.map((stage) => (
            <li key={stage.title}>
              <div className="flex items-center" aria-hidden="true">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
                <span className="h-px flex-1 bg-white/25" />
              </div>
              <h3 className="mt-5 text-[24px] font-normal leading-[1.25] text-white">{stage.title}</h3>
              <p className="mt-3 max-w-[380px] text-[17px] leading-[1.6] text-white/70">{stage.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

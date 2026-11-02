import { ArrowRight } from "lucide-react";
import Container from "@/components/layout/Container";
import { gcse } from "@/content/gcse";

// /gcse 02: "Works with the curriculum you already follow" – the curricula it sits alongside
// and the three routes into the qualification.
export default function CurriculumFitSection() {
  const { eyebrow, headingLine1, headingLine2, intro, curricula, routesHeading, foundation, routes, closingLead, closingRest, closingNote } =
    gcse.curriculumFit;

  return (
    <section className="bg-paper py-section">
      <Container>
        <p className="text-[12px] uppercase tracking-[0.25em] text-accent">{eyebrow}</p>
        <h2 className="mt-eyebrow text-balance text-[36px] font-light leading-[1.1] tracking-[-0.01em] text-ink md:text-[56px]">
          {headingLine1}
          <br />
          <em className="text-accent">{headingLine2}</em>
        </h2>
        <p className="mt-lead max-w-[760px] text-[18px] leading-[1.6] text-ink/70">{intro}</p>

        {/* Labels, not links. */}
        <ul className="mt-content flex list-none flex-wrap gap-2 p-0">
          {curricula.map((name) => (
            <li key={name} className="rounded-md border border-ink/25 px-7 py-3 text-[16px] leading-[1.4] text-ink">
              {name}
            </li>
          ))}
        </ul>

        <h3 className="mt-12 text-[28px] font-light leading-[1.2] text-ink md:text-[36px]">{routesHeading}</h3>

        {/* Featured: the Foundation route. */}
        <div className="mt-6 rounded-[10px] bg-ink p-6 md:p-8">
          <p className="text-[12px] uppercase tracking-[0.25em] text-white">{foundation.label}</p>
          <p className="mt-3 max-w-[700px] text-[17px] leading-[1.6] text-white/85">{foundation.text}</p>
          {/* Desktop/tablet (md+): two equal tiles fill the card's inner width, with the arrow
              centred in a fixed 56px column between them; both tiles share the row's height.
              Mobile: stacked at full width, the arrow pointing down. */}
          <div className="mt-6 flex flex-col items-stretch gap-3 md:flex-row md:gap-0">
            <div className="flex flex-col justify-center rounded-md bg-white/15 px-8 py-[22px] md:flex-1 md:basis-0">
              <p className="text-[28px] font-normal leading-[1.2] text-white">{foundation.from.years}</p>
              <p className="mt-1 text-[15px] leading-[1.4] text-white/80">{foundation.from.name}</p>
            </div>
            <div className="flex shrink-0 items-center justify-center md:w-14">
              <ArrowRight
                className="h-6 w-6 rotate-90 text-white md:rotate-0"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>
            <div className="flex flex-col justify-center rounded-md bg-white px-8 py-[22px] md:flex-1 md:basis-0">
              <p className="text-[28px] font-normal leading-[1.2] text-ink">{foundation.to.years}</p>
              <p className="mt-1 text-[15px] leading-[1.4] text-ink/75">{foundation.to.name}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {routes.map((route) => (
            <div key={route.label} className="rounded-[10px] border border-ink/10 bg-white p-7">
              <p className="text-[12px] uppercase tracking-[0.25em] text-ink/70">{route.label}</p>
              <p className="mt-3 text-[32px] font-normal leading-[1.15] text-ink">{route.years}</p>
              <p className="mt-1 text-[17px] leading-[1.4] text-ink">{route.name}</p>
              <p className="mt-3 text-[15px] leading-[1.6] text-ink/65">{route.text}</p>
            </div>
          ))}
        </div>

        {/* One style for the whole line (no bold lead-in). */}
        <p className="mt-6 text-[17px] leading-[1.6] text-ink/60">
          {closingLead}
          {closingRest}
        </p>
        {/* PROVISIONAL – wording subject to Lyndsay's confirmation. Same style as the muted part
            of the closing line above. */}
        <p className="mt-2 text-[17px] leading-[1.6] text-ink/60">{closingNote}</p>
      </Container>
    </section>
  );
}

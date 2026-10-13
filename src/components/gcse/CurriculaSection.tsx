import { Check } from "lucide-react";
import Container from "@/components/layout/Container";
import { gcseCurricula, gcseCurriculaSection } from "@/content/gcse-curricula";

// /gcse: "Works with the curriculum you already follow". Sits between "How it works" (whose
// bottom hairline separates the two) and "Project themes" (this section's own bottom hairline).
export default function CurriculaSection() {
  const { eyebrow, headingLine1, headingLine2, line, reassurance, earlyLabel, standardLabel, closing } =
    gcseCurriculaSection;

  return (
    <section className="border-b border-ink/[0.08] bg-paper py-16 md:py-24">
      <Container>
        <p className="text-[12px] uppercase tracking-[0.25em] text-accent">{eyebrow}</p>
        <h2 className="mt-4 text-balance text-[34px] font-light leading-[1.1] tracking-[-0.01em] text-ink md:text-[56px]">
          {headingLine1}
          <br />
          <em className="text-accent">{headingLine2}</em>
        </h2>
        <p className="mt-5 max-w-[760px] text-[18px] leading-[1.6] text-ink/70">{line}</p>

        {/* Reassurance panel */}
        <div className="mt-8 flex items-start gap-4 rounded-[10px] border border-accent/20 bg-accent/[0.07] px-5 py-5 sm:items-center sm:px-7">
          <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent">
            <Check className="h-[18px] w-[18px] text-white" strokeWidth={2} />
          </span>
          <div>
            <p className="text-[18px] font-medium leading-[1.4] text-ink">{reassurance.title}</p>
            <p className="mt-1 text-[15px] leading-[1.5] text-ink/70">{reassurance.text}</p>
          </div>
        </div>

        <ul className="mt-8 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-2 lg:grid-cols-4">
          {gcseCurricula.map((curriculum) => (
            <li
              key={curriculum.name}
              className="rounded-[10px] border border-ink bg-ink p-8 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(22,33,61,0.22)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <h3 className="text-[28px] font-normal leading-[1.2] text-white">{curriculum.name}</h3>
              <div aria-hidden="true" className="mt-4 h-px w-full bg-white/25" />
              <dl>
                {[
                  { label: earlyLabel, value: curriculum.early },
                  { label: standardLabel, value: curriculum.standard },
                ].map(({ label, value }) => (
                  <div key={label} className="mt-6">
                    <dt className="text-[12px] uppercase leading-[1.4] tracking-[0.15em] text-white/60">{label}</dt>
                    <dd className="mt-1.5 whitespace-nowrap text-[18px] font-normal leading-[1.3] text-white md:text-[20px]">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>

        {/* Centred on purpose, for this closing line only. */}
        <p className="mt-12 text-center text-[16px] leading-[1.6] text-ink/65">{closing}</p>
      </Container>
    </section>
  );
}

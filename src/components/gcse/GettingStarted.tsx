import { FileText, Users, type LucideIcon } from "lucide-react";
import Container from "@/components/layout/Container";
import { gcse } from "@/content/gcse";

const ICONS: Record<string, LucideIcon> = { Users, FileText };

// /gcse 07: how a school gets set up – five steps, then two reassurances.
export default function GettingStarted() {
  const { eyebrow, headingLine1, headingLine2, intro, stepsHeading, steps, reassurances } = gcse.gettingStarted;

  return (
    <section className="bg-paper py-16 md:py-24">
      <Container>
        <p className="text-[12px] uppercase tracking-[0.25em] text-accent">{eyebrow}</p>
        <h2 className="mt-4 text-balance text-[36px] font-light leading-[1.1] tracking-[-0.01em] text-ink md:text-[56px]">
          {headingLine1}
          <br />
          <em className="text-accent">{headingLine2}</em>
        </h2>
        <p className="mt-5 max-w-[880px] text-[18px] leading-[1.6] text-ink/70">{intro}</p>

        <h3 className="mt-12 text-[26px] font-light leading-[1.2] text-ink md:text-[32px]">{stepsHeading}</h3>

        {/* One ink strip, styled like the Lesson explorer's lesson strip on /curriculum-mapping.
            From lg: five equal columns in a row, separated by thin dividers with a small arrow on
            each. Below lg: a vertical list with a small downward arrow on each divider. */}
        <ol className="mt-6 list-none divide-y divide-white/15 rounded-xl bg-ink p-0 lg:flex lg:divide-y-0">
          {steps.map((step, i) => (
            <li
              key={step.number}
              className={`relative flex flex-col px-5 py-6 lg:flex-1 lg:basis-0 ${
                i > 0 ? "lg:border-l lg:border-white/15" : ""
              }`}
            >
              {i > 0 && (
                <>
                  <span
                    aria-hidden="true"
                    className="absolute top-1/2 left-0 hidden h-0 w-0 -translate-y-1/2 border-y-[6px] border-l-[7px] border-y-transparent border-l-white lg:block"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-1/2 h-0 w-0 -translate-x-1/2 border-x-[6px] border-t-[7px] border-x-transparent border-t-white lg:hidden"
                  />
                </>
              )}
              <p className="flex items-baseline gap-3 lg:block">
                <span className="shrink-0 text-[14px] font-medium leading-[1.4] text-white/70">{step.number}</span>
                <span className="text-[18px] font-normal leading-[1.25] text-white lg:mt-2 lg:block">{step.title}</span>
              </p>
              <p className="mt-2 text-[14px] leading-[1.5] text-white/85">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {reassurances.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <div key={item.title} className="flex gap-4 rounded-lg border border-ink/10 bg-white p-6">
                <Icon className="h-7 w-7 shrink-0 text-ink" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <h4 className="text-[20px] font-normal leading-[1.3] text-ink">{item.title}</h4>
                  <p className="mt-2 text-[15px] leading-[1.6] text-ink/65">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

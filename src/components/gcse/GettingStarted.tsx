import { ArrowDown, ArrowRight, FileText, Users, type LucideIcon } from "lucide-react";
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

        {/* From 1280px: one row of five with arrows in the gaps. 768–1279px: two columns, the
            last box spanning both, no arrows. Below 768px: stacked with downward arrows. */}
        <ol className="mt-6 flex list-none flex-col p-0 md:grid md:grid-cols-2 md:gap-4 xl:flex xl:flex-row xl:gap-8">
          {steps.map((step, i) => {
            const last = i === steps.length - 1;
            return (
              <li key={step.number} className={`relative flex flex-col xl:flex-1 ${last ? "md:col-span-2" : ""}`}>
                <div className="flex-1 rounded-lg bg-ink p-6">
                  <p className="text-[14px] font-medium leading-[1.4] text-white">{step.number}</p>
                  <p className="mt-2 text-[20px] font-normal leading-[1.25] text-white">{step.title}</p>
                  <p className="mt-2 text-[14px] leading-[1.55] text-white/85">{step.text}</p>
                </div>
                {!last && (
                  <>
                    <ArrowDown className="mx-auto my-2 h-5 w-5 text-ink md:hidden" strokeWidth={1.5} aria-hidden="true" />
                    <ArrowRight
                      className="absolute top-1/2 -right-[26px] hidden h-5 w-5 -translate-y-1/2 text-ink xl:block"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </>
                )}
              </li>
            );
          })}
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

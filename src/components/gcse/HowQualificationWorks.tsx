import { FileText, Route, type LucideIcon } from "lucide-react";
import { Fragment } from "react";
import Container from "@/components/layout/Container";
import { gcse } from "@/content/gcse";

const ICONS: Record<string, LucideIcon> = { FileText, Route };

// "Students demonstrate their learning", 2 → ["Students demonstrate", "their learning"].
function splitAfter(text: string, words: number): [string, string] {
  const parts = text.split(" ");
  return [parts.slice(0, words).join(" "), parts.slice(words).join(" ")];
}

// /gcse 03: how the qualification is assessed – two weighted projects, no written exam.
export default function HowQualificationWorks() {
  const { eyebrow, headingLine1, headingLine2, intro, projects, columns } = gcse.qualification;
  // From lg the heading sits on three lines: "Students demonstrate" / "their learning through" /
  // "independent and group projects" (the green italic part as before). Below lg it breaks after
  // "their learning" as before and wraps naturally.
  const [line1Start, line1End] = splitAfter(headingLine1, 2);
  const [line2Start, line2End] = splitAfter(headingLine2, 1);

  return (
    <section className="bg-paper py-section">
      <Container>
        <p className="text-[12px] uppercase tracking-[0.25em] text-accent">{eyebrow}</p>
        <h2 className="mt-eyebrow text-balance text-[36px] font-light leading-[1.1] tracking-[-0.01em] text-ink md:text-[56px]">
          {line1Start}
          <br className="hidden lg:inline" /> {line1End}
          <br className="lg:hidden" />{" "}
          <em className="text-accent">
            {line2Start}
            <br className="hidden lg:inline" /> {line2End}
          </em>
        </h2>
        <p className="mt-lead max-w-[880px] text-[18px] leading-[1.6] text-ink/70">{intro}</p>

        <div className="mt-content grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <div key={project.label} className="rounded-[10px] bg-ink p-8">
              <p className="text-[12px] uppercase tracking-[0.25em] text-white">{project.label}</p>
              <p className="mt-3 text-[56px] font-light leading-none text-white md:text-[64px]">{project.weighting}</p>
              <p className="mt-4 text-[16px] leading-[1.6] text-white/85">{project.text}</p>
            </div>
          ))}
        </div>

        {/* Two equal columns with a thin divider from md; stacked below. */}
        <ul className="mt-12 grid list-none grid-cols-1 gap-10 p-0 md:grid-cols-2 md:gap-0 md:divide-x md:divide-ink/[0.12]">
          {columns.map((column) => {
            const Icon = ICONS[column.icon];
            return (
              <li key={column.title} className="md:px-10 md:first:pl-0 md:last:pr-0">
                <Icon className="h-7 w-7 text-ink" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-4 text-[20px] font-normal leading-[1.3] text-ink">{column.title}</h3>
                {"steps" in column && column.steps ? (
                  // Each step keeps its arrow with it, so a wrapped line never starts with an arrow.
                  <p className="mt-2 text-[15px] leading-[1.6] text-ink/65">
                    {column.steps.map((step, i) => (
                      <Fragment key={step}>
                        <span className="whitespace-nowrap">
                          {step}
                          {i < column.steps.length - 1 && <span className="text-accent"> →</span>}
                        </span>
                        {i < column.steps.length - 1 && " "}
                      </Fragment>
                    ))}
                  </p>
                ) : (
                  <p className="mt-2 text-[15px] leading-[1.6] text-ink/65">{"text" in column ? column.text : null}</p>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

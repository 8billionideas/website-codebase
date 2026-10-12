import { ArrowRight } from "lucide-react";
import Container from "@/components/layout/Container";
import LevelModeToggle, { LevelText } from "@/components/shared/LevelModeToggle";
import { progressionRows, progressionYears, skillsProgressionSection } from "@/content/skills-progression";

// Grid template shared by the label row and the three timeline rows (desktop and the
// tablet scroller): a row-label column, then five equal columns.
const GRID = "grid grid-cols-[160px_repeat(5,minmax(0,1fr))]";
const LAST = progressionYears.length - 1;

// One timeline row: the line runs through the dots (12px down, the centre of the h-6 dot
// row), with arrows between columns. The last (Year 13) column's dot, the line beyond it
// and the closing arrow are accent-green.
function TimelineRow({ name, steps }: { name: string; steps: readonly string[] }) {
  return (
    <div className={GRID}>
      <div className="sticky left-0 z-10 flex h-6 items-center bg-paper pr-4">
        <h3 className="text-[22px] font-normal leading-none text-ink">{name}</h3>
      </div>
      <div className="relative col-span-5 grid grid-cols-5">
        {/* Grey line: first dot to last dot. Green line: last dot to the edge. */}
        <span aria-hidden="true" className="absolute top-3 left-[10%] right-[10%] h-px bg-ink/25" />
        <span aria-hidden="true" className="absolute top-3 left-[90%] right-3 h-px bg-accent" />
        <ArrowRight
          aria-hidden="true"
          className="absolute top-3 right-0 h-3.5 w-3.5 -translate-y-1/2 text-accent"
          strokeWidth={1.5}
        />
        {steps.map((text, i) => (
          <div key={text} className="relative flex flex-col items-center px-3 text-center">
            <div className="flex h-6 items-center">
              <span
                aria-hidden="true"
                className={`relative h-2 w-2 rounded-full ${i === LAST ? "bg-accent" : "bg-ink"}`}
              />
            </div>
            {/* Arrow on the line between this column and the next. */}
            {i < LAST && (
              <ArrowRight
                aria-hidden="true"
                className="absolute top-3 -right-[7px] h-3.5 w-3.5 -translate-y-1/2 bg-paper text-ink/50"
                strokeWidth={1.5}
              />
            )}
            <p className="mt-3 max-w-[200px] text-[14px] leading-[1.5] text-ink/65">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Timeline() {
  return (
    <div>
      <div className={GRID}>
        <div className="sticky left-0 z-10 bg-paper" />
        {progressionYears.map((year) => (
          <p key={year} className="text-center text-[18px] font-medium text-ink">
            <LevelText year={year} />
          </p>
        ))}
      </div>
      <div className="mt-8 flex flex-col gap-10">
        {progressionRows.map((row) => (
          <TimelineRow key={row.name} name={row.name} steps={row.steps} />
        ))}
      </div>
    </div>
  );
}

// Homepage Section 4: "Skills that grow with students".
export default function Progression() {
  const { index, eyebrow, headingLine1, headingLine2, intro } = skillsProgressionSection;

  return (
    <section className="bg-paper py-16 md:py-24">
      <Container>
        <p className="text-caption text-muted">{index}</p>
        <div className="mt-2 h-8 w-px bg-accent" aria-hidden="true" />

        {/* Heading block on the left, Years/Grades toggle on the right (below the paragraph on mobile). */}
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
          <div>
            <p className="text-[12px] uppercase tracking-[0.25em] text-accent">{eyebrow}</p>
            <h2 className="mt-4 text-balance text-[32px] font-light leading-[1.15] tracking-[-0.01em] text-ink md:text-[52px]">
              {headingLine1}
              <br />
              <em className="text-accent">{headingLine2}</em>
            </h2>
            <p className="mt-5 max-w-[760px] text-[18px] leading-[1.6] text-ink/70">{intro}</p>
          </div>
          <LevelModeToggle className="self-start" />
        </div>

        {/* Desktop: the timeline grid. Tablet: the same grid scrolling inside its own box,
            with sticky row labels and a fade on the right. */}
        <div className="relative mt-14 hidden md:block">
          <div className="[-ms-overflow-style:none] [scrollbar-width:none] overflow-x-auto [&::-webkit-scrollbar]:hidden lg:overflow-visible">
            <div className="min-w-[960px] pb-1 lg:min-w-0">
              <Timeline />
            </div>
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-paper to-transparent lg:hidden"
          />
        </div>

        {/* Mobile: one vertical timeline per row. */}
        <div className="mt-12 flex flex-col gap-12 md:hidden">
          {progressionRows.map((row) => (
            <div key={row.name}>
              <h3 className="text-[22px] font-normal text-ink">{row.name}</h3>
              <ol className="relative mt-5 flex list-none flex-col gap-6 p-0">
                <span aria-hidden="true" className="absolute top-2 bottom-2 left-1 w-px -translate-x-1/2 bg-ink/25" />
                {row.steps.map((text, i) => (
                  <li key={text} className="relative pl-7">
                    <span
                      aria-hidden="true"
                      className={`absolute top-[7px] left-0 h-2 w-2 rounded-full ${i === LAST ? "bg-accent" : "bg-ink"}`}
                    />
                    <p className="text-[14px] font-medium text-ink">
                      <LevelText year={progressionYears[i]} />
                    </p>
                    <p className="mt-1 text-[14px] leading-[1.5] text-ink/65">{text}</p>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

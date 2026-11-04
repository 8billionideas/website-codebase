"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import Container from "@/components/layout/Container";
import LevelModeToggle, { LevelText } from "@/components/shared/LevelModeToggle";
import { progressionAreas, progressionBands, skillsProgressionSection as copy } from "@/content/skills-progression";

const PANEL_ID = "skills-progression-panel";
const tabId = (index: number) => `skills-progression-tab-${index}`;

// The dots grow and strengthen from light mint to full accent green (#21D199) to show growth:
// diameter in px, and the share of accent green mixed with the paper background.
const DOTS = [
  { size: 10, mix: 30 },
  { size: 12, mix: 48 },
  { size: 14, mix: 65 },
  { size: 16, mix: 82 },
  { size: 18, mix: 100 },
];
const dotColour = (i: number) => `color-mix(in srgb, #21D199 ${DOTS[i].mix}%, #FFFDFA)`;
const LAST = progressionBands.length - 1;

// The line from one dot to the next, shading between their two colours.
const segmentStyle = (i: number, direction: "right" | "bottom"): CSSProperties => ({
  backgroundImage: `linear-gradient(to ${direction}, ${dotColour(i)}, ${dotColour(i + 1)})`,
});

// Every area's text for a stage, stacked in one cell with only the selected one visible: the cell
// keeps the height of the longest, so switching areas never makes the page jump, and the text
// cross-fades.
function StageText({ stage, selected }: { stage: number; selected: number }) {
  return (
    <div className="grid">
      {progressionAreas.map((area, a) => (
        <p
          key={area.name}
          aria-hidden={a !== selected}
          className={`[grid-area:1/1] text-[16px] leading-[1.6] text-ink/70 transition-[opacity,visibility] duration-200 motion-reduce:transition-none ${
            a === selected ? "opacity-100" : "invisible opacity-0"
          }`}
        >
          {area.stages[stage]}
        </p>
      ))}
    </div>
  );
}

// "Years 1–3" / "Kindergarten–Grade 2", following the site-wide Years/Grades choice.
function StageLabel({ stage }: { stage: number }) {
  const { startYear, endYear } = progressionBands[stage];
  return (
    <p className="text-[17px] font-medium leading-[1.4] text-ink">
      <LevelText year={startYear} to={endYear} />
    </p>
  );
}

function Dot({ stage }: { stage: number }) {
  return (
    <span
      aria-hidden="true"
      className="relative z-10 block rounded-full"
      style={{ width: DOTS[stage].size, height: DOTS[stage].size, backgroundColor: dotColour(stage) }}
    />
  );
}

// Homepage: "Progressively building skills at every stage" – pick an area of learning to see how
// it develops across the five stages of school.
export default function Progression() {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(event: KeyboardEvent, index: number) {
    const last = progressionAreas.length - 1;
    const next =
      event.key === "ArrowRight" ? (index === last ? 0 : index + 1)
      : event.key === "ArrowLeft" ? (index === 0 ? last : index - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : null;
    if (next === null) return;
    event.preventDefault();
    setSelected(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section className="bg-paper py-section">
      <Container>
        <p className="text-[12px] uppercase tracking-[0.25em] text-accent">{copy.eyebrow}</p>
        <h2 className="mt-eyebrow text-balance text-[32px] font-light leading-[1.15] tracking-[-0.01em] text-ink md:text-[52px]">
          {/* Forced break after "building" from md; below md it wraps naturally. */}
          {copy.headingLine1}
          <br className="hidden md:inline" /> {copy.headingLine2Lead} <em className="text-accent">{copy.headingLine2}</em>
        </h2>
        <p className="mt-lead max-w-[760px] text-[18px] leading-[1.6] text-ink/70">{copy.intro}</p>

        {/* The shared Years/Grades toggle (as in the Lesson Explorer) directly above the area tabs,
            left-aligned with the first tab, at every size. */}
        <div className="mt-content flex flex-col gap-eyebrow">
          <LevelModeToggle className="self-start" />
          {/* Area tabs: one row; below xl it scrolls sideways rather than wrapping. From xl, each
              column is at least as wide as its label (equal columns left "Explore & Understand"
              running into its padding). */}
          <div
            role="tablist"
            aria-label={copy.tabsLabel}
            className="[-ms-overflow-style:none] [scrollbar-width:none] -mx-1 flex min-w-0 gap-3 overflow-x-auto px-1 py-1 [&::-webkit-scrollbar]:hidden xl:grid xl:grid-cols-[repeat(4,minmax(max-content,1fr))] xl:overflow-visible"
          >
            {progressionAreas.map((area, i) => {
              const active = i === selected;
              return (
                <button
                  key={area.name}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  id={tabId(i)}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls={PANEL_ID}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setSelected(i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className={`flex shrink-0 cursor-pointer items-baseline gap-3 whitespace-nowrap rounded-[10px] border px-5 py-3.5 text-left text-[16px] leading-[1.3] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper motion-reduce:transition-none ${
                    active ? "border-ink bg-ink text-white" : "border-ink/15 bg-white text-ink hover:border-accent"
                  }`}
                >
                  {/* Accent green on navy; the darker green on white (accent fails contrast there). */}
                  <span className={`text-[13px] font-medium ${active ? "text-accent" : "text-[#0E7C5A]"}`}>{area.number}</span>
                  {area.name}
                </button>
              );
            })}
          </div>
        </div>

        <div id={PANEL_ID} role="tabpanel" aria-labelledby={tabId(selected)} className="mt-content">
          {/* From lg: five columns joined by a line through the dots. */}
          <ol className="hidden list-none grid-cols-5 gap-6 p-0 lg:grid">
            {progressionBands.map((band, i) => (
              <li key={band.startYear} className="relative">
                {i < LAST && (
                  // From this dot's centre (12px in) to the next one's (column + 24px gap + 12px).
                  <span
                    aria-hidden="true"
                    className="absolute top-[11px] left-3 -right-9 h-0.5"
                    style={segmentStyle(i, "right")}
                  />
                )}
                <div className="flex h-6 w-6 items-center justify-center">
                  <Dot stage={i} />
                </div>
                <div className="mt-4">
                  <StageLabel stage={i} />
                </div>
                <div className="mt-3">
                  <StageText stage={i} selected={selected} />
                </div>
              </li>
            ))}
          </ol>

          {/* Below lg: the same path running down the left. */}
          <ol className="list-none p-0 lg:hidden">
            {progressionBands.map((band, i) => (
              <li key={band.startYear} className="relative pb-8 pl-11 last:pb-0">
                {i < LAST && (
                  <span
                    aria-hidden="true"
                    className="absolute top-3 bottom-[-12px] left-[11px] w-0.5"
                    style={segmentStyle(i, "bottom")}
                  />
                )}
                <div className="absolute top-0 left-0 flex h-6 w-6 items-center justify-center">
                  <Dot stage={i} />
                </div>
                <StageLabel stage={i} />
                <div className="mt-2">
                  <StageText stage={i} selected={selected} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

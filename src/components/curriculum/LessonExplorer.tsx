"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import DemoTrigger from "@/components/demo/DemoTrigger";
import LevelModeToggle from "@/components/shared/LevelModeToggle";
import { PILLARS, type PillarName } from "@/content/curriculumMapping";
import {
  SHOW_MISSING_AS_COMING_SOON,
  SHOW_PROPOSED_SEQUENCES,
  getPublishedProgramme,
  lessonExplorerSection as copy,
  type Lesson,
  type LessonGroup,
  type Programme,
} from "@/content/lesson-explorer";
import { pillarCarousel } from "@/content/pillarCarousel";
import { useLevelMode } from "@/lib/level-mode";
import { formatLevel, formatLevelShort, formatLevelUpper, type LevelMode } from "@/lib/year-grade";

const YEARS = Array.from({ length: 13 }, (_, i) => i + 1);
// Selected on every page load (only the Years/Grades mode is remembered between visits).
const DEFAULT_LESSON_EXPLORER_YEAR = 10;
const DEFAULT_PILLAR: PillarName = "Entrepreneurship";

// Same flag as the homepage pillar cards (Sustainability and Technology).
const COMING_SOON = new Set<string>(pillarCarousel.cards.filter((c) => c.comingSoon).map((c) => c.name));

const isAvailable = (year: number, pillar: PillarName) =>
  !COMING_SOON.has(pillar) && getPublishedProgramme(year, pillar) !== null;
// No programme for this year yet (and not a "Coming soon" pillar): a "Coming soon" slot.
const isMissing = (year: number, pillar: PillarName) =>
  SHOW_MISSING_AS_COMING_SOON && !COMING_SOON.has(pillar) && getPublishedProgramme(year, pillar) === null;
// Can be picked: a programme, or a "Coming soon" slot.
const isSelectable = (year: number, pillar: PillarName) => isAvailable(year, pillar) || isMissing(year, pillar);
const firstAvailable = (year: number) => PILLARS.find((p) => isAvailable(year, p)) ?? DEFAULT_PILLAR;

// Every published year/pillar programme, rendered in one grid cell with only the selected one
// visible: the area keeps the height of the tallest, so switching never makes the page jump.
const PUBLISHED = YEARS.flatMap((year) =>
  PILLARS.filter((pillar) => isAvailable(year, pillar)).map((pillar) => ({
    year,
    pillar,
    programme: getPublishedProgramme(year, pillar)!,
  }))
);

const STACKED = "[grid-area:1/1] transition-[opacity,visibility] duration-200 motion-reduce:transition-none";
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper";
const LABEL = "text-[12px] uppercase leading-[1.5] tracking-[0.2em] text-ink";

const isHidden = (programme: Programme) => programme.type === "proposed" && !SHOW_PROPOSED_SEQUENCES;
const pad = (n: number) => String(n).padStart(2, "0");

// Arrow keys move through a radio group (wrapping), skipping disabled options.
function nextIndex(event: KeyboardEvent, index: number, count: number, enabled: (i: number) => boolean) {
  const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
  const back = event.key === "ArrowLeft" || event.key === "ArrowUp";
  if (!forward && !back) return null;
  event.preventDefault();
  let i = index;
  do {
    i = (i + (forward ? 1 : -1) + count) % count;
  } while (!enabled(i) && i !== index);
  return i;
}

// The ink strip of lesson (or group) cards. From lg the cards sit in one row, separated by thin
// dividers (with a small arrow on each for lesson sequences); from 1024 to 1279px a row of six
// that doesn't fit scrolls inside the strip. Below lg it's a vertical list.
function CardStrip({
  items,
  sequence,
}: {
  items: (Lesson | LessonGroup)[];
  sequence: boolean;
}) {
  return (
    <ol className="mt-6 list-none divide-y divide-white/15 rounded-xl bg-ink p-0 lg:flex lg:divide-y-0 lg:overflow-x-auto xl:overflow-visible">
      {items.map((item, i) => (
        <li
          key={item.number}
          className={`relative flex flex-col p-5 lg:min-w-[160px] lg:flex-1 lg:p-4 xl:min-w-0 xl:p-6 ${
            i > 0 ? "lg:border-l lg:border-white/15" : ""
          }`}
        >
          {sequence && i > 0 && (
            <span
              aria-hidden="true"
              className="absolute top-1/2 left-0 hidden h-0 w-0 -translate-y-1/2 border-y-[6px] border-l-[7px] border-y-transparent border-l-white lg:block"
            />
          )}
          <p className="flex items-baseline gap-3 lg:block">
            <span className="shrink-0 text-[16px] font-medium leading-[1.3] text-white/70">{pad(item.number)}</span>
            <span className="text-[17px] font-medium leading-[1.3] text-white lg:mt-3 lg:block">{item.title}</span>
          </p>
          <p className="mt-2 text-[14px] leading-[1.5] text-white/75 lg:mb-4">{item.description}</p>
          {"lessons" in item && (
            <span className="mt-4 self-start rounded-full border border-white/30 px-2.5 py-0.5 text-[12px] leading-[1.5] text-white lg:mt-auto">
              {item.lessons}
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

function ProgrammePanel({
  year,
  pillar,
  programme,
  mode,
}: {
  year: number;
  pillar: PillarName;
  programme: Programme;
  mode: LevelMode;
}) {
  return (
    <div className="rounded-2xl border border-ink/[0.08] bg-white p-5 md:p-8">
      <p className="text-[12px] uppercase leading-[1.5] tracking-[0.2em] text-ink/70">
        {formatLevelUpper(year, mode)} · {pillar.toUpperCase()}
      </p>

      {isHidden(programme) ? (
        <>
          <h3 className="mt-3 text-[28px] font-light leading-[1.2] text-ink">{copy.proposed.heading}</h3>
          <p className="mt-3 max-w-[640px] text-[17px] leading-[1.6] text-ink/70">
            {copy.proposed.pre}
            <DemoTrigger trackingLocation="lesson_explorer" className="font-normal text-ink underline decoration-ink/30 underline-offset-2 hover:decoration-accent">
              {copy.proposed.linkLabel}
            </DemoTrigger>
            {copy.proposed.post}
          </p>
        </>
      ) : (
        <>
          <h3 className="mt-2 text-[28px] font-normal leading-[1.2] text-ink md:text-[36px]">{programme.name}</h3>
          {programme.type === "grouped" ? (
            <>
              <p className="mt-1 text-[14px] leading-[1.5] text-ink/60">
                {copy.groupedOverview(programme.sourceLessonCount, programme.groups.length)}
              </p>
              <CardStrip items={programme.groups} sequence={false} />
              {programme.presentationNote && (
                <p className="mt-4 text-[13px] italic leading-[1.5] text-ink/60">{programme.presentationNote}</p>
              )}
            </>
          ) : (
            <CardStrip items={programme.lessons} sequence />
          )}
        </>
      )}
    </div>
  );
}

// A "Coming soon" slot: no programme for this year and pillar yet.
function ComingSoonPanel({ year, pillar, mode }: { year: number; pillar: PillarName; mode: LevelMode }) {
  return (
    <div className="rounded-2xl border border-ink/[0.08] bg-white p-5 md:p-8">
      <p className="text-[12px] uppercase leading-[1.5] tracking-[0.2em] text-ink/70">
        {formatLevelUpper(year, mode)} · {pillar.toUpperCase()}
      </p>
      <h3 className="mt-3 text-[28px] font-light leading-[1.2] text-ink">{copy.missing.heading}</h3>
      <p className="mt-3 max-w-[640px] text-[17px] leading-[1.6] text-ink/70">
        {copy.missing.pre(pillar)}
        <DemoTrigger
          trackingLocation="lesson_explorer"
          className="font-normal text-ink underline decoration-ink/30 underline-offset-2 hover:decoration-accent"
        >
          {copy.missing.linkLabel}
        </DemoTrigger>
        {copy.missing.post}
      </p>
    </div>
  );
}

// /curriculum-mapping: "Lesson explorer" – pick a year group and pillar to see that programme's
// lessons (or grouped overview). Follows the site-wide Years/Grades setting.
export default function LessonExplorer() {
  const [year, setYear] = useState(DEFAULT_LESSON_EXPLORER_YEAR);
  const [pillar, setPillar] = useState<PillarName>(() =>
    isAvailable(DEFAULT_LESSON_EXPLORER_YEAR, DEFAULT_PILLAR)
      ? DEFAULT_PILLAR
      : firstAvailable(DEFAULT_LESSON_EXPLORER_YEAR)
  );
  const [mode] = useLevelMode();
  const yearRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pillarRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function selectYear(next: number) {
    setYear(next);
    // Keep the pillar if the new year has it (or a "Coming soon" slot for it); otherwise the first
    // available programme.
    if (!isSelectable(next, pillar)) setPillar(firstAvailable(next));
  }

  const programme = getPublishedProgramme(year, pillar);
  const announcement = `${formatLevel(year, mode)}, ${pillar}: ${
    programme && !isHidden(programme) ? programme.name : copy.proposed.heading
  }`;

  return (
    <>
      <div className="text-center">
        <p className="text-[12px] uppercase tracking-[0.25em] text-accent">{copy.eyebrow}</p>
        <h2 className="mx-auto mt-eyebrow max-w-[1000px] text-balance text-[30px] font-light leading-[1.15] tracking-[-0.01em] text-ink md:text-[48px]">
          {copy.headingLine1}
          <br />
          <em className="text-accent">{copy.headingLine2}</em>
        </h2>
        <p className="mx-auto mt-lead max-w-[760px] text-balance text-[18px] leading-[1.6] text-ink/70">{copy.intro}</p>
      </div>

      {/* Selectors: side by side with a divider from xl, stacked below. */}
      <div className="mt-content grid gap-10 xl:grid-cols-[auto_1px_minmax(0,1fr)] xl:gap-8">
        <div>
          <div className="flex h-10 items-center justify-between gap-4">
            <p id="lesson-explorer-year-label" className={LABEL}>
              {mode === "grades" ? copy.gradeLabel : copy.yearLabel}
            </p>
            <LevelModeToggle />
          </div>
          <div
            role="radiogroup"
            aria-labelledby="lesson-explorer-year-label"
            className="mt-4 grid grid-cols-7 gap-2 sm:w-fit xl:gap-1.5"
          >
            {YEARS.map((y, i) => {
              const selected = y === year;
              return (
                <button
                  key={y}
                  ref={(el) => {
                    yearRefs.current[i] = el;
                  }}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  aria-label={formatLevel(y, mode)}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => selectYear(y)}
                  onKeyDown={(e) => {
                    const next = nextIndex(e, i, YEARS.length, () => true);
                    if (next === null) return;
                    selectYear(YEARS[next]);
                    yearRefs.current[next]?.focus();
                  }}
                  className={`h-11 w-full cursor-pointer rounded-full text-[15px] leading-none transition-colors motion-reduce:transition-none sm:w-16 xl:w-14 ${FOCUS_RING} ${
                    selected ? "bg-ink text-white" : "bg-ink/5 text-ink hover:bg-ink/10"
                  }`}
                >
                  {formatLevelShort(y, mode)}
                </button>
              );
            })}
          </div>
        </div>

        <div aria-hidden="true" className="hidden bg-ink/[0.12] xl:block" />

        <div>
          {/* Same height as the year label row (with its toggle), so the two grids line up. */}
          <div className="flex h-10 items-center">
            <p id="lesson-explorer-pillar-label" className={LABEL}>
              {copy.pillarLabel}
            </p>
          </div>
          <div
            role="radiogroup"
            aria-labelledby="lesson-explorer-pillar-label"
            className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4 xl:grid-cols-[repeat(4,auto)]"
          >
            {PILLARS.map((p, i) => {
              const missing = isMissing(year, p);
              const comingSoon = COMING_SOON.has(p) || missing;
              const available = isSelectable(year, p);
              const selected = p === pillar;
              return (
                <button
                  key={p}
                  ref={(el) => {
                    pillarRefs.current[i] = el;
                  }}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  aria-disabled={!available}
                  title={
                    comingSoon ? copy.comingSoonLabel : available ? undefined : `Not part of ${formatLevel(year, mode)}`
                  }
                  tabIndex={selected ? 0 : -1}
                  onClick={() => available && setPillar(p)}
                  onKeyDown={(e) => {
                    const next = nextIndex(e, i, PILLARS.length, (j) => isSelectable(year, PILLARS[j]));
                    if (next === null) return;
                    setPillar(PILLARS[next]);
                    pillarRefs.current[next]?.focus();
                  }}
                  className={`flex min-h-11 flex-col items-center justify-center rounded-full px-3 py-2 text-center text-[15px] leading-[1.25] transition-colors motion-reduce:transition-none ${FOCUS_RING} ${
                    selected
                      ? "cursor-pointer bg-ink text-white"
                      : available
                        ? "cursor-pointer bg-ink/5 text-ink hover:bg-ink/10"
                        : "cursor-not-allowed bg-ink/[0.03] text-ink/30"
                  }`}
                >
                  <span>{p}</span>
                  {comingSoon && (
                    <span className="mt-0.5 text-[10px] font-medium uppercase leading-[1.3] tracking-[0.12em]">
                      {copy.comingSoonLabel}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>

      {/* Programme panel: every published programme stacked, the selected one shown. Hidden panels
          take no height, so the box fits the one on show (the tallest used to leave empty space
          below shorter panels). */}
      <div className="mt-8 grid grid-cols-[minmax(0,1fr)] items-start">
        {PUBLISHED.map((entry) => {
          const active = entry.year === year && entry.pillar === pillar;
          return (
            <div
              key={`${entry.year}-${entry.pillar}`}
              aria-hidden={!active}
              inert={!active}
              className={`${STACKED} ${active ? "opacity-100" : "invisible h-0 overflow-hidden opacity-0"}`}
            >
              <ProgrammePanel {...entry} mode={mode} />
            </div>
          );
        })}
        {isMissing(year, pillar) && (
          <div className={`${STACKED} opacity-100`}>
            <ComingSoonPanel year={year} pillar={pillar} mode={mode} />
          </div>
        )}
      </div>
    </>
  );
}

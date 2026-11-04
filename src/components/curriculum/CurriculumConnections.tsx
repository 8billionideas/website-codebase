"use client";

import { useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import {
  STAGES,
  curriculumConnectionsSection as copy,
  subjects,
  type Stage,
  type StageKey,
  type Subject,
} from "@/content/curriculum-connections";
import { LESSON_EXPLORER_ID, openLessonExplorer, type LessonExplorerTarget } from "@/lib/lesson-explorer-link";
import { useLevelMode } from "@/lib/level-mode";
import { formatLevelRange, type LevelMode } from "@/lib/year-grade";

const TABPANEL_ID = "curriculum-connections-panel";
// Stage selected on page load (the subject defaults to the first, Maths).
const DEFAULT_MAPPING_STAGE: StageKey = "primary";
const tabId = (subject: Subject) => `curriculum-connections-tab-${subject.id}`;

// Every subject/stage pair is rendered in the same grid cell with only the selected one
// visible. Hidden ones are inert and take no height (so there's no empty space under a short
// example; the content below can move a little when switching); the visible one cross-fades in.
const STACKED = "[grid-area:1/1] transition-[opacity,visibility] duration-200 motion-reduce:transition-none";
// Hidden panels take no height, so the box fits the one on show (the tallest used to leave empty
// space below shorter panels).
const stackState = (active: boolean) => (active ? "opacity-100" : "invisible h-0 overflow-hidden opacity-0");

// Held examples (published: false) show the "Coming soon" state.
const isHeld = (stage: Stage) => !stage.published;

// Dark green for small green text on light backgrounds (accent green fails contrast there).
const LINK_GREEN = "text-[#0E7C5A]";

// The first tab lines up with the heading; the last keeps room for the scroll fade below
// lg and sits flush with the right edge from lg. The underline spans the tab's text.
const TAB_PADDING = {
  first: "pl-0 pr-5 lg:pr-4 xl:pr-6",
  middle: "px-5 lg:px-4 xl:px-6",
  last: "pl-5 pr-10 lg:pl-4 lg:pr-0 xl:pl-6",
};
const UNDERLINE_INSET = {
  first: "left-0 right-5 lg:right-4 xl:right-6",
  middle: "left-5 right-5 lg:left-4 lg:right-4 xl:left-6 xl:right-6",
  last: "left-5 right-10 lg:left-4 lg:right-0 xl:left-6",
};

function SubjectTabs({
  selected,
  onSelect,
}: {
  selected: number;
  onSelect: (index: number) => void;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(event: KeyboardEvent, index: number) {
    const last = subjects.length - 1;
    const next =
      event.key === "ArrowRight" ? (index === last ? 0 : index + 1)
      : event.key === "ArrowLeft" ? (index === 0 ? last : index - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : null;
    if (next === null) return;
    event.preventDefault();
    onSelect(next);
    refs.current[next]?.focus();
  }

  return (
    // The full-width line sits on the outer wrapper so it spans the row even while the
    // tabs scroll (below lg).
    <div className="relative mt-content">
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-ink/10" />
      <div
        role="tablist"
        aria-label="Subjects"
        className="[-ms-overflow-style:none] [scrollbar-width:none] relative flex overflow-x-auto [mask-image:linear-gradient(to_right,black_0%,black_90%,transparent_100%)] [&::-webkit-scrollbar]:hidden lg:overflow-visible lg:[mask-image:none]"
      >
        {subjects.map((subject, i) => {
          const active = i === selected;
          const position = i === 0 ? "first" : i === subjects.length - 1 ? "last" : "middle";
          return (
            <button
              key={subject.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              id={tabId(subject)}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={TABPANEL_ID}
              tabIndex={active ? 0 : -1}
              onClick={() => onSelect(i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className={`group relative flex shrink-0 cursor-pointer flex-col pt-1 pb-4 text-left focus-visible:outline-none lg:flex-auto lg:shrink ${TAB_PADDING[position]}`}
            >
              {i > 0 && (
                <span aria-hidden="true" className="absolute top-1 bottom-4 left-0 w-px bg-ink/[0.12]" />
              )}
              <span
                className={`block whitespace-nowrap rounded-sm text-[18px] font-normal leading-[1.3] transition-colors group-focus-visible:ring-2 group-focus-visible:ring-accent group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-paper ${
                  active ? "text-ink" : "text-ink/60 group-hover:text-ink"
                }`}
              >
                {subject.name}
              </span>
              {/* From 1024 to 1279px the five descriptions don't fit on one line each, so they wrap. */}
              <span className="mt-1 block whitespace-nowrap text-[13px] leading-[1.4] text-ink/55 lg:max-xl:whitespace-normal">
                {subject.description}
              </span>
              <span
                aria-hidden="true"
                className={`absolute bottom-0 h-[3px] bg-accent transition-opacity motion-reduce:transition-none ${UNDERLINE_INSET[position]} ${
                  active ? "opacity-100" : "opacity-0"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StageCards({
  subject,
  selected,
  onSelect,
  mode,
}: {
  subject: Subject;
  selected: StageKey;
  onSelect: (key: StageKey) => void;
  mode: LevelMode;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(event: KeyboardEvent, index: number) {
    const last = STAGES.length - 1;
    const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
    const back = event.key === "ArrowLeft" || event.key === "ArrowUp";
    if (!forward && !back) return;
    event.preventDefault();
    const next = forward ? (index === last ? 0 : index + 1) : index === 0 ? last : index - 1;
    onSelect(STAGES[next].key);
    refs.current[next]?.focus();
  }

  return (
    <div
      role="radiogroup"
      aria-label="School stage"
      className="mt-6 grid gap-3 md:grid-cols-3 xl:mt-0 xl:w-[660px] xl:shrink-0"
    >
      {STAGES.map((stage, i) => {
        const active = stage.key === selected;
        const content = subject.stages[stage.key];
        return (
          <button
            key={stage.key}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onSelect(stage.key)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={`min-w-[200px] cursor-pointer rounded-[10px] border px-5 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink motion-reduce:transition-none ${
              active ? "border-white bg-white text-ink" : "border-white/30 text-white hover:border-white/60"
            }`}
          >
            <span className="block text-[18px] font-medium leading-[1.3]">{stage.name}</span>
            <span className="mt-0.5 block text-[14px] leading-[1.4] opacity-80">
              {formatLevelRange(stage.fromYear, stage.toYear, mode)}
            </span>
            {/* Two lines reserved so the cards keep one height across subjects. */}
            <span className="mt-2 block min-h-[2.8em] text-[12px] leading-[1.4]">
              {isHeld(content) ? (
                <span className="inline-block rounded-full border border-current px-2 py-0.5 text-[11px] font-medium uppercase leading-[1.3] tracking-[0.12em] opacity-80">
                  {copy.comingSoon.label}
                </span>
              ) : (
                <span className="line-clamp-2 opacity-80">{content.summary}</span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// "Explore … in the Lesson Explorer": a page link to the explorer (so it still works without
// JavaScript) that also selects the programme's year and pillar.
function ExplorerLink({ target, children }: { target: LessonExplorerTarget; children: React.ReactNode }) {
  return (
    <a
      href={`#${LESSON_EXPLORER_ID}`}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        openLessonExplorer(target);
      }}
      className={`rounded-sm underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${LINK_GREEN}`}
    >
      {children}
    </a>
  );
}

// Small caps labels inside the card.
const BLOCK_LABEL = "text-[12px] uppercase leading-[1.5] tracking-[0.12em]";

function ExamplePanel({ subject, stageKey }: { subject: Subject; stageKey: StageKey }) {
  const stage = subject.stages[stageKey];
  const eyebrowClass = "text-[12px] uppercase leading-[1.5] tracking-[0.2em] text-[#0E7C5A]";
  const headingClass = "mt-3 text-balance text-[28px] font-light leading-[1.2] text-ink md:text-[36px]";

  if (isHeld(stage)) {
    return (
      <div>
        <p className={eyebrowClass}>{copy.comingSoon.eyebrow}</p>
        <h3 className={headingClass}>{copy.comingSoon.heading}</h3>
        <div className="mt-6 rounded-[10px] border border-ink/10 bg-white px-5 py-6 md:px-6">
          <p className="max-w-[760px] text-[16px] leading-[1.6] text-ink/75">
            {copy.comingSoon.pre}
            <ExplorerLink target={{ year: STAGES.find((s) => s.key === stageKey)!.fromYear, pillar: null }}>
              {copy.comingSoon.linkLabel}
            </ExplorerLink>
            {copy.comingSoon.post}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className={eyebrowClass}>{stage.eyebrow}</p>
      <h3 className={headingClass}>{stage.heading}</h3>

      <div className="mt-6 overflow-hidden rounded-[10px] border border-ink/10 bg-white">
        {/* The learning: the school's existing curriculum. */}
        <div className="px-5 py-5 md:px-6 md:py-6">
          <div className={`flex items-baseline justify-between gap-4 text-ink/65 ${BLOCK_LABEL}`}>
            <p className="shrink-0 whitespace-nowrap">{copy.labels.learning}</p>
            <p className="text-right">{subject.name}</p>
          </div>
          <p className="mt-3 text-[20px] font-normal leading-[1.35] text-ink md:text-[22px]">{stage.learning.headline}</p>
          <p className="mt-2 max-w-[900px] text-[15px] leading-[1.6] text-ink/70">{stage.learning.text}</p>
        </div>

        {/* The application: the 8billionideas activity, on navy. */}
        <div className="bg-ink px-5 pt-3 pb-6 text-white md:px-6">
          <ArrowDown className="mx-auto h-4 w-4 text-white/70" strokeWidth={1.5} aria-hidden="true" />
          <div className={`mt-3 flex items-baseline justify-between gap-4 ${BLOCK_LABEL}`}>
            <p className="shrink-0 whitespace-nowrap text-accent">{copy.labels.application}</p>
            <p className="text-right text-white/75">{copy.labels.applicationSide}</p>
          </div>
          <p className="mt-3 text-[20px] font-normal leading-[1.35] text-white md:text-[22px]">{stage.application.headline}</p>
          <p className="mt-2 max-w-[900px] text-[15px] leading-[1.6] text-white/80">{stage.application.text}</p>
        </div>

        {/* How schools could use it, and the skills. */}
        <div className="bg-surface px-5 py-5 md:px-6 md:py-6">
          <p className={`text-ink/70 ${BLOCK_LABEL}`}>{copy.labels.fit}</p>
          <p className="mt-2 max-w-[900px] text-[15px] leading-[1.6] text-ink">{stage.fit}</p>
          {stage.extra && <p className="mt-2 max-w-[900px] text-[14px] leading-[1.6] text-ink/70">{stage.extra}</p>}

          <p className={`mt-5 text-ink/70 ${BLOCK_LABEL}`}>{copy.labels.skills}</p>
          <ul className="mt-3 flex list-none flex-wrap gap-2 p-0">
            {stage.skills.map((skill) => (
              <li
                key={skill}
                className="rounded-lg border border-ink/15 bg-white px-3.5 py-2 text-[14px] leading-[1.3] text-ink"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-5 text-[16px] leading-[1.5]">
        <ExplorerLink target={stage.explore}>
          {copy.explore(stage.explore.programme)}
          <ArrowUpRight className="ml-1.5 inline h-4 w-4 align-[-0.15em]" strokeWidth={1.5} aria-hidden="true" />
        </ExplorerLink>
      </p>
      {/* A reference to the official curriculum document, not an endorsement. */}
      <p className="mt-2 text-[13px] leading-[1.5] text-ink/65">
        <a
          href={stage.source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-ink/25 underline-offset-2 hover:decoration-ink/60"
        >
          {stage.source.label}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </p>
    </div>
  );
}

// /curriculum: "See how our learning fits alongside yours" – pick a subject, then a
// school stage, to see an example connection. Follows the site-wide Years/Grades setting.
export default function CurriculumConnections() {
  const [subjectIndex, setSubjectIndex] = useState(0);
  const [stageKey, setStageKey] = useState<StageKey>(DEFAULT_MAPPING_STAGE);
  const [mode] = useLevelMode();
  const subject = subjects[subjectIndex];
  const stage = subject.stages[stageKey];
  const stageName = STAGES.find((s) => s.key === stageKey)!.name;

  return (
    <>
      <p className="text-[12px] uppercase tracking-[0.25em] text-accent">{copy.eyebrow}</p>
      <h2 className="mt-eyebrow text-balance text-[32px] font-light leading-[1.15] tracking-[-0.01em] text-ink md:text-[52px]">
        {copy.headingLine1}
        <br />
        <em className="text-accent">{copy.headingLine2}</em>
      </h2>
      <p className="mt-lead max-w-[760px] text-[18px] leading-[1.6] text-ink/70">{copy.intro}</p>
      <p className="mt-3 text-[14px] leading-[1.5] text-ink/65">{copy.note}</p>

      <SubjectTabs selected={subjectIndex} onSelect={setSubjectIndex} />

      <div id={TABPANEL_ID} role="tabpanel" aria-labelledby={tabId(subject)}>
        {/* Subject band */}
        <div className="mt-6 rounded-xl bg-ink p-6 md:p-8 xl:flex xl:items-center xl:justify-between xl:gap-10">
          <div className="grid">
            {subjects.map((s, i) => (
              <div
                key={s.id}
                aria-hidden={i !== subjectIndex}
                className={`${STACKED} ${stackState(i === subjectIndex)}`}
              >
                <p className="text-[32px] font-light leading-[1.15] text-white md:text-[40px]">{s.name}</p>
                <p className="mt-2 text-[17px] leading-[1.5] text-white/75">{s.description}</p>
              </div>
            ))}
          </div>
          <StageCards subject={subject} selected={stageKey} onSelect={setStageKey} mode={mode} />
        </div>

        {/* Screen-reader announcement of the newly shown example. */}
        <p aria-live="polite" className="sr-only">
          {`${subject.name}, ${stageName}: ${isHeld(stage) ? copy.comingSoon.heading : stage.heading}`}
        </p>

        {/* Example panel: every combination stacked, the selected one shown. */}
        <div className="mt-8 grid">
          {subjects.flatMap((s, si) =>
            STAGES.map(({ key }) => {
              const active = si === subjectIndex && key === stageKey;
              return (
                <div
                  key={`${s.id}-${key}`}
                  aria-hidden={!active}
                  inert={!active}
                  className={`${STACKED} ${stackState(active)}`}
                >
                  <ExamplePanel subject={s} stageKey={key} />
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

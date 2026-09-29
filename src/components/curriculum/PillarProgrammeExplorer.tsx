"use client";

import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import {
  Lightbulb,
  Briefcase,
  Coins,
  Heart,
  Activity,
  Users,
  Leaf,
  Cpu,
  Layers,
  Clock,
  BarChart,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/layout/Container";
import { PILLARS, type PillarName } from "@/content/curriculumMapping";
import { YEAR_GROUPS, getProgramme, type Lesson } from "@/lib/pillar-programmes";
import { CrossFade } from "@/components/curriculum/CrossFade";

const PILLAR_ICONS: Record<PillarName, LucideIcon> = {
  Entrepreneurship: Lightbulb,
  Careers: Briefcase,
  "Financial Literacy": Coins,
  Wellbeing: Heart,
  "Health & Performance": Activity,
  Leadership: Users,
  Sustainability: Leaf,
  Technology: Cpu,
};

const DEFAULT_YEAR = 7;
const DEFAULT_PILLAR: PillarName = PILLARS[0]; // Entrepreneurship

function LabelHeading({ children }: { children: ReactNode }) {
  return <p className="text-[12px] uppercase tracking-[0.25em] text-ink/70">{children}</p>;
}

function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-ink/[0.08] bg-white p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/[0.15] text-[13px] font-normal text-accent">
          {lesson.number}
        </span>
        <span className="text-[12px] uppercase tracking-[0.2em] text-ink/55">
          Lesson {lesson.number}
        </span>
      </div>
      <div className="mt-4">
        {lesson.title ? (
          <>
            <p className="text-[17px] font-normal text-ink">{lesson.title}</p>
            {lesson.description && (
              <p className="mt-2 text-[14px] leading-[1.5] text-ink/65">{lesson.description}</p>
            )}
          </>
        ) : (
          <p className="text-[14px] text-ink/45">Details coming soon</p>
        )}
      </div>
      <div className="mt-auto flex items-center gap-1.5 pt-4 text-[14px] text-ink/60">
        <Clock className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
        {lesson.duration}
      </div>
    </div>
  );
}

export default function PillarProgrammeExplorer() {
  const [selectedYear, setSelectedYear] = useState(DEFAULT_YEAR);
  const [selectedPillar, setSelectedPillar] = useState<PillarName>(DEFAULT_PILLAR);
  const yearButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pillarButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pillarRowRef = useRef<HTMLDivElement | null>(null);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const programme = getProgramme(selectedPillar);
  const Icon = PILLAR_ICONS[selectedPillar];
  const lessons = programme.yearGroups[selectedYear];
  const fadeKey = `${selectedPillar}:${selectedYear}`;

  function focusYear(index: number) {
    const wrapped = (index + YEAR_GROUPS.length) % YEAR_GROUPS.length;
    setSelectedYear(YEAR_GROUPS[wrapped]);
    yearButtonRefs.current[wrapped]?.focus();
  }

  function handleYearKeyDown(e: KeyboardEvent, index: number) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      focusYear(index + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      focusYear(index - 1);
    }
  }

  function focusPillar(index: number) {
    const wrapped = (index + PILLARS.length) % PILLARS.length;
    setSelectedPillar(PILLARS[wrapped]);
    pillarButtonRefs.current[wrapped]?.focus();
  }

  function handlePillarKeyDown(e: KeyboardEvent, index: number) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      focusPillar(index + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      focusPillar(index - 1);
    }
  }

  useEffect(() => {
    const el = pillarRowRef.current;
    if (!el) return;

    function updateScrollFade() {
      if (!el) return;
      setCanScrollRight(el.scrollWidth - el.clientWidth - el.scrollLeft > 1);
    }

    updateScrollFade();
    el.addEventListener("scroll", updateScrollFade, { passive: true });
    const resizeObserver = new ResizeObserver(updateScrollFade);
    resizeObserver.observe(el);
    window.addEventListener("resize", updateScrollFade);

    return () => {
      el.removeEventListener("scroll", updateScrollFade);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateScrollFade);
    };
  }, []);

  const comingSoonBadge = programme.comingSoon && (
    <span className="rounded-full border border-white/30 px-2.5 py-0.5 text-[12px] text-white/80">
      Coming soon
    </span>
  );

  const pillarSummary = (
    <div>
      <LabelHeading>Year {selectedYear}</LabelHeading>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h3 className="text-[36px] font-light leading-[1.05] text-white md:text-[48px]">
          {selectedPillar}
        </h3>
        {comingSoonBadge}
      </div>
      <p className="mt-3 text-[19px] leading-[1.6] text-white/85">{programme.description}</p>
    </div>
  );

  const factLessons = (
    <div>
      <Layers className="h-7 w-7 text-white/80" strokeWidth={1.5} aria-hidden="true" />
      <p className="mt-3 text-[26px] font-light leading-[1.1] text-white">5 lessons</p>
      <p className="mt-1 text-[15px] text-white/75">
        A complete programme for Year {selectedYear}
      </p>
    </div>
  );

  const factDuration = (
    <div>
      <Clock className="h-7 w-7 text-white/80" strokeWidth={1.5} aria-hidden="true" />
      <p className="mt-3 text-[26px] font-light leading-[1.1] text-white">40-60 minutes</p>
      <p className="mt-1 text-[15px] text-white/75">per lesson</p>
    </div>
  );

  const factSkills = (
    <div>
      <BarChart className="h-7 w-7 text-white/80" strokeWidth={1.5} aria-hidden="true" />
      <p className="mt-3 text-[26px] font-light leading-[1.1] text-white">Skills for life</p>
      <p className="mt-1 text-[15px] text-white/75">Practical, real-world learning</p>
    </div>
  );

  return (
    <div className="mt-12">
      {/* 1. Year group */}
      <LabelHeading>1. Select a year group</LabelHeading>
      <div
        role="radiogroup"
        aria-label="Select a year group"
        className="[-ms-overflow-style:none] [scrollbar-width:none] mt-4 flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden lg:overflow-visible"
      >
        {YEAR_GROUPS.map((year, i) => {
          const selected = year === selectedYear;
          return (
            <button
              key={year}
              ref={(el) => {
                yearButtonRefs.current[i] = el;
              }}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={selected ? 0 : -1}
              onKeyDown={(e) => handleYearKeyDown(e, i)}
              onClick={() => setSelectedYear(year)}
              className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2.5 text-[15px] transition-colors lg:min-w-0 lg:flex-1 lg:px-3 ${
                selected ? "border-ink bg-ink text-white" : "border-ink/12 bg-white text-ink"
              }`}
            >
              Year {year}
            </button>
          );
        })}
      </div>

      <div className="my-8 h-px w-full bg-ink/10" aria-hidden="true" />

      {/* 2. Pillar */}
      <LabelHeading>2. Select a pillar</LabelHeading>
      <div className="relative mt-4">
        <div
          ref={pillarRowRef}
          role="radiogroup"
          aria-label="Select a pillar"
          className="[-ms-overflow-style:none] [scrollbar-width:none] flex gap-1.5 overflow-x-auto pb-1 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
        >
          {PILLARS.map((pillar, i) => {
            const selected = pillar === selectedPillar;
            const PillarIcon = PILLAR_ICONS[pillar];
            const tilePillarComingSoon = getProgramme(pillar).comingSoon;
            return (
              <button
                key={pillar}
                ref={(el) => {
                  pillarButtonRefs.current[i] = el;
                }}
                type="button"
                role="radio"
                aria-checked={selected}
                tabIndex={selected ? 0 : -1}
                onKeyDown={(e) => handlePillarKeyDown(e, i)}
                onClick={() => setSelectedPillar(pillar)}
                className={`flex h-[116px] min-w-[132px] flex-1 flex-col items-center justify-center rounded-[10px] px-1.5 py-4 text-center snap-start ring-1 ring-inset transition-colors ${
                  selected
                    ? "ring-ink/20 bg-ink/[0.04]"
                    : "ring-transparent hover:bg-ink/[0.04]"
                }`}
              >
                <PillarIcon
                  className={`h-7 w-7 shrink-0 ${selected ? "text-accent" : "text-ink"}`}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <span className="mt-2.5 w-full text-[14px] font-normal leading-[1.3] text-ink">
                  {pillar}
                </span>
                {tilePillarComingSoon && (
                  <span className="mt-1 text-[10px] uppercase tracking-[0.05em] text-ink/50">
                    Coming soon
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-paper to-transparent transition-opacity duration-200 ${
            canScrollRight ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div className="mt-8" aria-live="polite">
        <CrossFade fadeKey={fadeKey}>
          {/* Detail band — full width, ink background */}
          <div className="relative left-1/2 w-screen -translate-x-1/2 bg-ink py-12">
            <Container>
              {/* Desktop: four columns with vertical dividers */}
              <div className="hidden lg:grid lg:grid-cols-[34fr_22fr_22fr_22fr] lg:divide-x lg:divide-white/15">
                <div className="lg:pr-8">{pillarSummary}</div>
                <div className="lg:px-8">{factLessons}</div>
                <div className="lg:px-8">{factDuration}</div>
                <div className="lg:px-8">{factSkills}</div>
              </div>

              {/* Tablet and mobile: summary on top, facts in a row (tablet)
                  or stacked (mobile), with horizontal dividers. */}
              <div className="lg:hidden">
                {pillarSummary}
                <div className="mt-8 grid grid-cols-1 divide-y divide-white/15 border-t border-white/15 pt-8 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:border-t-0">
                  <div className="py-6 first:pt-0 sm:px-6 sm:py-0 sm:first:pl-0">
                    {factLessons}
                  </div>
                  <div className="py-6 sm:px-6 sm:py-0">{factDuration}</div>
                  <div className="py-6 last:pb-0 sm:px-6 sm:py-0 sm:last:pr-0">
                    {factSkills}
                  </div>
                </div>
              </div>
            </Container>
          </div>

          {/* Lesson cards */}
          <div className="relative mt-10 lg:min-h-[240px]">
            <svg
              className="absolute -top-10 left-6 hidden h-10 w-6 lg:block"
              viewBox="0 0 24 40"
              fill="none"
              aria-hidden="true"
            >
              <path d="M12 0 V30" stroke="#21D199" strokeWidth="2" />
              <path
                d="M6 24 L12 32 L18 24"
                stroke="#21D199"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div
              className={`[-ms-overflow-style:none] [scrollbar-width:none] flex items-stretch gap-3 overflow-x-auto pb-2 pt-1 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden lg:snap-none lg:gap-4 lg:overflow-visible lg:pb-0 ${
                programme.comingSoon ? "opacity-50" : ""
              }`}
            >
              {lessons.map((lesson, i) => (
                <Fragment key={lesson.number}>
                  <div className="w-[240px] shrink-0 snap-start lg:w-auto lg:min-w-0 lg:flex-1">
                    <LessonCard lesson={lesson} />
                  </div>
                  {i < lessons.length - 1 && (
                    <ArrowRight
                      className="shrink-0 self-center text-accent"
                      style={{ width: 20, height: 20 }}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </CrossFade>
      </div>
    </div>
  );
}

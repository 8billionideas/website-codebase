"use client";

import {
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
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/layout/Container";
import { PILLARS, type PillarName } from "@/content/curriculumMapping";
import { YEAR_GROUPS, getProgramme, type Lesson } from "@/lib/pillar-programmes";
import { CrossFade } from "@/components/curriculum/CrossFade";
import LevelModeToggle from "@/components/shared/LevelModeToggle";
import { useLevelMode } from "@/lib/level-mode";
import { formatLevel, formatLevelUpper } from "@/lib/year-grade";

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

function LessonBoxes({
  lessons,
  comingSoon,
  year,
}: {
  lessons: Lesson[];
  comingSoon: boolean;
  year: number;
}) {
  return (
    // Five equal boxes in a row from lg; below that they scroll sideways on one line.
    // Focusable so keyboard users can scroll the row.
    <div
      role="region"
      aria-label={`Lessons for Year ${year}`}
      tabIndex={0}
      className={`[-ms-overflow-style:none] [scrollbar-width:none] overflow-x-auto rounded-xl pb-1 [&::-webkit-scrollbar]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 lg:overflow-visible lg:pb-0 ${
        comingSoon ? "opacity-50" : ""
      }`}
    >
      <ol className="flex list-none snap-x snap-mandatory gap-3 p-0 lg:grid lg:snap-none lg:grid-cols-5">
        {lessons.map((lesson) => (
          <li
            key={lesson.number}
            className="flex min-h-[130px] w-[220px] shrink-0 snap-start flex-col rounded-xl border border-ink/10 bg-white p-4 md:w-[200px] lg:w-auto lg:min-w-0"
          >
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/[0.15] text-[13px] font-medium text-accent"
              >
                {lesson.number}
              </span>
              <span className="text-[12px] uppercase tracking-[0.15em] text-ink/55">
                Lesson {lesson.number}
              </span>
            </div>

            <div className="mt-3">
              {lesson.title ? (
                <>
                  <p className="line-clamp-2 text-[15px] font-normal leading-[1.4] text-ink">{lesson.title}</p>
                  {lesson.description && (
                    <p className="mt-1 line-clamp-3 text-[13px] leading-[1.45] text-ink/65">
                      {lesson.description}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-[13px] text-ink/45">Details coming soon</p>
              )}
            </div>

            <div className="mt-auto flex items-center gap-1.5 pt-3 text-[13px] text-ink/60">
              <Clock className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
              {lesson.duration}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function PillarProgrammeExplorer() {
  const [selectedYear, setSelectedYear] = useState(DEFAULT_YEAR);
  const [levelMode] = useLevelMode();
  const [selectedPillar, setSelectedPillar] = useState<PillarName>(DEFAULT_PILLAR);
  const yearButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pillarButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pillarRowRef = useRef<HTMLDivElement | null>(null);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const yearRowRef = useRef<HTMLDivElement | null>(null);
  const [canScrollYears, setCanScrollYears] = useState(false);

  const programme = getProgramme(selectedPillar);
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

  // The year/grade row can overflow too (Grades mode is wider); fade its right edge while
  // there's more to scroll. Re-checked when the mode changes, as the pills change width.
  useEffect(() => {
    const el = yearRowRef.current;
    if (!el) return;
    const update = () => setCanScrollYears(el.scrollWidth - el.clientWidth - el.scrollLeft > 1);
    update();
    el.addEventListener("scroll", update, { passive: true });
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      resizeObserver.disconnect();
    };
  }, [levelMode]);

  const comingSoonBadge = programme.comingSoon && (
    <span className="rounded-full border border-white/30 px-2.5 py-0.5 text-[12px] text-white/80">
      Coming soon
    </span>
  );

  const facts = [
    { icon: Layers, value: "5 lessons", label: `A complete programme for ${formatLevel(selectedYear, levelMode)}` },
    { icon: Clock, value: "40-60 minutes", label: "per lesson" },
    { icon: BarChart, value: "Skills for life", label: "Practical, real-world learning" },
  ];
  return (
    <div className="mt-12">
      {/* 1. Year group — label left, Years/Grades toggle right (below the label on mobile). */}
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <LabelHeading>{levelMode === "grades" ? "1. Select a grade" : "1. Select a year group"}</LabelHeading>
        <LevelModeToggle />
      </div>
      {/* One line; scrolls sideways where the pills don't fit (e.g. Grades mode, with the
          wider "Kindergarten" pill). Pills grow to fill the row when there's room. */}
      <div className="relative mt-4">
      <div
        ref={yearRowRef}
        role="radiogroup"
        aria-label={levelMode === "grades" ? "Select a grade" : "Select a year group"}
        className="[-ms-overflow-style:none] [scrollbar-width:none] flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden"
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
              className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2.5 text-[15px] transition-colors lg:flex-1 lg:px-3 ${
                selected ? "border-ink bg-ink text-white" : "border-ink/12 bg-white text-ink"
              }`}
            >
              {formatLevel(year, levelMode)}
            </button>
          );
        })}
      </div>
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute top-0 right-0 h-full w-10 bg-gradient-to-l from-paper to-transparent transition-opacity duration-200 ${
            canScrollYears ? "opacity-100" : "opacity-0"
          }`}
        />
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

      <div className="mt-5" aria-live="polite">
        <CrossFade fadeKey={fadeKey}>
          {/* Detail band — full width, ink background */}
          <div className="relative left-1/2 w-screen -translate-x-1/2 bg-ink py-7">
            <Container>
              {/* Desktop (xl): summary and facts side by side. Below xl: summary on top, facts below. */}
              <div className="xl:grid xl:grid-cols-[40fr_60fr] xl:items-center xl:gap-8">
                <div>
                  <p className="text-[12px] uppercase leading-[1.2] tracking-[0.25em] text-white/65">
                    {formatLevelUpper(selectedYear, levelMode)}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-3">
                    <h3 className="text-[30px] font-light leading-[1.1] text-white">{selectedPillar}</h3>
                    {comingSoonBadge}
                  </div>
                  {/* Two lines reserved from md so the band keeps a steady height between pillars. */}
                  <p className="mt-1 line-clamp-2 text-[15px] leading-[1.4] text-white/80 md:min-h-[2.8em]">
                    {programme.description}
                  </p>
                </div>

                <ul className="mt-5 flex list-none flex-col gap-3 p-0 md:flex-row md:gap-0 md:divide-x md:divide-white/15 xl:mt-0">
                  {facts.map(({ icon: FactIcon, value, label }) => (
                    <li
                      key={value}
                      className="flex items-start gap-3 md:flex-auto md:px-4 md:first:pl-0 md:last:pr-0"
                    >
                      <FactIcon
                        className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      <div>
                        <p className="whitespace-nowrap text-[15px] font-medium leading-[1.35] text-white">{value}</p>
                        <p className="text-balance text-[13px] leading-[1.35] text-white/65">{label}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Container>
          </div>

          {/* Lessons — five compact boxes */}
          <div className="mt-5">
            <LessonBoxes lessons={lessons} comingSoon={programme.comingSoon} year={selectedYear} />
          </div>
        </CrossFade>
      </div>
    </div>
  );
}

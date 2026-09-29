"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import {
  Lightbulb,
  Briefcase,
  Coins,
  Heart,
  Activity,
  Users,
  Leaf,
  Cpu,
  ChevronRight,
  Calculator,
  MessageCircle,
  FlaskConical,
  BookOpen,
  BarChart3,
  Settings,
  Palette,
  HeartPulse,
  type LucideIcon,
} from "lucide-react";
import { PILLARS, type PillarName } from "@/content/curriculumMapping";
import { SUBJECT_AREAS } from "@/lib/curriculum-subjects";

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

const AREA_ICONS: Record<string, LucideIcon> = {
  "Maths & Computing": Calculator,
  "English & Languages": MessageCircle,
  Sciences: FlaskConical,
  "Humanities & Social Sciences": BookOpen,
  "Business & Economics": BarChart3,
  "Design, Technology & Engineering": Settings,
  "Creative Arts & Media": Palette,
  "PE, Health & Wellbeing": HeartPulse,
};

type ViewMode = "subject" | "pillar";

// Small reusable pill, shared by the subject-row pillar tags and the
// "By pillar" view's subject list.
function PillarTag({ pillar }: { pillar: PillarName }) {
  const Icon = PILLAR_ICONS[pillar];
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2.5 text-[15px] font-normal text-ink">
      <Icon className="h-[18px] w-[18px] shrink-0 text-accent" strokeWidth={1.5} aria-hidden="true" />
      {pillar}
    </span>
  );
}

// Cross-fades between renders keyed by `fadeKey`, so switching a view, area
// or pillar doesn't cause a hard content swap. Skips the fade on first
// mount so the panel doesn't flash in on initial load.
function CrossFade({ fadeKey, children }: { fadeKey: string; children: ReactNode }) {
  const [visible, setVisible] = useState(true);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setVisible(false);
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [fadeKey]);

  return (
    <div
      className={`transition-opacity duration-200 motion-reduce:transition-none ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

export default function CurriculumExplorer() {
  const [view, setView] = useState<ViewMode>("subject");
  const [selectedAreaName, setSelectedAreaName] = useState(SUBJECT_AREAS[0].name);
  const [selectedPillar, setSelectedPillar] = useState<PillarName>("Entrepreneurship");
  const areaButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const viewTabRefs = useRef<Record<ViewMode, HTMLButtonElement | null>>({
    subject: null,
    pillar: null,
  });

  const activeArea =
    SUBJECT_AREAS.find((area) => area.name === selectedAreaName) ?? SUBJECT_AREAS[0];
  const ActiveAreaIcon = AREA_ICONS[activeArea.name];

  const pillarGroups = SUBJECT_AREAS.map((area) => ({
    area,
    subjects: area.subjects.filter((subject) => subject.pillars.includes(selectedPillar)),
  })).filter((group) => group.subjects.length > 0);
  const totalSubjectsForPillar = pillarGroups.reduce(
    (sum, group) => sum + group.subjects.length,
    0
  );
  const totalAreasForPillar = pillarGroups.length;

  function subjectCountLabel(count: number) {
    return `${count} subject${count === 1 ? "" : "s"}`;
  }

  function focusArea(index: number) {
    const wrapped = (index + SUBJECT_AREAS.length) % SUBJECT_AREAS.length;
    setSelectedAreaName(SUBJECT_AREAS[wrapped].name);
    areaButtonRefs.current[wrapped]?.focus();
  }

  function handleAreaKeyDown(e: KeyboardEvent, index: number) {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      focusArea(index + 1);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      focusArea(index - 1);
    }
  }

  function handleViewToggleKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      const next = view === "subject" ? "pillar" : "subject";
      setView(next);
      viewTabRefs.current[next]?.focus();
    }
  }

  const fadeKey = view === "subject" ? `subject:${selectedAreaName}` : `pillar:${selectedPillar}`;

  return (
    <div className="mt-12">
      {/* View toggle */}
      <div
        role="tablist"
        aria-label="Explore the curriculum"
        onKeyDown={handleViewToggleKeyDown}
        className="mx-auto flex w-fit items-center rounded-full border border-ink/12 p-1"
      >
        <button
          ref={(el) => {
            viewTabRefs.current.subject = el;
          }}
          type="button"
          role="tab"
          aria-selected={view === "subject"}
          tabIndex={view === "subject" ? 0 : -1}
          onClick={() => setView("subject")}
          className={`rounded-full px-8 py-3 text-[16px] font-normal transition-colors ${
            view === "subject" ? "bg-ink text-white" : "text-ink"
          }`}
        >
          By subject
        </button>
        <button
          ref={(el) => {
            viewTabRefs.current.pillar = el;
          }}
          type="button"
          role="tab"
          aria-selected={view === "pillar"}
          tabIndex={view === "pillar" ? 0 : -1}
          onClick={() => setView("pillar")}
          className={`rounded-full px-8 py-3 text-[16px] font-normal transition-colors ${
            view === "pillar" ? "bg-ink text-white" : "text-ink"
          }`}
        >
          By pillar
        </button>
      </div>

      {/* Pillar strip — all icons green at all times; only the "By pillar"
          selection state (weight + underline) changes. */}
      <div className="[-ms-overflow-style:none] [scrollbar-width:none] mt-8 flex divide-x divide-ink/10 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden lg:overflow-visible">
        {PILLARS.map((pillar) => {
          const Icon = PILLAR_ICONS[pillar];

          if (view === "pillar") {
            const selected = pillar === selectedPillar;
            return (
              <button
                key={pillar}
                type="button"
                onClick={() => setSelectedPillar(pillar)}
                aria-pressed={selected}
                className="flex w-[110px] shrink-0 flex-col items-center gap-2.5 px-2 py-1 text-center transition-colors hover:text-black lg:w-auto lg:min-w-0 lg:flex-1 lg:px-4"
              >
                <Icon className="h-9 w-9 shrink-0 text-accent" strokeWidth={1.5} aria-hidden="true" />
                <span
                  className={`text-[16px] leading-tight text-ink ${selected ? "font-medium" : "font-normal"}`}
                >
                  {pillar}
                </span>
                <span
                  className={`h-0.5 w-6 rounded-full ${selected ? "bg-accent" : "bg-transparent"}`}
                  aria-hidden="true"
                />
              </button>
            );
          }

          return (
            <div
              key={pillar}
              className="flex w-[110px] shrink-0 flex-col items-center gap-2.5 px-2 py-1 text-center lg:w-auto lg:min-w-0 lg:flex-1 lg:px-4"
            >
              <Icon className="h-9 w-9 shrink-0 text-accent" strokeWidth={1.5} aria-hidden="true" />
              <span className="text-[16px] font-normal leading-tight text-ink">{pillar}</span>
            </div>
          );
        })}
      </div>

      <div className="my-8 h-px w-full bg-ink/10" aria-hidden="true" />

      {view === "subject" ? (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[34fr_66fr] lg:gap-0 lg:divide-x lg:divide-ink/10">
          {/* Mobile/tablet: horizontal scrolling chips */}
          <div
            role="listbox"
            aria-label="Subject areas"
            className="[-ms-overflow-style:none] [scrollbar-width:none] flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden lg:hidden"
          >
            {SUBJECT_AREAS.map((area) => {
              const selected = area.name === selectedAreaName;
              const AreaIcon = AREA_ICONS[area.name];
              return (
                <button
                  key={area.name}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => setSelectedAreaName(area.name)}
                  className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-[13px] transition-colors ${
                    selected ? "border-ink bg-ink text-white" : "border-ink/15 text-ink/70"
                  }`}
                >
                  <AreaIcon className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  {area.name}
                </button>
              );
            })}
          </div>

          {/* Desktop: vertical list, roving tabindex */}
          <div
            role="listbox"
            aria-label="Subject areas"
            className="hidden lg:flex lg:flex-col lg:gap-2 lg:pr-8"
          >
            {SUBJECT_AREAS.map((area, i) => {
              const selected = area.name === selectedAreaName;
              const AreaIcon = AREA_ICONS[area.name];
              return (
                <button
                  key={area.name}
                  ref={(el) => {
                    areaButtonRefs.current[i] = el;
                  }}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  tabIndex={selected ? 0 : -1}
                  onKeyDown={(e) => handleAreaKeyDown(e, i)}
                  onClick={() => setSelectedAreaName(area.name)}
                  className={`flex w-full items-center gap-3 rounded-lg px-5 py-4 text-left transition-colors ${
                    selected ? "border border-transparent bg-ink" : "border border-ink/10 hover:bg-ink/[0.04]"
                  }`}
                >
                  <AreaIcon
                    className={`h-[22px] w-[22px] shrink-0 ${selected ? "text-white" : "text-ink"}`}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span
                    className={`flex-1 text-[18px] font-normal ${selected ? "text-white" : "text-ink"}`}
                  >
                    {area.name}
                  </span>
                  <ChevronRight
                    className={`h-[18px] w-[18px] shrink-0 ${selected ? "text-white" : "text-ink/40"}`}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>

          <div aria-live="polite" className="lg:pl-8 lg:min-h-[460px]">
            <CrossFade fadeKey={fadeKey}>
              <p className="text-[12px] uppercase tracking-[0.25em] text-ink/55">
                {activeArea.name}
              </p>
              <h3 className="mt-3 text-[40px] font-light leading-[1.1] tracking-[-0.01em] text-ink">
                How it maps
              </h3>
              <p className="mt-3 text-[17px] leading-[1.6] text-ink/65">
                Explore how our eight pillars connect to topics within {activeArea.name}.
              </p>

              <ul className="mt-8 divide-y divide-ink/10">
                {activeArea.subjects.map((subject) => (
                  <li
                    key={subject.name}
                    className="flex flex-col gap-3 py-6 lg:flex-row lg:items-start lg:justify-between lg:gap-6"
                  >
                    <div className="lg:w-[45%]">
                      <p className="text-[24px] font-normal text-ink">{subject.name}</p>
                      {subject.description && (
                        <p className="mt-1.5 text-[15px] text-ink/60">{subject.description}</p>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 lg:flex-1 lg:justify-end">
                      {subject.pillars.map((pillar) => (
                        <PillarTag key={pillar} pillar={pillar} />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </CrossFade>
          </div>
        </div>
      ) : (
        <div aria-live="polite" className="lg:min-h-[460px]">
          <CrossFade fadeKey={fadeKey}>
            <p className="text-[15px] text-ink/70">
              <span className="font-medium text-ink">{selectedPillar}</span> connects to{" "}
              {subjectCountLabel(totalSubjectsForPillar)} across {totalAreasForPillar} area
              {totalAreasForPillar === 1 ? "" : "s"}
            </p>
            <div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-2">
              {pillarGroups.map(({ area, subjects }) => {
                const AreaIcon = AREA_ICONS[area.name];
                return (
                  <div key={area.name}>
                    <p className="flex items-center gap-2 text-[12px] uppercase tracking-[0.25em] text-ink/55">
                      <AreaIcon className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                      {area.name}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {subjects.map((subject) => (
                        <span
                          key={subject.name}
                          className="rounded-full border border-ink/15 px-4 py-2.5 text-[15px] font-normal text-ink"
                        >
                          {subject.name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CrossFade>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Lightbulb,
  Briefcase,
  Coins,
  PiggyBank,
  Heart,
  Activity,
  Users,
  Flag,
  Leaf,
  Cpu,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { pillarCarousel, type ResolvedPillarCard } from "@/content/pillarCarousel";
import { PILLARS, type PillarName } from "@/content/curriculumMapping";
import { useLevelMode } from "@/lib/level-mode";
import { formatLevelUpper, type LevelMode } from "@/lib/year-grade";
import { withCriticalCurriculum } from "@/components/shared/CriticalCurriculumName";

const PILLAR_ICONS: Record<string, LucideIcon> = {
  Entrepreneurship: Lightbulb,
  Careers: Briefcase,
  "Financial Literacy": Coins,
  Wellbeing: Heart,
  Performance: Activity,
  Leadership: Users,
  Sustainability: Leaf,
  Technology: Cpu,
};

// Icons for the card's navy box specifically — kept separate
// from PILLAR_ICONS (which drives the icon row below) since the two lists
// differ for Financial Literacy and Leadership.
const EXAMPLE_PROJECT_ICONS: Record<string, LucideIcon> = {
  Entrepreneurship: Lightbulb,
  Careers: Briefcase,
  "Financial Literacy": PiggyBank,
  Wellbeing: Heart,
  Performance: Activity,
  Leadership: Flag,
  Sustainability: Leaf,
  Technology: Cpu,
};

// The navy box's content for one pillar: its example lesson (left-aligned), or, for pillars
// without one, the centred icon and supporting line.
function BoxContent({ card, mode }: { card: ResolvedPillarCard; mode: LevelMode }) {
  const Icon = EXAMPLE_PROJECT_ICONS[card.name] ?? Lightbulb;
  const lesson = card.exampleLesson;

  if (lesson) {
    return (
      <div className="text-left">
        <p className="flex items-center gap-2.5">
          <Icon className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.5} aria-hidden="true" />
          <span className="text-[12px] uppercase leading-[1.4] tracking-[0.2em] text-accent">
            {formatLevelUpper(lesson.year, mode)} · Example lesson
          </span>
        </p>
        <p className="mt-3 text-[18px] font-medium leading-[1.3] text-white">{lesson.title}</p>
        <p className="mt-2 text-[14px] leading-[1.5] text-white/80">{lesson.description}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center">
      {card.exampleImage ? (
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
          <Image
            src={card.exampleImage.src}
            alt={card.exampleImage.alt}
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>
      ) : (
        <Icon className="h-14 w-14 shrink-0 text-accent" strokeWidth={1.5} aria-hidden="true" />
      )}
      <p className="mt-4 max-w-[320px] text-[16px] font-normal leading-[1.5] text-white/85">
        {card.supportingLine}
      </p>
    </div>
  );
}

// The cards (with their Lesson Explorer examples resolved on the server; see CriticalCurriculum),
// in the shared pillar order (src/content/curriculumMapping.ts PILLARS).
export default function PillarCarousel({ cards: unsorted }: { cards: ResolvedPillarCard[] }) {
  const cards = [...unsorted].sort(
    (x, y) => PILLARS.indexOf(x.name as PillarName) - PILLARS.indexOf(y.name as PillarName)
  );
  const { eyebrow, headingLine1, headingLine2, subheading } = pillarCarousel;
  const [index, setIndex] = useState(0);
  const card = cards[index];
  const total = cards.length;
  const [mode] = useLevelMode();
  const rowRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const prevIndex = useRef(index);

  function go(next: number) {
    setIndex((next + total) % total);
  }

  // Only centre the active item when the row is actually the
  // horizontally-scrolling layout (below lg) — at lg+ it's a static
  // single-line row with no scroll container, so this is a no-op there.
  // Skipped on mount, and scrolls the row only (not scrollIntoView), so the
  // page itself never scrolls vertically.
  useEffect(() => {
    if (prevIndex.current === index) return;
    prevIndex.current = index;
    const row = rowRef.current;
    const item = itemRefs.current[index];
    if (!row || !item) return;
    if (row.scrollWidth > row.clientWidth) {
      const itemLeft = item.getBoundingClientRect().left - row.getBoundingClientRect().left + row.scrollLeft;
      row.scrollTo({ left: itemLeft - (row.clientWidth - item.clientWidth) / 2, behavior: "smooth" });
    }
  }, [index]);

  return (
    <div>
      <div className="text-center">
        <p className="text-caption uppercase tracking-[0.2em] text-muted">
          {eyebrow}
        </p>
        <h2 className="mx-auto mt-eyebrow max-w-3xl text-balance text-display text-ink">
          {headingLine1}
          <br />
          <em className="text-accent">{headingLine2}</em>
        </h2>
        <p className="mx-auto mt-lead max-w-[760px] text-body-lg text-muted">{withCriticalCurriculum(subheading)}</p>
      </div>

      {/* Icon row (above the card) — one line always. Below lg it scrolls horizontally
          (icon beside label); at lg+ it's a static single line spread with
          justify-between, icon stacked above label since side-by-side
          doesn't fit all eight labels at 1024px even at minimum sizes. */}
      <ul
        ref={rowRef}
        className="[-ms-overflow-style:none] [scrollbar-width:none] mt-content flex flex-nowrap items-center gap-4 overflow-x-auto pb-2 [mask-image:linear-gradient(to_right,black_0%,black_92%,transparent_100%)] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden lg:justify-between lg:gap-4 lg:overflow-visible lg:pb-0 lg:[mask-image:none] lg:snap-none"
      >
        {cards.map((c, i) => {
          const Icon = PILLAR_ICONS[c.name] ?? Lightbulb;
          const active = i === index;
          return (
            <li
              key={c.name}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="shrink-0 snap-start"
            >
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-current={active}
                className="flex items-center gap-2 lg:flex-col lg:gap-1"
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                    active ? "bg-accent/20 text-ink" : "text-muted"
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span
                  className={`whitespace-nowrap text-caption font-normal ${
                    active ? "text-ink" : "text-muted"
                  }`}
                >
                  {c.name}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Carousel — prev/next arrows sit outside the two columns. 24px below the row on
          mobile, 32px from md (the row has 8px of bottom padding below lg). */}
      <div className="relative mt-4 md:mt-6 lg:mt-8">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous pillar"
          className="absolute left-0 top-1/2 z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent/20 text-ink transition-colors hover:bg-accent/30 md:flex"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next pillar"
          className="absolute right-0 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-accent/20 text-ink transition-colors hover:bg-accent/30 md:flex"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* lg:pb-12: from lg the navy box hangs 48px below the photo; this keeps it inside the
            section's layout, so the section's bottom padding is measured from the box. */}
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 md:px-14 lg:pb-12">
          {/* LEFT — text */}
          <div>
            <p className="text-caption font-normal text-accent">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
            {/* Long names ("Entrepreneurship") are ~8.4× the font size wide, so
                scale down below lg to stay inside the column. */}
            <h3 className="mt-3 text-display text-ink max-md:text-[clamp(28px,10vw,48px)] md:max-lg:text-[28px]">{card.name}</h3>
            <p className="mt-4 max-w-md text-body-lg text-ink">{card.description}</p>
          </div>

          {/* RIGHT — blob image + navy box (icon and supporting line) */}
          <div className="relative mx-auto w-full max-w-[576px]">
            <svg
              viewBox="0 0 40 40"
              className="pointer-events-none absolute -left-12 top-9 hidden h-24 w-24 text-accent md:block"
              aria-hidden="true"
            >
              <path
                d="M2 30 C 10 10, 25 5, 38 12"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>

            <div
              className="relative aspect-square overflow-hidden border border-dashed border-ink/20 bg-surface"
              style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
            >
              {card.image ? (
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 768px) 576px, 100vw"
                  className="object-cover"
                  style={{ objectPosition: card.image.position }}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center px-8 text-center text-caption font-normal text-muted">
                  Image placeholder
                </div>
              )}
            </div>

            {/* Every pillar's content sits in the same grid cell, so the tallest sets the box's
                height and it doesn't jump between cards; only the active one is visible. From lg
                the box is anchored to the card's bottom-right and grows upwards over the photo. */}
            <div className="relative mt-4 w-full rounded-xl bg-ink p-6 shadow-lg lg:absolute lg:-bottom-12 lg:-right-9 lg:mt-0 lg:w-[420px]">
              {/* Pinned to the corner. Below lg the pill sits on the top edge instead (in the
                  16px gap below the photo). */}
              {card.comingSoon && (
                <span className="absolute top-0 right-3 -translate-y-1/2 rounded-full border border-accent bg-ink px-3 py-1 text-[12px] font-medium uppercase leading-none tracking-[0.15em] text-accent lg:top-3 lg:translate-y-0">
                  Coming soon
                </span>
              )}
              <div className="grid">
                {cards.map((c, i) => (
                  <div
                    key={c.name}
                    aria-hidden={i !== index}
                    className={`col-start-1 row-start-1 ${c.exampleLesson ? "self-start" : "self-center"} ${
                      i === index ? "visible" : "invisible"
                    }`}
                  >
                    <BoxContent card={c} mode={mode} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile arrows — the desktop pair above are hidden below md. */}
        <div className="mt-8 flex items-center justify-center gap-6 md:hidden">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous pillar"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-ink"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next pillar"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-ink"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

import { PILLARS, type PillarName } from "@/content/curriculumMapping";
import { pillarCarousel } from "@/content/pillarCarousel";

export const YEAR_GROUPS: number[] = Array.from({ length: 13 }, (_, i) => i + 1);
export const LESSON_NUMBERS = [1, 2, 3, 4, 5] as const;

export interface Lesson {
  number: (typeof LESSON_NUMBERS)[number];
  // null renders the "Details coming soon" state on the card.
  title: string | null;
  description: string | null;
  duration: "40-60 mins";
}

export interface PillarProgramme {
  pillar: PillarName;
  description: string;
  comingSoon: boolean;
  // Keyed by year group (1-13), each with exactly 5 lessons.
  yearGroups: Record<number, Lesson[]>;
}

interface LessonOverride {
  title?: string;
  description?: string;
}

// Fill in real lesson content here as it becomes available, e.g.:
// Leadership: { 7: { 1: { title: "…", description: "…" } } }
type OverrideMap = Partial<
  Record<PillarName, Partial<Record<number, Partial<Record<number, LessonOverride>>>>>
>;

const OVERRIDES: OverrideMap = {};

const COMING_SOON_PILLARS: ReadonlySet<PillarName> = new Set(["Sustainability", "Technology"]);

function pillarDescription(pillar: PillarName): string {
  const card = pillarCarousel.cards.find((c) => c.name === pillar);
  if (!card) {
    throw new Error(`No pillarCarousel card found for pillar "${pillar}"`);
  }
  return card.description;
}

function buildLessons(pillar: PillarName, year: number): Lesson[] {
  return LESSON_NUMBERS.map((number) => {
    const override = OVERRIDES[pillar]?.[year]?.[number];
    return {
      number,
      title: override?.title ?? null,
      description: override?.description ?? null,
      duration: "40-60 mins",
    };
  });
}

// Built programmatically: 8 pillars × 13 year groups × 5 lessons each.
export const PILLAR_PROGRAMMES: PillarProgramme[] = PILLARS.map((pillar) => ({
  pillar,
  description: pillarDescription(pillar),
  comingSoon: COMING_SOON_PILLARS.has(pillar),
  yearGroups: Object.fromEntries(
    YEAR_GROUPS.map((year) => [year, buildLessons(pillar, year)])
  ),
}));

export function getProgramme(pillar: PillarName): PillarProgramme {
  const programme = PILLAR_PROGRAMMES.find((p) => p.pillar === pillar);
  if (!programme) {
    throw new Error(`No programme found for pillar "${pillar}"`);
  }
  return programme;
}

import type { PillarName } from "@/content/curriculumMapping";
import { getPublishedProgramme } from "@/content/lesson-explorer";
import type { PillarCarouselCard, ResolvedPillarCard } from "@/content/pillarCarousel";

// Resolves the homepage pillar cards' Lesson Explorer examples ({ year, fromExplorer }) to the
// lesson's title and description from the explorer data. Server only (CriticalCurriculum), so the
// explorer data isn't sent to the browser. Throws, failing the build, if the lesson isn't in that
// year's published programme for the pillar.
export function resolvePillarCards(cards: PillarCarouselCard[]): ResolvedPillarCard[] {
  return cards.map((card) => {
    const example = card.exampleLesson;
    if (!example || !("fromExplorer" in example)) return { ...card, exampleLesson: example };
    const programme = getPublishedProgramme(example.year, card.name as PillarName);
    const lesson =
      programme?.type === "standard" ? programme.lessons.find((l) => l.title === example.fromExplorer) : undefined;
    if (!lesson) {
      throw new Error(
        `Homepage ${card.name} card: no "${example.fromExplorer}" lesson in the Lesson Explorer for Year ${example.year}.`
      );
    }
    return { ...card, exampleLesson: { year: example.year, title: lesson.title, description: lesson.description } };
  });
}

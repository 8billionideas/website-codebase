import type { PillarName } from "@/content/curriculumMapping";

// Links into the /curriculum Lesson Explorer from elsewhere on the page (the curriculum
// mapping panels): scroll to it and, when a year (and pillar) is given, select that programme.
export const LESSON_EXPLORER_ID = "lesson-explorer";
export const LESSON_EXPLORER_SELECT_EVENT = "lesson-explorer:select";

export interface LessonExplorerTarget {
  year: number | null;
  pillar: PillarName | null;
}

export function openLessonExplorer(target: LessonExplorerTarget) {
  if (target.year !== null) {
    window.dispatchEvent(new CustomEvent<LessonExplorerTarget>(LESSON_EXPLORER_SELECT_EVENT, { detail: target }));
  }
  const explorer = document.getElementById(LESSON_EXPLORER_ID);
  if (!explorer) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  explorer.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  // Keyboard and screen-reader users continue from the explorer.
  explorer.focus({ preventScroll: true });
}

// /gcse "Works with the curriculum you already follow": when each curriculum can start.
export interface GcseCurriculum {
  name: string;
  early: string;
  standard: string;
}

export const gcseCurricula: GcseCurriculum[] = [
  { name: "British", early: "Years 8–9", standard: "Years 10–11" },
  { name: "IB", early: "MYP 2–3", standard: "MYP 4–5" },
  { name: "American", early: "Grades 7–8", standard: "Grades 9–10" },
  { name: "Indian", early: "Classes 7–8", standard: "Classes 9–10" },
];

export const gcseCurriculaSection = {
  eyebrow: "ONE QUALIFICATION, ANY CURRICULUM",
  headingLine1: "Works with the curriculum",
  headingLine2: "you already follow",
  line: "Offer a two-year, project-based GCSE alongside your existing curriculum, with flexible starting points for your school.",
  reassurance: {
    title: "Not currently with OxfordAQA?",
    text: "Your school can still offer the qualification. You don't need to use OxfordAQA for your other subjects.",
  },
  earlyLabel: "EARLY START",
  standardLabel: "STANDARD START",
  closing: "The same two-year qualification, whichever curriculum you follow.",
};

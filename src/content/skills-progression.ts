// Homepage "Progressively building skills at every stage": four areas of learning, each shown as
// a five-stage progression. Stage labels come from the Years/Grades helper (src/lib/year-grade.ts),
// never hardcoded, and follow the site-wide Years/Grades choice.

export const skillsProgressionSection = {
  eyebrow: "A PROGRESSIVE JOURNEY",
  headingLine1: "Progressively building",
  // Second line: plain lead-in, then the accent phrase.
  headingLine2Lead: "skills",
  headingLine2: "at every stage",
  intro:
    "See how our four areas of learning develop throughout school, with each stage building on the last to strengthen students’ knowledge, confidence and independence.",
  tabsLabel: "Areas of learning",
};

// The five stages, e.g. "Years 1–3" / "Kindergarten–Grade 2".
export interface ProgressionBand {
  startYear: number;
  endYear: number;
}

export const progressionBands: ProgressionBand[] = [
  { startYear: 1, endYear: 3 },
  { startYear: 4, endYear: 6 },
  { startYear: 7, endYear: 9 },
  { startYear: 10, endYear: 11 },
  { startYear: 12, endYear: 13 },
];

export interface ProgressionArea {
  number: string;
  name: string;
  // One entry per band in progressionBands, in the same order.
  stages: [string, string, string, string, string];
}

export const progressionAreas: ProgressionArea[] = [
  {
    number: "01",
    name: "Explore & Understand",
    stages: [
      "Explore new ideas through curiosity, questioning and observation.",
      "Ask questions, make connections and explore different perspectives.",
      "Investigate ideas, question information and consider alternative explanations.",
      "Examine complex ideas, question assumptions and consider different viewpoints.",
      "Independently investigate unfamiliar ideas, challenge assumptions and develop deeper understanding.",
    ],
  },
  {
    number: "02",
    name: "Apply & Practise",
    stages: [
      "Build understanding and confidence through supported, practical activities.",
      "Apply learning to new challenges, making connections and improving through practice.",
      "Apply knowledge in increasingly complex situations, adapting approaches through feedback.",
      "Refine skills and approaches with greater independence in unfamiliar situations.",
      "Apply and adapt skills independently to complex, real-world challenges.",
    ],
  },
  {
    number: "03",
    name: "Analyse & Evaluate",
    stages: [
      "Notice differences, explore simple choices and explain their thinking.",
      "Compare information, consider different viewpoints and give reasons for decisions.",
      "Analyse information, evaluate evidence and consider different perspectives.",
      "Critically assess evidence, challenge assumptions and form reasoned conclusions.",
      "Evaluate competing arguments, weigh evidence and justify independent judgements.",
    ],
  },
  {
    number: "04",
    name: "Create & Reflect",
    stages: [
      "Explore creative ideas, try different approaches and reflect on what they've learnt.",
      "Develop ideas, test possible solutions and identify ways to improve.",
      "Create solutions, respond to feedback and reflect on their effectiveness.",
      "Develop original responses, evaluate outcomes and refine their approach.",
      "Create and refine complex solutions, critically reflecting on decisions and outcomes.",
    ],
  },
];

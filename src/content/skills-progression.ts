// Homepage Section 4: how the skills develop across year groups.
// Column labels come from the Years/Grades helper (src/lib/year-grade.ts), never hardcoded.

export const skillsProgressionSection = {
  index: "04",
  eyebrow: "A PROGRESSIVE JOURNEY",
  headingLine1: "Skills that grow",
  headingLine2: "with students",
  intro:
    "As students move through school, they build on the skills they've already developed and learn to use them in more challenging situations. Our curriculum is designed to support that progression, with learning that develops as students do.",
};

export const progressionYears = [1, 4, 7, 10, 13] as const;

export interface ProgressionRow {
  name: string;
  // One entry per year in progressionYears, in the same order.
  steps: [string, string, string, string, string];
}

export const progressionRows: ProgressionRow[] = [
  {
    name: "Discovering",
    steps: [
      "Exploring ideas through curiosity and questioning.",
      "Asking questions and exploring different perspectives.",
      "Investigating ideas and questioning information more closely.",
      "Examining evidence and considering different viewpoints.",
      "Critically evaluating ideas and challenging assumptions.",
    ],
  },
  {
    name: "Developing",
    steps: [
      "Building understanding through supported practice.",
      "Making connections and improving through practice.",
      "Developing approaches through feedback and reflection.",
      "Refining approaches with greater independence.",
      "Taking greater responsibility for improving their own work.",
    ],
  },
  {
    name: "Applying",
    steps: [
      "Using learning in familiar, practical situations.",
      "Using what they've learnt to work through new challenges.",
      "Using skills to solve increasingly complex problems.",
      "Making informed decisions in unfamiliar situations.",
      "Applying skills independently to complex, real-world challenges.",
    ],
  },
];

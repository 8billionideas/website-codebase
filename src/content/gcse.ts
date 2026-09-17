export interface GcseProject {
  year: string;
  title: string;
  description: string;
}

export const gcse = {
  title: "GCSE Qualification",
  projects: [
    {
      year: "Year 1",
      title: "Individual Project (60%)",
      description:
        "Students pick one of the eight pillars and answer a real question — like \"How can a young entrepreneur turn an idea into a successful business?\" — then present their answer as a journal, a presentation, and a written report.",
    },
    {
      year: "Year 2",
      title: "Group Project (40%)",
      description:
        "Working in a team, students research a real sustainability issue tied to a United Nations Sustainable Development Goal, then build and carry out an actual action plan.",
    },
  ] as GcseProject[],
  skillsLabel: "Skills built throughout",
  skills: [
    "Communication",
    "Self-Awareness",
    "Time Management",
    "Decision-Making",
    "Project Planning",
    "Analysing",
    "Research Skills",
    "Professional Presentation",
  ],
};

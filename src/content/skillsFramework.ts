export interface SkillsFrameworkColumn {
  number: string;
  heading: string;
  intro: string;
  skillsLabel: string;
  skills: string[];
}

export const skillsFramework = {
  eyebrow: "BUILT FOR LIFE",
  heading:
    "A clear set of skills running through every part of our curriculum",
  subheading:
    "Rather than teaching skills as standalone topics, we build them into different parts of the curriculum so students can practise, apply and strengthen them over time.",
  columns: [
    {
      number: "01",
      heading: "Discover",
      intro:
        "Students start being introduced to new ways of thinking, working and approaching unfamiliar ideas and challenges.",
      skillsLabel: "SKILLS BUILT HERE",
      skills: ["Research", "Critical Thinking", "Evaluation", "Curiosity"],
    },
    {
      number: "02",
      heading: "Develop",
      intro:
        "They build confidence by practising these skills across different areas of learning and in increasingly challenging ways.",
      skillsLabel: "SKILLS BUILT HERE",
      skills: ["Creativity", "Problem Solving", "Adaptability", "Digital Literacy"],
    },
    {
      number: "03",
      heading: "Apply",
      intro:
        "They use what they have learned in new situations, making decisions, solving problems and putting their skills into practice.",
      skillsLabel: "SKILLS BUILT HERE",
      skills: ["Communication", "Leadership", "Self-Management", "Global Awareness"],
    },
  ] as SkillsFrameworkColumn[],
  closing: {
    bold: "The skills stay with them.",
    light: "What changes is the level at which they use them.",
  },
};

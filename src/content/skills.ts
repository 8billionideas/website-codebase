// Homepage Section 3: the eight transferable skills that run through the curriculum.
export type SkillIcon =
  | "Brain"
  | "Lightbulb"
  | "Puzzle"
  | "MessageCircle"
  | "Users"
  | "ShieldCheck"
  | "User"
  | "Scale";

export interface Skill {
  icon: SkillIcon;
  title: string;
  text: string;
}

export const skillsSection = {
  eyebrow: "BUILT FOR LIFE",
  headingLine1: "8 transferable skills",
  headingLine2: "that run through our curriculum",
  intro:
    "We believe the skills students develop are just as important as the knowledge they gain. That's why these eight skills run through our curriculum, giving students the opportunity to build on their learning and become more confident using it in different situations.",
};

export const skills: Skill[] = [
  { icon: "Brain", title: "Critical Thinking", text: "Questioning information and evaluating evidence to form reasoned judgements." },
  { icon: "Lightbulb", title: "Creative Thinking", text: "Generating ideas and finding ways to improve them." },
  { icon: "Puzzle", title: "Problem-Solving", text: "Working through challenges to find and test solutions." },
  { icon: "MessageCircle", title: "Communication", text: "Expressing ideas clearly and listening to understand others." },
  { icon: "Users", title: "Collaboration", text: "Working together while respecting different perspectives." },
  { icon: "ShieldCheck", title: "Resilience", text: "Learning from setbacks and adapting when circumstances change." },
  { icon: "User", title: "Self-Awareness", text: "Understanding your strengths and reflecting on growth." },
  { icon: "Scale", title: "Decision-Making", text: "Considering options and making informed, responsible choices." },
];

// Homepage "How learning works" band (between Sections 3 and 4).
export const howLearningWorks = {
  eyebrow: "HOW LEARNING WORKS",
  headingLine1: "Students discover, develop and apply these skills",
  headingLine2: "throughout their learning journey.",
  stages: [
    { title: "Discovering", text: "Explore new ideas, ask questions and build understanding." },
    { title: "Developing", text: "Strengthen skills through practice and make connections." },
    { title: "Applying", text: "Use learning in different situations and take it beyond the classroom." },
  ],
};

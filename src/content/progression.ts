export interface ProgressionCell {
  verb: string;
  text: string;
}

export interface ProgressionCategory {
  name: string;
  icon: "Compass" | "TrendingUp" | "Target";
  cells: ProgressionCell[];
}

export const progression = {
  index: "04",
  eyebrow: "A PROGRESSIVE JOURNEY",
  heading: "A clear progression in how students develop and apply their skills",
  subheading:
    "As students move through the curriculum, they revisit the same core skills with greater challenge, independence and depth, giving them more opportunities to use what they know in increasingly complex ways",
  annotation: "A clearer path to what's next.",
  yearHeaders: ["YEAR 1 / EXPLORE", "YEAR 3 / BUILD", "YEAR 7 / DEEPEN", "YEAR 10 / LEAD"],
  categories: [
    {
      name: "Discover",
      icon: "Compass",
      cells: [
        {
          verb: "Notice & question",
          text: "Start to look more closely, ask why and connect new ideas with things they already know.",
        },
        {
          verb: "Investigate & connect",
          text: "Look beyond first answers, gather information and begin to recognise how different ideas connect.",
        },
        {
          verb: "Analyse & challenge",
          text: "Compare evidence, question assumptions and build reasoned views from different perspectives.",
        },
        {
          verb: "Evaluate & judge",
          text: "Weigh evidence, challenge assumptions and form well-reasoned conclusions with greater independence.",
        },
      ],
    },
    {
      name: "Develop",
      icon: "TrendingUp",
      cells: [
        {
          verb: "Confidence through trying",
          text: "Explore different approaches, learn from what works and keep going when something feels unfamiliar.",
        },
        {
          verb: "Test & improve",
          text: "Try more considered approaches, learn from feedback and make changes that improve the outcome.",
        },
        {
          verb: "Refine & solve",
          text: "Apply knowledge in more complex situations, test ideas and improve solutions through reflection.",
        },
        {
          verb: "Innovate & justify",
          text: "Develop original responses, test their effectiveness and explain why one approach is stronger than another.",
        },
      ],
    },
    {
      name: "Apply",
      icon: "Target",
      cells: [
        {
          verb: "Simple Actions",
          text: "Use what they know to make choices, solve familiar problems and explain their thinking to others.",
        },
        {
          verb: "Contribute with purpose",
          text: "Take an active role with others, build on different ideas and help move shared work forward.",
        },
        {
          verb: "Lead & collaborate",
          text: "Take greater responsibility, navigate different viewpoints and help others work towards shared goals.",
        },
        {
          verb: "Influence & lead",
          text: "Take ownership, bring others with you and make informed decisions that move shared work forward.",
        },
      ],
    },
  ] as ProgressionCategory[],
  bottom: {
    eyebrow: "PREPARED FOR WHAT'S NEXT",
    line: "The skills they build today, they'll take into tomorrow.",
    tags: ["MORE CONFIDENT", "MORE CAPABLE", "A BRIGHTER FUTURE"],
  },
};

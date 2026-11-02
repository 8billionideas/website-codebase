// The eight pillars: approved names and display order (every pillar row, pill set and carousel
// follows this order).
export const PILLARS = [
  "Entrepreneurship",
  "Leadership",
  "Wellbeing",
  "Performance",
  "Careers",
  "Financial Literacy",
  "Sustainability",
  "Technology",
] as const;

export type PillarName = (typeof PILLARS)[number];

// Earlier pillar names still used as keys in some data (e.g. the lesson explorer programmes),
// mapped to their current names.
export const LEGACY_PILLAR_NAMES = { "Health & Performance": "Performance" } as const satisfies Record<
  string,
  PillarName
>;
export type LegacyPillarName = keyof typeof LEGACY_PILLAR_NAMES;

export function currentPillarName(name: PillarName | LegacyPillarName): PillarName {
  return name in LEGACY_PILLAR_NAMES ? LEGACY_PILLAR_NAMES[name as LegacyPillarName] : (name as PillarName);
}
export type Strength = "strong" | "light" | "none";

export interface MatrixSkill {
  name: string;
  definition: string;
  pillars: PillarName[];
}

export interface MatrixCategory {
  key: string;
  name: string;
  description: string;
  strengths: Record<PillarName, Strength>;
  skills: MatrixSkill[];
}

export const curriculumMapping = {
  title: "Curriculum Mapping",
  heading:
    "Explore how each pillar complements the subjects within your current curriculum",
  intro:
    "Explore the curriculum from either direction, starting with the subjects you already teach or one of our pillars, to see where the learning naturally complements and strengthens what students are already doing.",
  categories: [
    {
      key: "question",
      name: "Question",
      description:
        "Students explore ideas, research issues and ask better questions.",
      strengths: {
        Entrepreneurship: "none",
        Careers: "strong",
        "Financial Literacy": "light",
        Wellbeing: "light",
        Performance: "none",
        Leadership: "light",
        Sustainability: "strong",
        Technology: "light",
      },
      skills: [
        {
          name: "Careers",
          definition:
            "Understanding pathways and what different careers actually involve day to day.",
          pillars: ["Careers"],
        },
        {
          name: "Critical Thinking",
          definition: "Questioning assumptions and reasoning through evidence.",
          pillars: ["Careers", "Financial Literacy", "Sustainability", "Technology"],
        },
        {
          name: "Ethical Thinking",
          definition:
            "Reasoning through right and wrong in complex, real situations.",
          pillars: ["Leadership", "Sustainability"],
        },
        {
          name: "Psychological Literacy",
          definition: "Understanding your own thinking and emotional patterns.",
          pillars: ["Wellbeing"],
        },
      ],
    },
    {
      key: "create",
      name: "Create",
      description: "Students turn ideas into solutions and bring them to life.",
      strengths: {
        Entrepreneurship: "strong",
        Careers: "light",
        "Financial Literacy": "light",
        Wellbeing: "none",
        Performance: "strong",
        Leadership: "none",
        Sustainability: "none",
        Technology: "strong",
      },
      skills: [
        {
          name: "Entrepreneurship",
          definition: "Turning an idea into something real, from scratch.",
          pillars: ["Entrepreneurship"],
        },
        {
          name: "Creativity",
          definition:
            "Generating genuinely new ideas, not just following a process.",
          pillars: ["Entrepreneurship", "Technology"],
        },
        {
          name: "Digital Fluency",
          definition: "Confident, safe, and purposeful use of technology.",
          pillars: ["Careers", "Technology"],
        },
        {
          name: "Smart Productivity",
          definition:
            "Managing time and energy effectively, not just working harder.",
          pillars: ["Performance", "Financial Literacy"],
        },
        {
          name: "Focus",
          definition:
            "The ability to concentrate deeply in an increasingly distracting world.",
          pillars: ["Performance"],
        },
      ],
    },
    {
      key: "collaborate",
      name: "Collaborate",
      description:
        "Students work with others, share ideas and make a bigger difference.",
      strengths: {
        Entrepreneurship: "strong",
        Careers: "strong",
        "Financial Literacy": "none",
        Wellbeing: "strong",
        Performance: "light",
        Leadership: "strong",
        Sustainability: "light",
        Technology: "none",
      },
      skills: [
        {
          name: "Self Leadership",
          definition:
            "The confidence to take initiative and make decisions without needing constant direction.",
          pillars: ["Leadership", "Entrepreneurship"],
        },
        {
          name: "Social Skills",
          definition:
            "The ability to work well with others – increasingly cited by employers as harder to find than technical skills.",
          pillars: ["Wellbeing", "Leadership"],
        },
        {
          name: "Emotional Intelligence",
          definition: "Reading and managing emotions – in yourself and others.",
          pillars: ["Wellbeing"],
        },
        {
          name: "Health Literacy",
          definition:
            "Understanding how to look after physical and mental wellbeing long-term.",
          pillars: ["Performance"],
        },
        {
          name: "Community Impact",
          definition:
            "Understanding how individual actions contribute to the wider community.",
          pillars: ["Careers", "Wellbeing", "Entrepreneurship"],
        },
        {
          name: "Global Citizenship",
          definition: "Understanding how local choices connect to global issues.",
          pillars: ["Sustainability", "Careers"],
        },
      ],
    },
  ] as MatrixCategory[],
  footnote: {
    pre: "This is illustrative – every school's framework is different. ",
    linkLabel: "Get in touch",
    post: " and we'll map our pillars directly to yours.",
  },
};

export interface CurriculumHeroImage {
  src: string;
  alt: string;
  position: string;
}

export const curriculumHero = {
  eyebrow: "OUR CURRICULUM",
  headingLead: "A ready-to-teach curriculum",
  headingAccent: "built to enhance your current curriculum",
  intro:
    "Designed to work week to week within the timetable you already have, our curriculum gives you structured learning across the year groups and areas that matter to your school, with every lesson fully built and ready for teachers to deliver.",
  facts: [
    { value: "8", label: "PILLARS" },
    { value: "8", label: "CORE SKILLS" },
    { value: "Year 1–13", label: "ONE JOURNEY" },
  ],
  // When set, the hero gets the same full-width background image treatment
  // as the Case Studies hero. While null, it's a plain paper background.
  heroImage: {
    src: "/images/curriculum/hero.webp",
    alt: "Teachers planning lessons together around a table",
    position: "right center",
  } as CurriculumHeroImage | null,
};

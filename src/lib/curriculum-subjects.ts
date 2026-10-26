import { type PillarName, type Strength } from "@/content/curriculumMapping";

export interface Subject {
  name: string;
  // null renders nothing (no empty line). Not yet written for any subject.
  description: string | null;
  pillars: PillarName[];
}

export interface SubjectArea {
  name: string;
  subjects: Subject[];
}

export const SUBJECT_AREAS: SubjectArea[] = [
  {
    name: "Maths & Computing",
    subjects: [
      {
        name: "Maths",
        description: null,
        pillars: ["Financial Literacy", "Entrepreneurship", "Technology"],
      },
      {
        name: "Statistics",
        description: null,
        pillars: ["Financial Literacy", "Technology", "Entrepreneurship"],
      },
      {
        name: "Computer Science",
        description: null,
        pillars: ["Technology", "Entrepreneurship"],
      },
    ],
  },
  {
    name: "English & Languages",
    subjects: [
      {
        name: "English",
        description: null,
        pillars: ["Entrepreneurship", "Leadership", "Careers"],
      },
      {
        name: "Modern Foreign Languages",
        description: null,
        pillars: ["Careers", "Leadership", "Entrepreneurship"],
      },
      {
        name: "Classics",
        description: null,
        pillars: ["Leadership", "Entrepreneurship", "Careers"],
      },
    ],
  },
  {
    name: "Sciences",
    subjects: [
      {
        name: "Science",
        description: null,
        pillars: ["Sustainability", "Performance", "Technology"],
      },
      {
        name: "Environmental Science",
        description: null,
        pillars: ["Sustainability", "Technology", "Entrepreneurship"],
      },
      {
        name: "Psychology",
        description: null,
        pillars: ["Wellbeing", "Performance", "Leadership"],
      },
    ],
  },
  {
    name: "Humanities & Social Sciences",
    subjects: [
      { name: "Geography", description: null, pillars: ["Sustainability", "Leadership"] },
      {
        name: "History",
        description: null,
        pillars: ["Leadership", "Entrepreneurship", "Sustainability"],
      },
      {
        name: "Religious Studies",
        description: null,
        pillars: ["Wellbeing", "Leadership", "Sustainability"],
      },
      {
        name: "Sociology",
        description: null,
        pillars: ["Wellbeing", "Sustainability", "Leadership"],
      },
      {
        name: "Politics",
        description: null,
        pillars: ["Leadership", "Sustainability", "Careers"],
      },
      {
        name: "Citizenship",
        description: null,
        pillars: ["Leadership", "Sustainability", "Financial Literacy"],
      },
    ],
  },
  {
    name: "Business & Economics",
    subjects: [
      {
        name: "Business Studies / Enterprise",
        description: null,
        pillars: ["Entrepreneurship", "Financial Literacy", "Leadership", "Careers"],
      },
      {
        name: "Economics",
        description: null,
        pillars: ["Financial Literacy", "Entrepreneurship", "Sustainability", "Careers"],
      },
      {
        name: "Travel & Tourism",
        description: null,
        pillars: ["Careers", "Entrepreneurship", "Sustainability"],
      },
    ],
  },
  {
    name: "Design, Technology & Engineering",
    subjects: [
      {
        name: "Design & Technology",
        description: null,
        pillars: ["Entrepreneurship", "Technology", "Sustainability"],
      },
      {
        name: "Engineering",
        description: null,
        pillars: ["Technology", "Entrepreneurship", "Sustainability"],
      },
      {
        name: "Architecture",
        description: null,
        pillars: ["Technology", "Sustainability", "Entrepreneurship"],
      },
      {
        name: "Food Technology / Nutrition",
        description: null,
        pillars: ["Wellbeing", "Sustainability", "Entrepreneurship"],
      },
    ],
  },
  {
    name: "Creative Arts & Media",
    subjects: [
      { name: "Art & Design", description: null, pillars: ["Entrepreneurship", "Wellbeing"] },
      {
        name: "Drama / Theatre",
        description: null,
        pillars: ["Performance", "Wellbeing", "Leadership", "Careers"],
      },
      {
        name: "Music",
        description: null,
        pillars: ["Performance", "Wellbeing", "Entrepreneurship"],
      },
      {
        name: "Media Studies",
        description: null,
        pillars: ["Technology", "Entrepreneurship", "Careers", "Leadership"],
      },
      {
        name: "Film Studies",
        description: null,
        pillars: ["Technology", "Entrepreneurship", "Careers"],
      },
      {
        name: "Photography",
        description: null,
        pillars: ["Technology", "Entrepreneurship", "Careers"],
      },
    ],
  },
  {
    name: "PE, Health & Wellbeing",
    subjects: [
      {
        name: "PE & Sports Science",
        description: null,
        pillars: ["Wellbeing", "Performance", "Leadership", "Technology"],
      },
      {
        name: "PSHE / Health & Wellbeing",
        description: null,
        pillars: ["Wellbeing", "Performance", "Careers", "Financial Literacy"],
      },
      {
        name: "Health & Social Care",
        description: null,
        pillars: ["Wellbeing", "Performance", "Careers"],
      },
    ],
  },
];

// Strength is calculated from the data, never hardcoded: for a given area,
// count how many of its subjects list the pillar, then compare that count
// against half the area's subject total.
export function getConnectionStrength(area: SubjectArea, pillar: PillarName): Strength {
  const count = area.subjects.filter((subject) => subject.pillars.includes(pillar)).length;
  if (count === 0) return "none";
  return count / area.subjects.length >= 0.5 ? "strong" : "light";
}

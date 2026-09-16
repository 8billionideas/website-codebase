export interface Pillar {
  name: string;
  description: string;
  // A worked example shown on expand. Omitted entirely for comingSoon pillars.
  course?: string;
  explanation?: string;
  // True when course/explanation are placeholder copy, not real content yet.
  placeholder?: boolean;
  // True when the pillar has no example yet and isn't expandable at all.
  comingSoon?: boolean;
}

export const pillars: Pillar[] = [
  {
    name: "Entrepreneurship",
    description:
      "Build initiative, creativity, and the confidence to turn ideas into action.",
    course: "[PLACEHOLDER — needs real example]",
    explanation: "[PLACEHOLDER]",
    placeholder: true,
  },
  {
    name: "Careers",
    description:
      "Help students explore pathways, purpose, and the fast-changing world of work.",
    course: "Internship",
    explanation:
      "3–5 day course taking students through different areas of a business — HR, Product, Sales & Marketing, and Operations",
  },
  {
    name: "Wellbeing",
    description:
      "Develop emotional resilience, self-awareness, and healthy habits that last a lifetime.",
    course: "[PLACEHOLDER — needs real example]",
    explanation: "[PLACEHOLDER]",
    placeholder: true,
  },
  {
    name: "Leadership",
    description:
      "Grow communication, decision-making, and the ability to positively influence others.",
    course: "[PLACEHOLDER — needs real example]",
    explanation: "[PLACEHOLDER]",
    placeholder: true,
  },
  {
    name: "Financial Literacy",
    description:
      "Give students the knowledge to manage money, risk, and real-world decisions.",
    course: "[PLACEHOLDER — needs real example]",
    explanation: "[PLACEHOLDER]",
    placeholder: true,
  },
  {
    name: "Health & Performance",
    description:
      "Equip students with the mindset and discipline to perform under pressure.",
    course: "[PLACEHOLDER — needs real example]",
    explanation: "[PLACEHOLDER]",
    placeholder: true,
  },
  {
    name: "Sustainability",
    description:
      "Inspire students to think critically about the planet and act on meaningful change.",
    comingSoon: true,
  },
  {
    name: "Technology",
    description:
      "Help learners understand, question, and use technology with purpose and confidence.",
    comingSoon: true,
  },
];

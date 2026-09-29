export interface GcseProjectCard {
  label: string;
  title: string;
  line: string;
  taughtHours: number;
  guidedHours: number;
  outcomes: string[];
}

export interface GcsePillarTile {
  name: string;
  question: string;
}

export interface GcseIconPoint {
  icon: string;
  title: string;
}

export interface GcseIconTextPoint {
  icon: string;
  title: string;
  description: string;
}

export interface GcseQuote {
  quote: string;
  name: string;
  role: string;
}

export const gcse = {
  hero: {
    eyebrow: "THE QUALIFICATION",
    headingLine1: "OxfordAQA International GCSE",
    headingLine2: "Global Skills Projects",
    subline:
      "A real qualification built on real projects, not exams — developed with OxfordAQA, delivered by 8billionideas.",
    // Set to a date string (e.g. "September 2027") to show a small pill
    // above the H1. Leave null to render nothing.
    launchDate: null as string | null,
  },

  whatItIs: {
    eyebrow: "WHAT IT IS",
    headingLine1: "A GCSE that sits alongside",
    headingLine2: "your core subjects",
    paragraphs: [
      "International GCSE Global Skills Projects is a qualification from OxfordAQA, designed to sit alongside core GCSE subjects such as English, maths, sciences and languages.",
      "Students can start developing global skills from the beginning of secondary school, building towards formal GCSE assessment through two structured, assessed projects.",
      "As the official delivery partner, 8billionideas provides the lessons, resources, platform and support schools need to deliver it.",
    ],
  },

  howItWorks: {
    eyebrow: "HOW IT WORKS",
    headingLine1: "Two projects,",
    headingLine2: "two years",
    // Hours and outcomes are easy to update here once checked against the
    // OxfordAQA specification.
    cards: [
      {
        label: "FIRST YEAR",
        title: "Individual project",
        line: "Each student explores a topic linked to one or two of our eight pillars.",
        taughtHours: 35,
        guidedHours: 35,
        outcomes: ["Journal", "Presentation", "Written report"],
      },
      {
        label: "SECOND YEAR",
        title: "Group project",
        line: "Students work together on a project linked to one of the United Nations Sustainable Development Goals.",
        taughtHours: 25,
        guidedHours: 25,
        outcomes: ["Journal", "Written report"],
      },
    ] as GcseProjectCard[],
  },

  projectThemes: {
    eyebrow: "PROJECT THEMES",
    headingLine1: "Real questions,",
    headingLine2: "real-world challenges",
    firstYearHeading: "First year: the eight pillars",
    firstYearLine:
      "Individual projects explore one or two of the eight pillars. Example questions:",
    pillars: [
      {
        name: "Entrepreneurship",
        question: "How can a young entrepreneur turn an idea into a successful business?",
      },
      {
        name: "Careers",
        question: "How can young people prepare for a career in a continuously changing world?",
      },
      {
        name: "Wellbeing",
        question:
          "How can schools better support the mental health and wellbeing of their students?",
      },
      {
        name: "Leadership",
        question: "What makes an effective leader in times of global crisis?",
      },
      {
        name: "Health & Performance",
        question: "How does sports psychology impact the performance of elite athletes?",
      },
      {
        name: "Financial Literacy",
        question:
          "What are the most effective ways to teach financial independence to teenagers?",
      },
      {
        name: "Sustainability",
        question: "How can local communities reduce their carbon footprint effectively?",
      },
      {
        name: "Technology",
        question: "What role will artificial intelligence play in the future of education?",
      },
    ] as GcsePillarTile[],
    secondYearHeading: "Second year: a United Nations goal",
    secondYearLine:
      "Group projects work towards one of the United Nations Sustainable Development Goals, applying what students have learned to a shared, real-world challenge.",
  },

  platform: {
    eyebrow: "THE PLATFORM",
    headingLine1: "Run the whole qualification",
    headingLine2: "in one place",
    body: "Plan and deliver every lesson, and follow each student's progress through their projects, all on one platform.",
    points: [
      { icon: "BookOpen", title: "Every lesson ready to teach" },
      { icon: "TrendingUp", title: "Follow each project as it develops" },
      { icon: "LayoutGrid", title: "Lessons, resources and progress together" },
    ] as GcseIconPoint[],
    // Set to true once a real platform video is ready. While false, no
    // "See the platform" button or video area renders — no placeholder.
    showPlatformVideo: false,
  },

  partnership: {
    eyebrow: "THE PARTNERSHIP",
  },

  whyUs: {
    eyebrow: "WHY 8BILLIONIDEAS",
    headingLine1: "Why partner",
    headingLine2: "with us?",
    points: [
      {
        icon: "Rocket",
        title: "Implementation",
        description:
          "A dedicated partnership manager and a one-stop digital platform for delivery and guidance",
      },
      {
        icon: "BookOpen",
        title: "Experience",
        description:
          "Full access to all our lessons and educational content for students and teachers",
      },
      {
        icon: "Users",
        title: "Community",
        description:
          "Mentorship opportunities and a global network of forward-thinking schools",
      },
    ] as GcseIconTextPoint[],
  },

  quotesLabel: "WHAT OUR PARTNERS SAY",
  quotes: [
    {
      quote:
        "Partnering with 8billionideas reflects OxfordAQA's commitment to preparing students not just for exams, but for the world beyond them.",
      name: "Jennifer Duggan",
      role: "Head of International Qualifications, OxfordAQA",
    },
    {
      // Placeholder — do not write a quote here. While this starts with
      // "[Paste", the card renders a dashed border and "Quote to be added."
      quote: "[Paste approved quote here]",
      name: "Emily Cheffins",
      role: "Chief Examiner, OxfordAQA",
    },
    {
      quote:
        "This International GCSE is a milestone in education, bridging the gap between traditional academics and the critical skills needed for the future.",
      name: "David Harkin",
      role: "CEO, 8billionideas",
    },
  ] as GcseQuote[],

  recognition: {
    eyebrow: "RECOGNITION",
    line: "Shortlisted for the T4 Education Global EdTech Prize 2026, Top 25 Start-Ups",
  },

  championSchoolsHeadline: "Our champion schools",

  // The fourth question reuses the homepage FAQ's answer exactly — see
  // gcse/page.tsx, which imports it from homepageFaqs rather than
  // retyping it here.
  faq: {
    heading: "Frequently asked questions",
    items: [
      {
        question: "How does the qualification work?",
        paragraphs: ["Answer coming soon"],
      },
      {
        question: "How will this qualification help students stand out?",
        paragraphs: ["Answer coming soon"],
      },
      {
        question: "If a student leaves after the first year, do they receive a certificate?",
        paragraphs: ["Answer coming soon"],
      },
    ],
  },

  closingCta: {
    headingLine1: "Ready to give your students",
    headingLine2: "the opportunity of a lifetime?",
  },
};

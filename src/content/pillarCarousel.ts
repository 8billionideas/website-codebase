export interface PillarExampleLesson {
  // UK year group; shown through the Years/Grades helper.
  year: number;
  title: string;
  description: string;
}

export interface PillarCarouselCard {
  name: string;
  description: string;
  // Kept for reference; no longer rendered on the card.
  exampleProject: string;
  // Short line shown under the icon in the card's navy box. Now only shown for pillars without
  // an example lesson (the "Coming soon" ones); kept on every card in case it's needed again.
  supportingLine: string;
  // Example lesson shown in the card's navy box. null shows the icon and supporting line instead.
  exampleLesson: PillarExampleLesson | null;
  image?: { src: string; alt: string; position: string } | null;
  // Optional real photo for the navy box. When set, it replaces the
  // pillar's icon; the supporting line still shows.
  exampleImage?: { src: string; alt: string } | null;
  // Shows a "Coming soon" pill on the homepage card and marks the pillar's
  // programme as coming soon on the curriculum page.
  comingSoon?: boolean;
}

export const pillarCarousel = {
  eyebrow: "THE CURRICULUM",
  // Heading: the first part in ink, the second in italic accent-green.
  headingLine1: "One progressive journey across",
  headingLine2: "eight Pillars of Learning",
  subheading:
    "At the heart of everything we do is The Critical Curriculum. Each of its eight pillars has ready-to-teach lessons from ages 5–18, so future skills build as students move through school. Choose the year groups and pillars that suit your school and fit the lessons into your week in the way that works for your teachers and students.",
  cards: [
    {
      name: "Entrepreneurship",
      exampleLesson: {
        year: 3,
        title: "Meet Your First Customer",
        description:
          "Students learn how to identify their target customers, create customer profiles and use these insights to design a toy that meets their needs.",
      },
      supportingLine: "Spotting problems, testing ideas and taking initiative",
      description: "Building an entrepreneurial mindset that helps students turn their ideas into real action",
      exampleProject:
        "Lightbulb Moments – turning a first idea into something they can actually show.",
      image: {
        src: "/images/pillars/entrepreneurship.webp",
        alt: "Primary pupils building a model snack shop stall from card and paper cups",
        position: "center 55%",
      },
    },
    {
      name: "Leadership",
      exampleLesson: {
        year: 12,
        title: "The Boss Fight Practical",
        description:
          "Students put their critical-thinking and communication skills to the test, learning to identify flawed arguments, challenge reasoning and respond confidently in live debates.",
      },
      supportingLine: "Communicating clearly, making decisions and bringing others with you",
      description:
        "Exploring how people bring others with them, make decisions and create positive change",
      exampleProject:
        "Leadership Styles – working through real high-pressure scenarios.",
      image: {
        src: "/images/pillars/leadership.webp",
        alt: "A student presenting her ideas to classmates at the front of the classroom",
        position: "center 35%",
      },
    },
    {
      name: "Wellbeing",
      exampleLesson: {
        year: 7,
        title: "Challenging the Myths",
        description:
          "Students investigate how misinformation spreads online, learn to question misleading health claims and apply their critical-thinking skills to create fact-or-fake challenges.",
      },
      supportingLine: "Self-awareness, resilience and looking after your mind",
      description:
        "Understanding yourself, managing everyday pressures and building habits that support you",
      exampleProject:
        "Heart and Mind – a personal journal built around real psychological tools.",
      image: {
        src: "/images/pillars/wellbeing.webp",
        alt: "Young pupils identifying emotions from illustrated faces on a classroom screen",
        position: "center center",
      },
    },
    {
      name: "Performance",
      exampleLesson: {
        year: 8,
        title: "Competition & Performance",
        description:
          "Students explore the psychology behind competition, examining how pressure, stress and sportsmanship influence performance and developing strategies to manage challenging situations.",
      },
      supportingLine: "Sleep, nutrition, focus and performing under pressure",
      description:
        "Understanding what helps you perform well and get the best from yourself",
      exampleProject: "Work Smart – designing a system that actually works for them.",
      image: {
        src: "/images/pillars/health-performance.webp",
        alt: "Students in sports kit working together on a laptop in a school gym",
        position: "center 45%",
      },
    },
    {
      name: "Careers",
      exampleLesson: {
        year: 7,
        title: "Ethical Hacking",
        description:
          "Students explore the world of ethical hacking, learning how cybersecurity professionals identify digital vulnerabilities and applying that thinking to test their own online security.",
      },
      supportingLine: "Exploring jobs, pathways and the skills employers value",
      description:
        "A broader view of the paths ahead and the different ways students might find their place within them",
      exampleProject:
        "The Internship – a real taste of different working environments.",
      image: {
        src: "/images/pillars/careers.webp",
        alt: "A student presenting career areas on a classroom screen to her classmates",
        position: "60% center",
      },
    },
    {
      name: "Financial Literacy",
      exampleLesson: {
        year: 9,
        title: "Moving Out",
        description:
          "Students navigate real-life financial decisions, learning how to balance income, rent, bills and everyday expenses while understanding the financial responsibilities of independent living.",
      },
      supportingLine: "Budgeting, saving and making informed money decisions",
      description:
        "Helping students understand the role money plays in everyday life and the choices that come with it",
      exampleProject:
        "Utopian Economics – building a working budget from scratch.",
      image: {
        src: "/images/pillars/financial-literacy.webp",
        alt: "A teacher leading a class discussion comparing spending and saving choices on a screen",
        position: "45% center",
      },
    },
    {
      name: "Sustainability",
      exampleLesson: null,
      comingSoon: true,
      supportingLine: "Understanding our impact and acting for people and the planet",
      description:
        "Understanding how our choices affect people, resources and the world around us",
      exampleProject: "coming soon.",
      image: {
        src: "/images/pillars/sustainability.webp",
        alt: "Primary pupils building a model sustainable town with a wind turbine",
        position: "center 55%",
      },
    },
    {
      name: "Technology",
      exampleLesson: null,
      comingSoon: true,
      supportingLine: "Using digital tools and AI with confidence and responsibility",
      description:
        "The technology shaping the world around us and the possibilities it is opening up",
      exampleProject: "coming soon.",
      image: {
        src: "/images/pillars/technology.webp",
        alt: "Students building and wiring a small robot car in a technology workshop",
        position: "center 45%",
      },
    },
  ] as PillarCarouselCard[],
};

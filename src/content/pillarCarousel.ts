export interface PillarCarouselCard {
  name: string;
  description: string;
  exampleProject: string;
  image?: { src: string; alt: string; position: string } | null;
  // Optional real photo for the "Example project" thumbnail. When unset,
  // the thumbnail shows the pillar's icon and the project name instead.
  exampleImage?: { src: string; alt: string } | null;
}

export const pillarCarousel = {
  eyebrow: "THE CURRICULUM",
  heading: "A progressive learning journey across eight key areas",
  subheading:
    "Each area is taught through structured, age-appropriate learning that develops as students move through each year group.",
  ctaLabel: "Explore this area",
  cards: [
    {
      name: "Entrepreneurship",
      description: "Building an entrepreneurial mindset that turns ideas into action",
      exampleProject:
        "Lightbulb Moments — turning a first idea into something they can actually show.",
      image: {
        src: "/images/pillars/entrepreneurship.webp",
        alt: "Primary pupils building a model snack shop stall from card and paper cups",
        position: "center 55%",
      },
    },
    {
      name: "Careers",
      description:
        "A broader view of the paths ahead and the different ways students might find their place within them",
      exampleProject:
        "The Internship — a real taste of different working environments.",
      image: {
        src: "/images/pillars/careers.webp",
        alt: "A student presenting career areas on a classroom screen to her classmates",
        position: "60% center",
      },
    },
    {
      name: "Financial Literacy",
      description:
        "Helping students understand the role money plays in everyday life and the choices that come with it",
      exampleProject:
        "Utopian Economics — building a working budget from scratch.",
      image: {
        src: "/images/pillars/financial-literacy.webp",
        alt: "A teacher leading a class discussion comparing spending and saving choices on a screen",
        position: "45% center",
      },
    },
    {
      name: "Wellbeing",
      description:
        "Understanding yourself, managing everyday pressures and building habits that support you",
      exampleProject:
        "Heart and Mind — a personal journal built around real psychological tools.",
      image: {
        src: "/images/pillars/wellbeing.webp",
        alt: "Young pupils identifying emotions from illustrated faces on a classroom screen",
        position: "center center",
      },
    },
    {
      name: "Health & Performance",
      description:
        "Understanding what helps you perform well and get the best from yourself",
      exampleProject: "Work Smart — designing a system that actually works for them.",
      image: {
        src: "/images/pillars/health-performance.webp",
        alt: "Students in sports kit working together on a laptop in a school gym",
        position: "center 45%",
      },
    },
    {
      name: "Leadership",
      description:
        "Exploring how people bring others with them, make decisions and create positive change",
      exampleProject:
        "Leadership Styles — working through real high-pressure scenarios.",
      image: {
        src: "/images/pillars/leadership.webp",
        alt: "A student presenting her ideas to classmates at the front of the classroom",
        position: "center 35%",
      },
    },
    {
      name: "Sustainability",
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

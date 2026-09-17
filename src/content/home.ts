import { CtaLink, NamedItem, Testimonial } from "./types";

export interface StatCallout {
  stat: string;
  source: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface CurriculumItem {
  name: string;
  detail: string;
}

export interface StageStop {
  label: string;
  detail?: string;
  highlight?: boolean;
}

export const home = {
  hero: {
    headline:
      "We help schools teach the skills exams don't — from FS1 to Year 13, ending in a real GCSE qualification.",
    subhead:
      "A week-to-week curriculum that fits around your existing timetable, teaching the skills the core curriculum doesn't — no overhaul, no new systems to learn, just lessons ready to run, building toward a real GCSE qualification.",
    primaryCta: { label: "Explore the GCSE", href: "/gcse" } as CtaLink,
    secondaryCta: {
      label: "Explore the Critical Curriculum",
      href: "/critical-curriculum",
    } as CtaLink,
  },

  criticalCurriculum: {
    headline: "The Critical Curriculum",
    whatIsIt: {
      heading: "What is the Critical Curriculum?",
      body: "A week-to-week curriculum, delivered alongside what your school already teaches — no overhaul, no new systems. Every lesson comes ready to run: a lesson plan, teacher resources, a video guide, and student materials, built for FS1 through Year 13.",
    },
    pillarsIntro: {
      heading: "Built on eight pillars, thirteen skills",
      skills: [
        "Self Leadership",
        "Social Skills",
        "Smart Productivity",
        "Health Literacy",
        "Focus",
        "Psychological Literacy",
        "Ethical Thinking",
        "Emotional Intelligence",
        "Entrepreneurship",
        "Careers",
        "Creativity",
        "Critical Thinking",
        "Digital Fluency",
      ],
    },
  },

  stageFlow: {
    heading: "Your Student's Journey",
    subheading:
      "True progression through every stage of their education, from FS1 to a real GCSE qualification.",
    stops: [
      { label: "FS1" },
      { label: "FS2" },
      { label: "Key Stage 1" },
      { label: "Key Stage 2" },
      { label: "Key Stage 3", detail: "Year 7: Foundation" },
      {
        label: "GCSE / Global Skills Qualification",
        detail: "Year 8–9",
        highlight: true,
      },
      { label: "Key Stage 4" },
    ] as StageStop[],
  },

  gcse: {
    eyebrow: "OxfordAQA International GCSE — Global Skills Projects",
    pillarsLink:
      "Built on the same eight pillars as the Critical Curriculum — this is where it leads.",
    headline: "No exam. Real projects, real skills.",
    projectSplit:
      "60% individual project, 40% group project — assessed by portfolio, not a written exam.",
    stat: {
      stat: "Exam-based qualifications fail students at 3x the rate of coursework-based ones.",
      source: "Imperial College London",
    } as StatCallout,
    platformLine:
      "A dedicated platform supports every student through both projects.",
    primaryCta: { label: "Find out more" },
    secondaryCta: { label: "Book a demo", href: "#book-a-demo" } as CtaLink,
  },

  crossCurricular: {
    subjectAlignment: {
      heading: "Fits your existing curriculum, not around it",
      body: "Entrepreneurial and future-skills education doesn't sit in its own box — it weaves through subjects your school already teaches, mirroring the kind of multi-faceted problems students will face in the real world.",
      subjects: [
        "English & Literacy",
        "Humanities",
        "Mathematics",
        "STEM & Computing",
        "Arts & Design",
        "PSHE & Citizenship",
      ],
    },
    curriculumAlignment: {
      heading: "Aligned to the world's leading curriculums",
      body: "Our Critical Curriculum is built to complement the most widely used academic systems, helping schools add future-focused learning without disrupting core delivery.",
      items: [
        {
          name: "British Curriculum",
          detail:
            "Whether delivered through PSHE, tutor time, enrichment, or collapsed timetable days, the framework strengthens a school's ability to provide a well-rounded education that goes beyond exam performance.",
        },
        {
          name: "International Baccalaureate",
          detail:
            "By integrating into existing IB frameworks, it supports students in becoming more reflective, action-oriented learners, while strengthening their ability to connect knowledge with real-world contexts.",
        },
        {
          name: "American Curriculum",
          detail:
            "It helps schools go beyond content knowledge by equipping students with the practical skills and mindset needed for higher education and future careers.",
        },
        {
          name: "UAE Ministry of Education Framework",
          detail:
            "The Critical Curriculum aligns closely with KHDA priorities, supporting schools in delivering high-quality, future-focused education that prepares students for life beyond the classroom. It complements existing curricula by embedding skills such as innovation, wellbeing, and enterprise within a structured framework.",
        },
      ] as CurriculumItem[],
      examPartner: {
        heading:
          "We're partnered with OxfordAQA — one of the world's fastest-growing international exam boards, and proof that skills-based learning is where qualifications are heading.",
      },
      contactLine: {
        pre: "Don't see yours? ",
        linkLabel: "Get in touch",
        post: " — we work with schools worldwide.",
        href: "#book-a-demo",
      },
    },
    cta: { label: "See the full curriculum mapping", href: "/curriculum-mapping" } as CtaLink,
  },

  championSchools: {
    headline: "Our first champion schools",
  },

  proof: {
    headline: "Why choose us",
    leadItem: {
      name: "One system, not six separate providers",
      description:
        "Most providers solve one piece — careers, or wellbeing, or enterprise. We bring curriculum, qualifications, careers, entrepreneurship, work experience, teacher development and impact measurement into eight pillars — worked with 350+ schools for live events with over 1 million students in attendance.",
    } as NamedItem,
    items: [
      {
        name: "Safeguarding",
        description:
          "Every mentor is DBS-checked and trained in safeguarding and youth coaching.",
      },
      {
        name: "Progression",
        description: "Each academic year builds on the last, from age 4 to 18.",
      },
      {
        name: "Adaptable",
        description:
          "Courses, timelines, live days, CPD — shaped around how your school actually works, not a fixed package.",
      },
      {
        name: "Support",
        description:
          "Every school gets a dedicated partnership manager — a real point of contact who supports your rollout from day one, not just a name on a welcome email.",
      },
    ] as NamedItem[],

    testimonialsLabel: "What schools say",
    testimonials: [
      {
        quote:
          "8billionideas is a unique organisation — through their work, our pupils learn valuable life lessons which enables them to think strategically, creatively and independently.",
        name: "Ann Haydon MBE",
        role: "Principal, GEMS Wellington Academy, Al Khail",
      },
      {
        quote:
          "Every 8billionideas team member is world class in their field; approachable, dynamic, committed and relentlessly optimistic.",
        name: "Anita Gleave",
        role: "CEO, Chatsworth Schools",
      },
      {
        quote:
          "A fantastic opportunity with 8billionideas for young people to experience learning in a different way!",
        name: "Adrian McLean",
        role: "Trust Lead, Severn Academies Educational Trust",
      },
    ] as Testimonial[],
  },

  faq: {
    headline: "Frequently asked questions",
    items: [
      {
        question: "How do I know I can trust 8billionideas?",
        answer:
          "We work with 350+ schools in 25+ countries, and over 1 million students have used our courses. We're also the official partner for the OxfordAQA International GCSE.",
      },
      {
        question: "Is this actually a problem for my school?",
        answer:
          "Employers want more than good grades — they want communication, adaptability, problem-solving. Universities look beyond grades too. And parents are already asking what you're doing to prepare kids for life after exams.",
      },
      {
        question: "Why do other providers feel so messy?",
        answer:
          "Most schools end up juggling separate providers for careers, wellbeing, enterprise — none of them talk to each other. It eats into the timetable, costs more, and your staff end up holding it all together.",
      },
      {
        question: "What makes 8billionideas different?",
        answer:
          "One system, not six. Curriculum, careers, qualifications, and teacher training all in one place — eight subject areas, plus a real GCSE at the end of it.",
      },
      {
        question: "Will this still be running in a year, or fizzle out?",
        answer:
          "It's built to fit into what you're already doing — tutor time, PSHE, whatever works. It doesn't rely on one keen teacher to keep it alive. Start with one year group, expand when you're ready.",
      },
      {
        question: "How do I justify this to governors or parents?",
        answer:
          "One provider instead of several means less admin, fewer contracts to manage, and a clear story to tell at open evenings and in the prospectus.",
      },
      {
        question: "What happens after we sign up?",
        answer:
          "Your teachers get trained and start delivering in week one. You get a dedicated partnership manager, and we check in regularly to see how it's going.",
      },
    ] as FaqItem[],
  },

  finalCta: {
    headline: "Ready to bring the Critical Curriculum to your school?",
    primaryCta: { label: "Find out more", href: "/find-out-more" } as CtaLink,
    secondaryCta: { label: "Book a demo", href: "#book-a-demo" } as CtaLink,
  },
};

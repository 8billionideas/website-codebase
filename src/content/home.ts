import { CtaLink, NamedItem, Testimonial } from "./types";

export interface FaqItem {
  question: string;
  answer: string;
}

export const home = {
  hero: {
    headline: "Strengthen future-focused learning in a way that fits your school",
    subhead:
      "A flexible, week-to-week curriculum that works around what you already teach, helping students develop the future-focused skills that can be harder to cover through the traditional curriculum, with ready-to-teach lessons that fit your timetable and build progressively towards a recognised GCSE qualification.",
    primaryCta: { label: "Explore the GCSE", href: "/gcse" } as CtaLink,
    secondaryCta: {
      label: "Explore the Critical Curriculum",
      href: "/curriculum-mapping",
    } as CtaLink,
  },

  criticalCurriculum: {
    headline: "The Critical Curriculum",
    whatIsIt: {
      heading: "What is the Critical Curriculum?",
      body: "A week-to-week curriculum, delivered alongside what your school already teaches — no overhaul, no new systems. Every lesson comes ready to run: a lesson plan, teacher resources, a video guide, and student materials, built for FS1 through Year 13.",
    },
    pillarsIntro: {
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

  curriculumFit: {
    eyebrow: "FITS YOUR WORLD",
    body: "8billionideas is designed to complement your existing curriculum, connecting with the subjects you already teach. It's flexible by design, working across British, IB, American, Indian and any other international curriculum — wherever your school is in the world.",
    cta: { label: "Explore curriculum mapping", href: "/curriculum-mapping" } as CtaLink,
    ctaTagline: ["SAME LEARNING.", "BRIGHTER FUTURES."],
    imageTagline: ["DIFFERENT", "CURRICULUMS.", "A BRIGHTER", "TOMORROW."],
    worksAcrossLabel: ["WORKS ACROSS", "CURRICULUMS"],
    curriculums: ["BRITISH", "IB", "AMERICAN", "INDIAN", "INTERNATIONAL", "AND MORE"],
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
          "During the 2025/26 season, we partnered with 8billionideas as part of our commitment to the personal development of our academy players. The sessions were thoughtfully planned and expertly delivered, providing engaging and thought-provoking learning experiences. The facilitators used effective questioning techniques to challenge and inspire every group, encouraging critical thinking and meaningful discussion. The pace of each session gave players the time and space to create, develop, and reflect on their ideas, fostering confidence, collaboration, and creativity. Each programme culminated in a celebration of the players' achievements, recognising their effort, innovation, and personal growth throughout the process.",
        name: "Sean Walsh",
        role: "Personal Development Lead, Chelsea FC Academy",
        sourceUrl: "https://www.trustpilot.com/reviews/6a75c84fe22994d14de9eb90",
      },
      {
        quote:
          "Over the last 4 years David and the 8billionideas team have played an integral part in the curriculum design, adaptation and implementation across many schools for over 11,000 learners in the Cluster. From Year 3 learners designing the next toy craze to Post 16 learners participating in the Perform Better Programme, the critical curriculum delivers for all. Learners global citizenship has been enhanced along with school inspection ratings from new start up schools to exceptionally well matured over subscribed ones. 8billionideas are a key strategic partner in the reimagining of education provision across all curricula.",
        name: "Kelvin Hornsby",
        role: "Principal/CEO, GEMS World Academy – Abu Dhabi",
        sourceUrl: "https://www.trustpilot.com/reviews/6891bd2e39019d0ceb187c93",
      },
      {
        quote:
          "8BillionIdeas provides an engaging and inspiring experience that encourages students to think creatively and turn their ideas into meaningful solutions. Teachers have a tool through which students develop skills such as problem-solving, teamwork, communication, and innovation in a practical and enjoyable way. What stands out most is the focus on empowering young people to believe in their own potential. The programme reflects the idea that everyone has valuable ideas and can make a positive impact when given the confidence and tools to do so. It encourages students to take ownership of their learning, think beyond the classroom, and approach challenges with creativity and resilience.",
        name: "Fatema Kashief",
        role: "Teaching and Learning Lead, Pristine Private School",
        sourceUrl: "https://www.trustpilot.com/reviews/6a2fe5f97cdf5236789c8c33",
      },
      {
        quote:
          "8Bill are a truly inspiring, innovative and unique curriculum partner who I would recommend to any school looking to up their schools educational and engagement levels. There's no other company designing and delivering such 21st century relevant, digital first content than 8Billionideas and I would always encourage school leaders to contact them to see how they can help your school reach its maximum potential ✅",
        name: "Andrew Elias",
        role: "Director of Marketing & Communications, Chatsworth Schools",
        sourceUrl: "https://www.trustpilot.com/reviews/6890ba1eccbe471e8a1dcf6e",
      },
      {
        quote:
          "8billionideas is a unique organisation — through their work, our pupils learn valuable life lessons which enables them to think strategically, creatively and independently.",
        name: "Ann Haydon MBE",
        role: "Principal, GEMS Wellington Academy, Al Khail",
        sourceUrl: null,
      },
      {
        quote:
          "Every 8billionideas team member is world class in their field; approachable, dynamic, committed and relentlessly optimistic.",
        name: "Anita Gleave",
        role: "CEO, Chatsworth Schools",
        sourceUrl: null,
      },
      {
        quote:
          "A fantastic opportunity with 8billionideas for young people to experience learning in a different way!",
        name: "Adrian McLean",
        role: "Trust Lead, Severn Academies Educational Trust",
        sourceUrl: null,
      },
    ] as Testimonial[],

    // Kept out of `testimonials` so it doesn't also appear in the /case-studies carousel.
    bandTestimonial: {
      quote:
        "Their focus on creative and strategic thinking, collaboration, innovation, technology and financial literacy are all essential skills which give our pupils the competitive edge in today's world.",
      excerpt:
        "Their focus on creative and strategic thinking, collaboration, innovation, technology and financial literacy are all essential skills which give our pupils the competitive edge in today's world.",
      name: "Ann Haydon",
      role: "Headmistress, Harrow International School Hong Kong",
      sourceUrl: null,
    } as Testimonial,
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

};

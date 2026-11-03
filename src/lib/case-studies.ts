export interface CaseStudyQuote {
  text: string;
  name: string;
  role: string;
}

export interface CaseStudy {
  slug: string;
  name: string;
  tag: "Curriculum partnership" | "Programme" | "Competition";
  location: string | null;
  years: string | null;
  ageGroups: string | null;
  programme: string | null;
  scale: string | null;
  award: string | null;
  // null renders nothing (e.g. when the only headline fact was a date).
  headlineFact: string | null;
  summary: string;
  challenge: string | null;
  whatWeDid: string | null;
  results: string | null;
  quote: CaseStudyQuote | null;
  secondaryQuote: CaseStudyQuote | null;
  // Card-only title and label (the /case-studies rows and "More case studies" cards); the detail
  // page keeps name and tag.
  card?: { name: string; label: string };
  image: { src: string; alt: string; position: string } | null;
}

// Set to a real Trustpilot profile URL to show a "Read more reviews on
// Trustpilot →" link below the testimonials wall. Leave null to render
// nothing there.
export const TRUSTPILOT_PROFILE_URL: string | null = null;

// Display order: Esher College (The Internship) first, then Harrow, Nord Anglia India, Chelsea and
// Severn Academies.
export const caseStudies: CaseStudy[] = [
  {
    slug: "the-internship",
    name: "The Internship – Esher Sixth Form College",
    tag: "Programme",
    location: "Esher, UK",
    years: null,
    ageGroups: "Sixth form",
    programme: "The Internship",
    scale: "Almost 1,000 students",
    award: "Sixth Form Colleges Association Enterprise and Employability Award",
    headlineFact: "Award-winning · almost 1,000 students",
    summary:
      "A virtual three-day internship giving sixth formers meaningful work experience at scale, and winner of the Sixth Form Colleges Association's Enterprise and Employability Award.",
    challenge:
      "Careers leaders are often stretched thin, trying to find meaningful work placements for hundreds of students at once. Cat Jayne Elmes, Work Experience and Alumni Coordinator at Esher Sixth Form College, knew this challenge well, and her input helped shape the programme.",
    whatWeDid:
      "Together we created The Internship, a virtual three-day work experience programme. Students tackle real business problems through activities such as fundraising, website building and concept design, hear from guest speakers from around the world, and receive a certificate they can add to LinkedIn or to university and job applications.",
    results:
      "The programme reached almost 500 registrations in its first months and has welcomed almost 1,000 students. It also won the Sixth Form Colleges Association's Enterprise and Employability Award.",
    quote: {
      text: "'The Internship' is a brilliant opportunity. Not only to get a meaningful work experience, to hit those Gatsby Benchmarks, and also to hit the numbers in college.",
      name: "Cat Jayne Elmes",
      role: "Work Experience and Alumni Coordinator, Esher Sixth Form College",
    },
    secondaryQuote: {
      text: "It definitely helped with team work skills and presenting skills because it was something I had no interest in before, I always avoided it.",
      name: "Year 11 Student",
      role: "The Internship",
    },
    image: null,
    card: { name: "Esher College", label: "The Internship" },
  },
  {
    slug: "harrow-sustainability450",
    name: "Harrow Family of Schools – Sustainability450",
    tag: "Competition",
    location: "UK and international",
    years: null,
    ageGroups: "Pre-Prep to Sixth Form",
    programme: "Sustainability450 competition",
    scale: "Every Harrow-branded school worldwide",
    award: null,
    headlineFact: "Five university-set challenges",
    summary:
      "Sustainability450, a global competition marking Harrow School's 450th anniversary, with challenges set in partnership with five universities.",
    challenge:
      "To mark Harrow School's 450th anniversary and the 25th anniversary of the AISL education group, the Harrow Family of Schools wanted to give every student, from Pre-Prep to Sixth Form, the chance to work on real sustainability problems.",
    whatWeDid:
      "We created Sustainability450, inviting students across all Harrow-branded schools to come up with 450 unique ideas. Working individually or in groups, students chose from five challenges set with Imperial College London, the University of Southampton, the University of Bath, King Mongkut's Institute of Technology Ladkrabang and the Asian Institute of Technology, and presented their solutions through drawings, experiments, designs, programming or robotics. A hybrid finals day was held at Harrow School in the UK, with international schools joining virtually.",
    results: null,
    quote: null,
    secondaryQuote: null,
    image: {
      src: "/images/case-studies/harrow-sustainability450-branded.webp",
      alt: "The Harrow International School Hong Kong crest over the school building",
      position: "center 55%",
    },
  },
  {
    slug: "nord-anglia-education-india",
    name: "Nord Anglia Education India",
    tag: "Curriculum partnership",
    location: "India",
    years: null,
    ageGroups: "KS3 to KS5",
    programme: "Entrepreneurship pathway",
    scale: "Five schools, 11 days of learning each",
    award: null,
    headlineFact: "Five schools · KS3 to KS5",
    summary:
      "A strategic entrepreneurship pathway for KS3 to KS5 across all five Nord Anglia schools in India.",
    challenge:
      "Nord Anglia Education India wanted a strategic approach to fostering real entrepreneurship across all five of its schools. Brian Cooklin, Managing Director of the schools, wanted to explore what 8billionideas could offer across the group.",
    whatWeDid:
      "We created a learning pathway for KS3, KS4 and KS5, bringing entrepreneurial programmes into both the curriculum and extracurricular activities. Each school received 11 days of learning time with 8billionideas, and our team worked with each school to decide how and when to use it.",
    results:
      "Students across all five schools took part in entrepreneurship and skills-based learning, working on real-world challenges to build practical skills, critical thinking and an entrepreneurial mindset.",
    quote: null,
    secondaryQuote: null,
    image: {
      src: "/images/case-studies/nord-anglia-education-india-branded.webp",
      alt: "The Oakridge International School logo, a Nord Anglia Education school, over the school building in Hyderabad",
      position: "center center",
    },
  },
  {
    slug: "chelsea-fc-academy",
    name: "Chelsea FC Academy",
    tag: "Curriculum partnership",
    location: "London, UK",
    years: null,
    ageGroups: null,
    programme: "Personal development programme",
    scale: null,
    award: null,
    headlineFact: null,
    summary: "Personal development sessions for Chelsea FC Academy players.",
    challenge: null,
    whatWeDid:
      "As part of the Academy's commitment to its players' personal development, 8billionideas delivered sessions built around questioning, critical thinking and discussion, giving players time and space to create, develop and reflect on their ideas. Each programme ended with a celebration of the players' achievements.",
    results: null,
    quote: {
      text: "During the 2025/26 season, we partnered with 8billionideas as part of our commitment to the personal development of our academy players. The sessions were thoughtfully planned and expertly delivered, providing engaging and thought-provoking learning experiences. The facilitators used effective questioning techniques to challenge and inspire every group, encouraging critical thinking and meaningful discussion. The pace of each session gave players the time and space to create, develop, and reflect on their ideas, fostering confidence, collaboration, and creativity. Each programme culminated in a celebration of the players' achievements, recognising their effort, innovation, and personal growth throughout the process.",
      name: "Sean Walsh",
      role: "Personal Development Lead, Chelsea FC Academy",
    },
    secondaryQuote: null,
    image: {
      src: "/images/case-studies/chelsea-fc-academy-branded.webp",
      alt: "The Chelsea FC crest over the club's academy training building",
      position: "center 45%",
    },
  },
  {
    slug: "severn-academies",
    name: "Severn Academies Educational Trust",
    tag: "Competition",
    location: "UK",
    years: null,
    ageGroups: null,
    programme: "One BIG Idea competition",
    scale: "Every school in the trust",
    award: null,
    headlineFact: "One competition across the whole trust",
    summary:
      "One BIG Idea, a trust-wide competition bringing students from every school together around their own entrepreneurial ideas.",
    challenge:
      "Cross-trust collaboration is rare. Severn Academies Educational Trust wanted to unite all of its schools in one memorable opportunity that would encourage students to think innovatively and embrace entrepreneurship.",
    whatWeDid:
      "Together we launched One BIG Idea, a competition for students from every school in the trust, giving them a platform to develop and showcase their own entrepreneurial ideas.",
    results:
      "Students from across the trust came together with a shared sense of purpose, building teamwork, critical thinking and communication skills along the way.",
    quote: {
      text: "A fantastic opportunity with 8billionideas for young people to experience learning in a different way!",
      name: "Adrian McLean",
      role: "Trust Lead, Severn Academies Educational Trust",
    },
    secondaryQuote: null,
    image: {
      src: "/images/case-studies/severn-academies-branded.webp",
      alt: "The Severn Academies Educational Trust logo over one of the trust's school buildings",
      position: "center center",
    },
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

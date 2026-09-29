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
  headlineFact: string;
  summary: string;
  challenge: string | null;
  whatWeDid: string | null;
  results: string | null;
  quote: CaseStudyQuote | null;
  secondaryQuote: CaseStudyQuote | null;
  featured: boolean;
  image: { src: string; alt: string; position: string } | null;
}

// Set to a real Trustpilot profile URL to show a "Read more reviews on
// Trustpilot →" link below the testimonials wall. Leave null to render
// nothing there.
export const TRUSTPILOT_PROFILE_URL: string | null = null;

export const caseStudies: CaseStudy[] = [
  {
    slug: "the-internship",
    name: "The Internship – Esher Sixth Form College",
    tag: "Programme",
    location: "Esher, UK",
    years: "2021–2022",
    ageGroups: "Sixth form",
    programme: "The Internship",
    scale: "Almost 1,000 students by 2022",
    award: "Sixth Form Colleges Association Enterprise and Employability Award 2022",
    headlineFact: "Award-winning · almost 1,000 students",
    summary:
      "A virtual three-day internship giving sixth formers meaningful work experience at scale, and winner of the Sixth Form Colleges Association's 2022 Enterprise and Employability Award.",
    challenge:
      "Careers leaders are often stretched thin, trying to find meaningful work placements for hundreds of students at once. Cat Jayne Elmes, Work Experience and Alumni Coordinator at Esher Sixth Form College, knew this challenge well, and her input helped shape the programme.",
    whatWeDid:
      "Together we created The Internship, a virtual three-day work experience programme launched in early 2021. Students tackle real business problems through activities such as fundraising, website building and concept design, hear from guest speakers from around the world, and receive a certificate they can add to LinkedIn or to university and job applications.",
    results:
      "The programme reached almost 500 registrations in its first months and welcomed almost 1,000 students by 2022. In 2022 it won the Sixth Form Colleges Association's Enterprise and Employability Award.",
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
    featured: true,
  },
  {
    slug: "nord-anglia-education-india",
    name: "Nord Anglia Education India",
    tag: "Curriculum partnership",
    location: "India",
    years: "2022–2023",
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
      "Running from 2022 into 2023, students across all five schools took part in entrepreneurship and skills-based learning, working on real-world challenges to build practical skills, critical thinking and an entrepreneurial mindset.",
    quote: null,
    secondaryQuote: null,
    image: {
      src: "/images/case-studies/nord-anglia-education-india-branded.webp",
      alt: "The Oakridge International School logo, a Nord Anglia Education school, over the school building in Hyderabad",
      position: "center center",
    },
    featured: false,
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
    featured: false,
  },
  {
    slug: "harrow-sustainability450",
    name: "Harrow Family of Schools – Sustainability450",
    tag: "Competition",
    location: "UK and international",
    years: "2022",
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
    featured: false,
  },
  {
    slug: "chelsea-fc-academy",
    name: "Chelsea FC Academy",
    tag: "Programme",
    location: "London, UK",
    years: "2025/26 season",
    ageGroups: null,
    programme: "Personal development programme",
    scale: null,
    award: null,
    headlineFact: "2025/26 season",
    summary: "Personal development sessions for Chelsea FC Academy players during the 2025/26 season.",
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
    featured: false,
  },
  {
    slug: "gems-world-academy",
    name: "GEMS World Academy – Abu Dhabi",
    tag: "Curriculum partnership",
    location: "Abu Dhabi, UAE",
    years: "4-year partnership",
    ageGroups: "Year 3 to Post-16",
    programme: "Critical Curriculum",
    scale: "11,000+ learners across the cluster",
    award: null,
    headlineFact: "11,000+ learners across the cluster",
    summary:
      "A four-year partnership designing, adapting and implementing the Critical Curriculum across a cluster of schools, from Year 3 to Post-16.",
    challenge:
      "The cluster wanted to reimagine its education provision, bringing future-focused learning to every age group across schools at very different stages, from new start-ups to well-established, oversubscribed schools.",
    whatWeDid:
      "Over four years, 8billionideas worked with the cluster on curriculum design, adaptation and implementation across its schools. Learning ran from Year 3, where students designed the next toy craze, through to Post-16, where learners took part in the Perform Better programme.",
    results:
      "More than 11,000 learners across the cluster have taken part. The cluster's leadership reports stronger global citizenship among learners and improved school inspection ratings, from new start-up schools to well-established ones.",
    quote: {
      text: "Over the last 4 years David and the 8billionideas team have played an integral part in the curriculum design, adaptation and implementation across many schools for over 11,000 learners in the Cluster. From Year 3 learners designing the next toy craze to Post 16 learners participating in the Perform Better Programme, the critical curriculum delivers for all. Learners global citizenship has been enhanced along with school inspection ratings from new start up schools to exceptionally well matured over subscribed ones. 8billionideas are a key strategic partner in the reimagining of education provision across all curricula.",
      name: "Kelvin Hornsby",
      role: "Principal/CEO, GEMS World Academy – Abu Dhabi",
    },
    secondaryQuote: null,
    image: {
      src: "/images/case-studies/gems-world-academy-branded.webp",
      alt: "The GEMS World Academy Abu Dhabi logo over the school building",
      position: "center center",
    },
    featured: false,
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function getFeaturedCaseStudy(): CaseStudy | undefined {
  return caseStudies.find((study) => study.featured);
}

export function getOtherCaseStudies(): CaseStudy[] {
  return caseStudies.filter((study) => !study.featured);
}

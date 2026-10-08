export interface ChampionSchool {
  name: string;
  slug: string;
  // WebP under /public/images/schools, white margin trimmed. width/height are
  // the file's pixel size, used to size each logo evenly in the strip.
  logo: { src: string; alt: string; width: number; height: number };
}

// Single source for champion schools wherever they appear.
// Originals (unmodified) sit beside each WebP as [slug].png.
export const gcseSchools: ChampionSchool[] = [
  {
    name: "Sotogrande International School",
    slug: "sotogrande-international-school",
    logo: {
      src: "/images/schools/sotogrande-international-school.webp",
      alt: "Sotogrande International School logo",
      width: 244,
      height: 59,
    },
  },
  {
    name: "Dubai British School Mira",
    slug: "dubai-british-school-mira",
    logo: {
      src: "/images/schools/dubai-british-school-mira.webp",
      alt: "Dubai British School Mira logo",
      width: 156,
      height: 83,
    },
  },
  {
    name: "King's College School Panama",
    slug: "kings-college-school-panama",
    logo: {
      src: "/images/schools/kings-college-school-panama.webp",
      alt: "King's College School Panama logo",
      width: 37,
      height: 83,
    },
  },
  {
    name: "King's College School Cascais",
    slug: "kings-college-school-cascais",
    logo: {
      src: "/images/schools/kings-college-school-cascais.webp",
      alt: "King's College School Cascais logo",
      width: 94,
      height: 82,
    },
  },
  {
    name: "The British College of Gavà",
    slug: "british-college-of-gava",
    logo: {
      src: "/images/schools/british-college-of-gava.webp",
      alt: "The British College of Gavà logo",
      width: 240,
      height: 79,
    },
  },
  {
    name: "Queen's Qatar",
    slug: "queens-qatar",
    logo: {
      src: "/images/schools/queens-qatar.webp",
      alt: "Queen's Qatar logo",
      width: 116,
      height: 72,
    },
  },
  {
    name: "North Gate British School",
    slug: "north-gate-british-school",
    logo: {
      src: "/images/schools/north-gate-british-school.webp",
      alt: "North Gate British School logo",
      width: 84,
      height: 79,
    },
  },
  {
    name: "Noya British School",
    slug: "noya-british-school",
    logo: {
      src: "/images/schools/noya-british-school.webp",
      alt: "Noya British School logo",
      width: 195,
      height: 81,
    },
  },
];

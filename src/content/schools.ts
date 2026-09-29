export interface SchoolLogo {
  number: number;
  // Path under /public — drop the real file here to replace the placeholder.
  image: string;
  // Fill in once the real logo is added (e.g. "Springfield Academy logo").
  alt: string;
  // Real school name — shown as fallback text instead of the numbered
  // placeholder when no logo file exists yet at `image`.
  name?: string;
}

export const schools: SchoolLogo[] = [
  { number: 1, image: "/logos/school-01.png", alt: "" },
  { number: 2, image: "/logos/school-02.png", alt: "" },
  { number: 3, image: "/logos/school-03.png", alt: "" },
  { number: 4, image: "/logos/school-04.png", alt: "" },
  { number: 5, image: "/logos/school-05.png", alt: "" },
  { number: 6, image: "/logos/school-06.png", alt: "" },
  { number: 7, image: "/logos/school-07.png", alt: "" },
  { number: 8, image: "/logos/school-08.png", alt: "" },
  { number: 9, image: "/logos/school-09.png", alt: "" },
  { number: 10, image: "/logos/school-10.png", alt: "" },
  { number: 11, image: "/logos/school-11.png", alt: "" },
  { number: 12, image: "/logos/school-12.png", alt: "" },
  { number: 13, image: "/logos/school-13.png", alt: "" },
  { number: 14, image: "/logos/school-14.png", alt: "" },
  { number: 15, image: "/logos/school-15.png", alt: "" },
  { number: 16, image: "/logos/school-16.png", alt: "" },
  { number: 17, image: "/logos/school-17.png", alt: "" },
  { number: 18, image: "/logos/school-18.png", alt: "" },
  { number: 19, image: "/logos/school-19.png", alt: "" },
  { number: 20, image: "/logos/school-20.png", alt: "" },
  { number: 21, image: "/logos/school-21.png", alt: "" },
];

export const gcseSchools: SchoolLogo[] = [
  {
    number: 1,
    image: "/logos/gcse-school-01.png",
    alt: "North Gate British School logo",
    name: "North Gate British School",
  },
  {
    number: 2,
    image: "/logos/gcse-school-02.png",
    alt: "Queen's Qatar logo",
    name: "Queen's Qatar",
  },
  {
    number: 3,
    image: "/logos/gcse-school-03.png",
    alt: "Noya British School logo",
    name: "Noya British School",
  },
  {
    number: 4,
    image: "/logos/gcse-school-04.png",
    alt: "Sotogrande International School logo",
    name: "Sotogrande International School",
  },
  {
    number: 5,
    image: "/logos/gcse-school-05.png",
    alt: "Dubai British School Mira logo",
    name: "Dubai British School Mira",
  },
  {
    number: 6,
    image: "/logos/gcse-school-06.png",
    alt: "King's College School Panama logo",
    name: "King's College School Panama",
  },
  {
    number: 7,
    image: "/logos/gcse-school-07.png",
    alt: "King's College School Cascais logo",
    name: "King's College School Cascais",
  },
  {
    number: 8,
    image: "/logos/gcse-school-08.png",
    alt: "BCG The British College of Gava logo",
    name: "BCG The British College of Gava",
  },
];

// /about "Our story" timeline. image: null shows a solid ink placeholder block.
export interface StoryEntry {
  year: string;
  title: string;
  text: string;
  image: { src: string; alt: string } | null;
}

export const aboutStory: StoryEntry[] = [
  {
    year: "2021",
    title: "We started",
    text: "A small team with a big belief that education should build more than knowledge alone.",
    image: null,
  },
  {
    year: "2022",
    title: "We reached more schools",
    text: "More classrooms, more programmes and more evidence of what students can do when given the space to grow.",
    image: null,
  },
  {
    year: "2023–24",
    title: "We kept building",
    text: "We refined the experience, deepened our school partnerships and kept improving what happens in practice.",
    image: null,
  },
  {
    year: "Today",
    title: "Still building towards the same mission",
    text: "The work has evolved, but the reason we started has stayed the same.",
    image: null,
  },
];

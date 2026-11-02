// /about "What it's like to work with us": the three columns.
export interface WorkWithUsRow {
  number: string;
  title: string;
  text: string;
  tags: string[];
}

export const workWithUsRows: WorkWithUsRow[] = [
  {
    number: "01",
    title: "We stay close",
    text: "You’ll know who you’re working with and you won’t disappear into a support queue when you need something.",
    tags: ["Named contact", "Clear answers", "Regular check-ins"],
  },
  {
    number: "02",
    title: "We keep things practical",
    text: "We listen first, work around what already exists and focus on making things easier to deliver in the real world.",
    tags: ["Listen first", "Fit around your school", "Solve what matters"],
  },
  {
    number: "03",
    title: "We always care",
    text: "For us, a partnership should feel like people working towards the same thing, not a contract that gets handed over once it’s signed.",
    tags: ["Real people", "Long-term support", "Shared goals"],
  },
];

// Photo beside the /about testimonial carousel. null shows a blank placeholder.
export const testimonialImage: { src: string; alt: string } | null = null;

// /pricing "Request a tailored quote" pop-up: optional extras a school can ask to be priced.
export interface QuoteAddOn {
  id: string;
  title: string;
  description: string;
}

export const quoteAddOns: QuoteAddOn[] = [
  {
    id: "live-launch-showcase",
    title: "Live launch & showcase",
    description: "Launch sessions to introduce the curriculum, and showcase events where students present their projects.",
  },
  {
    id: "live-delivery-days",
    title: "Live delivery days",
    description: "Facilitator-led workshops or drop-down days to deliver programmes live in school.",
  },
  {
    id: "teacher-cpd",
    title: "Teacher CPD",
    description: "Practical training that helps staff feel confident using the platform and delivering the learning.",
  },
  {
    id: "live-broadcasts",
    title: "Live broadcasts",
    description: "Live online sessions streamed into your classrooms.",
  },
];

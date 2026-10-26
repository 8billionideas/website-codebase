import PlatformBand from "@/components/shared/PlatformBand";
import { gcse } from "@/content/gcse";

// The annotated laptop ("Sleep For Students" lesson with callout labels, 1536×1024,
// lesson-platform-annotated, from "Interactive Student Course Dashboard.png"), shown whole. The
// earlier images (lesson-platform-laptop and its crop) are kept.
const IMAGE = {
  src: "/images/curriculum/lesson-platform-annotated.webp",
  alt: "The 8billionideas platform on a laptop showing a 'Sleep For Students' lesson, with labels pointing to the 8-minute teaching video, all lessons in one place, lesson objectives, lesson materials and student activities, and start and end-of-module assessments",
};

const BODY =
  "Each lesson brings the objectives, teaching content, videos, student activities and assessment together in one place, so teachers can see exactly what to deliver without having to build the learning from scratch";

// Our Curriculum lesson platform band: the same band as /gcse's platform band, with this copy and
// image. Band colour sampled from the image's left and right edges (#01102f). The For teachers /
// For students boxes use the /gcse wording.
export default function LessonPlatformShowcase() {
  return (
    <PlatformBand
      background="#01102f"
      headingLine1="Each lesson is already built,"
      headingLine2="structured and ready to teach"
      body={BODY}
      audiences={gcse.platform.audiences}
      image={IMAGE}
    />
  );
}

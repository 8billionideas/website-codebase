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
      // From xl: three lines, "Each lesson is already" / "built, structured and" / "ready to teach"
      // (desktop-only breaks). Below xl it breaks after "built," as before and wraps naturally.
      heading={
        <>
          Each lesson is already
          <br className="hidden xl:inline" /> built,
          <br className="xl:hidden" />{" "}
          <em className="text-accent">
            structured and
            <br className="hidden xl:inline" /> ready to teach
          </em>
        </>
      }
      // From xl the heading uses 760px (more than the 620px text column); the paragraph and boxes
      // stay 620px wide. The image box narrows to 50% so the laptop and its labels keep clear of
      // the wider heading (the image stays whole).
      headingClassName="xl:w-[760px] xl:max-w-none"
      imageWidthClassName="w-[50%]"
      body={BODY}
      audiences={gcse.platform.audiences}
      image={IMAGE}
    />
  );
}

import PlatformBand from "@/components/shared/PlatformBand";

// The cleaned "Student progression" dashboard on a dark-blue background ("SkillsForSuccess"
// removed; 1672×941). Its edges are close to the band colour (left #011029); the top is a touch
// lighter (light rays) and the bottom has the lighter desk reflection, so the fades are stronger
// there. The laptop and panel fill x 25.6–92.5% and y 14–89% of the image.
const IMAGE = {
  src: "/images/curriculum/student-progression-dashboard.webp",
  alt: "The 8billionideas platform on a laptop showing a student progression dashboard with key skills progress",
  width: 1672,
  height: 941,
};

const IMAGE_FADE = {
  maskImage:
    "linear-gradient(to right, transparent 0%, black 18%, black 96%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 84%, transparent 100%)",
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
} as const;

const BODY =
  "Each programme starts and ends with a simple assessment, giving you a clearer view of how students' understanding develops over time and how that progress builds across the year.";

// Our Curriculum "Making student progression easier to see and understand": a navy band with the
// lesson platform band's layout, scale and padding (PlatformBand with the same overrides as
// LessonPlatformShowcase), without the For teachers / For students boxes.
export default function StudentProgressionShowcase() {
  return (
    <PlatformBand
      background="#01102f"
      headingLine1="Making student progression"
      headingLine2="easier to see and understand"
      // The heading stays inside the 620px text column: from lg it's 44px ("Making student
      // progression" is 755px at 56px, 593px at 44px), on three lines. The green line is balanced
      // on its own at every width ("easier to see" / "and understand").
      headingClassName="lg:text-[44px]"
      headingLine2ClassName="inline-block text-balance"
      // xl: the laptop and panel (x 25.6–92.5% of the image) end at the container's right edge and
      // start 56px right of the text column. The page container's content is 1104px wide from
      // 1200px, so that leaves 428px for them: a 640px image box, its right edge 48px (7.5% of
      // 640px) past the container's right edge, where the image is only its dark edge.
      imageWidthClassName="w-[640px]"
      imageBoxStyle={{ right: "calc(max((100% - 75rem) / 2, 0px) + 3rem - 48px)" }}
      imageFade={IMAGE_FADE}
      body={BODY}
      image={IMAGE}
    />
  );
}

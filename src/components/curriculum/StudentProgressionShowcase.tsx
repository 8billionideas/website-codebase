import type { CSSProperties } from "react";
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
  "Understanding how students develop is just as important as the learning itself. Our approach helps schools identify students’ starting points, recognise how their understanding develops and build a clearer picture of their progress throughout the learning journey.";

const CARDS = [
  {
    title: "Understanding starting points",
    text: "Identify what students already know and understand before developing their skills further.",
  },
  {
    title: "Recognising progress",
    text: "See how students’ understanding develops and recognise the progress they make through learning.",
  },
];

// xl: the image box (--box) sized so the laptop and panel (x 25.6–92.5% of the image, 66.9% of the
// box) start 56px right of the 620px text column and end at least 16px inside the band's right
// edge, up to 780px wide (22% larger than the earlier 640px box). The page container's content is
// centred from 1200px and starts 552px left of centre, so the 620px text column ends at 50% + 68px.
// The box is placed by its left edge: 50% + 68px + 56px, minus the 25.6% of the box before the
// artwork. Width 780px from 1340px; at 1280px it's 747px.
const IMAGE_BOX: CSSProperties = {
  ["--box" as string]: "min(780px, calc((50% - 140px) / 0.669))",
  width: "var(--box)",
  left: "calc(50% + 124px - 0.256 * var(--box))",
  right: "auto",
};

// Our Curriculum "Making student progression easier to see and understand": a navy band with the
// lesson platform band's layout and padding (PlatformBand), with two outlined cards under the
// paragraph in place of the For teachers / For students boxes.
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
      imageWidthClassName=""
      imageBoxStyle={IMAGE_BOX}
      imageFade={IMAGE_FADE}
      body={BODY}
      image={IMAGE}
    >
      {/* Two outlined cards: side by side from md (equal heights), stacked below. */}
      <ul className="mt-content grid list-none grid-cols-1 gap-content p-0 md:grid-cols-2">
        {CARDS.map((card) => (
          <li key={card.title} className="rounded-xl border border-white/25 bg-white/[0.04] p-6">
            <h3 className="text-[18px] font-medium leading-[1.35] text-white">{card.title}</h3>
            <p className="mt-2 text-[15px] leading-[1.6] text-white/80">{card.text}</p>
          </li>
        ))}
      </ul>
    </PlatformBand>
  );
}

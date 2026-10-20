import Image from "next/image";
import Container from "@/components/layout/Container";

// Sampled from the cropped image's outer edge (#051630), so the faded edges of the image melt
// into the band with no visible rectangle.
const BAND_BACKGROUND = "#051630";

// The blue laptop, cropped to the laptop with a small dark margin (1089×773,
// lesson-platform-laptop-crop). The full-width original (lesson-platform-laptop) and the earlier
// images are kept.
const IMAGE_SRC = "/images/curriculum/lesson-platform-laptop-crop.webp";
const ALT_TEXT =
  "The 8billionideas platform on a laptop, showing course details and a lesson list for the International GCSE Global Skills Project";

// Soft fades on all four edges (15%), so no rectangle shows against the band.
const IMAGE_FADE = {
  maskImage:
    "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
} as const;

const HEADING = (
  <>
    Each lesson is already built,
    <br />
    <em className="text-accent">structured and ready to teach</em>
  </>
);

const BODY =
  "Each lesson brings the objectives, teaching content, videos, student activities and assessment together in one place, so teachers can see exactly what to deliver without having to build the learning from scratch";

export default function LessonPlatformShowcase() {
  return (
    <section
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden"
      style={{ backgroundColor: BAND_BACKGROUND }}
    >
      {/* Desktop (1024px+): two columns in the page container, the text on the left and the image
          on the right, 56px apart, vertically centred. The image is up to 700px wide: 63% of the
          container from 1280px, 55% at 1024–1279px (where the text needs more room).
          Below that: the text, then the image centred (up to 420px wide). */}
      <Container className="py-14 md:py-20 lg:grid lg:grid-cols-[minmax(0,1fr)_min(700px,55%)] lg:items-center lg:gap-14 lg:py-24 xl:grid-cols-[minmax(0,1fr)_min(700px,63%)]">
        <div className="max-w-[440px]">
          <h2 className="max-w-[560px] text-balance text-[30px] font-light leading-[1.15] tracking-[-0.01em] text-white md:text-[36px] lg:text-[44px]">
            {HEADING}
          </h2>
          <p className="mt-5 max-w-[480px] text-[18px] leading-[1.6] text-white/80 lg:mt-6">{BODY}</p>
        </div>
        <div
          // The laptop sits a little above the crop's centre (its reflection fills the bottom), so
          // from lg the image is nudged down 6% to centre the laptop itself against the text.
          className="relative mx-auto mt-8 aspect-[1089/773] w-full max-w-[420px] lg:mt-0 lg:max-w-none lg:translate-y-[6%]"
          style={IMAGE_FADE}
        >
          <Image
            src={IMAGE_SRC}
            alt={ALT_TEXT}
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 700px, 420px"
            className="object-contain"
          />
        </div>
      </Container>
    </section>
  );
}

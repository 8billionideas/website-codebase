import Image from "next/image";
import Container from "@/components/layout/Container";

// Sampled from the laptop image's dark-blue left edge (#041739), so the band and the image
// meet with no visible seam.
const BAND_BACKGROUND = "#041739";

// Matches Container's own side inset (mx-auto max-w-[75rem] + md:px-12)
// exactly, so the text column's left edge lines up with the nav logo even
// though this section bleeds full-width past the Container.
const CONTAINER_SIDE_INSET = "calc(48px + max(0px, (100vw - 1200px) / 2))";

// The blue laptop image (1862×845, lesson-platform-laptop). Its left side is empty dark blue;
// the laptop starts at 46.3% of its width. The previous images (lesson-platform.webp and
// student-progression-dashboard.webp) are kept.
const IMAGE_SRC = "/images/curriculum/lesson-platform-laptop.webp";
const IMAGE_RATIO = 1862 / 845;
const ALT_TEXT =
  "The 8billionideas platform on a laptop, showing course details and a lesson list for the International GCSE Global Skills Project";

// Desktop: the image is the band's background, anchored right, as wide as the screen where the
// laptop then clears the 440px text column by at least 48px (1280px and up), and otherwise
// narrowed just enough that it does (1024–1279px). Its edges are colour-matched to the band and
// softly faded, so no rectangle shows where the band is taller than the image.
const TEXT_RIGHT = `(${CONTAINER_SIDE_INSET} + 440px)`;
const IMAGE_WIDTH = `min(100vw, (100vw - ${TEXT_RIGHT} - 48px) / 0.537)`;
const IMAGE_FADE = {
  maskImage:
    "linear-gradient(to right, transparent 0%, black 12%), linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
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
      {/* Desktop (1024px+): the image behind, the text on the left, aligned with the nav logo.
          The band is at least as tall as the image, with 96px around the text. */}
      <div
        className="pointer-events-none absolute top-1/2 right-0 hidden -translate-y-1/2 lg:block"
        style={{ width: `calc(${IMAGE_WIDTH})`, aspectRatio: `${IMAGE_RATIO}`, ...IMAGE_FADE }}
      >
        <Image
          src={IMAGE_SRC}
          alt={ALT_TEXT}
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover object-[right_center]"
        />
      </div>
      <div
        className="relative hidden lg:flex lg:items-center"
        style={{
          paddingLeft: CONTAINER_SIDE_INSET,
          paddingRight: CONTAINER_SIDE_INSET,
          minHeight: `calc(${IMAGE_WIDTH} / ${IMAGE_RATIO})`,
        }}
      >
        <div className="relative z-10 max-w-[440px] py-24">
          <h2 className="text-balance text-[44px] font-light leading-[1.15] tracking-[-0.01em] text-white">
            {HEADING}
          </h2>
          <p className="mt-6 max-w-[480px] text-[18px] leading-[1.6] text-white/80">{BODY}</p>
        </div>
      </div>

      {/* Tablet and mobile: the text, then the image at full width (16/10, anchored right so
          the laptop shows). */}
      <div className="lg:hidden">
        <Container className="pt-14 md:pt-20">
          <h2 className="max-w-[560px] text-balance text-[30px] font-light leading-[1.15] tracking-[-0.01em] text-white md:text-[36px]">
            {HEADING}
          </h2>
          <p className="mt-5 max-w-[480px] text-[18px] leading-[1.6] text-white/80">{BODY}</p>
        </Container>
        <div
          className="relative mt-6 aspect-[16/10] w-full"
          style={{ maskImage: "linear-gradient(to bottom, transparent 0%, black 15%)" }}
        >
          <Image
            src={IMAGE_SRC}
            alt={ALT_TEXT}
            fill
            loading="lazy"
            sizes="100vw"
            className="object-cover object-[right_center]"
          />
        </div>
      </div>
    </section>
  );
}

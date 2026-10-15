import Image from "next/image";
import Container from "@/components/layout/Container";

// Sampled from the image's dark navy corners (average of several samples),
// so the band background matches the image with no visible seam. Distinct
// enough from ink #16213D (more saturated, less grey) that we use the
// exact sampled colour rather than substituting the ink token.
const BAND_BACKGROUND = "#041639";

// Matches Container's own side inset (mx-auto max-w-[75rem] + md:px-12)
// exactly, so the text column's left edge lines up with the nav logo even
// though this section bleeds full-width past the Container.
const CONTAINER_SIDE_INSET = "calc(48px + max(0px, (100vw - 1200px) / 2))";

// The dashboard mock-up (1672×941; "SkillsForSuccess" removed). Its laptop and floating panel
// fill x 25.66–92.64% and y 14.35–89% of the image; around them is a lit dark-blue background
// (#000a1b to #061f44 at the edges), so all four edges fade out inside that margin and no
// rectangle shows against the band. The previous image (lesson-platform.webp) is kept.
const IMAGE_SRC = "/images/curriculum/student-progression-dashboard.webp";
const IMAGE_FADE = {
  maskImage:
    "linear-gradient(to right, transparent 0%, black 22%, black 94%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 13%, black 88%, transparent 100%)",
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
} as const;

// Desktop: the device (laptop and panel) is right-aligned with the page container, at most
// 560px wide (39vw), and always at least 64px clear of the 440px text column. Its height is
// 0.6273 × its width. Vertically centred in the band, so against the text column.
const DEVICE_WIDTH = `min(560px, 39vw, 100vw - 2 * ${CONTAINER_SIDE_INSET} - 440px - 64px)`;
const DEVICE_LEFT = `calc(100vw - ${CONTAINER_SIDE_INSET} - ${DEVICE_WIDTH})`;
const IMAGE_WIDTH = `calc(${DEVICE_WIDTH} / 0.6698)`;

const ALT_TEXT =
  "The 8billionideas platform on a laptop, showing a student progression dashboard with key skills progress and a lesson list";

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
      {/* Desktop (1024px+): text in a column aligned with the nav logo, the image absolutely
          positioned to its right. */}
      <div
        className="relative hidden lg:grid lg:grid-cols-[1fr_1.4fr] lg:items-center"
        style={{
          paddingLeft: CONTAINER_SIDE_INSET,
          paddingRight: CONTAINER_SIDE_INSET,
          // 96px above and below whichever is taller: the text or the device.
          minHeight: `calc(${DEVICE_WIDTH} * 0.6273 + 192px)`,
        }}
      >
        <div className="relative z-10 max-w-[440px] py-24">
          <h2 className="text-balance text-[44px] font-light leading-[1.15] tracking-[-0.01em] text-white">
            {HEADING}
          </h2>
          <p className="mt-6 max-w-[480px] text-[18px] leading-[1.6] text-white/80">{BODY}</p>
        </div>
        {/* Spacer — reserves the right-hand share of the row so the text
            column above sizes itself against the image's share, even
            though the image itself is a separate, full-bleed element. */}
        <div aria-hidden="true" />
      </div>

      <div
        className="pointer-events-none absolute top-1/2 hidden aspect-[1672/941] lg:block"
        style={{
          width: IMAGE_WIDTH,
          left: `calc(${DEVICE_LEFT} - ${IMAGE_WIDTH} * 0.2566)`,
          // Centre the device (not the whole image) vertically.
          transform: "translateY(-51.68%)",
          ...IMAGE_FADE,
        }}
      >
        <Image src={IMAGE_SRC} alt={ALT_TEXT} fill loading="lazy" sizes="(min-width: 1024px) 60vw, 100vw" className="object-contain" />
      </div>

      {/* Tablet and mobile: stacked, image full width below the text. */}
      <div className="lg:hidden">
        <Container className="py-14 md:py-20">
          <h2 className="max-w-[560px] text-balance text-[30px] font-light leading-[1.15] tracking-[-0.01em] text-white md:text-[36px]">
            {HEADING}
          </h2>
          <p className="mt-5 max-w-[480px] text-[18px] leading-[1.6] text-white/80">{BODY}</p>

          {/* The image is drawn at 125% and centred on the device (so it fills about 84% of
              the width), with the same soft edge fades; capped at 480px and centred. */}
          <div className="relative mx-auto mt-10 aspect-[100/66] w-full max-w-[480px] overflow-hidden" style={IMAGE_FADE}>
            <div className="absolute aspect-[1672/941] w-[125%]" style={{ left: "-23.9%", top: "-5.1%" }}>
              <Image src={IMAGE_SRC} alt={ALT_TEXT} fill loading="lazy" sizes="(min-width: 480px) 600px, 125vw" className="object-contain" />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

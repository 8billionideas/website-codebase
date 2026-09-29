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

const ALT_TEXT =
  "The 8billionideas platform on a laptop, showing a lesson with its teaching video, lesson objectives, student activity sheets, and starting and end-of-module assessments";

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
      {/* Desktop (1024px+): text in a column aligned with the nav logo,
          image absolutely positioned and bleeding to the right edge. */}
      <div
        className="relative hidden lg:grid lg:min-h-[720px] lg:grid-cols-[1fr_1.4fr] lg:items-center"
        style={{ paddingLeft: CONTAINER_SIDE_INSET, paddingRight: CONTAINER_SIDE_INSET }}
      >
        <div className="relative z-10 max-w-[440px] py-16">
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

      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[56%] lg:block">
        <Image
          src="/images/curriculum/lesson-platform.webp"
          alt={ALT_TEXT}
          fill
          loading="lazy"
          sizes="56vw"
          className="object-contain object-right [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_20%)] [mask-image:linear-gradient(to_right,transparent_0%,black_20%)]"
        />
      </div>

      {/* Tablet and mobile: stacked, image full width below the text. */}
      <div className="lg:hidden">
        <Container className="py-14 md:py-20">
          <h2 className="max-w-[560px] text-balance text-[30px] font-light leading-[1.15] tracking-[-0.01em] text-white md:text-[36px]">
            {HEADING}
          </h2>
          <p className="mt-5 max-w-[480px] text-[18px] leading-[1.6] text-white/80">{BODY}</p>

          <div className="relative mt-10 aspect-[3/2] w-full">
            <Image
              src="/images/curriculum/lesson-platform.webp"
              alt={ALT_TEXT}
              fill
              loading="lazy"
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </Container>
      </div>
    </section>
  );
}

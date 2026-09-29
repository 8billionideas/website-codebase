import Image from "next/image";
import Container from "@/components/layout/Container";

// Sampled colour (~#FBFCFD) was within a few shades of paper #FFFDFA, so we
// use the paper token directly rather than a bespoke exact match. Shows
// through on any edge the cover-fit image doesn't reach.
const BAND_BACKGROUND = "bg-paper";

// Matches Container's own side inset (mx-auto max-w-[75rem] + md:px-12)
// exactly, so the text column's left edge lines up with the nav logo even
// though this section bleeds full-width past the Container.
const CONTAINER_SIDE_INSET = "calc(48px + max(0px, (100vw - 1200px) / 2))";

const ALT_TEXT =
  "A student assessment on the 8billionideas platform, comparing each student's answers at the start and end of a programme";

const HEADING = (
  <>
    Making student progression
    <br />
    <em className="text-accent">easier to see and understand</em>
  </>
);

const BODY =
  "Each programme starts and ends with a simple assessment, giving you a clearer view of how students' understanding develops over time and how that progress builds across the year.";

export default function StudentProgressionShowcase() {
  return (
    <section
      className={`relative left-1/2 w-screen -translate-x-1/2 overflow-hidden ${BAND_BACKGROUND}`}
    >
      {/* Desktop (1024px+): the image sits at 80% of its previous size —
          right-anchored, vertically centred, with at least 48px of the
          band's own background showing above and below it (IMAGE_HEIGHT
          is the old 16:9-derived band height scaled to 80%; the band
          itself is that plus 96px of padding, so it's noticeably shorter
          than before without ever cropping the image). The text sits on
          top of the empty left side. */}
      <div
        className="relative hidden w-full lg:block"
        style={{
          height: "calc(clamp(512px, 100vw * 9 / 20, 720px) + 96px)",
        }}
      >
        <div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2"
          style={{ height: "clamp(512px, 100vw * 9 / 20, 720px)" }}
        >
          <Image
            src="/images/curriculum/student-progression.webp"
            alt={ALT_TEXT}
            fill
            loading="lazy"
            sizes="100vw"
            className="object-contain [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_20%)] [mask-image:linear-gradient(to_right,transparent_0%,black_20%)]"
            style={{ objectPosition: "right center" }}
          />
        </div>
        <div
          className="absolute inset-0 z-10 flex items-center"
          style={{ paddingLeft: CONTAINER_SIDE_INSET, paddingRight: CONTAINER_SIDE_INSET }}
        >
          <div className="max-w-[380px]">
            <h2 className="text-balance text-[38px] font-light leading-[1.15] tracking-[-0.01em] text-ink">
              {HEADING}
            </h2>
            <p className="mt-6 text-[18px] leading-[1.6] text-ink/75">{BODY}</p>
          </div>
        </div>
      </div>

      {/* Tablet and mobile: stacked, image cropped to its useful right-hand
          content below the text. */}
      <div className="lg:hidden">
        <Container className="py-14 md:py-20">
          <h2 className="max-w-[560px] text-balance text-[30px] font-light leading-[1.15] tracking-[-0.01em] text-ink md:text-[36px]">
            {HEADING}
          </h2>
          <p className="mt-5 max-w-[480px] text-[18px] leading-[1.6] text-ink/75">{BODY}</p>

          <div className="relative mt-10 aspect-[6/5] w-full">
            <Image
              src="/images/curriculum/student-progression.webp"
              alt={ALT_TEXT}
              fill
              loading="lazy"
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: "right center" }}
            />
          </div>
        </Container>
      </div>
    </section>
  );
}

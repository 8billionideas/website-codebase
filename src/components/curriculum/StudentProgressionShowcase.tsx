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

// The cleaned dashboard mock-up on white (1672×941, "SkillsforSuccess" removed). Its laptop
// and floating panel fill x 25.6–92.5% and y 14.8–93.2% of the image; the white around them
// disappears into the paper with mix-blend-mode: multiply. The previous image
// (student-progression.webp) is kept.
const IMAGE_SRC = "/images/curriculum/student-progression-dashboard-light.webp";

const ALT_TEXT =
  "The 8billionideas platform showing a student progression dashboard with confidence scores and key skills progress";

// Desktop: the image box is right-anchored at the old size, but never so wide that the laptop
// and panel (from 25.6% of the image's width) would reach within 40px of the 380px text column.
// The image's "white" is a touch off-white (252–254), so its edges fade out to leave no faint
// rectangle on the paper.
const IMAGE_FADE = {
  maskImage:
    "linear-gradient(to right, transparent 0%, black 8%, black 96%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
} as const;

const IMAGE_BOX_WIDTH = `min(100%, (100vw - ${CONTAINER_SIDE_INSET} - 380px - 40px) / 0.744)`;

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
          className="absolute right-0 top-1/2 -translate-y-1/2 mix-blend-multiply"
          style={{ height: "clamp(512px, 100vw * 9 / 20, 720px)", width: IMAGE_BOX_WIDTH, ...IMAGE_FADE }}
        >
          <Image
            src={IMAGE_SRC}
            alt={ALT_TEXT}
            fill
            loading="lazy"
            sizes="80vw"
            className="object-contain"
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

      {/* Tablet and mobile: stacked, the image below the text at full width. */}
      <div className="lg:hidden">
        <Container className="py-14 md:py-20">
          <h2 className="max-w-[560px] text-balance text-[30px] font-light leading-[1.15] tracking-[-0.01em] text-ink md:text-[36px]">
            {HEADING}
          </h2>
          <p className="mt-5 max-w-[480px] text-[18px] leading-[1.6] text-ink/75">{BODY}</p>

          {/* Drawn at 140% and centred on the laptop and panel (so they fill about 94% of the
              width, uncropped); the white blends into the paper. */}
          <div className="relative mt-10 aspect-[100/70] w-full overflow-hidden mix-blend-multiply" style={IMAGE_FADE}>
            <div className="absolute aspect-[1672/941] w-[140%]" style={{ left: "-32.6%", top: "-10.8%" }}>
              <Image src={IMAGE_SRC} alt={ALT_TEXT} fill loading="lazy" sizes="140vw" className="object-contain" />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

import Image from "next/image";
import Container from "@/components/layout/Container";

// Sampled colour (~#FBFCFD) was within a few shades of paper #FFFDFA, so we
// use the paper token directly rather than a bespoke exact match. Shows
// through on any edge the cover-fit image doesn't reach.
const BAND_BACKGROUND = "bg-paper";

// The cleaned dashboard mock-up on white (1672×941, "SkillsforSuccess" removed). Its laptop
// and floating panel fill x 25.6–92.5% and y 14.8–93.2% of the image; the white around them
// disappears into the paper with mix-blend-mode: multiply. The previous image
// (student-progression.webp) is kept.
const IMAGE_SRC = "/images/curriculum/student-progression-dashboard-light.webp";

const ALT_TEXT =
  "The 8billionideas platform showing a student progression dashboard with confidence scores and key skills progress";

// The laptop and panel fill x 25.6–92.5% and y 14.8–93.2% of the image (1118×738px of
// 1672×941, ratio 1.515). Each layout sizes a box to just the device and draws the whole image
// around it, so the device takes the box's full width; the white margin falls outside the box
// and disappears into the paper.
const DEVICE_IMAGE_STYLE = { width: "149.4%", left: "-38.25%", top: "-18.83%" } as const;

// The image's "white" is a touch off-white (252–254), so its outer edges fade out to leave no
// faint rectangle on the paper.
const IMAGE_FADE = {
  maskImage:
    "linear-gradient(to right, transparent 0%, black 8%, black 96%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
} as const;

const HEADING = (
  <>
    Making student progression
    <br />
    <em className="text-accent">easier to see and understand</em>
  </>
);

const BODY =
  "Each programme starts and ends with a simple assessment, giving you a clearer view of how students' understanding develops over time and how that progress builds across the year.";

function DeviceImage({ sizes }: { sizes: string }) {
  return (
    <div className="pointer-events-none relative aspect-[1118/738] w-full mix-blend-multiply">
      <div className="absolute aspect-[1672/941]" style={{ ...DEVICE_IMAGE_STYLE, ...IMAGE_FADE }}>
        {/* brightness(1.01) lifts the off-white (252–254) to pure white, which multiply leaves
            invisible, so no faint box shows; the laptop's colours change imperceptibly. */}
        <Image src={IMAGE_SRC} alt={ALT_TEXT} fill loading="lazy" sizes={sizes} className="object-contain brightness-[1.01]" />
      </div>
    </div>
  );
}

// 1024px+: two columns in the page container, the text about 55% and the laptop and panel about
// 45% (the device as wide as its column, its right edge on the container's), 56px apart, the
// device vertically centred against the heading and paragraph. Below that: the text, then the
// image centred (up to 420px wide).
// The heading stays on its two lines inside the text column: the column is a size container and
// the heading scales with it (6.8cqi: "easier to see and understand", the longer line, is about
// 14.45em wide), so about 39px at 1280px and up, 33px at 1024px.
export default function StudentProgressionShowcase() {
  return (
    <section className={`relative left-1/2 w-screen -translate-x-1/2 overflow-hidden ${BAND_BACKGROUND}`}>
      <Container className="py-14 md:py-20 lg:grid lg:grid-cols-[11fr_9fr] lg:items-center lg:gap-14 lg:py-24">
        <div className="relative z-10 lg:@container">
          <h2 className="max-w-[560px] text-balance text-[30px] font-light leading-[1.15] tracking-[-0.01em] text-ink md:text-[36px] lg:max-w-none lg:text-[6.8cqi] lg:whitespace-nowrap">
            {HEADING}
          </h2>
          <p className="mt-5 max-w-[480px] text-[18px] leading-[1.6] text-ink/75 lg:mt-6 lg:max-w-none lg:text-pretty">{BODY}</p>
        </div>
        <div className="mx-auto mt-10 w-full max-w-[420px] lg:mt-0 lg:max-w-none">
          <DeviceImage sizes="(min-width: 1024px) 720px, 630px" />
        </div>
      </Container>
    </section>
  );
}

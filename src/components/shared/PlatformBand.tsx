import Image from "next/image";
import type { ReactNode } from "react";
import Container from "@/components/layout/Container";
import AudienceBoxes, { type AudienceBox } from "@/components/shared/AudienceBoxes";

// Navy platform band (/gcse "Run the whole qualification in one place", /curriculum-mapping
// "Each lesson is already built, structured and ready to teach"): one layout so the two always
// match; only the copy, image and band colour differ.
// xl+: the text, paragraph and For teachers / For students boxes on the left (up to 620px), the
// annotated laptop image on the right, vertically centred. Below xl: the text and boxes, then the
// whole image full width.

// Edge fades for the annotated laptop images (1536×1024, the same framing): 10% on the left
// (empty navy), 9% at the top (the top labels start at 12%) and 7% at the bottom (the lower labels
// end at 91%). The right edge is the band's edge.
const IMAGE_FADE = {
  maskImage:
    "linear-gradient(to right, transparent 0%, black 10%), linear-gradient(to bottom, transparent 0%, black 9%, black 93%, transparent 100%)",
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
} as const;

export default function PlatformBand({
  background,
  eyebrow,
  headingLine1,
  headingLine2,
  body,
  audiences,
  image,
  children,
  headingClassName = "",
  imageWidthClassName = "w-[53.1%]",
}: {
  // The image's sampled edge colour, so its faded edges melt into the band.
  background: string;
  eyebrow?: string;
  headingLine1: string;
  // Italic accent-green second line.
  headingLine2: string;
  body: string;
  audiences: AudienceBox[];
  image: { src: string; alt: string };
  // Optional extras under the boxes (e.g. the /gcse platform video, while switched on).
  children?: ReactNode;
  // Optional overrides (the defaults are the /gcse band): the heading's width, and the image
  // box's width from xl (the image keeps its 3:2 box and is never cropped).
  headingClassName?: string;
  imageWidthClassName?: string;
}) {
  return (
    <section
      className="relative isolate overflow-hidden xl:flex xl:min-h-[640px] xl:items-center"
      style={{ backgroundColor: background }}
    >
      {/* The annotated laptop, shown whole (contain, never cropped) so every label stays
          visible. 53.1% wide (78% × 845/1862 × 1.5: the height of the earlier /gcse image's box at
          the new 3:2 ratio), right-aligned, vertically centred, clear of the text and boxes. The
          box matches the drawn image, so the fades sit on its edges. */}
      <div
        className={`absolute top-1/2 right-0 hidden aspect-[3/2] max-h-full -translate-y-1/2 xl:block ${imageWidthClassName}`}
        style={IMAGE_FADE}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          loading="lazy"
          sizes="54vw"
          className="object-contain object-right"
        />
      </div>
      <div
        className="absolute inset-0 hidden xl:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(22,33,61,0.9) 0%, rgba(22,33,61,0.6) 35%, rgba(22,33,61,0) 55%)",
        }}
        aria-hidden="true"
      />
      <Container className="relative z-10 w-full py-16 md:py-24">
        <div className="max-w-[620px] text-left">
          {eyebrow && <p className="mb-4 text-[12px] uppercase tracking-[0.25em] text-white/65">{eyebrow}</p>}
          <h2 className={`text-balance text-[36px] font-light leading-[1.1] tracking-[-0.01em] text-white md:text-[56px] ${headingClassName}`}>
            {headingLine1}
            <br />
            <em className="text-accent">{headingLine2}</em>
          </h2>
          <p className="mt-5 text-[18px] leading-[1.6] text-white/80">{body}</p>

          {/* For teachers / For students: side by side from md, stacked below. */}
          <AudienceBoxes items={audiences} className="mt-10" />

          {children}
        </div>
      </Container>
      {/* Below xl: the whole image, full width, under the text and boxes. */}
      <Image
        src={image.src}
        alt={image.alt}
        width={1536}
        height={1024}
        loading="lazy"
        sizes="100vw"
        className="block h-auto w-full xl:hidden"
        style={IMAGE_FADE}
      />
    </section>
  );
}

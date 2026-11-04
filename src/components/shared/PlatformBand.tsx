import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import Container from "@/components/layout/Container";
import AudienceBoxes, { type AudienceBox } from "@/components/shared/AudienceBoxes";

// Navy platform band (/qualifications "Run the whole qualification in one place", /curriculum
// "Each lesson is already built, structured and ready to teach" and "Making student progression
// easier to see and understand"): one layout so they always match; only the copy, image (with
// its shape and edge fades) and band colour differ.
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
  heading,
  body,
  audiences,
  image,
  children,
  headingClassName = "",
  headingLine2ClassName = "",
  imageWidthClassName = "w-[53.1%]",
  imageFade = IMAGE_FADE,
  imageBoxStyle,
}: {
  // The image's sampled edge colour, so its faded edges melt into the band.
  background: string;
  eyebrow?: string;
  headingLine1?: string;
  // Italic accent-green second line.
  headingLine2?: string;
  // Instead of the two lines, when the heading needs its own line breaks.
  heading?: ReactNode;
  body: string;
  // The For teachers / For students boxes (none when omitted).
  audiences?: AudienceBox[];
  // width and height: the file's size, which also sets the image box's shape (default 1536×1024).
  image: { src: string; alt: string; width?: number; height?: number };
  // Optional extras under the boxes (e.g. the /qualifications platform video, while switched on).
  children?: ReactNode;
  // Optional overrides (the defaults are the /qualifications band): the heading's width, and the image
  // box's width from xl (the image keeps its 3:2 box and is never cropped).
  headingClassName?: string;
  headingLine2ClassName?: string;
  imageWidthClassName?: string;
  // Edge fades for images framed differently from the annotated laptops.
  imageFade?: CSSProperties;
  // Overrides for the xl image box's position (e.g. a right offset that lines the artwork up with
  // the container's right edge).
  imageBoxStyle?: CSSProperties;
}) {
  const width = image.width ?? 1536;
  const height = image.height ?? 1024;
  return (
    <section
      className="relative isolate overflow-hidden xl:flex xl:min-h-[640px] xl:items-center"
      style={{ backgroundColor: background }}
    >
      {/* The annotated laptop, shown whole (contain, never cropped) so every label stays
          visible. 53.1% wide (78% × 845/1862 × 1.5: the height of the earlier /qualifications image's box at
          the new 3:2 ratio), right-aligned, vertically centred, clear of the text and boxes. The
          box matches the drawn image, so the fades sit on its edges. */}
      <div
        className={`absolute top-1/2 right-0 hidden max-h-full -translate-y-1/2 xl:block ${imageWidthClassName}`}
        style={{ ...imageFade, aspectRatio: `${width} / ${height}`, ...imageBoxStyle }}
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
      <Container className="relative z-10 w-full py-section">
        <div className="max-w-[620px] text-left">
          {eyebrow && <p className="mb-4 text-[12px] uppercase tracking-[0.25em] text-white/65">{eyebrow}</p>}
          <h2 className={`text-balance text-[36px] font-light leading-[1.1] tracking-[-0.01em] text-white md:text-[56px] ${headingClassName}`}>
            {heading ?? (
              <>
                {headingLine1}
                <br />
                <em className={`text-accent ${headingLine2ClassName}`}>{headingLine2}</em>
              </>
            )}
          </h2>
          <p className="mt-lead text-[18px] leading-[1.6] text-white/80">{body}</p>

          {/* For teachers / For students: side by side from md, stacked below. */}
          {audiences && <AudienceBoxes items={audiences} className="mt-10" />}

          {children}
        </div>
      </Container>
      {/* Below xl: the whole image, full width, under the text and boxes. */}
      <Image
        src={image.src}
        alt={image.alt}
        width={width}
        height={height}
        loading="lazy"
        sizes="100vw"
        className="block h-auto w-full xl:hidden"
        style={imageFade}
      />
    </section>
  );
}

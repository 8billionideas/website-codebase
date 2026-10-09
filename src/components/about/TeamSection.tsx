import Image from "next/image";
import type { CSSProperties } from "react";
import {
  teamPhotos,
  teamQuotes,
  type TeamPhoto,
  type TeamQuote,
} from "@/content/about-team";

// A photo "print": 10px white border, soft shadow, slight tilt. On hover it straightens a
// little and lifts (skipped with prefers-reduced-motion). The tilt comes in as --r.
function Print({
  photo,
  sizes,
  rotate,
  className = "",
  style,
}: {
  photo: TeamPhoto;
  sizes: string;
  // Desktop collage sets the tilt inline; tablet/mobile set --r with classes instead
  // (an inline value would override those).
  rotate?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <figure
      className={`m-0 bg-white p-2.5 [--r:0deg] shadow-[0_12px_32px_rgba(22,33,61,0.15)] [transform:rotate(var(--r))] transition-transform duration-300 ease-out hover:z-30 hover:[transform:rotate(calc(var(--r)*0.4))_scale(1.02)] motion-reduce:transition-none motion-reduce:hover:[transform:rotate(var(--r))] ${className}`}
      style={
        {
          ...(rotate === undefined ? {} : { "--r": `${rotate}deg` }),
          ...style,
        } as CSSProperties
      }
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          loading="lazy"
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition: photo.position }}
        />
      </div>
    </figure>
  );
}

function QuoteCard({
  quote,
  className,
  style,
}: {
  quote: TeamQuote;
  className: string;
  style: CSSProperties;
}) {
  return (
    <figure
      className={`m-0 rounded-xl bg-white p-5 shadow-[0_12px_32px_rgba(22,33,61,0.15)] ${className}`}
      style={style}
    >
      <span
        aria-hidden="true"
        className="block text-[32px] font-light leading-none text-accent"
      >
        &ldquo;
      </span>
      <blockquote className="mt-1">
        <p className="text-[18px] font-light italic leading-[1.45] text-ink">
          {quote.text}
        </p>
      </blockquote>
      <span aria-hidden="true" className="mt-3 block h-0.5 w-8 bg-accent" />
      <figcaption className="mt-3">
        <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-ink">
          {quote.name}
        </p>
        <p className="mt-0.5 text-[11px] text-ink/55">{quote.role}</p>
      </figcaption>
    </figure>
  );
}

// Hand-drawn accent doodles (decorative).
function Sparkle({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      className={`absolute text-accent ${className ?? ""}`}
      style={style}
    >
      <g
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M20 4 L21 14" />
        <path d="M6 16 L15 20" />
        <path d="M34 15 L26 21" />
      </g>
    </svg>
  );
}

function Swoosh({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 80 40"
      aria-hidden="true"
      className={`absolute text-accent ${className ?? ""}`}
      style={style}
    >
      <g
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M4 26 C 22 10, 46 8, 72 14" />
        <path d="M14 34 C 30 22, 50 20, 70 24" />
      </g>
    </svg>
  );
}

// Desktop collage: positions are % of the container (left/width of its width, top of its
// height); heights follow each frame's 4/3 ratio. Only the radio photo overlaps another
// (the group photo's bottom-right corner, below everyone's faces).
const COLLAGE = {
  group: { left: "2%", top: "6%", width: "54%", rotate: -2, z: 10 },
  radio: { left: "49%", top: "52%", width: "20%", rotate: 2, z: 20 },
  schoolVisit: { left: "58%", top: "0%", width: "24%", rotate: 1.5, z: 10 },
  laughing: { left: "76%", top: "58%", width: "22%", rotate: 2.5, z: 10 },
} as const;

function place({
  left,
  top,
  width,
  z,
}: {
  left: string;
  top: string;
  width: string;
  z: number;
}): CSSProperties {
  return { left, top, width, zIndex: z };
}

export default function TeamSection() {
  const { group, schoolVisit, radio, laughing } = teamPhotos;

  return (
    <section className="bg-paper pt-16 pb-16 md:pt-24 md:pb-24">
      {/* Header — centred on purpose, for this showcase section only. */}
      {/* 960px (not 900) so the heading's second line (939px at 52px) fits on one line;
          the paragraph keeps a 900px measure. Side padding sits outside the max width. */}
      <div className="px-6 md:px-12">
        <div className="mx-auto max-w-[960px] text-center">
          <p className="text-[12px] uppercase tracking-[0.25em] text-ink/60">
            THE PEOPLE BEHIND 8BILLIONIDEAS
          </p>
          <h2 className="mt-4 text-balance text-[32px] font-light leading-[1.15] tracking-[-0.01em] text-ink md:text-[52px]">
            We&apos;re a team of people who
            <br />
            <em className="text-accent">genuinely care</em> about the work we do
          </h2>
          <p className="mx-auto mt-5 max-w-[900px] text-[18px] leading-[1.6] text-ink/70">
            We care deeply about helping schools and students feel supported,
            challenged and inspired. Everything we do is about creating real
            opportunities, building confidence and showing young people
            what&apos;s possible.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-[1400px] px-6 md:px-12">
        {/* Desktop (lg+): the collage. */}
        <div className="relative hidden aspect-[16/8.5] lg:block">
          <Print
            photo={group}
            sizes="(min-width: 1400px) 700px, 54vw"
            rotate={COLLAGE.group.rotate}
            className="absolute"
            style={place(COLLAGE.group)}
          />
          <Print
            photo={schoolVisit}
            sizes="(min-width: 1400px) 320px, 24vw"
            rotate={COLLAGE.schoolVisit.rotate}
            className="absolute"
            style={place(COLLAGE.schoolVisit)}
          />
          <Print
            photo={radio}
            sizes="(min-width: 1400px) 260px, 20vw"
            rotate={COLLAGE.radio.rotate}
            className="absolute"
            style={place(COLLAGE.radio)}
          />
          <Print
            photo={laughing}
            sizes="(min-width: 1400px) 290px, 22vw"
            rotate={COLLAGE.laughing.rotate}
            className="absolute"
            style={place(COLLAGE.laughing)}
          />

          {teamQuotes.nearGroup && (
            <QuoteCard
              quote={teamQuotes.nearGroup}
              className="absolute z-20 rotate-[-1.5deg]"
              style={{ left: "30%", top: "84%", width: "22%" }}
            />
          )}
          {teamQuotes.betweenRight && (
            <QuoteCard
              quote={teamQuotes.betweenRight}
              className="absolute z-20 rotate-[1.5deg]"
              style={{ left: "74%", top: "28%", width: "24%" }}
            />
          )}

          <Sparkle className="w-10" style={{ left: "-0.5%", top: "-3%" }} />
          <Sparkle
            className="w-9 rotate-12"
            style={{ left: "84%", top: "6%" }}
          />
          <Sparkle
            className="w-9 -rotate-12"
            style={{ left: "45%", top: "84%" }}
          />
          <Swoosh className="w-20" style={{ left: "89%", top: "92%" }} />
        </div>

        {/* Tablet (md–lg): group on top, the other three in a row, slight tilts, no overlaps.
            Mobile: no tilt — group, then a 2-column grid with the third spanning both. */}
        <div className="lg:hidden">
          <Print photo={group} sizes="100vw" className="md:[--r:-1deg]" />
          <div className="mt-3 grid grid-cols-2 gap-3 md:mt-8 md:grid-cols-3 md:gap-6">
            <Print
              photo={schoolVisit}
              sizes="(min-width: 768px) 33vw, 50vw"
              className="md:[--r:1.5deg]"
            />
            <Print
              photo={radio}
              sizes="(min-width: 768px) 33vw, 50vw"
              className="md:[--r:-1.5deg]"
            />
            <Print
              photo={laughing}
              sizes="(min-width: 768px) 33vw, 100vw"
              className="col-span-2 md:col-span-1 md:[--r:2deg]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

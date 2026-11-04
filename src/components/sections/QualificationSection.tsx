import Image from "next/image";

import Container from "@/components/layout/Container";
import { Eyebrow, SectionBody, SectionH2 } from "@/components/home/SectionHeading";
import PartnerCards from "@/components/shared/PartnerCards";
import OxfordAqaLogo from "@/components/shared/OxfordAqaLogo";
import ChampionSchools from "@/components/sections/ChampionSchools";
import Button from "@/components/ui/Button";
import CriticalCurriculumName from "@/components/shared/CriticalCurriculumName";

// x-positions are percentages of content width (so they line up with the
// left-bleed stub regardless of viewport), y-positions are exact pixels
// that match the wrapper's own fixed height 1:1 — no viewBox scaling on
// the vertical axis, so every offset below is a real, literal pixel value.
const STAGE_X_PERCENT = [8, 22, 36, 50] as const;
const DESTINATION_X_PERCENT = 90;
const LOCKUP_X_PERCENT = 78;

// Fixed viewBox-unit x-positions for the path: flat run, then a rise, then
// a flat plateau into the destination dot. These stay constant across
// breakpoints — only the y-values (lineY/plateauY) and heightPx change.
const PATH_X = { flatEnd: 540, riseEnd: 660, destination: 900 };

const stageLabels = [
  "Foundational learning",
  "Applied learning",
  "Independent learning",
  "Qualification preparation",
] as const;
const STAGE_ABOVE = [true, false, true, false] as const;

const claims = [
  "Full International GCSE",
  "Project-based learning and assessment",
  "Internally assessed, externally moderated",
];

function OxfordAqaLockup() {
  return (
    <div className="text-center">
      <OxfordAqaLogo variant="dark" width={180} className="mx-auto" />
      {/* 16px below the logo: at least the logo's "O" height (14px at 180px) of clear space. */}
      <div className="mx-auto mt-4 mb-3 h-px w-[120px] bg-white/20" aria-hidden="true" />
      <p className="whitespace-nowrap text-[18px] font-light uppercase tracking-[0.3em] text-white">
        International GCSE
      </p>
      <p className="mt-[10px] whitespace-nowrap text-[11px] uppercase tracking-[0.3em] text-white/70">
        Global Skills Projects
      </p>
    </div>
  );
}

// Matches Container's own left inset (mx-auto max-w-[75rem] + md:px-12)
// exactly, so the bleed stub's right edge lands precisely where the
// content-width box (below) begins — for the md+ range this component
// renders in, that's always the 48px md:px-12 padding, plus half of
// whatever margin appears once the viewport exceeds the 1200px max-width.
const CONTENT_LEFT_INSET = "calc(48px + max(0px, (100vw - 1200px) / 2))";

interface LineGeometry {
  heightPx: number;
  lineY: number;
  plateauY: number;
  stageLabelPx: number;
  destLabelPx: number;
}

// All y-values are exact pixels matching the wrapper's own fixed height
// 1:1 (viewBox height === heightPx), so there is no vertical scaling to
// reason about — only the x-axis stretches with the viewport, which is
// why the path's stroke uses vector-effect="non-scaling-stroke" to stay
// a constant 1.5px regardless. The path runs flat, rises, then runs flat
// again along a plateau into the destination dot — it never peaks, so
// the OxfordAQA lockup (placed under the plateau) never crosses it.
function ProgressionCurve({ heightPx, lineY, plateauY, stageLabelPx, destLabelPx }: LineGeometry) {
  const { flatEnd, riseEnd, destination } = PATH_X;
  const cpX = flatEnd + 60;
  const pathD = `M 0 ${lineY} L ${flatEnd} ${lineY} C ${cpX} ${lineY}, ${cpX} ${plateauY}, ${riseEnd} ${plateauY} L ${destination} ${plateauY}`;

  return (
    <div className="relative w-full" style={{ height: heightPx }}>
      {/* Bleeds the horizontal line from the true viewport edge up to
          where this content-width box begins — clipped by the section's
          own overflow-hidden, so it never causes scroll. Top is offset by
          half the stroke width so it's centred on the same y the SVG
          stroke is centred on, with no visible step where they meet. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-[1.5px] bg-accent"
        style={{ right: "100%", top: lineY - 0.75, width: CONTENT_LEFT_INSET }}
      />

      <svg
        viewBox={`0 0 1000 ${heightPx}`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full text-accent"
        aria-hidden="true"
      >
        <path
          d={pathD}
          vectorEffect="non-scaling-stroke"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      {stageLabels.map((label, i) => (
        <span
          key={label}
          className="absolute h-2 w-2 rounded-full bg-accent"
          style={{
            left: `${STAGE_X_PERCENT[i]}%`,
            top: lineY,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {stageLabels.map((label, i) => {
        const above = STAGE_ABOVE[i];
        return (
          <p
            key={`${label}-label`}
            className="absolute max-w-[120px] text-center font-normal tracking-wide text-white/85"
            style={{
              left: `${STAGE_X_PERCENT[i]}%`,
              top: above ? lineY - 14 : lineY + 14,
              transform: above ? "translate(-50%, -100%)" : "translateX(-50%)",
              fontSize: stageLabelPx,
            }}
          >
            {label}
          </p>
        );
      })}

      {/* Destination dot + label — the only stop that stays accent-green,
          uppercase and letter-spaced. */}
      <span
        className="absolute h-2 w-2 rounded-full bg-accent"
        style={{
          left: `${DESTINATION_X_PERCENT}%`,
          top: plateauY,
          transform: "translate(-50%, -50%)",
        }}
      />
      <p
        className="absolute max-w-[140px] text-center font-medium uppercase tracking-wide text-accent"
        style={{
          left: `${DESTINATION_X_PERCENT}%`,
          top: plateauY - 14,
          transform: "translate(-50%, -100%)",
          fontSize: destLabelPx,
        }}
      >
        A recognised destination
      </p>
    </div>
  );
}

// 1280px and up: lockup sits absolutely under the plateau, clear of the
// rise, so the line never runs through it.
function ProgressionLineDesktop() {
  const heightPx = 190;
  const lineY = 115;
  const plateauY = 45;

  return (
    <div className="relative hidden xl:block">
      <ProgressionCurve
        heightPx={heightPx}
        lineY={lineY}
        plateauY={plateauY}
        stageLabelPx={13}
        destLabelPx={12}
      />
      <div
        className="absolute text-center"
        style={{ left: `${LOCKUP_X_PERCENT}%`, top: plateauY + 32, transform: "translateX(-50%)" }}
      >
        <OxfordAqaLockup />
      </div>
    </div>
  );
}

// 768px to 1279px: same line block, smaller, but the lockup drops into
// normal flow below it (right-aligned under the destination dot) instead
// of being absolutely positioned over the plateau.
function ProgressionLineTablet() {
  const heightPx = 160;
  const lineY = 102;
  const plateauY = 42;

  return (
    <div className="relative hidden md:block xl:hidden">
      <ProgressionCurve
        heightPx={heightPx}
        lineY={lineY}
        plateauY={plateauY}
        stageLabelPx={12}
        destLabelPx={11}
      />
      <div className="mt-6 ml-auto w-max text-center">
        <OxfordAqaLockup />
      </div>
    </div>
  );
}

function ProgressionLineMobile() {
  return (
    <div className="relative border-l-2 border-accent pl-6 md:hidden">
      <ul className="space-y-6">
        {stageLabels.map((label) => (
          <li key={label} className="relative">
            <span
              className="absolute -left-[1.9rem] top-1 h-2 w-2 rounded-full bg-accent"
              aria-hidden="true"
            />
            <p className="text-[13px] font-normal tracking-wide text-white/85">{label}</p>
          </li>
        ))}
        <li className="relative">
          <span
            className="absolute -left-[1.9rem] top-1 h-2 w-2 rounded-full bg-accent"
            aria-hidden="true"
          />
          <p className="text-[11px] font-medium uppercase tracking-wide text-accent">
            A recognised destination
          </p>
        </li>
      </ul>
      <div className="mt-8">
        <OxfordAqaLockup />
      </div>
    </div>
  );
}

export default function QualificationSection() {
  return (
    <section
      className="relative overflow-hidden bg-ink py-section"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[260px] md:h-[520px] lg:h-[620px]"
        aria-hidden="true"
      >
        <Image
          src="/images/gcse-homepage.webp"
          alt=""
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover object-[80%_top] md:object-right-top"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(22,33,61,0.25)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(22,33,61,0) 45%, rgba(22,33,61,1) 100%)",
          }}
        />
      </div>

      <Container className="relative z-10">
        <div className="h-[260px] md:hidden" aria-hidden="true" />

        {/* Top area: title block first, progression line full-width below it —
            stacked at every breakpoint, never side by side. */}
        <div className="mt-10 md:mt-0">
          <Eyebrow variant="dark">A RECOGNISED QUALIFICATION</Eyebrow>
          <SectionH2 variant="dark" className="mt-eyebrow text-balance">
            The opportunity to turn learning
            <br />
            <em className="text-accent">into a qualification</em>
          </SectionH2>
          <SectionBody variant="dark" className="mt-lead">
            At secondary level, as the teaching and learning partner for the
            OxfordAQA International GCSE Global Skills Projects, we help schools
            give students the opportunity to apply and demonstrate the skills
            they&apos;ve developed through <CriticalCurriculumName />.
          </SectionBody>
        </div>

        <div className="mt-6">
          <ProgressionLineDesktop />
          <ProgressionLineTablet />
          <ProgressionLineMobile />
        </div>

        {/* Intro row */}
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-0 md:divide-x md:divide-white/10">
          <div className="md:pr-12">
            <p className="text-h3 text-balance font-light text-white">
              A recognised qualification,{" "}
              <em className="text-accent">fully supported from start to finish</em>
            </p>
          </div>
          <div className="md:pl-12">
            <p className="max-w-md text-body-lg text-white/70">
              OxfordAQA provides the qualification, while we make it easier
              for schools to deliver through ready-to-teach learning,
              resources and support.
            </p>
          </div>
        </div>

        <PartnerCards />

        {/* Three-claim row */}
        <div className="mt-16 grid grid-cols-1 divide-y divide-white/10 text-center md:grid-cols-3 md:divide-x md:divide-y-0 lg:-mx-6">
          {claims.map((claim) => (
            <div
              key={claim}
              className="flex flex-col items-center gap-3 px-6 py-6 first:pt-0 md:py-0 lg:px-3"
            >
              <p className="text-body-lg font-normal text-white">{claim}</p>
              <span className="h-0.5 w-8 bg-accent" aria-hidden="true" />
            </div>
          ))}
        </div>

        {/* Partnership lockup: both logos in 36px-high areas, vertically centred, with their captions
            16px below, so the captions share a line; the "×" is centred on the logo row. The
            OxfordAQA logo is at its 140px minimum, where its "AQA" box matches the wordmark's cap
            height (smaller would make "International Qualifications" too small to read). */}
        <div className="mt-16 flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:justify-center md:gap-10">
          <div>
            <div className="flex h-9 items-center justify-center">
              <OxfordAqaLogo variant="dark" width={140} />
            </div>
            <p className="mt-4 text-caption text-white/50">
              Qualification &amp; assessment expertise
            </p>
          </div>
          <span className="flex h-9 items-center text-h3 font-light text-white/30" aria-hidden="true">
            ×
          </span>
          <div>
            <div className="flex h-9 items-center justify-center">
              <p className="text-h3 font-bold text-white">8billionideas</p>
            </div>
            <p className="mt-4 text-caption text-white/50">
              Teaching, platform &amp; school support
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 flex justify-center">
          <Button href="/gcse" arrow>
            Explore the qualification
          </Button>
        </div>

        <ChampionSchools />
      </Container>
    </section>
  );
}

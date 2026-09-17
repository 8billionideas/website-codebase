"use client";

import { useState } from "react";
import { Pillar } from "@/content/pillars";
import PillarNode from "@/components/sections/PillarNode";
import PillarModal from "@/components/sections/PillarModal";

// Abstract coordinate space for the converging-lines diagram below the
// spine — independent of real pixel width, since the SVG scales to 100%
// of the container. Kept in exact eighths (no gap) so each path's start-x
// lines up with the grid-cols-8 row's marker columns above it.
const CONVERGE_WIDTH = 800;
const CONVERGE_HEIGHT = 140;
const CONVERGE_MERGE_Y = 90;
const CONVERGE_CENTER_X = CONVERGE_WIDTH / 2;

export default function PillarSpine({ pillars }: { pillars: Pillar[] }) {
  const [active, setActive] = useState<Pillar | null>(null);
  const slice = CONVERGE_WIDTH / pillars.length;
  const xs = pillars.map((_, i) => slice * (i + 0.5));

  return (
    <>
      <div className="relative mt-16">
        {/* The connecting thread — runs through every marker's center.
            Desktop offset (92px) = the fixed name+badge slot (56px) +
            gap (16px) + half the 40px marker (20px), so it passes through
            the marker regardless of label height. */}
        <div
          aria-hidden="true"
          className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/50 to-accent/10 md:left-[6%] md:right-[6%] md:top-[92px] md:bottom-auto md:h-px md:w-auto md:bg-gradient-to-r"
        />

        <ul className="relative flex flex-col gap-8 md:grid md:grid-cols-8 md:items-start md:gap-0">
          {pillars.map((pillar) => (
            <li key={pillar.name} className="relative min-w-0 md:px-1.5">
              <PillarNode pillar={pillar} onOpen={() => setActive(pillar)} />
            </li>
          ))}
        </ul>

        {/* Converging lines — desktop only. Each of the 8 markers gets its
            own descending line; they merge into one continuous accent
            line that carries on down into the GCSE section below. */}
        <svg
          viewBox={`0 0 ${CONVERGE_WIDTH} ${CONVERGE_HEIGHT}`}
          preserveAspectRatio="none"
          className="mt-2 hidden h-32 w-full md:block"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="pillar-spine-converge"
              x1="0"
              y1="0"
              x2="0"
              y2={CONVERGE_MERGE_Y}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="currentColor" className="text-ink/15" />
              <stop offset="100%" stopColor="currentColor" className="text-accent" />
            </linearGradient>
          </defs>

          {xs.map((x, i) => (
            <path
              key={i}
              d={`M ${x} 0 C ${x} ${CONVERGE_MERGE_Y / 2}, ${CONVERGE_CENTER_X} ${CONVERGE_MERGE_Y / 2}, ${CONVERGE_CENTER_X} ${CONVERGE_MERGE_Y}`}
              stroke="url(#pillar-spine-converge)"
              strokeWidth="1.5"
              fill="none"
            />
          ))}

          <line
            x1={CONVERGE_CENTER_X}
            y1={CONVERGE_MERGE_Y}
            x2={CONVERGE_CENTER_X}
            y2={CONVERGE_HEIGHT}
            strokeWidth="2"
            className="text-accent"
            stroke="currentColor"
          />
        </svg>

        {/* Continues the merged line through this section's own bottom
            padding (96px, matching CriticalCurriculum's md:py-24) so it
            reaches the section boundary with no visible break. The stub
            inside Gcse.tsx picks up from there into the box's top border. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-full hidden h-24 w-px -translate-x-1/2 bg-accent md:block"
        />

        <div
          aria-hidden="false"
          className="absolute left-[calc(50%+2.5rem)] top-full z-10 mt-12 hidden w-52 -translate-y-1/2 rounded-xl border border-accent/30 bg-accent/10 p-4 text-caption text-ink md:block lg:w-64"
        >
          Skills don&apos;t appear overnight. From FS1 onward, students build
          the same eight skill areas year after year — so by the time they
          reach the GCSE, they&apos;re not starting from scratch. They&apos;re
          finishing what they started.
        </div>
      </div>

      <PillarModal pillar={active} onClose={() => setActive(null)} />
    </>
  );
}

"use client";

import { useInView } from "./useInView";
import { gecAssess } from "@/content/gec-academy";

const RING = 264; // circumference of the r=42 ring
const COLOURS = { a: "#21D199", b: "#6840FC" } as const;

// The two projects as white site cards (rounded 16px, ink text, a dark-green year chip), each with
// its ring filling to its share of the grade once the cards are on screen (at once with reduced
// motion): accent-green for 60%, violet for 40%.
export default function ProjectCards() {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className="mt-content grid grid-cols-1 gap-6 md:grid-cols-2">
      {gecAssess.projects.map((project) => (
        <article
          key={project.title}
          className="flex flex-col rounded-2xl border border-ink/10 bg-white p-8 shadow-[0_8px_24px_rgba(22,33,61,0.08)]"
        >
          <p className="w-fit rounded-full bg-accent/10 px-3 py-1 text-[12px] font-medium uppercase tracking-[0.15em] text-[#0E7C5A]">
            {project.year}
          </p>
          <h3 className="mt-4 text-[24px] font-normal leading-[1.25] text-ink md:text-[28px]">{project.title}</h3>
          <p className="mt-3 text-[16px] leading-[1.6] text-ink/75">{project.text}</p>
          <div className="mt-8 flex items-center gap-5 md:mt-auto md:pt-8">
            <svg viewBox="0 0 100 100" className="h-[88px] w-[88px] shrink-0 -rotate-90" aria-hidden="true">
              <circle cx="50" cy="50" r="42" fill="none" strokeWidth="9" stroke="rgba(22,33,61,0.08)" />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                strokeWidth="9"
                strokeLinecap="round"
                stroke={COLOURS[project.tone]}
                strokeDasharray={RING}
                strokeDashoffset={inView ? RING - (RING * project.percent) / 100 : RING}
                className="transition-[stroke-dashoffset] duration-[1600ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none"
              />
            </svg>
            <div>
              <p className="text-[56px] font-light leading-none text-ink md:text-[64px]">{project.percent}%</p>
              <p className="mt-1 text-[15px] text-ink/70">{gecAssess.ringLabel}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

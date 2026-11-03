"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "./motion";
import { gecPathway } from "@/content/gec-academy";

// The three steps as a timeline in the homepage progression style (a thin line through small
// dots): horizontal from md, vertical below. An accent-green line fills along it as the steps
// scroll up the screen, lighting each dot as it passes; with reduced motion it's shown full.
export default function PathwaySteps() {
  const ref = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = prefersReducedMotion();
    function update() {
      if (reduce) return setProgress(1);
      const r = el!.getBoundingClientRect();
      setProgress(Math.min(1, Math.max(0, (window.innerHeight * 0.75 - r.top) / (r.height * 0.9))));
    }
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const steps = gecPathway.steps;
  return (
    <ol ref={ref} className="relative mt-content grid list-none grid-cols-1 gap-8 p-0 md:grid-cols-3 md:gap-8">
      {/* The track and its green fill: across the top from md (dot centre to dot centre), down the
          left below md. */}
      <span aria-hidden="true" className="absolute top-2 bottom-2 left-[5px] w-px bg-ink/25 md:top-[5px] md:right-[calc((100%-64px)/3)] md:bottom-auto md:left-0 md:h-px md:w-auto" />
      <span
        aria-hidden="true"
        className="absolute top-2 left-[4px] w-[3px] rounded-full bg-accent md:top-[4px] md:left-0 md:hidden"
        style={{ height: `calc((100% - 16px) * ${progress.toFixed(3)})` }}
      />
      <span
        aria-hidden="true"
        className="absolute top-[4px] left-0 hidden h-[3px] rounded-full bg-accent md:block"
        style={{ width: `calc((100% - (100% - 64px) / 3) * ${progress.toFixed(3)})` }}
      />
      {steps.map((step, i) => {
        const on = progress > i / steps.length + 0.04 || progress === 1;
        return (
          <li key={step.title} className="relative pl-8 md:pl-0 md:pt-10">
            <span
              aria-hidden="true"
              className={`absolute top-1 left-0 h-3 w-3 rounded-full border-2 transition-colors duration-300 motion-reduce:transition-none md:top-0 ${
                on ? "border-accent bg-accent" : "border-ink/30 bg-white"
              }`}
            />
            <p className="text-[12px] uppercase tracking-[0.25em] text-[#0E7C5A]">{step.level}</p>
            <h3 className="mt-2 text-[22px] font-normal leading-[1.3] text-ink">{step.title}</h3>
            <p className="mt-2 max-w-[340px] text-[15px] leading-[1.6] text-ink/70">{step.text}</p>
          </li>
        );
      })}
    </ol>
  );
}

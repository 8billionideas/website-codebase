"use client";

import { useEffect, useState } from "react";
import Container from "@/components/layout/Container";
import { prefersReducedMotion } from "./motion";
import { useInView } from "./useInView";
import { gecStats } from "@/content/gec-academy";

type Stat = (typeof gecStats)[number];

function format(value: number, stat: Stat) {
  if (stat.format === "m") return value >= 1e6 ? "1M" : Math.round(value).toLocaleString("en-GB");
  return Math.round(value).toLocaleString("en-GB") + (stat.suffix ?? "");
}

// The four key facts on a soft mint band, in the About page's stat style (large light ink
// figures), counted up from 0 over 1.8s once 30% of the band is on screen. Reduced motion (and a
// target of 0) shows the final figure at once.
export default function Stats() {
  const [ref, inView] = useInView<HTMLElement>();
  const [values, setValues] = useState<string[]>(() => gecStats.map(() => "0"));

  useEffect(() => {
    if (!inView) return;
    // Reduced motion: the first frame shows the final figures.
    const duration = prefersReducedMotion() ? 0 : 1800;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const k = duration ? Math.min(1, (t - t0) / duration) : 1;
      const eased = 1 - Math.pow(1 - k, 4);
      setValues(gecStats.map((stat) => format(stat.count * eased, stat)));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  return (
    <section ref={ref} aria-label="Key facts" className="bg-[color-mix(in_srgb,var(--color-accent)_8%,var(--color-paper))] py-section-tight">
      <Container>
        <ul className="grid list-none grid-cols-2 gap-y-10 p-0 md:grid-cols-4 md:divide-x md:divide-ink/12">
          {gecStats.map((stat, i) => (
            <li key={stat.text} className="px-4 text-center md:px-6">
              <p className="whitespace-nowrap text-[44px] font-light leading-none text-ink md:text-[40px] lg:text-[52px] xl:text-[64px]">
                {/* Screen readers get the final figure, not the count. */}
                <span aria-hidden="true">{values[i]}</span>
                <span className="sr-only">{format(stat.count, stat)}</span>
              </p>
              <p className="mx-auto mt-3 max-w-[240px] text-[15px] leading-[1.5] text-ink/65">{stat.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

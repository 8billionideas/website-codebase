"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Container from "@/components/layout/Container";
import type { Testimonial } from "@/content/types";

function Slide({
  testimonial,
  active,
}: {
  testimonial: Testimonial;
  active: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  // Only offer "Read more" when the 6-line clamp actually cuts the quote off.
  useEffect(() => {
    const el = quoteRef.current;
    if (!el) return;
    const measure = () => {
      if (!expanded) setOverflowing(el.scrollHeight > el.clientHeight + 1);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [expanded]);

  return (
    // Every slide sits in the same grid cell, so the band keeps the height of the tallest one.
    <figure
      aria-hidden={!active}
      inert={!active}
      className={`[grid-area:1/1] transition-opacity duration-300 motion-reduce:transition-none ${
        active ? "opacity-100" : "pointer-events-none invisible opacity-0"
      }`}
    >
      <span
        aria-hidden="true"
        className="block text-[56px] font-light leading-none text-accent"
      >
        &ldquo;
      </span>
      <blockquote className="mt-2">
        <p
          ref={quoteRef}
          className={`max-w-[900px] text-[20px] font-light leading-[1.45] text-white md:text-[26px] ${
            expanded ? "" : "line-clamp-6"
          }`}
        >
          {testimonial.quote}
        </p>
      </blockquote>
      {(overflowing || expanded) && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className="mt-3 cursor-pointer rounded-sm text-[15px] text-white underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}
      <figcaption className="mt-6">
        <p className="text-[16px] font-medium text-white">{testimonial.name}</p>
        <p className="mt-1 text-[14px] text-white/65">{testimonial.role}</p>
      </figcaption>
    </figure>
  );
}

// Full-width ink band, one testimonial at a time. No autoplay; wraps at the ends.
export default function TestimonialCarousel({
  testimonials,
  image = null,
}: {
  testimonials: Testimonial[];
  // Optional photo on the left (above on smaller screens). null shows a blank placeholder.
  image?: { src: string; alt: string } | null;
}) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const total = testimonials.length;

  function go(next: number) {
    setIndex((next + total) % total);
  }

  return (
    <section
      aria-label="Testimonials"
      className="bg-ink py-14 md:py-20"
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return;
        const dx = event.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(dx) > 50) go(dx < 0 ? index + 1 : index - 1);
      }}
    >
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[34%_minmax(0,1fr)] lg:items-center lg:gap-14">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl lg:aspect-[4/3]">
          {image ? (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 34vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div aria-hidden="true" className="h-full w-full bg-white/[0.08]" />
          )}
        </div>

        <div className="min-w-0">
          <div className="grid" aria-live="polite">
            {testimonials.map((testimonial, i) => (
              <Slide
                key={testimonial.name}
                testimonial={testimonial}
                active={i === index}
              />
            ))}
          </div>

          <div className="mt-10 flex items-center justify-between gap-6">
            {/* 20px dot targets on phones so all ten fit on one row beside the buttons. */}
            <div className="flex flex-wrap items-center">
              {testimonials.map((testimonial, i) => (
                <button
                  key={testimonial.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show testimonial ${i + 1} of ${total}: ${testimonial.name}`}
                  aria-current={i === index}
                  className="group flex h-5 w-5 cursor-pointer items-center justify-center rounded-full md:h-6 md:w-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span
                    className={`block h-2 w-2 rounded-full transition-colors ${
                      i === index
                        ? "bg-accent"
                        : "bg-white/30 group-hover:bg-white/60"
                    }`}
                  />
                </button>
              ))}
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous testimonial"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                <ArrowLeft
                  className="h-4 w-4"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next testimonial"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-accent text-ink transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                <ArrowRight
                  className="h-4 w-4"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

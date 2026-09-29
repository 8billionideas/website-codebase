"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { Testimonial } from "@/content/types";
import { TRUSTPILOT_PROFILE_URL } from "@/lib/case-studies";

function TestimonialItem({
  testimonial,
  innerRef,
}: {
  testimonial: Testimonial;
  innerRef: (el: HTMLDivElement | null) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    setOverflowing(el.scrollHeight > el.clientHeight + 1);
  }, []);

  return (
    <div
      ref={innerRef}
      className="w-[85%] shrink-0 snap-start px-10 first:pl-0 last:pr-0 md:w-1/2 lg:w-1/3"
    >
      <Quote className="h-7 w-7 text-accent" strokeWidth={1.5} aria-hidden="true" />
      <p
        ref={textRef}
        className={`mt-4 text-[16px] font-light leading-[1.6] text-ink ${
          expanded ? "" : "line-clamp-6"
        }`}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      {overflowing && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          className="mt-2 text-caption font-medium text-ink underline decoration-transparent underline-offset-2 transition-colors hover:decoration-ink"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
      <div className="mt-4">
        <p className="text-[15px] font-medium text-ink">{testimonial.name}</p>
        <p className="text-[13px] text-ink/60">{testimonial.role}</p>
        {testimonial.sourceUrl && (
          <a
            href={testimonial.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-[13px] font-medium text-ink underline decoration-transparent underline-offset-2 transition-colors hover:decoration-ink"
          >
            Read on Trustpilot →
          </a>
        )}
      </div>
    </div>
  );
}

export default function CaseStudyTestimonials({
  eyebrow,
  heading,
  testimonials,
}: {
  eyebrow: ReactNode;
  heading: ReactNode;
  testimonials: Testimonial[];
}) {
  const [index, setIndex] = useState(0);
  const rowRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const touchStartX = useRef<number | null>(null);
  const total = testimonials.length;

  function scrollToIndex(i: number) {
    const clamped = Math.max(0, Math.min(total - 1, i));
    itemRefs.current[clamped]?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  }

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    let frame: number;
    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const items = itemRefs.current;
        const rowEl = rowRef.current;
        if (!rowEl) return;
        let nearest = 0;
        let nearestDelta = Infinity;
        items.forEach((el, i) => {
          if (!el) return;
          const delta = Math.abs(el.offsetLeft - rowEl.scrollLeft);
          if (delta < nearestDelta) {
            nearestDelta = delta;
            nearest = i;
          }
        });
        setIndex(nearest);
      });
    }
    row.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      row.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(deltaX) < 40) return;
    if (deltaX < 0) scrollToIndex(index + 1);
    else scrollToIndex(index - 1);
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-6">
        <div>
          {eyebrow}
          {heading}
        </div>
        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={() => scrollToIndex(index - 1)}
            disabled={index === 0}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(index + 1)}
            disabled={index === total - 1}
            aria-label="Next testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={rowRef}
        role="region"
        aria-label="Testimonials"
        className="[-ms-overflow-style:none] [scrollbar-width:none] mt-14 flex snap-x snap-mandatory items-start overflow-x-auto divide-x divide-ink/12 [&::-webkit-scrollbar]:hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {testimonials.map((testimonial, i) => (
          <TestimonialItem
            key={testimonial.name}
            testimonial={testimonial}
            innerRef={(el) => {
              itemRefs.current[i] = el;
            }}
          />
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-4 lg:hidden">
        <button
          type="button"
          onClick={() => scrollToIndex(index - 1)}
          disabled={index === 0}
          aria-label="Previous testimonial"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-ink disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scrollToIndex(index + 1)}
          disabled={index === total - 1}
          aria-label="Next testimonial"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-ink disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {testimonials.map((testimonial, i) => (
          <button
            key={testimonial.name}
            type="button"
            onClick={() => scrollToIndex(i)}
            aria-label={`Show testimonial from ${testimonial.name}`}
            aria-current={i === index}
            className={`h-2 w-2 rounded-full transition-colors ${
              i === index ? "bg-accent" : "bg-ink/20"
            }`}
          />
        ))}
      </div>

      {TRUSTPILOT_PROFILE_URL && (
        <div className="mt-6 text-center">
          <a
            href={TRUSTPILOT_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-body font-medium text-ink underline decoration-transparent underline-offset-2 transition-colors hover:decoration-ink"
          >
            Read more reviews on Trustpilot →
          </a>
        </div>
      )}
    </div>
  );
}

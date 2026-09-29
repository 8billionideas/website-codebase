"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Lightbulb,
  Briefcase,
  Coins,
  PiggyBank,
  Heart,
  Activity,
  Users,
  Flag,
  Leaf,
  Cpu,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { pillarCarousel } from "@/content/pillarCarousel";
import { home } from "@/content/home";

const { bandTestimonial } = home.proof;

const PILLAR_ICONS: Record<string, LucideIcon> = {
  Entrepreneurship: Lightbulb,
  Careers: Briefcase,
  "Financial Literacy": Coins,
  Wellbeing: Heart,
  "Health & Performance": Activity,
  Leadership: Users,
  Sustainability: Leaf,
  Technology: Cpu,
};

// Icons for the "Example project" thumbnail specifically — kept separate
// from PILLAR_ICONS (which drives the icon row below) since the two lists
// differ for Financial Literacy and Leadership.
const EXAMPLE_PROJECT_ICONS: Record<string, LucideIcon> = {
  Entrepreneurship: Lightbulb,
  Careers: Briefcase,
  "Financial Literacy": PiggyBank,
  Wellbeing: Heart,
  "Health & Performance": Activity,
  Leadership: Flag,
  Sustainability: Leaf,
  Technology: Cpu,
};

function splitExample(exampleProject: string) {
  const [first, ...rest] = exampleProject.split(" — ");
  if (rest.length === 0) {
    return { title: "Coming soon", detail: "" };
  }
  return { title: first, detail: rest.join(" — ") };
}

export default function PillarCarousel() {
  const { eyebrow, heading, subheading, ctaLabel, cards } = pillarCarousel;
  const [index, setIndex] = useState(0);
  const card = cards[index];
  const total = cards.length;
  const example = splitExample(card.exampleProject);
  const ExampleIcon = EXAMPLE_PROJECT_ICONS[card.name] ?? Lightbulb;
  const rowRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  function go(next: number) {
    setIndex((next + total) % total);
  }

  // Only scroll the active item into view when the row is actually the
  // horizontally-scrolling layout (below lg) — at lg+ it's a static
  // single-line row with no scroll container, so this is a no-op there.
  useEffect(() => {
    const row = rowRef.current;
    const item = itemRefs.current[index];
    if (!row || !item) return;
    if (row.scrollWidth > row.clientWidth) {
      item.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [index]);

  return (
    <div className="mt-10">
      <div className="text-center">
        <p className="text-caption uppercase tracking-[0.2em] text-muted">
          {eyebrow}
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl text-display text-ink">{heading}</h2>
        <p className="mx-auto mt-4 max-w-xl text-body-lg text-muted">{subheading}</p>
      </div>

      {/* Carousel — prev/next arrows sit outside the two columns. */}
      <div className="relative mt-16">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous pillar"
          className="absolute left-0 top-1/2 z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent/20 text-ink transition-colors hover:bg-accent/30 md:flex"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next pillar"
          className="absolute right-0 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-accent/20 text-ink transition-colors hover:bg-accent/30 md:flex"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 md:px-14">
          {/* LEFT — text */}
          <div>
            <p className="text-caption font-normal text-accent">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
            <h3 className="mt-3 text-display text-ink">{card.name}</h3>
            <p className="mt-4 max-w-md text-body-lg text-ink">{card.description}</p>

            <button
              type="button"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-body font-medium text-white transition-opacity hover:opacity-90"
            >
              {ctaLabel}
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* RIGHT — blob image + example project card (scaled ~1.5x) */}
          <div className="relative mx-auto w-full max-w-[576px]">
            <svg
              viewBox="0 0 40 40"
              className="pointer-events-none absolute -left-12 top-9 hidden h-24 w-24 text-accent md:block"
              aria-hidden="true"
            >
              <path
                d="M2 30 C 10 10, 25 5, 38 12"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>

            <div
              className="relative aspect-square overflow-hidden border border-dashed border-ink/20 bg-surface"
              style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
            >
              {card.image ? (
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 768px) 576px, 100vw"
                  className="object-cover"
                  style={{ objectPosition: card.image.position }}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center px-8 text-center text-caption font-normal text-muted">
                  Image placeholder
                </div>
              )}
            </div>

            <div className="relative mt-4 flex w-full items-center gap-[18px] rounded-xl bg-ink p-[18px] shadow-lg lg:absolute lg:-bottom-12 lg:-right-9 lg:mt-0 lg:w-96">
              {card.exampleImage ? (
                <div className="relative h-[96px] w-[96px] shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={card.exampleImage.src}
                    alt={card.exampleImage.alt}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-[96px] w-[96px] shrink-0 flex-col items-center justify-center gap-1.5 rounded-lg bg-white/[0.06] px-1.5 text-center">
                  <ExampleIcon
                    className="h-12 w-12 text-accent"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <p className="text-[13px] font-normal leading-tight text-accent">
                    {example.title}
                  </p>
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-normal uppercase tracking-wide text-accent">
                  Example project
                </p>
                <p className="text-[22.5px] font-normal leading-tight text-white">
                  {example.title}
                </p>
                <span className="mt-1 inline-block rounded-full border border-white/25 bg-accent/10 px-3 py-[3px] text-[15px] font-normal text-white/70">
                  {card.name}
                </span>
              </div>
              <span
                aria-hidden="true"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/20 text-ink"
              >
                <ChevronRight className="h-6 w-6" />
              </span>
            </div>
          </div>
        </div>

        {/* Mobile arrows — the desktop pair above are hidden below md. */}
        <div className="mt-8 flex items-center justify-center gap-6 md:hidden">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous pillar"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-ink"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next pillar"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-ink"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Icon row — one line always. Below lg it scrolls horizontally
          (icon beside label); at lg+ it's a static single line spread with
          justify-between, icon stacked above label since side-by-side
          doesn't fit all eight labels at 1024px even at minimum sizes. */}
      <ul
        ref={rowRef}
        className="[-ms-overflow-style:none] [scrollbar-width:none] mt-24 flex flex-nowrap items-center gap-4 overflow-x-auto pb-2 [mask-image:linear-gradient(to_right,black_0%,black_92%,transparent_100%)] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden lg:justify-between lg:gap-4 lg:overflow-visible lg:pb-0 lg:[mask-image:none] lg:snap-none"
      >
        {cards.map((c, i) => {
          const Icon = PILLAR_ICONS[c.name] ?? Lightbulb;
          const active = i === index;
          return (
            <li
              key={c.name}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="shrink-0 snap-start"
            >
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-current={active}
                className="flex items-center gap-2 lg:flex-col lg:gap-1"
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                    active ? "bg-accent/20 text-ink" : "text-muted"
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span
                  className={`whitespace-nowrap text-caption font-normal ${
                    active ? "text-ink" : "text-muted"
                  }`}
                >
                  {c.name}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Bridge image band — full-bleed, breaking out of the Container. */}
      <div className="relative left-1/2 mt-16 flex min-h-[320px] w-screen -translate-x-1/2 items-center justify-center overflow-hidden md:h-[320px] lg:h-[420px]">
        <Image
          src="/images/built-for-life-band.webp"
          alt=""
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover object-[center_60%]"
        />
        <div className="absolute inset-0 bg-ink/35" />
        <figure className="relative mx-auto w-full max-w-[860px] px-6 py-12 text-center text-white md:py-0">
          <span className="block text-[40px] font-light leading-none text-accent" aria-hidden="true">
            &ldquo;
          </span>
          <blockquote className="mt-3">
            <p className="text-[22px] font-light italic leading-[1.45] text-balance lg:text-[30px]">
              {bandTestimonial.excerpt ?? bandTestimonial.quote}
            </p>
          </blockquote>
          <figcaption className="mt-6 flex flex-col items-center">
            <span className="h-0.5 w-10 bg-accent" aria-hidden="true" />
            <span className="mt-4 text-[16px] font-medium">{bandTestimonial.name}</span>
            <span className="mt-1 text-[14px] text-white/70">{bandTestimonial.role}</span>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

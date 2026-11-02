import Image from "next/image";
import Container from "@/components/layout/Container";
import { aboutStory } from "@/content/about-story";

// Section 4 on /about: the story in six chapters, each a full-width band with alternating
// backgrounds (01, 03, 05 paper; 02, 04, 06 navy) and the standard section padding. The header
// ("OUR STORY" and the heading) sits on paper above chapter 01, which shares its background, so
// chapter 01's top padding is the intro → content gap instead.
// Desktop (lg+): each chapter is two columns, the photo (40%, 4/3) and the text (60%), with a
// 56px gap, alternating sides (01, 03, 05 photo left; 02, 04, 06 photo right). The photo is sticky
// (120px from the top) while its own chapter's text scrolls past. Below lg: stacked, photo first
// (16/10), not sticky. A chapter without a photo spans the full width with a short green line
// above its label. Chapters fade up gently as they scroll into view (.story-reveal in
// globals.css: CSS only, skipped where unsupported and with prefers-reduced-motion).
// On navy: the label accent green (8.07:1), the headline white (15.9:1), the paragraphs white at
// 80% (about 10:1).
export default function OurStorySection() {
  const last = aboutStory.length - 1;
  return (
    <section className="bg-paper">
      <Container className="pt-section">
        <p className="text-[12px] uppercase tracking-[0.25em] text-ink/60">OUR STORY</p>
        {/* 1100px so the first line (1087px at 52px) fits on one line on desktop. */}
        <h2 className="mt-eyebrow max-w-[1100px] text-balance text-[32px] font-light leading-[1.15] tracking-[-0.01em] text-ink md:text-[52px]">
          We started because we thought education
          <br />
          <em className="text-accent">could do more</em>
        </h2>
      </Container>

      {aboutStory.map((chapter, i) => {
        const imageRight = i % 2 === 1;
        const dark = i % 2 === 1;
        return (
          <div key={chapter.number} className={dark ? "bg-ink" : "bg-paper"}>
            <Container className={`${i === 0 ? "pt-content" : "pt-section"} pb-section`}>
              <article
                className={`story-reveal ${
                  chapter.image
                    ? `lg:grid lg:items-start lg:gap-14 ${imageRight ? "lg:grid-cols-[3fr_2fr]" : "lg:grid-cols-[2fr_3fr]"}`
                    : ""
                }`}
              >
                {chapter.image && (
                  <div
                    className={`relative mb-8 aspect-[16/10] w-full overflow-hidden rounded-xl lg:sticky lg:top-[120px] lg:mb-0 lg:aspect-[4/3] ${
                      imageRight ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={chapter.image.src}
                      alt={chapter.image.alt}
                      fill
                      loading="lazy"
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: chapter.image.position }}
                    />
                  </div>
                )}
                <div className="text-left">
                  {!chapter.image && <span aria-hidden="true" className="mb-6 block h-0.5 w-12 bg-accent" />}
                  <p className="text-[12px] uppercase tracking-[0.25em] text-accent">
                    {chapter.number} · {chapter.label}
                  </p>
                  <h3
                    className={`mt-3 text-balance text-[26px] font-light leading-[1.25] tracking-[-0.01em] md:text-[36px] ${
                      dark ? "text-white" : "text-ink"
                    }`}
                  >
                    {chapter.headline}
                  </h3>
                  <div className="mt-6 space-y-5">
                    {chapter.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className={`text-[18px] leading-[1.75] ${dark ? "text-white/80" : "text-ink/75"}`}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </article>

              {/* Closing line, inside chapter 06's navy band, after its text. Centred on purpose,
                  for this line only. */}
              {i === last && <ClosingLine dark={dark} />}
            </Container>
          </div>
        );
      })}
    </section>
  );
}

function ClosingLine({ dark }: { dark: boolean }) {
  return (
    <p
      className={`mx-auto mt-16 max-w-[900px] text-balance text-center text-[24px] font-light leading-[1.3] tracking-[-0.01em] md:mt-24 md:text-[36px] ${
        dark ? "text-white" : "text-ink"
      }`}
    >
      <span className="block">We&apos;ve changed a lot since 2021.</span>
      <span className="block">
        What we&apos;re trying to{" "}
        <span className="relative inline-block whitespace-nowrap">
          achieve hasn&apos;t.
          {/* Hand-drawn style underline under "achieve hasn't." only. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 200 12"
            preserveAspectRatio="none"
            className="absolute -bottom-2.5 left-0 h-3 w-full overflow-visible"
          >
            <path
              d="M3 7.5 C 40 3, 85 10.5, 125 6 S 180 3.5, 197 6.5"
              fill="none"
              stroke="#21D199"
              strokeWidth="3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </span>
      </span>
    </p>
  );
}

import Image from "next/image";
import Container from "@/components/layout/Container";
import { aboutStory } from "@/content/about-story";

// Section 4 on /about. Desktop: four columns joined by one line with a dot per
// column. Tablet: 2×2, each column with its own short line. Mobile: a vertical
// timeline with the line down the left.
export default function OurStorySection() {
  return (
    <section className="bg-paper pt-16 pb-16 md:pt-24 md:pb-24">
      <Container>
        <p className="text-[12px] uppercase tracking-[0.25em] text-ink/60">OUR STORY</p>
        {/* 1100px so the first line (1087px at 52px) fits on one line on desktop. */}
        <h2 className="mt-4 max-w-[1100px] text-balance text-[32px] font-light leading-[1.15] tracking-[-0.01em] text-ink md:text-[52px]">
          We started because we thought education
          <br />
          <em className="text-accent">could do more</em>
        </h2>
        <p className="mt-4 text-[18px] leading-[1.6] text-ink/70">
          A few moments from the journey so far and the mission that has stayed the same.
        </p>

        <ol className="relative mt-10 flex list-none flex-col gap-10 p-0 md:mt-16 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-4 lg:gap-8">
          {/* Mobile: the vertical line, centred on the dots. */}
          <span
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-1 w-px -translate-x-1/2 bg-ink/15 md:hidden"
          />
          {aboutStory.map((entry) => (
            <li key={entry.year} className="group relative pl-7 md:pl-0">
              {entry.image ? (
                <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] shadow-[0_4px_14px_rgba(22,33,61,0.10)]">
                  <Image
                    src={entry.image.src}
                    alt={entry.image.alt}
                    fill
                    loading="lazy"
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div aria-hidden="true" className="aspect-[4/3] rounded-[4px] bg-ink" />
              )}

              {/* Tablet and desktop: the line with this column's dot at its left edge (the line sits
                  4px into this 8px row, so mt-5 puts it 24px below the image). On desktop the line
                  runs on through the gap, so the four segments read as one line. */}
              <div aria-hidden="true" className="relative mt-5 hidden h-2 md:block">
                <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-ink/15 lg:w-[calc(100%+2rem)] lg:group-last:w-full" />
                <span className="absolute top-0 left-0 h-2 w-2 rounded-full bg-accent" />
              </div>

              <div className="relative mt-4">
                {/* Mobile: this entry's dot on the vertical line, level with the year. */}
                <span
                  aria-hidden="true"
                  className="absolute top-[13px] -left-7 h-2 w-2 rounded-full bg-accent md:hidden"
                />
                <p className="text-[32px] font-light leading-[1.1] text-ink/30 md:text-[44px]">{entry.year}</p>
                <h3 className="mt-2 text-[22px] font-normal leading-[1.3] text-ink">{entry.title}</h3>
                <p className="mt-2 max-w-[280px] text-[16px] leading-[1.6] text-ink/65">{entry.text}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* Closing line — centred on purpose, for this line only. */}
        <p className="mx-auto mt-12 max-w-[900px] text-balance text-center text-[24px] font-light leading-[1.3] tracking-[-0.01em] text-ink md:mt-[72px] md:text-[36px]">
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
      </Container>
    </section>
  );
}

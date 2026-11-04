import Image from "next/image";

import Container from "@/components/layout/Container";
import { Eyebrow, SectionBody, SectionH2 } from "@/components/home/SectionHeading";
import { home } from "@/content/home";
import Button from "@/components/ui/Button";

// Matches Container's own right inset (mx-auto max-w-[75rem] + md:px-12)
// exactly, so the image placeholder's right edge lands precisely on the
// true viewport edge at the breakpoints (lg+) this bleed applies at.
const RIGHT_BLEED = "calc(48px + max(0px, (100vw - 1200px) / 2))";

export default function CurriculumFitSection() {
  const { eyebrow, body, cta, worksAcrossLabel, curriculums } = home.curriculumFit;

  return (
    <section className="relative overflow-x-hidden bg-paper py-section">
      {/* Standard section padding; the curricula strip at the bottom has top padding only, so the
          space under its text is the section's own bottom padding. */}
      <Container>
        {/* From lg: text beside the image, vertically centred against it. */}
        <div className="lg:flex lg:items-center lg:gap-x-content">
          <div className="lg:w-[58%]">
            <div>
              <Eyebrow variant="light">{eyebrow}</Eyebrow>
              <SectionH2 variant="light" className="mt-eyebrow">
                {/* Three lines from md; below md it wraps naturally (at 320px the forced breaks
                    left "you" on a line of its own). */}
                Fits into the
                <br className="hidden md:inline" /> curriculum you
                <br className="hidden md:inline" /> <em className="text-accent">already teach.</em>
              </SectionH2>
              <SectionBody variant="light" className="mt-lead">
                {body}
              </SectionBody>
            </div>

            <div className="mt-10">
              <Button href={cta.href} arrow className="w-full md:w-auto">
                {cta.label}
              </Button>
            </div>
          </div>

          <div
            className="mt-content lg:mt-0 lg:w-[42%] lg:flex-shrink-0"
            style={{ "--right-bleed": RIGHT_BLEED } as React.CSSProperties}
          >
            {/* Bleeds to the true viewport edge at lg+ via the CSS var set on the column above; below
                lg it's a plain full-width panel: 4:5 on mobile (the presenter and slide read larger
                than in a square crop; capped at 560px on wide phones), 390px tall on tablet, 560px
                from lg. */}
            <div className="relative aspect-[4/5] max-h-[560px] w-full overflow-hidden md:aspect-auto md:h-[390px] lg:h-[560px] lg:w-[calc(100%+var(--right-bleed))]">
              <Image
                src="/images/future-skills-workshop.webp"
                alt="An 8billionideas presenter leading a future skills workshop for teachers and students, with the slide 'A practical approach to future skills.' on screen."
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
                // The presenter and screen sit centred, just below the photo's middle.
                style={{ objectPosition: "50% 52%" }}
              />
            </div>
          </div>
        </div>
      </Container>

      <div className="mt-section h-px w-full bg-ink/15" aria-hidden="true" />

      <Container>
        <div className="pt-6 md:pt-8">
          {/* Desktop: one row, label then six items, evenly spread, dividers between all. */}
          <div className="hidden items-stretch divide-x divide-ink/15 lg:flex">
            <div className="flex flex-col justify-center gap-1 pr-8">
              <Eyebrow variant="light">{worksAcrossLabel[0]}</Eyebrow>
              <Eyebrow variant="light">{worksAcrossLabel[1]}</Eyebrow>
            </div>
            {curriculums.map((item) => (
              <div key={item} className="flex flex-1 items-center justify-center px-8">
                <p className="text-[13px] uppercase tracking-[0.25em] text-ink/75">{item}</p>
              </div>
            ))}
          </div>

          {/* Tablet: label on its own line, six items in a 3-col grid, dividers only within a row. */}
          <div className="hidden md:block lg:hidden">
            <div className="flex flex-col gap-1 pb-6">
              <Eyebrow variant="light">{worksAcrossLabel[0]}</Eyebrow>
              <Eyebrow variant="light">{worksAcrossLabel[1]}</Eyebrow>
            </div>
            <div className="grid grid-cols-3">
              {curriculums.map((item, i) => (
                <div
                  key={item}
                  className={`flex items-center justify-center px-4 py-4 ${
                    i % 3 !== 0 ? "border-l border-ink/15" : ""
                  }`}
                >
                  <p className="text-[13px] uppercase tracking-[0.25em] text-ink/75">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: label on its own line, six items in a 2-col grid, no dividers. */}
          <div className="md:hidden">
            <div className="flex flex-col gap-1 pb-6">
              <Eyebrow variant="light">{worksAcrossLabel[0]}</Eyebrow>
              <Eyebrow variant="light">{worksAcrossLabel[1]}</Eyebrow>
            </div>
            <div className="grid grid-cols-2 gap-y-4">
              {curriculums.map((item) => (
                <div key={item} className="flex items-center justify-center py-1">
                  <p className="text-[13px] uppercase tracking-[0.25em] text-ink/75">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

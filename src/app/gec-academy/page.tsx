import Image from "next/image";
import type { Metadata } from "next";
import { Download } from "lucide-react";
import Container from "@/components/layout/Container";
import Logo from "@/components/layout/Logo";
import Button from "@/components/ui/Button";
import OxfordAqaLogo from "@/components/shared/OxfordAqaLogo";
import { withCriticalCurriculum } from "@/components/shared/CriticalCurriculumName";
import AskCard from "@/components/gec-academy/AskCard";
import Stats from "@/components/gec-academy/Stats";
import VideoCard from "@/components/gec-academy/VideoCard";
import GradesPanel from "@/components/gec-academy/GradesPanel";
import ProjectCards from "@/components/gec-academy/ProjectCards";
import CurriculumMark from "@/components/gec-academy/CurriculumMark";
import PathwaySteps from "@/components/gec-academy/PathwaySteps";
import GecFaq from "@/components/gec-academy/GecFaq";
import {
  GEC_BROCHURE_URL,
  GEC_CLOSING_URL,
  GEC_EMAIL,
  GEC_ENROL_URL,
  GEC_PAGE_INDEXABLE,
  gecAssess,
  gecCta,
  gecCurriculum,
  gecHero,
  gecImages,
  gecPathway,
  gecStatement,
  gecVideo,
  gecWhy,
} from "@/content/gec-academy";

// GEC Academy × 8billionideas: the content of the landing page in github.com/8billionideas/
// gecx8billionideas, set in the site's design on light backgrounds only (paper and mint bands, ink
// text; no white text anywhere), with the site's buttons, cards, pills and FAQ. Linked from the
// footer's Partnerships column. Ends with its own closing band in the layout of "Book a
// demonstration" (the site band is hidden here; see layout.tsx).
export const metadata: Metadata = {
  title: "GEC Academy × 8billionideas | International GCSE Global Skills Projects",
  description:
    "GEC Academy brings the OxfordAQA International GCSE Global Skills Projects, delivered by 8billionideas, to students across China and Asia.",
  robots: GEC_PAGE_INDEXABLE ? undefined : { index: false, follow: false },
};

const H2 = "text-balance text-[32px] font-light leading-[1.15] tracking-[-0.01em] md:text-[52px]";
const LEDE = "mt-lead max-w-[760px] text-[18px] leading-[1.6]";
const MINT_BAND = "bg-[color-mix(in_srgb,var(--color-accent)_8%,var(--color-paper))]";
// Small green text (eyebrows, chips): a darker green that passes WCAG AA on paper, mint and white
// (4.8–5.2:1). Large italic heading phrases stay accent-green, as on the rest of the site.
const DARK_GREEN = "text-[#0E7C5A]";
const NEW_TAB = { target: "_blank", rel: "noopener noreferrer" } as const;

function NewTabNote() {
  return <span className="sr-only"> (opens in a new tab)</span>;
}

// A heading's first part, a line break, then its italic accent-green final phrase.
function Heading({ before, em, className = "" }: { before: string; em: string; className?: string }) {
  return (
    <h2 className={`${H2} ${className}`}>
      {before.trim()}
      <br />
      <em className="text-accent">{em}</em>
    </h2>
  );
}

function BrochureButton() {
  return (
    <Button href={GEC_BROCHURE_URL} {...NEW_TAB} variant="outline" className="w-full sm:w-auto">
      {gecHero.brochure}
      <Download className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
      <NewTabNote />
    </Button>
  );
}

function Times() {
  return (
    <span className="text-[18px] font-light text-ink/45" aria-hidden="true">
      ×
    </span>
  );
}

export default function GecAcademyPage() {
  return (
    <div className="bg-paper">
      {/* 1. Hero: the co-brand row, heading and buttons; the ask card on the right from lg. */}
      <section className="bg-paper py-section">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
          <div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3" aria-label="GEC Academy, 8billionideas and OxfordAQA">
              <Image
                src={gecImages.logo.src}
                alt={gecImages.logo.alt}
                width={gecImages.logo.width}
                height={gecImages.logo.height}
                preload
                className="h-8 w-auto md:h-9"
              />
              <Times />
              <Logo className="h-[22px] w-auto md:h-6" />
              <Times />
              <OxfordAqaLogo variant="light" width={140} />
            </div>
            <p className={`mt-10 text-[12px] uppercase tracking-[0.25em] ${DARK_GREEN}`}>{gecHero.chip.toUpperCase()}</p>
            <h1 className="mt-eyebrow text-balance text-[36px] font-light leading-[1.1] tracking-[-0.01em] text-ink md:text-[56px]">
              {gecHero.headingLine1}
              <br />
              <em className="text-accent">{gecHero.headingLine2}</em>
            </h1>
            <p className={`${LEDE} max-w-[600px] text-ink/75`}>{gecHero.lede}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={GEC_ENROL_URL} {...NEW_TAB} arrow className="w-full sm:w-auto">
                {gecHero.primary}
                <NewTabNote />
              </Button>
              <BrochureButton />
            </div>
          </div>
          <AskCard />
        </Container>
      </section>

      {/* 2. Key facts (mint). */}
      <Stats />

      {/* 3. The film. */}
      <section className="bg-paper py-section" id="film">
        <Container>
          <Heading before={gecVideo.headingBefore} em={gecVideo.headingEm} className="text-center text-ink" />
          <div className="mt-content">
            <VideoCard />
          </div>
        </Container>
      </section>

      {/* 4. The statement (mint). */}
      <section className={`${MINT_BAND} py-section`}>
        <Container>
          <p className="max-w-[980px] text-balance text-[28px] font-light leading-[1.25] tracking-[-0.01em] text-ink md:text-[44px] lg:text-[52px]">
            {gecStatement.map((part) =>
              part.em ? (
                <em key={part.text} className="text-accent">
                  {part.text}
                </em>
              ) : (
                part.text
              )
            )}
          </p>
        </Container>
      </section>

      {/* 5. Why grades alone aren't enough, beside the applicant-file panel. */}
      <section className="bg-paper py-section">
        <Container className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Heading before={gecWhy.headingBefore} em={gecWhy.headingEm} className="text-ink" />
            <div className="mt-lead space-y-4 text-[18px] leading-[1.6] text-ink/70">
              {gecWhy.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 30)}>{paragraph}</p>
              ))}
            </div>
          </div>
          <GradesPanel />
        </Container>
      </section>

      {/* 6. Assessed by doing: the two projects with their grade rings. Same paper as the section
          above, so no top padding: the gap is that section's own. */}
      <section className="bg-paper pb-section" id="how">
        <Container>
          <Heading before={gecAssess.headingBefore} em={gecAssess.headingEm} className="text-ink" />
          <p className={`${LEDE} text-ink/70`}>{gecAssess.lede}</p>
          <ProjectCards />
        </Container>
      </section>

      {/* 7. The Critical Curriculum's eight pillars and the dot mark. Paper again, so a hairline at the
          top separates it from the projects. */}
      <section className="bg-paper pb-section" id="curriculum">
        <Container className="border-t border-ink/10 pt-section">
          <Heading before={gecCurriculum.headingBefore} em={gecCurriculum.headingEm} className="text-ink" />
          <p className={`${LEDE} text-ink/70`}>{withCriticalCurriculum(gecCurriculum.lede)}</p>
          <CurriculumMark />
        </Container>
      </section>

      {/* 8. The pathway (mint): the students photo beside the heading from lg, the three steps and
          the three "at a glance" cards. */}
      <section className={`${MINT_BAND} py-section`} id="pathway">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
            <div>
              <Heading before={gecPathway.headingBefore} em={gecPathway.headingEm} className="text-ink" />
              <p className={`${LEDE} text-ink/70`}>{gecPathway.lede}</p>
            </div>
            <Image
              src={gecImages.students.src}
              alt={gecImages.students.alt}
              width={gecImages.students.width}
              height={gecImages.students.height}
              loading="lazy"
              sizes="(min-width: 1024px) 460px, 100vw"
              className="aspect-[4/3] h-auto w-full rounded-2xl object-cover"
            />
          </div>
          <PathwaySteps />
          <ul className="mt-content grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-3">
            {gecPathway.glance.map((item) => (
              <li key={item.title} className="rounded-2xl border border-ink/10 bg-white p-6">
                <p className={`text-[12px] uppercase tracking-[0.25em] ${DARK_GREEN}`}>{item.small}</p>
                <h3 className="mt-3 text-[20px] font-normal leading-[1.3] text-ink">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-ink/70">{item.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 9. FAQ. */}
      <GecFaq />

      {/* 10. Closing band (mint, centred as "Book a demonstration"). */}
      <section className={`${MINT_BAND} py-section`} id="talk">
        <Container>
          <div className="mx-auto max-w-[720px] text-center">
            <h2 className="text-balance text-[38px] font-light leading-[1.1] tracking-[-0.01em] text-ink md:text-[60px]">
              {gecCta.headingBefore.trim()} <em className="text-accent">{gecCta.headingEm}</em>
            </h2>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href={GEC_CLOSING_URL} {...NEW_TAB} arrow className="w-full sm:w-auto">
                {gecCta.primary}
                <NewTabNote />
              </Button>
              <BrochureButton />
            </div>
            <p className="mt-6 text-[15px] leading-[1.6] text-ink/70">
              {gecCta.mailBefore}
              <a href={`mailto:${GEC_EMAIL}`} className="font-medium text-ink underline decoration-ink/30 underline-offset-2 hover:decoration-ink">
                {GEC_EMAIL}
              </a>
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}

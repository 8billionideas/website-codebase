import Image from "next/image";
import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import CvWorkshopForm from "@/components/cv-workshop/CvWorkshopForm";
import {
  CV_WORKSHOP_IMAGE,
  SHOW_CAREER_LEADERS_STAT,
  cvWorkshopDoneForYou,
  cvWorkshopDownload,
  cvWorkshopHandsOn,
  cvWorkshopHero,
  cvWorkshopResource,
} from "@/content/cv-workshop";

// First CV Workshop landing page, with the download form (#download). Linked from its row on
// /resources and the footer. Ends with the footer (no demo band; see layout.tsx).
export const metadata: Metadata = {
  title: "Free CV workshop for students | 8billionideas",
  description: "A free video workshop and printable activity book to help your students create their first CV.",
  alternates: { canonical: "/cv-workshop" },
};

const H2 = "text-balance text-[32px] font-light leading-[1.15] tracking-[-0.01em] md:text-[52px]";
const BODY = "text-[18px] leading-[1.6]";

// The workshop video's thumbnail as a rounded 16:9 card. It's a preview (the video comes with the
// download), so it links to the form, scrolling smoothly (scroll-smooth on <html>).
function LessonImage() {
  if (!CV_WORKSHOP_IMAGE) return null;
  return (
    <a
      href="#download"
      className="relative block aspect-video w-full overflow-hidden rounded-2xl shadow-[0_8px_24px_rgba(22,33,61,0.12)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
    >
      <span className="sr-only">Go to the download form</span>
      <Image
        src={CV_WORKSHOP_IMAGE.src}
        alt={cvWorkshopResource.alt}
        fill
        preload
        sizes="(min-width: 1024px) 560px, 100vw"
        className="object-cover"
      />
    </a>
  );
}

export default function CvWorkshopPage() {
  return (
    <div className="bg-paper">
      {/* A. Hero: the introduction, with the lesson image on the right from lg. The text column is a
          little wider (6:5) so "create their first CV" fits on one line at 1440px; at lg (1024–1279px)
          the heading drops to 48px so each line still fits. */}
      <section className="bg-paper py-section">
        <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
          <div>
            <p className="text-[12px] uppercase tracking-[0.25em] text-accent">{cvWorkshopHero.eyebrow}</p>
            <h1 className="mt-eyebrow text-balance text-[36px] font-light leading-[1.1] tracking-[-0.01em] text-ink md:text-[56px] lg:text-[48px] xl:text-[56px]">
              {cvWorkshopHero.headingLine1}
              <br />
              <em className="text-accent">{cvWorkshopHero.headingLine2}</em>
            </h1>
            <p className={`mt-lead max-w-[560px] ${BODY} text-ink/75`}>{cvWorkshopHero.body}</p>
            <div className="mt-8">
              <Button href="#download" arrow className="w-full sm:w-auto">
                {cvWorkshopHero.cta}
              </Button>
            </div>
            {SHOW_CAREER_LEADERS_STAT && <p className="mt-4 text-[14px] text-ink/65">{cvWorkshopHero.stat}</p>}
          </div>
          <LessonImage />
        </Container>
      </section>

      {/* B. Done-for-you workshop. */}
      <section className="bg-accent/[0.06] py-section">
        <Container>
          <h2 className={`${H2} text-ink`}>{cvWorkshopDoneForYou.heading}</h2>
          <p className={`mt-lead max-w-[760px] ${BODY} text-ink/75`}>{cvWorkshopDoneForYou.body}</p>
        </Container>
      </section>

      {/* C. Hands-on learning: the two activities. */}
      <section className="bg-paper py-section">
        <Container>
          <h2 className={`${H2} text-ink`}>{cvWorkshopHandsOn.heading}</h2>
          <p className={`mt-lead max-w-[760px] ${BODY} text-ink/75`}>{cvWorkshopHandsOn.line}</p>
          <ol className="mt-content grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-2">
            {cvWorkshopHandsOn.activities.map((activity, i) => (
              <li key={activity.title} className="flex items-start gap-5 rounded-xl border border-ink/10 bg-white p-7">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-[16px] font-medium text-ink"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <p className="text-[17px] leading-[1.6] text-ink/75">
                  <span className="sr-only">{i + 1}. </span>
                  <span className="font-medium text-ink">{activity.title}</span> {activity.text}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* D. Download form (scroll-mt clears the sticky nav). Stacked below xl; from xl the form takes
          520px beside the heading, which leaves room for "Download your free" on one line. */}
      <section id="download" className="scroll-mt-24 bg-ink py-section text-white">
        <Container className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,520px)] xl:items-center xl:gap-16">
          <div>
            <h2 className={H2}>
              {cvWorkshopDownload.headingLine1}
              <br />
              <em className="text-accent">{cvWorkshopDownload.headingLine2}</em>
            </h2>
            <p className={`mt-lead max-w-[520px] ${BODY} text-white/80`}>{cvWorkshopDownload.line}</p>
          </div>
          <CvWorkshopForm />
        </Container>
      </section>
    </div>
  );
}

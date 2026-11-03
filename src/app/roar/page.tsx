import Image from "next/image";
import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import Logo from "@/components/layout/Logo";
import Button from "@/components/ui/Button";
import CriticalCurriculumName from "@/components/shared/CriticalCurriculumName";
import RoarSignUpForm from "@/components/roar/RoarSignUpForm";
import {
  LIONS_ROAR_URL,
  ROAR_FAQ_URL,
  roar8billionideas,
  roarFaq,
  roarFinals,
  roarHero,
  roarImpact,
  roarLions,
  roarSignUp,
  roarTeachers,
  roarTestimonials,
  roarWhy,
} from "@/content/roar";

// ROAR 2026 with Lions Clubs: rebuilt from page.8billionideas.com/roar-2026 in the site's design
// system, with its HubSpot sign-up form (#sign-up). Linked from the footer's Partnerships column.
// Ends with the footer (no demo band; see layout.tsx).
export const metadata: Metadata = {
  title: "ROAR 2026 with Lions Clubs | 8billionideas",
  description:
    "ROAR is a free PSHE competition supported by Lions Clubs and delivered by 8billionideas, challenging students to create a World Changing Idea.",
};

const H2 = "text-balance text-[32px] font-light leading-[1.15] tracking-[-0.01em] md:text-[52px]";
const BODY = "text-[18px] leading-[1.6]";
const NEW_TAB = { target: "_blank", rel: "noopener noreferrer" } as const;

function NewTabNote() {
  return <span className="sr-only"> (opens in a new tab)</span>;
}

function SignUpButton() {
  return (
    <Button href="#sign-up" arrow className="w-full sm:w-auto">
      {roarHero.cta}
    </Button>
  );
}

export default function RoarPage() {
  const { photo } = roarTeachers;
  return (
    <div className="bg-paper">
      {/* 1. Hero: the Lions Roar and 8billionideas logos, then the introduction. */}
      <section className="bg-ink py-section text-white">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
          <div>
            <p className="text-[12px] uppercase tracking-[0.25em] text-accent">{roarHero.eyebrow}</p>
            <h1 className="mt-eyebrow max-w-[820px] text-balance text-[36px] font-light leading-[1.1] tracking-[-0.01em] md:text-[56px]">
              {roarHero.headingLine1} <em className="text-accent">{roarHero.headingLine2}</em>
            </h1>
            <p className={`mt-lead max-w-[680px] ${BODY} text-white/80`}>
              {roarHero.lead}
              <br />
              {roarHero.body}
            </p>
            <div className="mt-8">
              <SignUpButton />
            </div>
          </div>
          <div className="flex items-center gap-6 lg:flex-col lg:gap-8">
            <Image
              src={roarLions.logo.src}
              alt={roarLions.logo.alt}
              width={roarLions.logo.width}
              height={roarLions.logo.height}
              preload
              className="h-auto w-[120px] md:w-[160px] lg:w-[220px]"
            />
            <span className="text-[24px] font-light text-white/60" aria-hidden="true">
              ×
            </span>
            <Logo variant="dark" className="h-7 w-auto md:h-9" />
          </div>
        </Container>
      </section>

      {/* 2. Why does this matter? */}
      <section className="bg-paper py-section">
        <Container>
          <h2 className={`${H2} text-ink`}>{roarWhy.heading}</h2>
          <div className={`mt-lead max-w-[820px] space-y-4 ${BODY} text-ink/75`}>
            {roarWhy.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 30)}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Impact: four navy cards with their illustrations. */}
      <section className="bg-accent/[0.06] py-section">
        <Container>
          <h2 className={`${H2} text-ink`}>{roarImpact.heading}</h2>
          <ul className="mt-content grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {roarImpact.items.map((item) => (
              <li key={item.text} className="flex flex-col items-center rounded-xl bg-ink p-6 text-center text-white">
                <div className="relative aspect-square w-full max-w-[200px]">
                  <Image src={item.image.src} alt={item.image.alt} fill loading="lazy" sizes="200px" className="object-contain" />
                </div>
                <p className="mt-5 text-[17px] font-medium leading-[1.4]">{item.text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-content">
            <SignUpButton />
          </div>
        </Container>
      </section>

      {/* 5. Teachers: what to know and the five steps, beside the Wash It Right prototype. Same mint
          band as the impact section above, so no top padding: the gap is that section's own. */}
      <section className="bg-accent/[0.06] pb-section">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-16">
          <div>
            <h2 className={`${H2} text-ink`}>{roarTeachers.heading}</h2>
            <div className={`mt-lead space-y-4 ${BODY} text-ink/75`}>
              {roarTeachers.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 30)}>{paragraph}</p>
              ))}
            </div>
            <h3 className="mt-content text-[20px] font-normal text-ink">{roarTeachers.modulesIntro}</h3>
            <ol className="mt-5 list-none space-y-3 p-0">
              {roarTeachers.modules.map((step) => (
                <li key={step.label} className="flex items-start gap-4 rounded-xl border border-ink/10 bg-white px-5 py-4">
                  <span className="text-[22px] leading-none" aria-hidden="true">
                    {step.emoji}
                  </span>
                  <p className="text-[16px] leading-[1.5] text-ink">
                    <span className="font-medium">{step.label}</span> {step.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
          <figure>
            <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" className="h-auto w-full rounded-2xl" />
            <figcaption className="mt-4 text-[15px] leading-[1.5] text-ink/70">
              {photo.captionLead} <span className="font-medium text-ink">{photo.captionTitle}</span> – {photo.captionText}
            </figcaption>
          </figure>
        </Container>
      </section>

      {/* 6. Competition finals. */}
      <section className="bg-paper py-section">
        <Container>
          <h2 className={`${H2} text-ink`}>{roarFinals.heading}</h2>
          <ul className="mt-content grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-2">
            {roarFinals.cards.map((card) => (
              <li key={card.title} className="rounded-xl border border-ink/10 bg-white p-7">
                <h3 className="text-[22px] font-normal text-ink">{card.title}</h3>
                <div className="mt-3 space-y-3 text-[16px] leading-[1.6] text-ink/75">
                  {card.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 30)}>{paragraph}</p>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 7. FAQ in the Teacher Space. */}
      <section className="bg-accent/[0.06] py-section">
        <Container>
          <h2 className={`${H2} text-ink`}>{roarFaq.heading}</h2>
          <ul className="mt-lead max-w-[760px] list-disc space-y-2 pl-6 text-[17px] leading-[1.6] text-ink/75">
            {roarFaq.questions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ul>
          <div className="mt-content">
            <Button href={ROAR_FAQ_URL} {...NEW_TAB} arrow className="w-full sm:w-auto">
              {roarFaq.cta}
              <NewTabNote />
            </Button>
          </div>
        </Container>
      </section>

      {/* 8. Teacher testimonials (two videos on the original page). */}
      <section className="bg-ink py-section text-white">
        <Container>
          <h2 className={H2}>{roarTestimonials.heading}</h2>
          <p className={`mt-lead ${BODY} text-white/80`}>{roarTestimonials.line}</p>
          <div className="mt-content grid grid-cols-1 gap-6 md:grid-cols-2">
            {roarTestimonials.videos.map((video) => (
              <iframe
                key={video.id}
                src={`https://player.vimeo.com/video/${video.id}?h=${video.hash}&dnt=1`}
                title={video.title}
                loading="lazy"
                allow="fullscreen; picture-in-picture"
                allowFullScreen
                className="block aspect-video w-full rounded-xl border-0 bg-black"
              />
            ))}
          </div>
        </Container>
      </section>

      {/* 9–10. Who are the Lions? Who are 8billionideas? */}
      <section className="bg-paper py-section">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="flex items-start justify-between gap-6">
              <h2 className={`${H2} text-ink`}>{roarLions.heading}</h2>
              <Image
                src={roarLions.logo.src}
                alt={roarLions.logo.alt}
                width={roarLions.logo.width}
                height={roarLions.logo.height}
                loading="lazy"
                className="h-auto w-[88px] shrink-0 md:w-[110px]"
              />
            </div>
            <p className={`mt-lead ${BODY} text-ink/75`}>{roarLions.body}</p>
            <p className={`mt-4 ${BODY} text-ink/75`}>
              {roarLions.linkLead}{" "}
              <a
                href={LIONS_ROAR_URL}
                {...NEW_TAB}
                className="font-medium text-ink underline decoration-ink/30 underline-offset-2 hover:decoration-ink"
              >
                {roarLions.linkLabel}
                <NewTabNote />
              </a>
              .
            </p>
            <p className="mt-4 text-[16px] font-medium text-ink">{roarLions.hashtag}</p>
          </div>
          <div>
            <h2 className={`${H2} text-ink`}>{roar8billionideas.heading}</h2>
            <p className={`mt-lead ${BODY} text-ink/75`}>
              {roar8billionideas.bodyBefore}
              <CriticalCurriculumName />
              {roar8billionideas.bodyAfter}
            </p>
          </div>
        </Container>
      </section>

      {/* 11. Sign-up form. */}
      <section id="sign-up" className="scroll-mt-24 bg-ink py-section text-white">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
          <div>
            <h2 className={H2}>{roarSignUp.heading}</h2>
            <p className={`mt-lead ${BODY} text-white/80`}>{roarSignUp.line}</p>
          </div>
          <RoarSignUpForm />
        </Container>
      </section>
    </div>
  );
}

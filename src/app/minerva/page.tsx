import Image from "next/image";
import type { Metadata } from "next";
import {
  Activity,
  Award,
  Briefcase,
  CalendarDays,
  Check,
  Coins,
  Heart,
  Laptop,
  Lightbulb,
  Mail,
  PoundSterling,
  Puzzle,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Faq from "@/components/sections/Faq";
import QuoteBand from "@/components/shared/QuoteBand";
import CopyCodeButton from "@/components/minerva/CopyCodeButton";
import {
  MINERVA_EMAIL,
  MINERVA_REGISTRATION_URL,
  MVA_NAVY,
  SHOW_MINERVA_TESTIMONIAL,
  minervaCurriculum,
  minervaFaqHeading,
  minervaFaqs,
  minervaGcse,
  minervaGlance,
  minervaHero,
  minervaLogo,
  minervaOutcomes,
  minervaPathways,
  minervaRegister,
  minervaTestimonial,
  minervaVideos,
  type MinervaPathway,
} from "@/content/minerva";

// Minerva Virtual Academy (MVA) × 8billionideas: the partnership page, rebuilt from
// minerva8billionideas.vercel.app in the site's design system. Not in the navigation (linked from
// the footer's Partnerships column) and not indexed. Ends with the footer (no demo band; see
// layout.tsx). The onlineacademy@ address is used on this page only.
export const metadata: Metadata = {
  title: "Minerva Virtual Academy x 8billionideas",
  description: minervaHero.body,
  robots: { index: false, follow: false },
};

const ICONS: Record<string, LucideIcon> = {
  Lightbulb,
  Puzzle,
  Users,
  ShieldCheck,
  Sparkles,
  Award,
  Laptop,
  CalendarDays,
  PoundSterling,
};
// The site's own pillar icons (as the homepage carousel).
const PILLAR_ICONS: Record<string, LucideIcon> = {
  Entrepreneurship: Lightbulb,
  Leadership: Users,
  Wellbeing: Heart,
  Performance: Activity,
  Careers: Briefcase,
  "Financial Literacy": Coins,
};

const EYEBROW = "text-[12px] uppercase tracking-[0.25em] text-accent";
const H2 = "text-balance text-[32px] font-light leading-[1.15] tracking-[-0.01em] md:text-[52px]";
const NEW_TAB = { target: "_blank", rel: "noopener noreferrer" } as const;

function NewTabNote() {
  return <span className="sr-only"> (opens in a new tab)</span>;
}

// A YouTube video (privacy-enhanced domain, standard controls, loaded lazily).
function YouTube({ id, title, className }: { id: string; title: string; className: string }) {
  return (
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`}
      title={title}
      loading="lazy"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      className={`block w-full border-0 bg-ink ${className}`}
    />
  );
}

function IconBadge({ icon: Icon, dark = false }: { icon: LucideIcon; dark?: boolean }) {
  return (
    <span
      className={`flex h-11 w-11 items-center justify-center rounded-full ${dark ? "bg-accent/20 text-white" : "bg-accent/15 text-ink"}`}
    >
      <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
    </span>
  );
}

function PathwayCard({ option }: { option: MinervaPathway }) {
  const dark = option.recommended;
  return (
    <div
      className={`flex h-full flex-col rounded-2xl p-7 ${
        dark ? "bg-ink text-white ring-2 ring-accent" : "border border-ink/10 bg-white text-ink"
      }`}
    >
      <p
        className={`w-fit rounded-full px-3 py-1 text-[12px] font-medium uppercase tracking-[0.15em] ${
          dark ? "bg-accent text-ink" : "border border-ink/15 text-ink/70"
        }`}
      >
        <span aria-hidden="true">{option.emoji}</span> {option.tag}
      </p>
      <h3 className="mt-5 text-[22px] font-normal leading-[1.3]">{option.title}</h3>
      <p className={`mt-2 text-[15px] font-medium ${dark ? "text-white/90" : "text-ink/80"}`}>{option.subtitle}</p>
      {option.lines.map((line) => (
        <p key={line} className={`mt-1 text-[15px] leading-[1.6] ${dark ? "text-white/75" : "text-ink/65"}`}>
          {line}
        </p>
      ))}
      <p className={`mt-4 w-fit rounded-full px-3 py-1 text-[13px] ${dark ? "bg-white/10 text-white/85" : "bg-accent/12 text-ink/80"}`}>
        {option.commitment}
      </p>
      <p className="mt-6 flex flex-wrap items-baseline gap-x-2">
        <span className="text-[44px] font-light leading-none">{option.price}</span>
        <span className={`text-[15px] ${dark ? "text-white/75" : "text-ink/60"}`}>{option.priceUsd}</span>
      </p>
      <p className={`mt-1 text-[14px] ${dark ? "text-white/70" : "text-ink/60"}`}>{option.priceUnit}</p>
      {option.wasPrice && <p className="mt-2 text-[14px] font-medium text-accent">{option.wasPrice}</p>}
      <ul className="mt-6 list-none space-y-2.5 p-0">
        {option.features.map((feature) => (
          <li key={feature} className={`flex items-start gap-3 text-[15px] leading-[1.5] ${dark ? "text-white/85" : "text-ink/80"}`}>
            <Check className="mt-[3px] h-4 w-4 shrink-0 text-accent" strokeWidth={2} aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-6">
        <p className={`rounded-xl px-4 py-3 text-[14px] leading-[1.5] ${dark ? "bg-white/10 text-white/85" : "bg-paper text-ink/75"}`}>
          <span aria-hidden="true">👉 </span>
          {option.bestFor}
        </p>
        {option.secondaryLink && (
          <a
            href={option.secondaryLink.href}
            {...NEW_TAB}
            className="mt-4 inline-block rounded-sm text-[14px] font-medium text-ink underline decoration-ink/30 underline-offset-2 hover:decoration-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {option.secondaryLink.label} <span aria-hidden="true">↗</span>
            <NewTabNote />
          </a>
        )}
        <Button href={MINERVA_REGISTRATION_URL} {...NEW_TAB} arrow className="mt-5 w-full">
          {option.cta}
          <NewTabNote />
        </Button>
      </div>
    </div>
  );
}

export default function MinervaPage() {
  const { facts } = minervaGcse;
  const offer = minervaPathways.familyOffer;
  return (
    <div className="bg-paper">
      {/* 1. Hero, on MVA's navy (the logo's own background, so the logo sits seamlessly). */}
      <section className="text-white" style={{ backgroundColor: MVA_NAVY }}>
        <Container className="grid grid-cols-1 items-center gap-12 py-section lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
          <div>
            <Image
              src={minervaLogo.src}
              alt={minervaLogo.alt}
              width={minervaLogo.width}
              height={minervaLogo.height}
              preload
              className="h-auto w-[260px] md:w-[340px]"
            />
            <p className={`mt-10 ${EYEBROW}`}>{minervaHero.eyebrow}</p>
            <h1 className="mt-eyebrow max-w-[720px] text-balance text-[36px] font-light leading-[1.1] tracking-[-0.01em] md:text-[56px]">
              {minervaHero.headingLine1} <em className="text-accent">{minervaHero.headingLine2}</em>
            </h1>
            <p className="mt-lead max-w-[640px] text-[18px] leading-[1.6] text-white/80">{minervaHero.body}</p>
            <div className="mt-8">
              <Button href={MINERVA_REGISTRATION_URL} {...NEW_TAB} arrow className="w-full sm:w-auto">
                {minervaHero.cta}
                <NewTabNote />
              </Button>
            </div>
          </div>
          <YouTube
            id={minervaVideos.hero.id}
            title={minervaVideos.hero.title}
            className="mx-auto aspect-[9/16] max-w-[320px] rounded-2xl"
          />
        </Container>
      </section>

      {/* 2–3. What students learn, the partnership video and the positioning line. */}
      <section className="bg-paper py-section">
        <Container>
          <h2 className={`${H2} text-ink`}>{minervaOutcomes.heading}</h2>
          <ul className="mt-content grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {minervaOutcomes.items.map((item) => (
              <li key={item.title} className="rounded-xl border border-ink/10 bg-white p-6">
                <IconBadge icon={ICONS[item.icon]} />
                <h3 className="mt-5 text-[20px] font-normal leading-[1.3] text-ink">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-ink/70">{item.text}</p>
              </li>
            ))}
          </ul>
          <YouTube
            id={minervaVideos.partnership.id}
            title={minervaVideos.partnership.title}
            className="mt-content aspect-video max-w-[960px] rounded-2xl"
          />
          <p className="mt-content max-w-[900px] text-balance text-[22px] font-light leading-[1.45] text-ink md:text-[26px]">
            {minervaOutcomes.positioning}
          </p>
        </Container>
      </section>

      {/* 4. The six pillars. */}
      <section className="bg-accent/[0.06] py-section">
        <Container>
          <p className={EYEBROW}>{minervaCurriculum.eyebrow}</p>
          <h2 className={`mt-eyebrow ${H2} text-ink`}>{minervaCurriculum.heading}</h2>
          <p className="mt-lead max-w-[720px] text-[18px] leading-[1.6] text-ink/70">{minervaCurriculum.intro}</p>
          <ul className="mt-content grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {minervaCurriculum.pillars.map((pillar) => (
              <li key={pillar.name} className="rounded-xl border border-ink/10 bg-white p-6">
                <IconBadge icon={PILLAR_ICONS[pillar.name]} />
                <h3 className="mt-5 text-[20px] font-normal leading-[1.3] text-ink">{pillar.name}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-ink/70">{pillar.text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-content">
            <Button href="#pathways" arrow className="w-full sm:w-auto">
              {minervaCurriculum.cta}
            </Button>
          </div>
        </Container>
      </section>

      {/* 5. The International GCSE Global Skills Projects. */}
      <section className="bg-ink py-section text-white">
        <Container>
          <h2 className={H2}>
            {minervaGcse.headingLine1} <em className="text-accent">{minervaGcse.headingLine2}</em>
          </h2>
          <p className="mt-lead max-w-[900px] text-[18px] leading-[1.6] text-white/80">{minervaGcse.body}</p>
          <ul className="mt-content grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {[facts.firstPartner, facts.noExams].map((fact) => (
              <li key={fact.title} className="rounded-xl border border-white/15 bg-white/[0.04] p-6">
                <h3 className="text-[20px] font-normal leading-[1.3]">{fact.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-white/75">{fact.text}</p>
              </li>
            ))}
            <li className="rounded-xl border border-white/15 bg-white/[0.04] p-6">
              <h3 className="text-[20px] font-normal leading-[1.3]">{facts.routes.title}</h3>
              <dl className="mt-3 space-y-3">
                {facts.routes.items.map((route) => (
                  <div key={route.label}>
                    <dt className="text-[12px] uppercase tracking-[0.15em] text-accent">{route.label}</dt>
                    <dd className="mt-1 text-[15px] leading-[1.5] text-white/85">{route.value}</dd>
                  </div>
                ))}
              </dl>
            </li>
            <li className="rounded-xl border border-white/15 bg-white/[0.04] p-6">
              <h3 className="text-[20px] font-normal leading-[1.3]">{facts.recognition.title}</h3>
              <p className="mt-2 text-[15px] leading-[1.6] text-white/75">{facts.recognition.text}</p>
            </li>
          </ul>
        </Container>
      </section>

      {/* 6. Pathways and pricing, then the family offer. */}
      <section id="pathways" className="scroll-mt-24 bg-paper py-section">
        <Container>
          <h2 className={`${H2} text-ink`}>{minervaPathways.heading}</h2>
          <p className="mt-lead max-w-[820px] text-[18px] leading-[1.6] text-ink/70">{minervaPathways.intro}</p>
          <ul className="mt-content grid list-none grid-cols-1 gap-6 p-0 lg:grid-cols-3">
            {minervaPathways.options.map((option) => (
              <li key={option.title}>
                <PathwayCard option={option} />
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-6 rounded-2xl bg-accent p-7 text-ink md:flex-row md:items-center md:p-8">
            <p className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-full bg-ink text-white">
              <span className="text-[28px] font-light leading-none">{offer.badge}</span>
              <span className="mt-1 text-[12px] font-medium tracking-[0.2em]">{offer.badgeLine}</span>
            </p>
            <div className="flex-1">
              <p className="text-[12px] uppercase tracking-[0.25em] text-ink/80">{offer.eyebrow}</p>
              <h3 className="mt-2 text-[26px] font-normal leading-[1.2]">{offer.heading}</h3>
              <p className="mt-2 max-w-[640px] text-[16px] leading-[1.6] text-ink/85">{offer.text}</p>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <p className="text-[14px] text-ink/80">
                Code: <span className="font-semibold tracking-[0.1em] text-ink">{offer.code}</span>
              </p>
              <CopyCodeButton code={offer.code} />
              <a
                href={MINERVA_REGISTRATION_URL}
                {...NEW_TAB}
                className="rounded-sm text-[14px] font-medium text-ink underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
              >
                {offer.cta}
                <NewTabNote />
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* 7. At a glance. */}
      <section className="bg-accent/[0.06] py-section">
        <Container>
          <p className={EYEBROW}>{minervaGlance.eyebrow}</p>
          <h2 className={`mt-eyebrow ${H2} text-ink`}>
            {minervaGlance.headingLine1}
            <br />
            <em className="text-accent">{minervaGlance.headingLine2}</em>
          </h2>
          <ul className="mt-content grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-2 lg:grid-cols-3">
            {minervaGlance.items.map((item) => (
              <li key={item.question} className="rounded-xl border border-ink/10 bg-white p-6">
                <IconBadge icon={ICONS[item.icon]} />
                <h3 className="mt-5 text-[20px] font-normal leading-[1.3] text-ink">{item.question}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-ink/70">{item.answer}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 8–10. Registration, help and what's included. */}
      <section className="bg-ink py-section text-white">
        <Container>
          <p className={EYEBROW}>{minervaRegister.eyebrow}</p>
          <h2 className={`mt-eyebrow ${H2}`}>{minervaRegister.heading}</h2>
          <p className="mt-lead text-[18px] leading-[1.6] text-white/80">{minervaRegister.line}</p>
          <div className="mt-content grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <div className="rounded-2xl bg-white p-7 text-ink md:p-9">
              <h3 className="text-[26px] font-light leading-[1.2] md:text-[32px]">{minervaRegister.cardHeading}</h3>
              <p className="mt-3 text-[16px] leading-[1.6] text-ink/70">{minervaRegister.cardText}</p>
              <div className="mt-6">
                <Button href={MINERVA_REGISTRATION_URL} {...NEW_TAB} arrow className="w-full sm:w-auto">
                  {minervaRegister.cta}
                  <NewTabNote />
                </Button>
              </div>
              <p className="mt-6 rounded-xl bg-accent/12 px-4 py-3 text-[14px] leading-[1.6] text-ink/80">{minervaRegister.note}</p>
              <p className="mt-4 text-[13px] leading-[1.6] text-ink/60">
                {minervaRegister.terms} {minervaRegister.redirect}
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="rounded-2xl bg-white p-7 text-ink">
                <h3 className="text-[22px] font-normal">{minervaRegister.helpHeading}</h3>
                <p className="mt-3 text-[13px] uppercase tracking-[0.15em] text-ink/60">{minervaRegister.helpLabel}</p>
                <a
                  href={`mailto:${MINERVA_EMAIL}`}
                  className="mt-1 inline-flex items-center gap-2 rounded-sm text-[16px] font-medium text-ink underline decoration-ink/30 underline-offset-2 hover:decoration-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Mail className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  {MINERVA_EMAIL}
                </a>
              </div>
              <div className="rounded-2xl bg-white p-7 text-ink">
                <h3 className="text-[22px] font-normal">{minervaRegister.includedHeading}</h3>
                <ul className="mt-4 list-none space-y-2.5 p-0">
                  {minervaRegister.included.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] leading-[1.5] text-ink/80">
                      <Check className="mt-[3px] h-4 w-4 shrink-0 text-accent" strokeWidth={2} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 11. Testimonial (SHOW_MINERVA_TESTIMONIAL). */}
      {SHOW_MINERVA_TESTIMONIAL && (
        <QuoteBand quote={minervaTestimonial.quote} name={minervaTestimonial.name} role={minervaTestimonial.role} />
      )}

      {/* 12. Common questions (the site's FAQ accordion). */}
      <Faq headline={minervaFaqHeading} faqs={minervaFaqs} includeSchema={false} />
    </div>
  );
}

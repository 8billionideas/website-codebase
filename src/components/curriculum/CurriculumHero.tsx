import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/home/SectionHeading";
import Container from "@/components/layout/Container";
import { curriculumHero } from "@/content/curriculumMapping";

export default function CurriculumHero() {
  const { eyebrow, headingLead, headingAccent, intro, facts, scrollLink, heroImage } =
    curriculumHero;
  const hasImage = Boolean(heroImage);

  return (
    <section
      className={`relative flex min-h-[560px] items-center overflow-hidden lg:min-h-[600px] ${
        hasImage ? "" : "bg-paper"
      }`}
    >
      {/* Optional background image — same treatment as the Case Studies hero. */}
      {heroImage && (
        <>
          {/* Mobile/tablet: object-position shifts further right so the
              group stays in frame under the flatter, evenly-dark overlay. */}
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover lg:hidden"
            style={{ objectPosition: "75% center" }}
          />
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority
            sizes="100vw"
            quality={85}
            className="hidden object-cover lg:block"
            style={{ objectPosition: heroImage.position }}
          />
          <div
            className="absolute inset-0 lg:hidden"
            style={{ backgroundColor: "rgba(22,33,61,0.8)" }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              background:
                "linear-gradient(90deg, rgba(22,33,61,0.95) 0%, rgba(22,33,61,0.85) 35%, rgba(22,33,61,0.3) 60%, rgba(22,33,61,0) 80%)",
            }}
            aria-hidden="true"
          />
        </>
      )}

      <Container
        className={`relative z-10 w-full py-14 md:py-24 ${hasImage ? "" : "pb-10 pt-14 md:pb-16 md:pt-24"}`}
      >
        <Eyebrow variant="light" className={hasImage ? "!text-white/60" : undefined}>
          {eyebrow}
        </Eyebrow>
        <h1
          className={`mt-3 max-w-[620px] text-balance text-[36px] font-light leading-[1.1] tracking-[-0.01em] md:text-[56px] ${
            hasImage ? "text-white" : "text-ink"
          }`}
        >
          {headingLead}
          <br />
          <em className="text-accent">{headingAccent}</em>
        </h1>
        <p
          className={`mt-4 max-w-[620px] text-[18px] leading-[1.6] ${
            hasImage ? "text-white/85" : "text-ink/75"
          }`}
        >
          {intro}
        </p>

        {/* Fact strip — one row with vertical dividers; stacks with
            horizontal dividers where the row doesn't fit. */}
        <dl
          className={`mt-6 flex flex-col divide-y sm:flex-row sm:divide-x sm:divide-y-0 ${
            hasImage ? "divide-white/15" : "divide-ink/12"
          }`}
        >
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="flex flex-col-reverse py-3 first:pt-0 last:pb-0 sm:px-8 sm:py-0 sm:first:pl-0 sm:last:pr-0"
            >
              <dt
                className={`mt-1 text-[13px] uppercase tracking-[0.2em] ${
                  hasImage ? "text-white/60" : "text-ink/55"
                }`}
              >
                {fact.label}
              </dt>
              <dd
                className={`text-[32px] font-light leading-[1.1] ${
                  hasImage ? "text-white" : "text-ink"
                }`}
              >
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>

        <Link
          href={scrollLink.href}
          className={
            hasImage
              ? "mt-5 inline-block rounded-sm text-[15px] font-medium text-[#A995FF] underline-offset-4 transition-colors duration-200 hover:text-[#C4B5FF] hover:underline focus-visible:text-[#C4B5FF] focus-visible:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C4B5FF] motion-reduce:transition-none"
              : "mt-5 inline-block rounded-sm text-[15px] font-medium text-brand underline-offset-4 transition-colors duration-200 hover:text-[#5530E0] hover:underline focus-visible:text-[#5530E0] focus-visible:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand motion-reduce:transition-none"
          }
        >
          {scrollLink.label}
        </Link>
      </Container>
    </section>
  );
}

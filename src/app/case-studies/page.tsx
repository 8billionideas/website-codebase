import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Eyebrow, SectionH2 } from "@/components/home/SectionHeading";
import Container from "@/components/layout/Container";
import CaseStudyTestimonials from "@/components/shared/CaseStudyTestimonials";
import { caseStudies } from "@/lib/case-studies";
import { home } from "@/content/home";

export const metadata: Metadata = {
  title: "Case Studies | 8billionideas",
};

// Matches Container's own side inset (mx-auto max-w-[75rem] + md:px-12)
// exactly, so a full-bleed row's text column lines up with every other
// section's outer edge instead of running to the true viewport edge.
// Symmetric, so the same value works as either padding-left or padding-right.
const CONTAINER_SIDE_INSET = "calc(48px + max(0px, (100vw - 1200px) / 2))";

// TODO: replace with the school's photo when supplied (currently Esher College).
// A neutral mint block for a case study without a photo yet.
function ImagePlaceholder({ className = "" }: { className?: string }) {
  return (
    <div className={`flex h-full w-full items-center justify-center bg-accent/[0.12] ${className}`}>
      <p className="text-[12px] uppercase tracking-[0.25em] text-ink/60">Image coming soon</p>
    </div>
  );
}

export default function CaseStudiesPage() {
  const testimonials = home.proof.testimonials;

  return (
    <div className="bg-paper">
      {/* Hero — full-width background image */}
      <section className="relative flex min-h-[520px] items-center overflow-hidden md:min-h-[600px]">
        <Image
          src="/images/case-studies/hero.webp"
          alt="Secondary students walking into school on a sunny morning"
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover object-[75%_center] lg:object-right"
        />
        <div
          className="absolute inset-0 lg:hidden"
          style={{ backgroundColor: "rgba(255,253,250,0.8)" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,253,250,0.95) 0%, rgba(255,253,250,0.85) 35%, rgba(255,253,250,0) 65%)",
          }}
          aria-hidden="true"
        />
        <Container className="relative z-10 w-full py-16 md:py-20">
          <Eyebrow variant="light">CASE STUDIES</Eyebrow>
          <h1 className="mt-4 max-w-[620px] text-balance text-[36px] font-light leading-[1.1] tracking-[-0.01em] text-ink md:text-[56px]">
            See how schools are bringing
            <br />
            <em className="text-accent">future skills to life</em>
          </h1>
          <p className="mt-6 max-w-[620px] text-[18px] leading-[1.6] text-ink/75">
            From single programmes to whole-school partnerships, here&apos;s how
            schools and organisations around the world are working with
            8billionideas.
          </p>
          <p className="mt-5 text-[13px] uppercase tracking-[0.2em] text-muted">
            350+ schools · Over 1 million students · Award-winning programmes
          </p>
        </Container>
      </section>

      {/* Case study rows — image and text alternate sides on desktop. Esher College (The
          Internship) is first, as a normal row. */}
      <div>
        {caseStudies.map((study, i) => {
          const imageOnRight = i % 2 === 1;
          return (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className={`group grid grid-cols-1 lg:grid-cols-2 ${
                i > 0 ? "border-t border-ink/10" : ""
              }`}
            >
              <div
                className={`relative h-[220px] overflow-hidden md:h-[280px] lg:h-[420px] ${
                  imageOnRight ? "lg:order-2" : ""
                }`}
              >
                <div className="h-full w-full transition-transform duration-300 group-hover:scale-[1.03]">
                  {study.image ? (
                    <Image
                      src={study.image.src}
                      alt={study.image.alt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: study.image.position }}
                    />
                  ) : (
                    <ImagePlaceholder />
                  )}
                </div>
              </div>

              <div
                className={`flex flex-col justify-center px-6 py-10 md:px-12 md:py-12 lg:py-0 ${
                  imageOnRight ? "lg:order-1 lg:pr-16" : "lg:pl-16"
                }`}
                style={{ "--container-side-inset": CONTAINER_SIDE_INSET } as React.CSSProperties}
              >
                <div
                  className={
                    imageOnRight ? "lg:pl-[var(--container-side-inset)]" : "lg:pr-[var(--container-side-inset)]"
                  }
                >
                  <span className="inline-flex w-fit items-center rounded-full border border-accent px-3 py-1 text-caption text-ink">
                    {study.card?.label ?? study.tag}
                  </span>
                  <p className="mt-4 text-[32px] font-light leading-[1.1] text-ink">{study.card?.name ?? study.name}</p>
                  {study.location && (
                    <p className="mt-1 text-[14px] text-muted">{study.location}</p>
                  )}
                  {study.headlineFact && (
                    <p className="mt-3 text-[15px] font-medium text-accent">{study.headlineFact}</p>
                  )}
                  <p className="mt-3 max-w-[520px] text-[17px] leading-[1.6] text-ink/75">
                    {study.summary}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-body font-medium text-ink">
                    Read the case study
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Testimonials — full-width band, row of quotes */}
      <div className="bg-accent/[0.08] py-section">
        <Container>
          <CaseStudyTestimonials
            eyebrow={<Eyebrow variant="light">WHAT PEOPLE SAY</Eyebrow>}
            heading={
              <SectionH2 variant="light" className="mt-eyebrow">
                In their
                <br />
                <em className="text-accent">own words</em>
              </SectionH2>
            }
            testimonials={testimonials}
          />
        </Container>
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Award } from "lucide-react";
import Container from "@/components/layout/Container";
import { Eyebrow } from "@/components/home/SectionHeading";
import CaseStudyCard from "@/components/shared/CaseStudyCard";
import { caseStudies, getCaseStudyBySlug, type CaseStudy } from "@/lib/case-studies";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return {};

  return {
    title: `${study.name} | Case Studies | 8billionideas`,
    description: study.summary,
  };
}

const KEY_FACTS: { label: string; value: (study: CaseStudy) => string | null }[] = [
  { label: "Location", value: (s) => s.location },
  { label: "Years", value: (s) => s.years },
  { label: "Age groups", value: (s) => s.ageGroups },
  { label: "Programme", value: (s) => s.programme },
  { label: "Scale", value: (s) => s.scale },
  { label: "Award", value: (s) => s.award },
];

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const keyFacts = KEY_FACTS.map(({ label, value }) => ({ label, value: value(study) })).filter(
    (fact) => fact.value !== null
  );

  const moreCaseStudies = caseStudies.filter((s) => s.slug !== study.slug).slice(0, 3);

  return (
    <div className="bg-paper py-section">
      <Container>
        <Link
          href="/case-studies"
          className="text-body font-normal text-muted transition-colors hover:text-brand"
        >
          ← All case studies
        </Link>

        <div className="mt-8">
          <span className="inline-flex w-fit items-center rounded-full border border-accent px-3 py-1 text-caption text-ink">
            {study.tag}
          </span>
          <h1 className="mt-4 max-w-3xl text-[32px] font-light leading-[1.1] tracking-[-0.01em] text-ink md:text-[48px]">
            {study.name}
          </h1>
          <p className="mt-5 max-w-2xl text-body-lg text-muted">{study.summary}</p>
        </div>

        {study.image && (
          <div className="relative left-1/2 mt-12 aspect-[16/9] max-h-[620px] w-screen -translate-x-1/2 overflow-hidden lg:aspect-[21/9]">
            <Image
              src={study.image.src}
              alt={study.image.alt}
              fill
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: study.image.position }}
            />
          </div>
        )}

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main column */}
          <div className="space-y-10 lg:col-span-2">
            {study.challenge && (
              <div>
                <Eyebrow variant="light">THE CHALLENGE</Eyebrow>
                <p className="mt-3 max-w-2xl text-body-lg leading-[1.6] text-ink/75">
                  {study.challenge}
                </p>
              </div>
            )}

            {study.whatWeDid && (
              <div>
                <Eyebrow variant="light">WHAT WE DID</Eyebrow>
                <p className="mt-3 max-w-2xl text-body-lg leading-[1.6] text-ink/75">
                  {study.whatWeDid}
                </p>
              </div>
            )}

            {study.results && (
              <div>
                <Eyebrow variant="light">THE RESULTS</Eyebrow>
                <p className="mt-3 max-w-2xl text-body-lg leading-[1.6] text-ink/75">
                  {study.results}
                </p>
                {study.award && (
                  <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-caption font-medium text-ink">
                    <Award className="h-4 w-4 text-accent" strokeWidth={1.5} aria-hidden="true" />
                    {study.award}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Side column — key facts */}
          {keyFacts.length > 0 && (
            <div className="lg:col-span-1">
              <div className="rounded-2xl bg-accent/[0.08] p-6 lg:sticky lg:top-28">
                <p className="text-caption uppercase tracking-[0.2em] text-muted">Key facts</p>
                <dl className="mt-5 space-y-4">
                  {keyFacts.map((fact) => (
                    <div key={fact.label}>
                      <dt className="text-caption text-muted">{fact.label}</dt>
                      <dd className="mt-1 text-body-lg text-ink">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          )}
        </div>

        {/* Quote block */}
        {study.quote && (
          <div className="mt-16 md:mt-20">
            <div className="h-px w-16 bg-accent" aria-hidden="true" />
            <p className="mt-6 max-w-3xl text-[20px] font-light italic leading-[1.4] text-ink md:text-[24px]">
              &ldquo;{study.quote.text}&rdquo;
            </p>
            <p className="mt-4 text-caption font-medium text-ink">{study.quote.name}</p>
            <p className="text-caption text-muted">{study.quote.role}</p>

            {study.secondaryQuote && (
              <div className="mt-8">
                <p className="max-w-2xl text-[18px] font-light italic leading-[1.5] text-ink/85">
                  &ldquo;{study.secondaryQuote.text}&rdquo;
                </p>
                <p className="mt-3 text-caption font-medium text-ink">
                  {study.secondaryQuote.name}
                </p>
                <p className="text-caption text-muted">{study.secondaryQuote.role}</p>
              </div>
            )}
          </div>
        )}

        {/* More case studies */}
        {moreCaseStudies.length > 0 && (
          <div className="mt-16 md:mt-24">
            <Eyebrow variant="light">MORE CASE STUDIES</Eyebrow>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {moreCaseStudies.map((s) => (
                <CaseStudyCard key={s.slug} study={s} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

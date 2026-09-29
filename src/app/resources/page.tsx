import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, FileDown } from "lucide-react";
import Container from "@/components/layout/Container";
import { Eyebrow, SectionH2 } from "@/components/home/SectionHeading";
import RequestDemoButton from "@/components/shared/RequestDemoButton";
import { KITS, NEWSLETTER, type Resource } from "@/lib/resources";

export const metadata: Metadata = {
  title: "Resources | 8billionideas",
  description:
    "Free kits and a weekly newsletter to help schools bring future-focused learning into the classroom.",
};

// Matches Container's own side inset (mx-auto max-w-[75rem] + md:px-12), so
// the text side of a full-bleed row lines up with every other section.
const INSET_LEFT = "lg:pl-[calc(48px_+_max(0px,(100vw_-_1200px)/2))]";
const INSET_RIGHT = "lg:pr-[calc(48px_+_max(0px,(100vw_-_1200px)/2))]";

const MORE_LINKS = [
  { label: "Case studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
];

function TypeLabel({ children }: { children: string }) {
  return <p className="text-[12px] uppercase tracking-[0.25em] text-accent">{children}</p>;
}

function KitImage({ kit }: { kit: Resource }) {
  if (kit.image?.fit === "contain") {
    // Whole product visible, padded off the edges. Product shots sit on
    // white, so multiply blends the white into the paper frame.
    return (
      <div className="absolute inset-0 bg-paper p-8">
        <div className="relative h-full w-full">
          <Image
            src={kit.image.src}
            alt={kit.image.alt}
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain mix-blend-multiply"
            style={{ objectPosition: kit.image.position }}
          />
        </div>
      </div>
    );
  }
  if (kit.image) {
    return (
      <Image
        src={kit.image.src}
        alt={kit.image.alt}
        fill
        loading="lazy"
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
        style={{ objectPosition: kit.image.position }}
      />
    );
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-ink/[0.06] px-6 text-center">
      <FileDown className="h-12 w-12 text-accent" strokeWidth={1.25} aria-hidden="true" />
      <p className="text-[16px] font-normal text-accent">{kit.title}</p>
    </div>
  );
}

function KitRow({ kit, index }: { kit: Resource; index: number }) {
  // Odd rows (1st, 3rd…) put the image on the left; even rows on the right.
  const imageLeft = index % 2 === 0;

  return (
    <article className="grid grid-cols-1 lg:grid-cols-2">
      <div
        className={`relative h-[240px] overflow-hidden lg:h-[380px] ${
          imageLeft ? "" : "lg:order-2"
        }`}
      >
        <KitImage kit={kit} />
      </div>

      <div
        className={`flex flex-col justify-center px-6 py-10 md:px-12 md:py-12 lg:py-16 ${
          imageLeft ? `lg:pl-16 ${INSET_RIGHT}` : `lg:pr-16 ${INSET_LEFT}`
        }`}
      >
        <TypeLabel>{kit.type}</TypeLabel>
        <h2 className="mt-3 text-[26px] font-light leading-[1.15] tracking-[-0.01em] text-ink md:text-[36px]">
          {kit.title}
        </h2>
        {kit.description && (
          <p className="mt-4 max-w-[480px] text-[17px] leading-[1.6] text-ink/75">
            {kit.description}
          </p>
        )}
        <div className="mt-6">
          <a
            href={kit.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-body font-medium text-white transition-colors hover:bg-accent hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            {kit.cta}
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function ResourcesPage() {
  return (
    <div className="bg-paper">
      {/* Hero */}
      <section>
        <Container className="pb-10 pt-14 md:pb-16 md:pt-24">
          <Eyebrow variant="light">RESOURCES</Eyebrow>
          <h1 className="mt-3 max-w-[900px] text-balance text-[36px] font-light leading-[1.1] tracking-[-0.01em] text-ink md:text-[56px]">
            Free resources for
            <br />
            <em className="text-accent">future-ready students</em>
          </h1>
          <p className="mt-4 max-w-[620px] text-[18px] leading-[1.6] text-ink/75">
            Free kits and a weekly newsletter to help your school bring future-focused
            learning into the classroom.
          </p>
        </Container>
      </section>

      {/* Kit rows — full width, alternating image side on desktop */}
      <div className="divide-y divide-ink/10 border-y border-ink/10">
        {KITS.map((kit, i) => (
          <KitRow key={kit.slug} kit={kit} index={i} />
        ))}
      </div>

      {/* Newsletter band */}
      <section className="bg-ink py-14 md:py-20">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <TypeLabel>{NEWSLETTER.type}</TypeLabel>
              <h2 className="mt-3 text-[32px] font-light leading-[1.1] tracking-[-0.01em] text-white md:text-[40px]">
                {NEWSLETTER.title}
              </h2>
              {NEWSLETTER.description && (
                <p className="mt-4 max-w-[560px] text-[17px] leading-[1.6] text-white/80">
                  {NEWSLETTER.description}
                </p>
              )}
            </div>
            <a
              href={NEWSLETTER.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-accent px-6 py-3 text-body font-medium text-ink transition-colors hover:bg-white hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              {NEWSLETTER.cta}
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>
        </Container>
      </section>

      {/* More from 8billionideas */}
      <section className="py-16 md:py-24">
        <Container>
          <Eyebrow variant="light">MORE FROM 8BILLIONIDEAS</Eyebrow>
          <div className="mt-6 flex flex-col gap-4 md:flex-row md:gap-0 md:divide-x md:divide-ink/12">
            {MORE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex w-fit items-center gap-3 text-[28px] font-light text-ink underline-offset-[6px] hover:underline md:px-10 md:first:pl-0 md:last:pr-0"
              >
                {link.label}
                <ArrowRight className="h-6 w-6" strokeWidth={1.25} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-ink/10 py-16 text-center md:py-24">
        <Container>
          <SectionH2 variant="light" className="mx-auto text-balance">
            Want this for
            <br />
            <em className="text-accent">your whole school?</em>
          </SectionH2>
          <div className="mt-8">
            <RequestDemoButton />
          </div>
        </Container>
      </section>
    </div>
  );
}

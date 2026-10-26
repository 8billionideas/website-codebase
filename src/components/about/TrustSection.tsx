import Image from "next/image";
import type { ReactNode } from "react";
import Container from "@/components/layout/Container";
import TestimonialCarousel from "@/components/about/TestimonialCarousel";
import { gcseSchools } from "@/content/schools";
import { home } from "@/content/home";
import type { Testimonial } from "@/content/types";
import { testimonialImage } from "@/content/about-work-with-us";
import OxfordAqaLogo from "@/components/shared/OxfordAqaLogo";

// Display order for the /about carousel; names missing from the data are skipped.
const TESTIMONIAL_ORDER = [
  "Silas Edmonds",
  "Tom Penny",
  "Adele O'Doherty",
  "Fatema Kashief",
  "Andrew Elias",
  "Anita Gleave",
  "Adrian McLean",
  "Sean Walsh",
];

function orderedTestimonials(): Testimonial[] {
  const all = [...home.proof.aboutOnlyTestimonials, ...home.proof.testimonials];
  return TESTIMONIAL_ORDER.map((name) => all.find((t) => t.name === name)).filter(
    (t): t is Testimonial => Boolean(t)
  );
}

function Stat({ figure, label, text }: { figure: ReactNode; label: string; text: string }) {
  return (
    <div className="px-6 py-8 text-center first:pt-0 last:pb-0 md:py-0">
      <div className="flex h-14 items-center justify-center md:h-16">{figure}</div>
      <p className="mt-3 text-[20px] font-medium text-ink">{label}</p>
      <p className="mx-auto mt-2 max-w-[280px] text-[15px] leading-[1.5] text-ink/65">{text}</p>
    </div>
  );
}

const FIGURE = "text-[48px] font-light leading-none text-ink md:text-[64px]";

export default function TrustSection() {
  return (
    <section aria-labelledby="trust-heading">
      {/* Top part — accent-green at 6% over paper */}
      <div className="bg-[color-mix(in_srgb,var(--color-accent)_6%,var(--color-paper))] pt-16 pb-14 md:pt-24 md:pb-[72px]">
        <Container>
          <p className="text-[12px] uppercase tracking-[0.25em] text-ink/60">THE TRUST SCHOOLS PLACE IN US</p>
          <h2
            id="trust-heading"
            className="mt-4 text-balance text-[32px] font-light leading-[1.15] tracking-[-0.01em] text-ink md:text-[52px]"
          >
            We&apos;re proud of the trust
            <br />
            <em className="text-accent">schools place in us</em>
          </h2>
          <p className="mt-5 max-w-[720px] text-[18px] leading-[1.6] text-ink/70">
            Schools don&apos;t choose partners lightly, and we&apos;ve never taken that trust for granted. Every
            partnership, every student reached and every school that chooses to keep working with us matters
            because it tells us that what we&apos;re building is making a difference where it counts.
          </p>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-1 divide-y divide-ink/12 md:grid-cols-3 md:divide-x md:divide-y-0">
            <Stat
              figure={<p className={FIGURE}>350+</p>}
              label="schools"
              text="Working with schools and organisations around the world"
            />
            <Stat
              figure={<p className={FIGURE}>1 million+</p>}
              label="students"
              text="Young people who have experienced 8billionideas learning"
            />
            <Stat
              // 160px at md (768–1023px), where the three columns are narrow: at 200px it ran to
              // within 5px of "1 million+", less than the clear space it needs (the "O"'s height).
              figure={<OxfordAqaLogo variant="light" width={200} className="md:max-lg:[--oxfordaqa-logo-width:160px]" />}
              label="Official delivery partner"
              text="Supporting schools to deliver International GCSE Global Skills Projects"
            />
          </div>

          {/* Champion school logos */}
          <div className="mt-14">
            <div className="flex items-center gap-4">
              <span className="h-px flex-1 bg-ink/12" aria-hidden="true" />
              <p className="text-center text-[11px] uppercase tracking-[0.25em] text-ink/55">
                Trusted by schools and organisations including
              </p>
              <span className="h-px flex-1 bg-ink/12" aria-hidden="true" />
            </div>
            <ul className="mt-8 grid list-none grid-cols-2 items-center gap-x-6 gap-y-8 p-0 sm:grid-cols-4 xl:grid-cols-8">
              {gcseSchools.map((school) => (
                <li key={school.slug} className="flex h-11 items-center justify-center">
                  {school.logo?.src ? (
                    <Image
                      src={school.logo.src}
                      alt={school.logo.alt}
                      width={school.logo.width}
                      height={school.logo.height}
                      unoptimized
                      loading="lazy"
                      className="h-11 w-auto max-w-full object-contain opacity-80 mix-blend-multiply transition-opacity hover:opacity-100"
                    />
                  ) : (
                    // No logo file yet: the school's name, same height, so the row stays tidy.
                    <span className="text-center text-[14px] text-ink/70">{school.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>

      <TestimonialCarousel testimonials={orderedTestimonials()} image={testimonialImage} />
    </section>
  );
}

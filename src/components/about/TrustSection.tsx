import Image from "next/image";
import type { ReactNode } from "react";
import Container from "@/components/layout/Container";
import TestimonialCarousel from "@/components/about/TestimonialCarousel";
import { aboutOnlySchools, gcseSchools, type ChampionSchool } from "@/content/schools";
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

// The "Trusted by" strip: the champion schools plus the About-only logos, in an order that mixes
// wide wordmarks, crests and square marks along each row (rows of seven from lg).
const TRUST_LOGO_ORDER = [
  // Row 1
  "sotogrande-international-school",
  "wellington-college-bangkok",
  "dubai-british-school-mira",
  "cranleigh-abu-dhabi",
  "kings-college-school-panama",
  "queens-qatar",
  "dukes-education",
  // Row 2
  "british-college-of-gava",
  "british-school-lisbon",
  "dubai-british-school-emirates-hills",
  "north-gate-british-school",
  "noya-british-school",
  "kings-college-school-cascais",
  "kings-college-school-wimbledon",
];
const ALL_SCHOOLS = [...gcseSchools, ...aboutOnlySchools];
const TRUST_LOGOS = TRUST_LOGO_ORDER.map((slug) => ALL_SCHOOLS.find((school) => school.slug === slug)!);

// Optical sizing in a 15:8 cell: every logo is scaled to the same visible area (42% of the cell),
// then capped to the cell, so wide wordmarks are limited by width and crests by height. WEIGHT
// nudges logos whose file area doesn't match how heavy they look (1 = no change).
const CELL_W = 150;
const CELL_H = 80;
const TARGET_AREA = CELL_W * CELL_H * 0.42;
const WEIGHT: Record<string, number> = {
  "sotogrande-international-school": 0.9, // bold, saturated wordmark
  "british-school-lisbon": 0.85, // solid navy circle
  "dukes-education": 0.95, // heavy wordmark
  "kings-college-school-wimbledon": 1.25, // fine lines and small lettering
  "north-gate-british-school": 1.12, // pale, open mark
  "wellington-college-bangkok": 1.1, // fine serif lettering (capped by the cell's height)
};

function logoWidthPercent({ slug, logo }: ChampionSchool) {
  const area = TARGET_AREA * (WEIGHT[slug] ?? 1) ** 2;
  const scale = Math.min(Math.sqrt(area / (logo.width * logo.height)), CELL_W / logo.width, CELL_H / logo.height);
  return `${((logo.width * scale) / CELL_W) * 100}%`;
}

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

// One line at every width ("1 million+" is about 4.5em wide): 48px on mobile, then sized to the
// three columns: 36px at 768px, 52px at 1024px, 64px from 1280px.
const FIGURE = "whitespace-nowrap text-[48px] font-light leading-none text-ink md:text-[36px] lg:text-[52px] xl:text-[64px]";

export default function TrustSection() {
  return (
    <section aria-labelledby="trust-heading">
      {/* Top part — accent-green at 6% over paper */}
      <div className="bg-[color-mix(in_srgb,var(--color-accent)_6%,var(--color-paper))] py-section">
        <Container>
          <p className="text-[12px] uppercase tracking-[0.25em] text-ink/60">THE TRUST SCHOOLS PLACE IN US</p>
          <h2
            id="trust-heading"
            className="mt-eyebrow text-balance text-[32px] font-light leading-[1.15] tracking-[-0.01em] text-ink md:text-[52px]"
          >
            We&apos;re proud of the trust
            <br />
            <em className="text-accent">schools place in us</em>
          </h2>
          <p className="mt-lead max-w-[720px] text-[18px] leading-[1.6] text-ink/70">
            Schools don&apos;t choose partners lightly, and we&apos;ve never taken that trust for granted. Every
            partnership, every student reached and every school that chooses to keep working with us matters
            because it tells us that what we&apos;re building is making a difference where it counts.
          </p>

          {/* Stats */}
          <div className="mt-content grid grid-cols-1 divide-y divide-ink/12 md:grid-cols-3 md:divide-x md:divide-y-0">
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
              label="Teaching and learning partner"
              text="Supporting schools to deliver Global Skills Projects"
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
            {/* Two even rows of seven from lg, four per row from md, three from sm, two on phones;
                every row centred. Each cell is 15:8 (about 150×80 at 1440px). */}
            <ul className="mt-8 flex list-none flex-wrap justify-center gap-x-4 gap-y-6 p-0 md:gap-x-6 lg:gap-x-4">
              {TRUST_LOGOS.map((school) => (
                <li
                  key={school.slug}
                  className="w-[calc((100%-1rem)/2)] sm:w-[calc((100%-2rem)/3)] md:w-[calc((100%-4.5rem)/4)] lg:w-[calc((100%-6rem)/7)]"
                >
                  <div className="flex aspect-[15/8] w-full items-center justify-center transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                    <Image
                      src={school.logo.src}
                      alt={school.logo.alt}
                      width={school.logo.width}
                      height={school.logo.height}
                      unoptimized
                      loading="lazy"
                      className="max-h-full object-contain mix-blend-multiply"
                      style={{ width: logoWidthPercent(school), height: "auto" }}
                    />
                  </div>
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

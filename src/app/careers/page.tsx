import Image from "next/image";
import type { Metadata } from "next";
import { Download } from "lucide-react";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import RoleList from "@/components/careers/RoleList";
import {
  careersDownloads,
  careersHero,
  freelanceRoles,
  freelanceSection,
  openRoles,
  openRolesSection,
  publishedRoles,
  safeguardingNote,
} from "@/content/careers";

// Careers: open roles in Dubai and the freelance pool (each card opens a pop-out with the full
// description and how to apply; see RoleList), the full details as PDFs and the safeguarding note. All content (and each role's
// published flag) is in src/content/careers.ts. Linked from the footer (Company). Ends with the
// footer (no demo band; see layout.tsx).
export const metadata: Metadata = {
  title: "Careers | 8billionideas",
  description:
    "Join the 8billionideas team. See our open roles in Dubai and join our freelance pool of facilitators for schools across the UAE.",
  alternates: { canonical: "/careers" },
};

const H2 = "text-balance text-[32px] font-light leading-[1.15] tracking-[-0.01em] text-ink md:text-[52px]";
const EYEBROW = "text-[12px] uppercase tracking-[0.25em] text-accent";
const BODY = "text-[18px] leading-[1.6]";

export default function CareersPage() {
  const roles = publishedRoles(openRoles);
  const freelance = publishedRoles(freelanceRoles);

  return (
    <div className="bg-paper">
      {/* 1. Hero. The photo already fades to white on the left, so from lg it's a full-width background
          with the text over the faded side (multiplied into the paper, so its white becomes paper).
          Below xl the crop would put the text over the people, so it's a shorter band above the text,
          anchored right so the people stay in view. */}
      <section className="relative isolate overflow-hidden bg-paper">
        <div className="relative h-[220px] sm:h-[300px] md:h-[360px] lg:h-[420px] xl:absolute xl:inset-0 xl:h-auto">
          <Image
            src="/images/careers/careers-hero.webp"
            alt={careersHero.imageAlt}
            fill
            preload
            sizes="100vw"
            className="object-cover object-right mix-blend-multiply"
          />
        </div>
        <Container className="relative z-10 pt-8 pb-section xl:flex xl:min-h-[600px] xl:items-center xl:py-24">
          <div className="max-w-[560px]">
            <p className={EYEBROW}>{careersHero.eyebrow}</p>
            <h1 className="mt-eyebrow text-balance text-[40px] font-light leading-[1.1] tracking-[-0.01em] text-ink md:text-[56px]">
              {careersHero.headingStart} <em className="text-accent">{careersHero.headingEnd}</em>
            </h1>
            <p className="mt-lead text-[20px] leading-[1.5] text-ink">{careersHero.lead}</p>
            <p className={`mt-4 ${BODY} text-ink/75`}>{careersHero.body}</p>
            <div className="mt-8">
              <Button href="#open-roles" arrow className="w-full sm:w-auto">
                {careersHero.cta}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Open roles (scroll-mt clears the sticky nav). Stacked below lg, three across from lg. */}
      <section id="open-roles" className="scroll-mt-24 bg-paper py-section">
        <Container>
          <p className={EYEBROW}>{openRolesSection.eyebrow}</p>
          <h2 className={`mt-eyebrow ${H2}`}>{openRolesSection.heading}</h2>
          <RoleList roles={roles} numbered className="mt-content grid grid-cols-1 gap-5 lg:grid-cols-3" />
        </Container>
      </section>

      {/* 3. Freelance pool: the intro beside the card from lg. */}
      {freelance.length > 0 && (
        <section className="bg-accent/[0.06] py-section">
          <Container className="grid grid-cols-1 gap-content lg:grid-cols-2 lg:items-start lg:gap-16">
            <div>
              <p className={EYEBROW}>{freelanceSection.eyebrow}</p>
              <h2 className={`mt-eyebrow ${H2}`}>{freelanceSection.heading}</h2>
              <p className={`mt-lead max-w-[520px] ${BODY} text-ink/75`}>{freelanceSection.intro}</p>
            </div>
            <RoleList roles={freelance} numbered={false} className="grid grid-cols-1 gap-5" />
          </Container>
        </section>
      )}

      {/* 4. The two PDFs (full role details) and the safeguarding note. */}
      <section aria-label="Full role details" className="bg-paper py-section-tight">
        <Container>
          <ul className="flex list-none flex-col gap-4 p-0 sm:flex-row sm:flex-wrap">
            {careersDownloads.map((file) => (
              <li key={file.href}>
                <Button
                  href={file.href}
                  variant="outline"
                  target="_blank"
                  rel="noopener"
                  download={file.href.split("/").pop()}
                  className="w-full sm:w-auto"
                >
                  <Download className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  {file.label}
                </Button>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-[760px] text-[14px] leading-[1.6] text-ink/65">{safeguardingNote}</p>
        </Container>
      </section>
    </div>
  );
}

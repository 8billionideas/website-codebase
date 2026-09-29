import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  GraduationCap,
  UserRound,
  UsersRound,
  Laptop,
  FileBadge,
  Users,
  Megaphone,
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/layout/Container";
import { SectionH2 } from "@/components/home/SectionHeading";
import PricingCalculator from "@/components/pricing/PricingCalculator";
import { pricing } from "@/content/pricing";

export const metadata: Metadata = {
  title: "Pricing | 8billionideas",
  description:
    "Indicative pricing for the Critical Curriculum and the OxfordAQA International GCSE Global Skills Projects.",
};

const INCLUDED_ICONS: Record<string, LucideIcon> = {
  "Partnership Manager": UserRound,
  "Staff Onboarding": UsersRound,
  "Teacher Learning Platform": Laptop,
  "Student Learning Platform": GraduationCap,
  "Student Certificates": FileBadge,
  "Community Access": Users,
  "Marketing Kit": Megaphone,
};

export default function PricingPage() {
  const { headline, included, cta } = pricing;

  return (
    <div className="bg-paper">
      <Container className="py-16 md:py-24">
        {/* Header */}
        <div className="h-[3px] w-12 bg-accent" aria-hidden="true" />
        <h1 className="mt-6 text-[36px] font-light leading-[1.1] tracking-[-0.01em] text-ink md:text-[56px]">
          {headline}
        </h1>

        {/* Combined pricing calculator */}
        <PricingCalculator />

        {/* Row 2 — every school gets */}
        <div className="mt-5 rounded-[20px] border border-ink/8 bg-white p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_3fr]">
            <div>
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/[0.12]">
                <Users className="h-6 w-6 text-accent" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <p className="mt-4 text-[30px] font-light text-ink">{included.heading}</p>
              <p className="mt-2 text-[15px] text-ink/70">
                Everything you need to deliver, support and grow the programme — all in one
                partnership.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {included.items.map((item) => {
                const Icon = INCLUDED_ICONS[item.name];
                return (
                  <div key={item.name} className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/[0.12]">
                      <Icon className="h-5 w-5 text-accent" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[15px] font-medium text-ink">{item.name}</p>
                      <p className="mt-1 text-[14px] text-ink/70">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Closing CTA */}
        <div className="mt-5 text-center">
          <SectionH2 variant="light" className="mx-auto">
            Ready to bring this
            <br />
            <em className="text-accent">to your school?</em>
          </SectionH2>
          <div className="mt-8 flex justify-center">
            <Link
              href={cta.primaryCta.href}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-body font-medium text-ink transition-colors hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 sm:w-auto"
            >
              {cta.primaryCta.label}
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

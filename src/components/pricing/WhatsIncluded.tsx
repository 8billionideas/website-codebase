import {
  ArrowRight,
  BookOpen,
  ChartNoAxesColumnIncreasing,
  CirclePlus,
  Laptop,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/layout/Container";
import { pricing } from "@/content/pricing";
import DemoTrigger from "@/components/demo/DemoTrigger";

const ICONS: Record<string, LucideIcon> = {
  "Ready-to-teach learning": BookOpen,
  "Teacher and student platform access": Laptop,
  "Built-in progression checks": ChartNoAxesColumnIncreasing,
  "A dedicated Partnership Manager": User,
  "Staff onboarding and support": Users,
};

const CARD = "h-full rounded-2xl border border-white/12 bg-white/[0.03] p-8";

function IconBadge({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/[0.06]">
      <Icon className="h-6 w-6 text-accent" strokeWidth={1.5} aria-hidden="true" />
    </span>
  );
}

export default function WhatsIncluded() {
  const { eyebrow, headingLead, headingEmphasis, intro, core, support, more } =
    pricing.whatsIncluded;

  return (
    <section className="bg-ink py-16 text-white lg:py-24">
      <Container>
        <p className="text-[12px] uppercase tracking-[0.25em] text-accent">{eyebrow}</p>
        <h2 className="mt-4 text-[34px] font-light leading-[1.1] tracking-[-0.01em] text-balance md:text-[52px]">
          {headingLead} <em className="text-accent">{headingEmphasis}</em>
        </h2>
        <p className="mt-5 max-w-2xl text-[18px] leading-[1.6] text-white/75">{intro}</p>

        <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {core.map((item) => (
            <li key={item.name} className="md:last:col-span-2 lg:last:col-span-1">
              <div className={CARD}>
                <IconBadge icon={ICONS[item.name]} />
                <h3 className="mt-6 text-[22px] font-normal leading-[1.3]">{item.name}</h3>
                <p className="mt-2 text-[16px] leading-[1.6] text-white/70">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>

        <ul className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          {support.map((item) => (
            <li key={item.name}>
              <div className={`${CARD} flex flex-col items-start gap-6 sm:flex-row sm:gap-5`}>
                <IconBadge icon={ICONS[item.name]} />
                <div>
                  <h3 className="text-[22px] font-normal leading-[1.3]">{item.name}</h3>
                  <p className="mt-2 text-[16px] leading-[1.6] text-white/70">
                    {item.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <DemoTrigger trackingLocation="pricing"
          ariaLabel={more.ariaLabel}
          className="group mt-5 flex w-full flex-col text-left gap-4 rounded-2xl border border-white/12 bg-white/[0.03] px-6 py-6 transition-colors hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink sm:flex-row sm:items-center sm:gap-6 sm:px-8"
        >
          <CirclePlus className="h-9 w-9 shrink-0 text-accent" strokeWidth={1.5} aria-hidden="true" />
          <span className="hidden w-px self-stretch bg-white/15 sm:block" aria-hidden="true" />
          <span className="flex-1">
            <span className="block text-[20px] font-normal leading-[1.3]">{more.name}</span>
            <span className="mt-1 block text-[15px] leading-[1.6] text-white/70">
              {more.description}
            </span>
          </span>
          <ArrowRight
            className="h-6 w-6 shrink-0 text-accent transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </DemoTrigger>
      </Container>
    </section>
  );
}

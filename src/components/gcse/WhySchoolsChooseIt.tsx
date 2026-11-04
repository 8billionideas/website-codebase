import { CalendarDays, FileText, GraduationCap, Star, Users, type LucideIcon } from "lucide-react";
import Container from "@/components/layout/Container";
import { gcse } from "@/content/gcse";

const ICONS: Record<string, LucideIcon> = { FileText, Users, CalendarDays, Star };

// /qualifications 09: why schools choose the qualification – a featured card and four benefits.
export default function WhySchoolsChooseIt() {
  const { eyebrow, headingLine1, headingLine2, intro, offersHeading, featured, benefits } = gcse.whySchoolsChoose;

  return (
    <section className="bg-paper py-section">
      <Container>
        <p className="text-[12px] uppercase tracking-[0.25em] text-accent">{eyebrow}</p>
        <h2 className="mt-eyebrow text-balance text-[36px] font-light leading-[1.1] tracking-[-0.01em] text-ink md:text-[56px]">
          {headingLine1}
          <br />
          <em className="text-accent">{headingLine2}</em>
        </h2>
        <p className="mt-lead max-w-[880px] text-[18px] leading-[1.6] text-ink/70">{intro}</p>

        <h3 className="mt-content text-[18px] font-medium leading-[1.4] text-ink">{offersHeading}</h3>

        {/* From 1024px: the featured card (about 38%) spans two rows beside a 2×2 grid.
            768–1023px: featured full width on top, then the 2×2. Below 768px: stacked. */}
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[38fr_31fr_31fr] lg:grid-rows-2">
          <div className="flex flex-col justify-center rounded-[10px] bg-ink p-8 md:col-span-2 md:p-10 lg:col-span-1 lg:row-span-2">
            <GraduationCap className="h-12 w-12 text-white" strokeWidth={1.5} aria-hidden="true" />
            <h4 className="mt-6 text-[26px] font-normal leading-[1.25] text-white md:text-[28px]">{featured.title}</h4>
            <p className="mt-3 text-[17px] leading-[1.6] text-white/85">{featured.text}</p>
          </div>
          {benefits.map((benefit) => {
            const Icon = ICONS[benefit.icon];
            return (
              <div key={benefit.title} className="rounded-lg border border-ink/10 bg-white p-6">
                <Icon className="h-7 w-7 text-ink" strokeWidth={1.5} aria-hidden="true" />
                <h4 className="mt-4 text-[17px] font-medium leading-[1.35] text-ink">{benefit.title}</h4>
                <p className="mt-2 text-[14px] leading-[1.6] text-ink/65">{benefit.text}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

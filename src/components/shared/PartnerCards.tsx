import {
  Award,
  ClipboardCheck,
  GraduationCap,
  BookOpen,
  Monitor,
  Headset,
  type LucideIcon,
} from "lucide-react";
import OxfordAqaLogo from "@/components/shared/OxfordAqaLogo";

const qualificationItems: { Icon: LucideIcon; text: string }[] = [
  { Icon: Award, text: "An internationally recognised GCSE qualification" },
  { Icon: ClipboardCheck, text: "Clear assessment and grading framework" },
  { Icon: GraduationCap, text: "A qualification recognised by schools & universities" },
];

const deliveryItems: { Icon: LucideIcon; text: string }[] = [
  { Icon: BookOpen, text: "Ready-to-use lessons and learning resources" },
  { Icon: Monitor, text: "A platform to plan, deliver & monitor learning" },
  { Icon: Headset, text: "Year-round Partnership Manager support" },
];

// Shared between the homepage (Section 5) and /gcse (Section 6). Both cards
// subgrid the same 6 parent row tracks (header, sub-label, divider, then the
// three items), so a row on one side always matches the height of its
// partner row on the other side, even when only one of them wraps to a
// second line. Item font size is a fluid clamp so the copy stays on one
// line at lg+ without overflowing the card — see prior tuning history for
// why these exact values (padding, gap, icon size) were chosen.
export default function PartnerCards() {
  return (
    <div className="relative mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 md:grid-rows-[repeat(6,auto)] md:gap-x-16 lg:gap-x-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-white/10 md:block"
      />

      <div className="row-span-6 grid [grid-template-rows:subgrid] rounded-2xl border border-white/15 bg-white/[0.03] p-6 md:pl-6 md:pr-10 md:pt-10 md:pb-10 lg:pl-[28px] lg:pr-[28px]">
        <OxfordAqaLogo variant="tile" width={160} className="self-start" />
        <p className="text-caption uppercase tracking-[0.2em] text-white/50">
          THE QUALIFICATION
        </p>
        <div aria-hidden="true" className="border-t border-white/10" />
        {qualificationItems.map(({ Icon, text }) => (
          <div key={text} className="flex items-start gap-2.5 lg:gap-3">
            <Icon
              className="h-5 w-5 shrink-0 text-white lg:h-[18px] lg:w-[18px]"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <p className="whitespace-normal text-body-lg text-white/80 lg:whitespace-nowrap lg:text-[clamp(13px,1.05vw,16px)]">
              {text}
            </p>
          </div>
        ))}
      </div>

      <div className="row-span-6 grid [grid-template-rows:subgrid] rounded-2xl border border-white/15 bg-white/[0.03] p-6 md:pl-6 md:pr-10 md:pt-10 md:pb-10 lg:pl-[28px] lg:pr-[28px]">
        <p className="text-h3 font-bold text-white">8billionideas</p>
        <p className="text-caption uppercase tracking-[0.2em] text-white/50">
          THE DELIVERY EXPERIENCE
        </p>
        <div aria-hidden="true" className="border-t border-white/10" />
        {deliveryItems.map(({ Icon, text }) => (
          <div key={text} className="flex items-start gap-2.5 lg:gap-3">
            <Icon
              className="h-5 w-5 shrink-0 text-white lg:h-[18px] lg:w-[18px]"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <p className="whitespace-normal text-body-lg text-white/80 lg:whitespace-nowrap lg:text-[clamp(13px,1.05vw,16px)]">
              {text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

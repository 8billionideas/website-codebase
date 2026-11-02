import Image from "next/image";
import { Users, Megaphone, UsersRound, GraduationCap, type LucideIcon } from "lucide-react";

// Matches Container's own side inset (mx-auto max-w-[75rem] + md:px-12)
// exactly, so the text column's left edge lines up with the nav logo even
// though this section bleeds full-width past the Container.
const CONTAINER_SIDE_INSET = "calc(48px + max(0px, (100vw - 1200px) / 2))";

const ALT_TEXT =
  "A partnership manager smiling as she talks with two teachers around a table";

const CARDS: { Icon: LucideIcon; title: string; text: string }[] = [
  {
    Icon: Users,
    title: "Partnership Manager",
    text: "A named contact to support implementation, curriculum mapping, logistics and ongoing delivery.",
  },
  {
    Icon: Megaphone,
    title: "Live Launch Support",
    text: "Assemblies or launch sessions to introduce the curriculum clearly and confidently.",
  },
  {
    Icon: UsersRound,
    title: "Live Delivery Days",
    text: "Facilitator-led workshops or drop-down days to deliver programmes live in school.",
  },
  {
    Icon: GraduationCap,
    title: "Teacher Onboarding & CPD",
    text: "Practical training that helps staff feel confident using the platform and delivering the learning.",
  },
];

function SupportCard({ Icon, title, text }: { Icon: LucideIcon; title: string; text: string }) {
  return (
    <div
      className="flex items-start gap-5 rounded-2xl border border-ink/[0.08] bg-white p-8"
      style={{ boxShadow: "0 4px 16px rgba(22,33,61,0.04)" }}
    >
      <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent/[0.12]">
        <Icon className="h-[26px] w-[26px] text-ink" strokeWidth={1.5} aria-hidden="true" />
      </span>
      <div>
        <p className="text-[22px] font-normal text-ink">{title}</p>
        <p className="mt-2 text-[16px] leading-[1.6] text-ink/65">{text}</p>
      </div>
    </div>
  );
}

export default function ImplementationSupportSection() {
  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-paper">
      {/* Desktop (1024px+): photo top-right of the whole section, behind
          everything, blending into the paper via multiply (the source
          image already fades to white on its own left and bottom edges).
          Positioned relative to the section itself, ignoring the content
          padding below, so it can sit flush with the top-right corner. */}
      <div
        className="absolute right-0 top-0 hidden lg:block"
        style={{ width: "66%", aspectRatio: "1448 / 1086" }}
      >
        <Image
          src="/images/curriculum/implementation-support.webp"
          alt={ALT_TEXT}
          fill
          loading="lazy"
          sizes="66vw"
          className="object-contain mix-blend-multiply"
        />
      </div>

      {/* Tablet and mobile: photo cropped to its useful upper part, full
          width, above everything else — sits outside the padded content
          wrapper below so it bleeds edge to edge and to the section's own
          top, with normal padding resuming for the text that follows. */}
      <div className="relative aspect-[4/3] w-full overflow-hidden lg:hidden">
        <Image
          src="/images/curriculum/implementation-support.webp"
          alt={ALT_TEXT}
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover mix-blend-multiply"
          style={{ objectPosition: "right top" }}
        />
      </div>

      <div
        className="relative z-10 py-section"
        style={{ paddingLeft: CONTAINER_SIDE_INSET, paddingRight: CONTAINER_SIDE_INSET }}
      >
        <div className="max-w-[600px]">
          <p className="text-[12px] uppercase tracking-[0.25em] text-ink/70">
            IMPLEMENTATION SUPPORT
          </p>
          <h2 className="mt-eyebrow text-balance text-[36px] font-light leading-[1.1] tracking-[-0.01em] text-ink md:text-[56px]">
            The support to make
            <br />
            the curriculum work
            <br />
            <em className="text-accent">in your school</em>
          </h2>
          <p className="mt-lead text-[18px] leading-[1.6] text-ink/70">
            From implementation through to ongoing delivery, your Partnership Manager
            works alongside your school, with the option to add live launches, staff
            training and in-school delivery where it would make the biggest difference.
          </p>
        </div>

        <div className="mt-content grid grid-cols-1 gap-5 lg:grid-cols-2">
          {CARDS.map((card) => (
            <SupportCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}

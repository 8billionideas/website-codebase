import {
  Brain,
  Lightbulb,
  MessageCircle,
  Puzzle,
  Scale,
  ShieldCheck,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/layout/Container";
import { skills, skillsSection, type SkillIcon } from "@/content/skills";

const ICONS: Record<SkillIcon, LucideIcon> = {
  Brain,
  Lightbulb,
  Puzzle,
  MessageCircle,
  Users,
  ShieldCheck,
  User,
  Scale,
};

// Homepage Section 3: "8 transferable skills".
export default function SkillsFramework() {
  const { eyebrow, headingLine1, headingLine2, intro } = skillsSection;

  return (
    <section className="bg-paper py-16 md:py-24">
      <Container>
        <p className="text-[12px] uppercase tracking-[0.25em] text-accent">{eyebrow}</p>
        <h2 className="mt-4 text-balance text-[32px] font-light leading-[1.15] tracking-[-0.01em] text-ink md:text-[52px]">
          {headingLine1}
          <br />
          <em className="text-accent">{headingLine2}</em>
        </h2>
        <p className="mt-5 max-w-[880px] text-[18px] leading-[1.6] text-ink/70">{intro}</p>

        {/* Each card spans three rows (icon, title, text) on a shared subgrid, so a two-line title
            in one card moves every description in that row down equally: cards in a row stay the
            same height and their descriptions start at the same position.
            At 1024–1279px (narrow 4-column cards) the gap, side padding and text size drop to
            their minimums (12px, 20px, 14px) to keep descriptions to 3 lines where possible. */}
        <ul className="mt-12 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2 lg:grid-cols-4 lg:max-xl:gap-x-3">
          {skills.map((skill) => {
            const Icon = ICONS[skill.icon];
            return (
              <li
                key={skill.title}
                className="group row-span-3 grid grid-rows-subgrid gap-0 rounded-xl bg-ink px-6 py-7 lg:max-xl:px-5 transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <Icon
                  className="h-7 w-7 text-white transition-colors duration-200 group-hover:text-accent"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className="mt-4 text-[20px] font-medium leading-[1.3] text-white">{skill.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.5] text-white/80 lg:max-xl:text-[14px]">{skill.text}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

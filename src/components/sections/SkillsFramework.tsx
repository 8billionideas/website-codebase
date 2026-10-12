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

// Homepage Section 3: "Eight transferable skills".
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

        <ul className="mt-12 grid list-none auto-rows-fr grid-cols-1 gap-4 p-0 md:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill) => {
            const Icon = ICONS[skill.icon];
            return (
              <li
                key={skill.title}
                className="group flex flex-col rounded-xl bg-ink p-7 transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <Icon
                  className="h-7 w-7 text-white transition-colors duration-200 group-hover:text-accent"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className="mt-4 text-[20px] font-medium leading-[1.3] text-white">{skill.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.5] text-white/80">{skill.text}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

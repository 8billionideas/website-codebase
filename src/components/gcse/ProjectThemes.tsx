import Image from "next/image";
import type { ReactNode } from "react";
import Container from "@/components/layout/Container";
import PillarQuestionSelector from "@/components/gcse/PillarQuestionSelector";
import { gcse } from "@/content/gcse";
import { PILLARS, type PillarName } from "@/content/curriculumMapping";

// One shared row, used for both projects so they can't drift apart.
// Desktop (lg+): a two-column grid inside the page container: the text (vertically centred,
// lined up with the nav logo) and a photo frame, equal columns with a fixed 64px gap, so both
// photos are always the same size and position. The frame is 3/2, rounded, with the cropped
// photo filling it. Below lg: the text, then the photo at full width (16/10).
function ProjectRow({
  eyebrow,
  title,
  line,
  image,
  children,
}: {
  eyebrow: string;
  title: string;
  line: string;
  image: { src: string; alt: string; position: string };
  children: ReactNode;
}) {
  return (
    <div className="bg-paper">
      <Container className="grid grid-cols-1 gap-8 py-section lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <p className="text-[12px] uppercase tracking-[0.2em] text-ink/60">{eyebrow}</p>
          <h3 className="mt-3 text-[28px] font-normal leading-[1.2] text-ink md:text-[34px]">
            {title}
          </h3>
          <p className="mt-3 text-[17px] leading-[1.6] text-ink/65">{line}</p>
          <div className="mt-8">{children}</div>
        </div>
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl lg:aspect-[3/2]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            style={{ objectPosition: image.position }}
          />
        </div>
      </Container>
    </div>
  );
}

export default function ProjectThemes() {
  const { projectThemes } = gcse;
  const { individual, group } = projectThemes;
  const orderedPillars = [...projectThemes.pillars].sort(
    (x, y) => PILLARS.indexOf(x.name as PillarName) - PILLARS.indexOf(y.name as PillarName)
  );

  return (
    <section>
      {/* Header band */}
      <div className="bg-ink py-section-tight">
        <Container>
          <p className="text-[12px] uppercase tracking-[0.25em] text-accent">
            {projectThemes.eyebrow}
          </p>
          <h2 className="mt-eyebrow text-balance text-[30px] font-light leading-[1.15] tracking-[-0.01em] text-white md:text-[48px]">
            {projectThemes.headingLine1}
            <br />
            {/* Balanced on its own, so "projects" is never left alone. */}
            <em className="inline-block text-balance text-accent">{projectThemes.headingLine2}</em>
          </h2>
          <p className="mt-lead max-w-[720px] text-[17px] leading-[1.6] text-white/80">
            {projectThemes.intro}
          </p>
        </Container>
      </div>

      {/* Individual project */}
      <ProjectRow
        eyebrow={individual.eyebrow}
        title={individual.title}
        line={individual.line}
        image={individual.image}
      >
        <p className="text-[17px] font-medium text-ink">{individual.questionHeading}</p>
        <div className="mt-4">
          <PillarQuestionSelector pillars={orderedPillars} label={individual.questionLabel} />
        </div>
      </ProjectRow>

      <div className="h-px w-full bg-ink/[0.08]" aria-hidden="true" />

      {/* Group project */}
      <ProjectRow
        eyebrow={group.eyebrow}
        title={group.title}
        line={group.line}
        image={group.image}
      >
        <p className="text-[12px] uppercase tracking-[0.2em] text-ink/55">{group.focusLabel}</p>
        <p className="mt-3 text-[22px] font-normal leading-[1.35] text-ink">{group.focus}</p>
      </ProjectRow>
    </section>
  );
}

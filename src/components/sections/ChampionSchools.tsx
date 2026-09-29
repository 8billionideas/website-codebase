import fs from "node:fs";
import path from "node:path";
import Container from "@/components/layout/Container";
import { schools as defaultSchools, SchoolLogo } from "@/content/schools";
import { home } from "@/content/home";

function logoFileExists(imagePath: string) {
  const filename = imagePath.split("/").pop() ?? "";
  return fs.existsSync(path.join(process.cwd(), "public", "logos", filename));
}

export default function ChampionSchools({
  schools = defaultSchools,
  headline = home.championSchools.headline,
}: {
  schools?: SchoolLogo[];
  headline?: string;
}) {
  // Rendered twice back-to-back so the -50% keyframe loops seamlessly.
  const track = [...schools, ...schools];

  return (
    <section className="pt-6 pb-12 md:pt-8 md:pb-16">
      <Container>
        <p className="text-center text-caption uppercase tracking-wide text-muted">
          {headline}
        </p>
      </Container>

      <div className="mt-8 overflow-hidden">
        <div className="flex w-max animate-[marquee_40s_linear_infinite] gap-10 hover:[animation-play-state:paused]">
          {track.map((school, i) => {
            const hasLogo = logoFileExists(school.image);
            return (
              <div
                key={`${school.number}-${i}`}
                className="flex h-16 w-32 shrink-0 items-center justify-center"
              >
                {hasLogo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={school.image}
                    alt={school.alt}
                    className="max-h-12 w-auto object-contain"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-md border border-ink/10 bg-surface p-1.5 text-center text-[9px] font-normal leading-tight text-muted">
                    {school.name ?? String(school.number).padStart(2, "0")}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

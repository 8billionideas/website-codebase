import Container from "@/components/layout/Container";
import PillarSpine from "@/components/sections/PillarSpine";
import { pillars } from "@/content/pillars";
import { home } from "@/content/home";

export default function CriticalCurriculum() {
  const { headline, whatIsIt, pillarsIntro } = home.criticalCurriculum;

  return (
    <section className="py-16 md:py-24">
      <Container>
        <h2 className="text-h2 text-ink">{headline}</h2>

        <div className="mt-8">
          <h3 className="text-h3 text-ink">{whatIsIt.heading}</h3>
          <p className="mt-3 max-w-2xl text-body-lg text-muted">{whatIsIt.body}</p>
        </div>

        <div className="mt-12">
          <h3 className="text-h3 text-ink">{pillarsIntro.heading}</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {pillarsIntro.skills.map((skill) => (
              <li
                key={skill}
                className="rounded-full bg-accent/10 px-3 py-1 text-caption font-medium text-ink"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>

        <PillarSpine pillars={pillars} />
      </Container>
    </section>
  );
}

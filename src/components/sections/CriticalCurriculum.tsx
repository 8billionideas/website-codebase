import Container from "@/components/layout/Container";
import PillarCard from "@/components/sections/PillarCard";
import { pillars } from "@/content/pillars";
import { home } from "@/content/home";

export default function CriticalCurriculum() {
  const { headline, subhead } = home.criticalCurriculum;

  return (
    <section className="py-16 md:py-24">
      <Container>
        <h2 className="text-h2 text-ink">{headline}</h2>
        <p className="mt-4 max-w-2xl text-body-lg text-muted">{subhead}</p>

        <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <li key={pillar.name}>
              <PillarCard pillar={pillar} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

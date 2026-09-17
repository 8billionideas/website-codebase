import Container from "@/components/layout/Container";
import { gcse } from "@/content/gcse";

export default function GcsePage() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        <h1 className="text-display text-ink">{gcse.title}</h1>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {gcse.projects.map((project) => (
            <div key={project.year} className="rounded-lg bg-surface p-6">
              <p className="text-caption font-medium uppercase tracking-wide text-brand">
                {project.year}
              </p>
              <h2 className="mt-2 text-h3 text-ink">{project.title}</h2>
              <p className="mt-3 text-body-lg text-muted">
                {project.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <p className="text-caption font-medium uppercase tracking-wide text-muted">
            {gcse.skillsLabel}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {gcse.skills.map((skill) => (
              <li
                key={skill}
                className="rounded-full bg-accent/10 px-3 py-1 text-caption font-medium text-ink"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
}

import Container from "@/components/layout/Container";
import { home } from "@/content/home";

export default function Proof() {
  const { headline, leadItem, items, testimonialsLabel, testimonials } = home.proof;

  return (
    <section className="bg-surface py-16 md:py-24">
      <Container>
        <h2 className="text-h2 text-ink">{headline}</h2>

        <div className="mt-8 rounded-lg bg-paper p-6 md:p-8">
          <h3 className="text-h3 text-ink">{leadItem.name}</h3>
          <p className="mt-2 max-w-3xl text-body-lg text-muted">
            {leadItem.description}
          </p>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <li key={item.name}>
              <h3 className="text-h3 text-ink">{item.name}</h3>
              <p className="mt-2 text-body-lg text-muted">{item.description}</p>
            </li>
          ))}
        </ul>

        <p className="mt-16 text-caption font-medium uppercase tracking-wide text-muted">
          {testimonialsLabel}
        </p>
        <ul className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <li
              key={testimonial.name}
              className="rounded-lg bg-paper p-6 text-body-lg text-ink"
            >
              <p>&ldquo;{testimonial.quote}&rdquo;</p>
              <p className="mt-4 text-caption font-medium text-ink">
                {testimonial.name}
              </p>
              <p className="text-caption text-muted">{testimonial.role}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

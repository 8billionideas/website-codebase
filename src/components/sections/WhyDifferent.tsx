import Container from "@/components/layout/Container";
import { home } from "@/content/home";

export default function WhyDifferent() {
  const { headline, body } = home.whyDifferent;

  return (
    <section className="py-16 md:py-24">
      <Container>
        <h2 className="max-w-2xl text-h2 text-ink">{headline}</h2>
        <p className="mt-6 max-w-3xl text-body-lg text-muted">{body}</p>
      </Container>
    </section>
  );
}

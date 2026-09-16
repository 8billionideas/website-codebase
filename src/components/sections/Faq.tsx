import Container from "@/components/layout/Container";
import { home } from "@/content/home";

export default function Faq() {
  const { headline, items } = home.faq;

  return (
    <section className="bg-surface py-16 md:py-24">
      <Container>
        <h2 className="text-h2 text-ink">{headline}</h2>

        <ul className="mt-10 divide-y divide-ink/10 border-t border-ink/10">
          {items.map((item) => (
            <li key={item.question} className="py-6">
              <h3 className="text-h3 text-ink">{item.question}</h3>
              <p className="mt-2 max-w-2xl text-body-lg text-muted">
                {item.answer}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

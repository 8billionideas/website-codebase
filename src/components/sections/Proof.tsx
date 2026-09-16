import Container from "@/components/layout/Container";
import { home } from "@/content/home";

export default function Proof() {
  const { headline, items } = home.proof;

  return (
    <section className="bg-surface py-16 md:py-24">
      <Container>
        <h2 className="text-h2 text-ink">{headline}</h2>

        <ul className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item.name}>
              <h3 className="text-h3 text-ink">{item.name}</h3>
              <p className="mt-2 text-body-lg text-muted">{item.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

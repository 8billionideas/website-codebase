import Container from "@/components/layout/Container";
import { home } from "@/content/home";

function ChevronDownIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-accent transition-transform duration-200 group-open:rotate-180"
    >
      <path
        d="M3 6l5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Faq() {
  const { headline, items } = home.faq;

  return (
    <section className="bg-surface py-16 md:py-24">
      <Container>
        <h2 className="text-h2 text-ink">{headline}</h2>

        <ul className="mt-8 divide-y divide-ink/10 border-t border-ink/10">
          {items.map((item, index) => (
            <li key={index}>
              <details className="group py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-body-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  <span>{item.question}</span>
                  <ChevronDownIcon />
                </summary>
                <p className="mt-2 max-w-2xl text-body text-muted">
                  {item.answer}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

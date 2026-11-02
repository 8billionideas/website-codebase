import Container from "@/components/layout/Container";
import { workWithUsRows } from "@/content/about-work-with-us";

// /about "What it's like to work with us", styled like "Why we care": paper, three equal
// columns with thin vertical dividers (stacked with horizontal dividers on mobile), then a
// centred closing line with a short green rule.
export default function WorkWithUsSection() {
  return (
    <section className="bg-paper py-section">
      <Container>
        <p className="text-[12px] uppercase tracking-[0.25em] text-ink/60">WHAT IT’S LIKE TO WORK WITH US</p>
        <h2 className="mt-eyebrow text-balance text-[32px] font-light leading-[1.15] tracking-[-0.01em] text-ink md:text-[52px]">
          We want working with us
          <br />
          <em className="text-accent">to feel easy</em>
        </h2>
        <p className="mt-lead max-w-[760px] text-[18px] leading-[1.6] text-ink/70">
          We know schools have enough complexity already, so we try to be the opposite of that. We stay close,
          communicate clearly and make sure there is always a real person who knows your school and what
          you’re trying to achieve.
        </p>

        <ul className="mt-content grid list-none grid-cols-1 divide-y divide-ink/12 p-0 md:grid-cols-3 md:divide-x md:divide-y-0">
          {workWithUsRows.map((row) => (
            <li key={row.number} className="py-6 first:pt-0 last:pb-0 md:px-8 md:py-0 md:first:pl-0 md:last:pr-0">
              <p className="text-[32px] font-light leading-none text-accent">{row.number}</p>
              <h3 className="mt-4 text-[22px] font-normal leading-[1.3] text-ink">{row.title}</h3>
              <p className="mt-3 text-[17px] leading-[1.7] text-ink/75">{row.text}</p>
              <p className="mt-4 text-[13px] leading-[1.5] text-ink/55">{row.tags.join(" · ")}</p>
            </li>
          ))}
        </ul>
      </Container>

      {/* Closing statement — centred on purpose, styled like "Why we care"'s closing line. */}
      <Container className="mt-12 text-center md:mt-[72px]">
        <p className="mx-auto max-w-[1000px] text-balance text-[24px] font-light leading-[1.3] tracking-[-0.01em] text-ink md:text-[32px] xl:text-[36px]">
          <span className="md:block">We want schools to feel like we’re</span>{" "}
          <em className="text-accent md:block">part of their team</em>
        </p>
        <div className="mx-auto mt-6 h-0.5 w-12 bg-accent" aria-hidden="true" />
      </Container>
    </section>
  );
}

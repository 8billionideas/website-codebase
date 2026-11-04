import Image from "next/image";
import Container from "@/components/layout/Container";
import { gcse } from "@/content/gcse";

// /qualifications 05: a light quote break between "Ready to deliver" and the platform section, over a
// decorative foliage background. Content is centred on purpose for this quote.
// Switched on/off with SHOW_GCSE_QUOTE in src/content/gcse.ts.
export default function QuoteBreak() {
  const { text, name, role, isPlaceholder } = gcse.quote;

  return (
    <section className="relative isolate overflow-hidden bg-paper py-section-tight">
      <Image
        src="/images/gcse/quote-background.webp"
        alt=""
        fill
        loading="lazy"
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      <Container>
        <figure className="mx-auto max-w-[860px] text-center">
          {isPlaceholder && (
            <p className="mb-6 inline-block rounded-full border border-dashed border-ink/30 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-ink/60">
              Placeholder: awaiting approved quote
            </p>
          )}
          <span aria-hidden="true" className="block text-[72px] font-light leading-none text-accent">
            &ldquo;
          </span>
          <blockquote>
            <p className="text-[22px] font-light italic leading-[1.45] text-ink md:text-[30px]">
              &ldquo;{text}&rdquo;
            </p>
          </blockquote>
          <span aria-hidden="true" className="mx-auto mt-7 block h-0.5 w-10 bg-accent" />
          <figcaption className="mt-5">
            <p className="text-[17px] font-medium text-ink">{name}</p>
            <p className="mt-1 text-[15px] text-ink/65">{role}</p>
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}

import Image from "next/image";

// Awaiting a permission-cleared quote from James.
// The homepage quote band, below the pillar carousel. Set to false to hide the band entirely
// (the carousel section then closes up to the next section's standard spacing).
export const SHOW_HOME_QUOTE = true;

// Placeholder until the approved quote, name, role and school are supplied.
const QUOTE = {
  text: "[Approved quote to be added]",
  attribution: "[Name, Role, School]",
};

// Full-bleed photo band with the compact section padding (py-section-tight).
export default function HomeQuoteBand() {
  if (!SHOW_HOME_QUOTE) return null;
  return (
    <section className="relative isolate flex items-center justify-center overflow-hidden py-section-tight">
      <Image
        src="/images/built-for-life-band.webp"
        alt=""
        fill
        loading="lazy"
        sizes="100vw"
        className="-z-10 object-cover object-[center_60%]"
      />
      <div className="absolute inset-0 -z-10 bg-ink/35" />
      <figure className="relative mx-auto w-full max-w-[860px] px-6 text-center text-white">
        <p className="mx-auto mb-5 w-max rounded-full border border-dashed border-white/60 px-3 py-1 text-[11px] uppercase leading-none tracking-[0.15em] text-white/85">
          Placeholder: awaiting approved quote
        </p>
        <span className="block text-[40px] font-light leading-none text-accent" aria-hidden="true">
          &ldquo;
        </span>
        <blockquote className="mt-3">
          <p className="text-[22px] font-light italic leading-[1.45] text-balance lg:text-[30px]">{QUOTE.text}</p>
        </blockquote>
        <figcaption className="mt-6 flex flex-col items-center">
          <span className="h-0.5 w-10 bg-accent" aria-hidden="true" />
          <span className="mt-4 text-[16px] font-medium">{QUOTE.attribution}</span>
        </figcaption>
      </figure>
    </section>
  );
}

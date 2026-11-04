import Image from "next/image";

// Full-bleed photo quote band (homepage, /qualifications): the same photo, overlay and type wherever it's
// used, with the compact section padding (py-section-tight). Sized for long quotes: 18px, then
// 22px from lg, line-height 1.5, at most 900px wide.
export default function QuoteBand({ quote, name, role }: { quote: string; name: string; role: string }) {
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
      <figure className="relative mx-auto w-full max-w-[948px] px-6 text-center text-white">
        <span className="block text-[40px] font-light leading-none text-accent" aria-hidden="true">
          &ldquo;
        </span>
        <blockquote className="mt-3">
          <p className="text-pretty text-[18px] font-light italic leading-[1.5] lg:text-[22px]">{quote}</p>
        </blockquote>
        <figcaption className="mt-6 flex flex-col items-center">
          <span className="h-0.5 w-10 bg-accent" aria-hidden="true" />
          <span className="mt-4 text-[16px] font-medium">{name}</span>
          <span className="mt-1 text-[14px] text-white/70">{role}</span>
        </figcaption>
      </figure>
    </section>
  );
}

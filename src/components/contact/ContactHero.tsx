import Image from "next/image";

// /contact hero: the workspace photo (hero-v2, 2172×724) as a background, multiplied into the
// paper (its white fades become paper), with a paper fade at the bottom (so it flows into the form)
// and a soft paper glow behind the centred text. The people sit at the left and right edges; the
// bright, open middle is behind the text. The earlier hero image is kept.
export default function ContactHero() {
  return (
    <section className="relative isolate overflow-hidden bg-paper">
      <Image
        src="/images/contact/hero-v2.webp"
        alt="People working at laptops around a long table in a bright, plant-filled office"
        fill
        preload
        sizes="100vw"
        className="object-cover object-[center_top] mix-blend-multiply"
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgba(255,253,250,0) 50%, rgba(255,253,250,1) 100%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 45%, rgba(255,253,250,0.85) 0%, rgba(255,253,250,0) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Centred on purpose, for this page. */}
      <div className="relative z-10 flex min-h-[340px] flex-col items-center px-6 pt-16 pb-12 text-center md:min-h-[440px] md:px-12 md:pt-28 md:pb-16">
        <div className="max-w-[680px]">
          <p className="text-[12px] uppercase tracking-[0.25em] text-accent">CONTACT US</p>
          <h1 className="mt-4 text-[44px] font-light leading-[1.05] tracking-[-0.01em] text-ink md:text-[72px]">
            Get in <em className="text-accent">touch</em>
          </h1>
          <p className="mt-5 text-[18px] leading-[1.6] text-ink/75">
            Whether you have a question, want to talk about a partnership or simply need to speak to someone from
            the team, send us a message and we&apos;ll make sure it gets to the right person.
          </p>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";

import Container from "@/components/layout/Container";
import DemoTrigger from "@/components/demo/DemoTrigger";
import { bookDemo } from "@/content/bookDemo";

// Site-wide closing section, rendered once in the root layout after every page.
// From 768px the band is exactly the photo's natural 2048:685 shape. The 440px minimum
// only applies below 1280px (the photo's natural height there is shorter than the content
// needs), so the photo is never enlarged from 1280px up.
export default function BookDemoSection() {
  return (
    <section className="relative isolate flex flex-col overflow-hidden bg-ink md:aspect-[2048/685] md:min-h-[440px] md:flex-row md:items-center md:justify-center xl:min-h-0">
      <Container className="relative z-10 w-full py-12">
        <div className="mx-auto max-w-[640px] text-center">
          <p className="text-[12px] uppercase tracking-[0.25em] text-white/75">{bookDemo.eyebrow}</p>
          <h2 className="mt-4 text-balance text-[38px] font-light leading-[1.1] tracking-[-0.01em] text-white md:-mx-10 md:text-[60px]">
            {bookDemo.headingLead} <em className="text-accent">{bookDemo.headingEmphasis}</em>
          </h2>
          <p className="mx-auto mt-5 text-[18px] leading-[1.6] text-white/85">{bookDemo.line}</p>
          <div className="mt-8 flex justify-center">
            <DemoTrigger trackingLocation="book_demo_band" appearance="button" className="w-full sm:w-auto">
              {bookDemo.cta}
            </DemoTrigger>
          </div>
        </div>
      </Container>
      <div className="relative aspect-[2048/685] w-full md:absolute md:inset-0 md:aspect-auto">
        <Image
          src={bookDemo.image.src}
          alt={bookDemo.image.alt}
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover object-[center_60%]"
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(22,33,61,0.45)" }} aria-hidden="true" />
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "radial-gradient(ellipse 55% 60% at 50% 50%, rgba(22,33,61,0.7) 0%, rgba(22,33,61,0.35) 60%, rgba(22,33,61,0) 100%)",
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

import Image from "next/image";

import Container from "@/components/layout/Container";
import { home } from "@/content/home";
import DemoTrigger from "@/components/demo/DemoTrigger";

export default function Hero() {
  const { headline, subhead } = home.hero;

  return (
    <section className="relative flex min-h-[560px] items-center overflow-hidden md:min-h-[640px]">
      <Image
        src="/images/hero-students.webp"
        alt="Secondary students discussing a project around a classroom table"
        fill
        priority
        sizes="100vw"
        quality={85}
        className="object-cover object-[70%_center] lg:object-right"
      />
      <div
        className="absolute inset-0 lg:hidden"
        style={{ backgroundColor: "rgba(22,33,61,0.75)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(22,33,61,0.95) 0%, rgba(22,33,61,0.85) 35%, rgba(22,33,61,0.35) 60%, rgba(22,33,61,0) 80%)",
        }}
        aria-hidden="true"
      />
      <Container className="relative z-10 w-full py-16 text-left md:py-20">
        <h1 className="max-w-[620px] text-display font-light text-white text-balance">
          {headline}
        </h1>
        <p className="mt-6 max-w-[620px] text-[18px] leading-[1.6] text-white/85">{subhead}</p>
        <div className="mt-8">
          <DemoTrigger appearance="button" className="w-full md:w-auto">
            Request a demo
          </DemoTrigger>
        </div>
      </Container>
    </section>
  );
}

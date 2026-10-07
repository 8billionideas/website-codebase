import Image from "next/image";
import { BookOpen, Rocket, Users, type LucideIcon } from "lucide-react";
import Container from "@/components/layout/Container";
import { gcse } from "@/content/gcse";

const ICONS: Record<string, LucideIcon> = { Rocket, BookOpen, Users };

export default function WhyPartner() {
  const { eyebrow, headingLine1, headingLine2, points, image } = gcse.whyUs;

  return (
    <section className="relative isolate overflow-hidden bg-paper xl:flex xl:min-h-[600px] xl:items-center">
      {/* Contained (not cover) in a right-hand box so all three people stay clear of the
          text; the mask fades the photo's top and bottom edges into the paper. */}
      <div
        className="absolute top-1/2 right-0 hidden aspect-[2057/764] max-h-full w-[84%] -translate-y-1/2 mix-blend-multiply xl:block"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 28%, black 80%, transparent 100%)",
        }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          loading="lazy"
          sizes="84vw"
          className="object-contain object-right"
        />
      </div>
      <div
        className="absolute inset-0 hidden xl:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,253,250,0.95) 0%, rgba(255,253,250,0.85) 40%, rgba(255,253,250,0) 58%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10 w-full py-16 md:py-24">
        <div className="max-w-[620px] text-left">
          <p className="text-[12px] uppercase tracking-[0.25em] text-ink/60">{eyebrow}</p>
          <h2 className="mt-4 text-[36px] font-light leading-[1.1] tracking-[-0.01em] text-ink md:text-[56px]">
            {headingLine1}
            <br />
            <em className="text-accent">{headingLine2}</em>
          </h2>

          <ul className="mt-10 grid list-none grid-cols-1 divide-y divide-ink/12 p-0 md:grid-cols-3 md:divide-x md:divide-y-0">
            {points.map((point) => {
              const Icon = ICONS[point.icon];
              return (
                <li
                  key={point.title}
                  className="py-6 first:pt-0 last:pb-0 md:px-7 md:py-0 md:first:pl-0 md:last:pr-0"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15">
                    <Icon className="h-6 w-6 text-accent" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-[20px] font-normal text-ink">{point.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.6] text-ink/65">{point.description}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>

      <div className="relative aspect-[16/10] w-full mix-blend-multiply xl:hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover object-right"
        />
      </div>
    </section>
  );
}

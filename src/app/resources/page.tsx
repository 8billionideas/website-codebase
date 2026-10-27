import Image from "next/image";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Check, FileDown } from "lucide-react";
import Container from "@/components/layout/Container";
import DemoTrigger from "@/components/demo/DemoTrigger";
import { KITS, closingImage, type Resource } from "@/lib/resources";
import Button from "@/components/ui/Button";
import CriticalCurriculumName from "@/components/shared/CriticalCurriculumName";

export const metadata: Metadata = {
  title: "Resources | 8billionideas",
  description:
    "Free kits and a weekly newsletter to help schools bring future-focused learning into the classroom.",
};

// Matches Container's own side inset (mx-auto max-w-[75rem] + md:px-12), so
// the text side of a full-bleed row lines up with every other section.
const INSET_LEFT = "lg:pl-[calc(48px_+_max(0px,(100vw_-_1200px)/2))]";
const INSET_RIGHT = "lg:pr-[calc(48px_+_max(0px,(100vw_-_1200px)/2))]";


function TypeLabel({ children }: { children: string }) {
  return <p className="text-[12px] uppercase tracking-[0.25em] text-accent">{children}</p>;
}

function KitImage({ kit }: { kit: Resource }) {
  if (kit.image?.fit === "contain") {
    // Whole product visible, padded off the edges. Product shots sit on
    // white, so multiply blends the white into the paper frame.
    return (
      <div className="absolute inset-0 bg-paper p-8">
        <div className="relative h-full w-full">
          <Image
            src={kit.image.src}
            alt={kit.image.alt}
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain mix-blend-multiply"
            style={{ objectPosition: kit.image.position }}
          />
        </div>
      </div>
    );
  }
  if (kit.image) {
    return (
      <Image
        src={kit.image.src}
        alt={kit.image.alt}
        fill
        loading="lazy"
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
        style={{ objectPosition: kit.image.position }}
      />
    );
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-ink/[0.06] px-6 text-center">
      <FileDown className="h-12 w-12 text-accent" strokeWidth={1.25} aria-hidden="true" />
      <p className="text-[16px] font-normal text-accent">{kit.title}</p>
    </div>
  );
}

function KitRow({ kit, index }: { kit: Resource; index: number }) {
  // Odd rows (1st, 3rd…) put the image on the left; even rows on the right.
  const imageLeft = index % 2 === 0;

  return (
    <article className="grid grid-cols-1 lg:grid-cols-2">
      <div
        className={`relative h-[240px] overflow-hidden lg:h-auto lg:min-h-[380px] ${
          imageLeft ? "" : "lg:order-2"
        }`}
      >
        <KitImage kit={kit} />
      </div>

      <div
        className={`flex flex-col justify-center px-6 py-10 md:px-12 md:py-12 lg:py-16 ${
          imageLeft ? `lg:pl-16 ${INSET_RIGHT}` : `lg:pr-16 ${INSET_LEFT}`
        }`}
      >
        <TypeLabel>{kit.type}</TypeLabel>
        <h2 className="mt-4 text-[26px] font-light leading-[1.15] tracking-[-0.01em] text-ink md:text-[36px]">
          {kit.title}
        </h2>
        {kit.description && (
          <p className="mt-4 max-w-[520px] text-[17px] leading-[1.6] text-ink/75">
            {kit.description}
          </p>
        )}
        {kit.tags && (
          <p className="mt-4 max-w-[520px] text-[13px] uppercase leading-[1.6] tracking-[0.05em] text-ink/55">
            {kit.tags.join(" · ")}
          </p>
        )}
        {kit.included && (
          <div className="mt-4">
            <h3 className="text-[12px] uppercase tracking-[0.25em] text-ink/70">What&apos;s inside</h3>
            <ul className="mt-3 max-w-[520px] space-y-2">
              {kit.included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-[1.5] text-ink/80">
                  <Check
                    className="mt-[3px] h-4 w-4 shrink-0 text-accent"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-6">
          <Button href={kit.url} target="_blank" rel="noopener noreferrer" arrow>
            {kit.cta}
          </Button>
        </div>
      </div>
    </article>
  );
}

export default function ResourcesPage() {
  return (
    <div className="bg-paper">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-paper xl:flex xl:min-h-[520px] xl:items-center">
        <Container className="relative z-10 w-full py-16 md:py-20 xl:py-24">
          <div className="max-w-[600px] text-left">
            <p className="text-[12px] uppercase tracking-[0.25em] text-accent">RESOURCES</p>
            <h1 className="mt-3 text-balance text-[36px] font-light leading-[1.1] tracking-[-0.01em] text-ink md:text-[56px]">
              Free classroom resources
              <br />
              <em className="text-accent">for the skills students need now</em>
            </h1>
            <p className="mt-6 max-w-[560px] text-[18px] leading-[1.6] text-ink/75">
              Use these free resources to start conversations about careers, future skills and
              life beyond school – practical, relevant and ready to use in class.
            </p>
          </div>
        </Container>
        {/* Below 1280px the photo sits under the text. From 1280px it fills only the right 58%,
            fading in on its left edge, so the text sits on clean paper. (At 1024–1279px the photo
            is height-limited, so the cards can't clear a 600px text block at any position.) */}
        <div className="relative aspect-[4/3] w-full mix-blend-multiply xl:absolute xl:inset-y-0 xl:right-0 xl:left-[42%] xl:aspect-auto xl:w-auto xl:[mask-image:linear-gradient(to_right,transparent_0%,black_25%)]">
          <Image
            src="/images/resources/hero-v2.webp"
            alt="Students working with Future Jobs Kit cards spread across a classroom table"
            fill
            preload
            sizes="(min-width: 1280px) 58vw, 100vw"
            className="object-cover object-right"
          />
        </div>
      </section>

      {/* Kit rows — full width, alternating image side on desktop */}
      <div className="divide-y divide-ink/10 border-y border-ink/10">
        {KITS.map((kit, i) => (
          <KitRow key={kit.slug} kit={kit} index={i} />
        ))}
      </div>
      {/* Closing band */}
      <section
        className="relative isolate flex items-center overflow-hidden bg-ink py-16 lg:min-h-[560px] lg:py-24"
        style={closingImage ? ({ "--closing-pos": closingImage.position } as CSSProperties) : undefined}
      >
        {closingImage && (
          <>
            <Image
              src={closingImage.src}
              alt={closingImage.alt}
              fill
              loading="lazy"
              sizes="100vw"
              className="object-cover object-[80%_center] lg:object-(--closing-pos)"
            />
            <div
              className="absolute inset-0 lg:hidden"
              style={{ backgroundColor: "rgba(22,33,61,0.8)" }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 hidden lg:block"
              style={{
                background:
                  "linear-gradient(90deg, rgba(22,33,61,0.95) 0%, rgba(22,33,61,0.85) 40%, rgba(22,33,61,0.2) 70%, rgba(22,33,61,0) 85%)",
              }}
              aria-hidden="true"
            />
          </>
        )}
        <Container className="relative z-10 w-full">
          <div className="max-w-[640px] text-left">
            <p className="text-[12px] uppercase tracking-[0.25em] text-accent">RESOURCES</p>
            <h2 className="mt-4 text-balance text-[34px] font-light leading-[1.1] tracking-[-0.01em] text-white md:text-[52px]">
              Want to take this kind of learning
              <br />
              <em className="text-accent">further across your school?</em>
            </h2>
            <p className="mt-6 text-[18px] leading-[1.6] text-white/80">
              <CriticalCurriculumName /> gives schools a structured way to build future skills across
              year groups, with ready-to-teach lessons, practical resources and support from our
              team.
            </p>
            <div className="mt-8">
              <DemoTrigger trackingLocation="resources_closing" appearance="button" className="w-full sm:w-auto">
                Request a demo
              </DemoTrigger>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

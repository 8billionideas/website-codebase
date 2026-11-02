import Image from "next/image";
import Container from "@/components/layout/Container";
import { offices } from "@/content/offices";

// Cropped from "Global Offices Around the World" to the right of its baked-in text.
const MAP = {
  src: "/images/contact/offices-map.webp",
  alt: "World map showing 8billionideas offices in London (UK) and Dubai (UAE), with Hong Kong opening soon and the USA and Sydney coming soon",
  width: 1132,
  height: 941,
};

// The map's own navy (sampled from the image), so it sits in the band with no visible edge.
// Ink (#16213D) is 8 levels lighter in red, enough to show the map as a darker rectangle.
const MAP_NAVY = "#0E1D3A";

// The USA label starts ~4% in from the crop's left edge, so the left fade stops at 3%
// rather than 12% (which would wash out half the label).
const LEFT_FADE = "linear-gradient(to right, transparent 0%, black 3%)";

function Heading() {
  return (
    <>
      <div className="flex items-center gap-3">
        <p className="text-[12px] uppercase tracking-[0.25em] text-accent">OUR OFFICES</p>
        <span className="h-px w-12 bg-accent" aria-hidden="true" />
      </div>
      <h2 className="mt-5 text-balance text-[36px] font-light leading-[1.1] tracking-[-0.01em] text-white md:text-[56px]">
        Some things are better
        <br />
        <em className="text-accent">face to face</em>
      </h2>
      <p className="mt-6 max-w-[440px] text-[18px] leading-[1.7] text-white/80">
        We believe the best partnerships are built in person, which is why we&apos;re growing our presence around
        the world so we can be more than a name on a screen, spend more time in schools and stay close to the people
        we work with.
      </p>
    </>
  );
}

export default function OfficesSection() {
  return (
    <section className="py-section" style={{ backgroundColor: MAP_NAVY }}>
      {/* Desktop (xl): text column left-aligned with the nav logo (the left padding matches the
          Container's content edge), map column bleeding to the right edge of the screen.
          From xl, not lg: at 1024px the 34% text column is too narrow for the heading. */}
      <div className="hidden xl:grid xl:grid-cols-[minmax(0,34fr)_minmax(0,66fr)] xl:items-center xl:pl-[max(3rem,calc((100%-75rem)/2+3rem))]">
        <div className="pr-10">
          <Heading />
        </div>
        <Image
          src={MAP.src}
          alt={MAP.alt}
          width={MAP.width}
          height={MAP.height}
          loading="lazy"
          sizes="66vw"
          className="h-auto w-full"
          style={{ maskImage: LEFT_FADE }}
        />
      </div>

      {/* Tablet and mobile: text, then the map full width; on mobile an office list below. */}
      <div className="xl:hidden">
        <Container>
          <Heading />
        </Container>
        <Image
          src={MAP.src}
          alt={MAP.alt}
          width={MAP.width}
          height={MAP.height}
          loading="lazy"
          sizes="100vw"
          className="mt-10 h-auto w-full"
        />
        <Container className="md:hidden">
          <ul className="mt-8 grid list-none grid-cols-2 gap-x-6 gap-y-5 p-0">
            {offices.map((office) => (
              <li key={office.city} className="flex items-start gap-2.5">
                <span
                  aria-hidden="true"
                  className={`mt-[7px] h-2 w-2 shrink-0 rounded-full ${
                    office.open ? "bg-accent" : "border border-white/50"
                  }`}
                />
                <div>
                  <p className="text-[16px] font-medium text-white">{office.city}</p>
                  <p className="mt-0.5 text-[12px] uppercase tracking-[0.15em] text-white/60">
                    {office.status}
                    <span className="sr-only">{office.open ? " (open)" : ""}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}

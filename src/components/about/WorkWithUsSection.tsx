import Image from "next/image";
import Container from "@/components/layout/Container";
import { workWithUsRows } from "@/content/about-work-with-us";

// Grid placement per breakpoint:
// - mobile: number, body, tags, image stacked.
// - md: number | divider | body, with tags under the body and the image full width below.
// - xl: one row — number | divider | body | tags | image (when the row has an image slot).
//   (From xl, not lg: at 1024px the one-row layout squeezes the text column too narrow.)
export default function WorkWithUsSection() {
  return (
    <section className="bg-paper pt-16 md:pt-24">
      <Container>
        <p className="text-[12px] uppercase tracking-[0.25em] text-ink/60">WHAT IT&apos;S LIKE TO WORK WITH US</p>
        <h2 className="mt-4 text-balance text-[32px] font-light leading-[1.15] tracking-[-0.01em] text-ink md:text-[52px]">
          We want working with us
          <br />
          <em className="text-accent">to feel easy</em>
        </h2>
        <p className="mt-5 max-w-[760px] text-[18px] leading-[1.6] text-ink/70">
          We know schools have enough complexity already, so we try to be the opposite of that. We stay close,
          communicate clearly and make sure there is always a real person who knows your school and what
          you&apos;re trying to achieve.
        </p>

        <ul className="mt-12 list-none divide-y divide-ink/10 border-y border-ink/10 p-0">
          {workWithUsRows.map((row) => (
            <li
              key={row.number}
              className="px-4 py-8 transition-colors duration-200 hover:bg-accent/[0.08] motion-reduce:transition-none md:px-6"
            >
              <div
                className={`grid grid-cols-1 gap-y-4 md:grid-cols-[80px_1px_minmax(0,1fr)] md:gap-x-8 xl:items-center ${
                  row.showImageSlot
                    ? "xl:grid-cols-[80px_1px_minmax(0,1fr)_minmax(0,220px)_240px]"
                    : "xl:grid-cols-[80px_1px_minmax(0,1fr)_auto]"
                }`}
              >
                <p className="text-[32px] font-light leading-none text-ink/70 md:col-start-1 md:row-span-2 md:row-start-1 md:self-center md:text-[48px] xl:row-span-1">
                  {row.number}
                </p>
                <span
                  aria-hidden="true"
                  className="hidden w-px self-stretch bg-ink/12 md:col-start-2 md:row-span-2 md:row-start-1 md:block xl:row-span-1"
                />
                <div className="md:col-start-3 md:row-start-1">
                  <h3 className="text-[24px] font-normal leading-[1.25] text-ink md:text-[28px]">{row.title}</h3>
                  <p className="mt-2 max-w-[560px] text-[17px] leading-[1.6] text-ink/70">{row.text}</p>
                </div>
                <p className="text-[13px] tracking-[0.05em] text-ink/65 md:col-start-3 md:row-start-2 xl:col-start-4 xl:row-start-1 xl:text-right">
                  {row.tags.join(" · ")}
                </p>
                {row.showImageSlot && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl md:col-span-3 md:row-start-3 md:aspect-auto md:h-[200px] xl:col-span-1 xl:col-start-5 xl:row-start-1 xl:h-auto xl:min-h-[160px] xl:self-stretch">
                    {row.image ? (
                      <Image
                        src={row.image.src}
                        alt={row.image.alt}
                        fill
                        loading="lazy"
                        sizes="(min-width: 1280px) 240px, 100vw"
                        className="object-cover"
                      />
                    ) : (
                      <div aria-hidden="true" className="h-full w-full bg-ink" />
                    )}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Container>

      {/* Closing band — centred on purpose, for this line only. */}
      <div className="mt-16 bg-ink py-12">
        <Container>
          <p className="mx-auto text-balance text-center text-[24px] font-light leading-[1.3] tracking-[-0.01em] text-white md:text-[36px]">
            We want schools to feel like we&apos;re <em className="text-accent">part of their team</em>
          </p>
        </Container>
      </div>
    </section>
  );
}

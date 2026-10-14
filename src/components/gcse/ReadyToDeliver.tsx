import Container from "@/components/layout/Container";
import { gcse } from "@/content/gcse";

// /gcse 04: "You don't have to build a new course from scratch" – what's already prepared.
export default function ReadyToDeliver() {
  const { eyebrow, headingLine1, headingLine2, intro, reassurance, listHeading, items } = gcse.readyToDeliver;

  return (
    <section className="bg-ink py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[52fr_48fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-[12px] uppercase tracking-[0.25em] text-accent">{eyebrow}</p>
            <h2 className="mt-4 text-balance text-[36px] font-light leading-[1.1] tracking-[-0.01em] text-white md:text-[52px]">
              {headingLine1}
              <br />
              <em className="text-accent">{headingLine2}</em>
            </h2>
            <p className="mt-5 text-[17px] leading-[1.6] text-white/80">{intro}</p>
            <p className="mt-6 text-[17px] leading-[1.6] text-white/80">{reassurance}</p>
          </div>

          <div>
            <h3 className="text-[22px] font-normal leading-[1.3] text-white">{listHeading}</h3>
            <ol className="mt-5 flex list-none flex-col gap-3 p-0">
              {items.map((item) => (
                <li key={item.number} className="rounded-lg border border-white/20 bg-white/[0.04] px-6 py-5">
                  <p className="text-[16px] leading-[1.4] text-accent">{item.number}</p>
                  <p className="mt-1 text-[20px] font-normal leading-[1.3] text-white">{item.title}</p>
                  <p className="mt-1 text-[14px] leading-[1.5] text-white/70">{item.line}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}

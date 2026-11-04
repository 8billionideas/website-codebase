import Container from "@/components/layout/Container";
import DemoTrigger from "@/components/demo/DemoTrigger";
import { gcse } from "@/content/gcse";

// /gcse 04: "You don't have to build a new course from scratch" – what's already prepared.
export default function ReadyToDeliver() {
  const { eyebrow, headingLine1, headingLine2, intro, reassurance, listHeading, items, registration } = gcse.readyToDeliver;

  return (
    <section className="bg-ink py-section">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[52fr_48fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-[12px] uppercase tracking-[0.25em] text-accent">{eyebrow}</p>
            <h2 className="mt-eyebrow text-balance text-[36px] font-light leading-[1.1] tracking-[-0.01em] text-white md:text-[52px]">
              {headingLine1}
              <br />
              <em className="text-accent">{headingLine2}</em>
            </h2>
            <p className="mt-lead text-[17px] leading-[1.6] text-white/80">{intro}</p>
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

        {/* Centre registration: one row (text left, button right) from md, stacked below. */}
        <div className="mt-content flex flex-col gap-6 rounded-lg border border-white/10 bg-white/[0.06] px-6 py-section-tight md:flex-row md:items-center md:justify-between md:gap-10 md:px-10">
          <div className="max-w-[640px]">
            <h3 className="text-[20px] font-normal leading-[1.3] text-white">{registration.heading}</h3>
            <p className="mt-2 text-[16px] leading-[1.6] text-white/80">{registration.body}</p>
          </div>
          <DemoTrigger
            trackingLocation="gcse_centre_registration"
            appearance="button"
            variant="outline-dark"
            className="w-full md:w-auto"
          >
            {registration.cta}
          </DemoTrigger>
        </div>
      </Container>
    </section>
  );
}

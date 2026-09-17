import Container from "@/components/layout/Container";
import { home } from "@/content/home";
import type { StageStop } from "@/content/home";

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3 6l5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StopMarker({ stop }: { stop: StageStop }) {
  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center md:w-full">
      {stop.highlight ? (
        <span className="relative z-10 h-10 w-10 rounded-full bg-accent ring-4 ring-accent/20" />
      ) : (
        <span className="relative z-10 h-2.5 w-2.5 rounded-full bg-ink/30" />
      )}
    </div>
  );
}

function StopLabel({ stop }: { stop: StageStop }) {
  if (stop.highlight) {
    return (
      <div className="md:mt-3 md:text-center">
        <p className="text-body-lg font-bold text-ink">{stop.label}</p>
        {stop.detail && (
          <span className="mt-1 inline-block rounded-full bg-accent px-2 py-0.5 text-caption font-semibold text-ink">
            {stop.detail}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="md:mt-3 md:text-center">
      <p className="text-caption font-medium text-ink">
        {stop.label}
        {stop.detail && ` — ${stop.detail}`}
      </p>
    </div>
  );
}

export default function StageFlow() {
  const { heading, subheading, stops } = home.stageFlow;
  const gcseIndex = stops.findIndex((stop) => stop.highlight);

  return (
    <section className="py-16 md:py-24">
      <Container>
        <h2 className="text-h2 text-ink">{heading}</h2>
        <p className="mt-4 max-w-2xl text-body-lg text-muted">{subheading}</p>

        <div className="relative mt-10">
          {/* The connecting thread — vertical on mobile, horizontal on
              desktop. Offset (28px = h-14/w-14 slot / 2) matches every
              marker's center regardless of its size. */}
          <div
            aria-hidden="true"
            className="absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-accent/20 via-accent to-accent/20 md:left-0 md:right-0 md:top-7 md:bottom-auto md:h-px md:w-auto md:bg-gradient-to-r"
          />

          <div
            className="relative flex flex-col md:grid md:items-start"
            style={{
              gridTemplateColumns:
                "1fr 2rem 1fr 2rem 1fr 2rem 1fr 2rem 1fr 2rem 1fr 2rem 1fr",
            }}
          >
            {stops.map((stop, index) => (
              <div key={stop.label} className="contents">
                <div className="flex items-center gap-4 md:flex-col md:items-center md:gap-0">
                  <StopMarker stop={stop} />
                  <StopLabel stop={stop} />
                </div>

                {index < stops.length - 1 && (
                  <div className="flex h-8 w-14 shrink-0 items-center justify-center md:h-14 md:w-full">
                    <ChevronIcon
                      className={`md:-rotate-90 ${
                        index < gcseIndex ? "text-accent" : "text-ink/25"
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

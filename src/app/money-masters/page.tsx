import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import MoneyMastersImage from "@/components/money-masters/MoneyMastersImage";
import MoneyMastersRequestTrigger from "@/components/money-masters/MoneyMastersRequest";
import {
  MONEY_MASTERS_GREEN,
  SHOW_MONEY_MASTERS,
  moneyMastersIntro,
  moneyMastersIntroCta,
  moneyMastersLogos,
  moneyMastersRequest,
  moneyMastersSurveys,
  moneyMastersVideos,
  type MoneyMastersVideo,
} from "@/content/money-masters";

// Money Masters (with Zoud): how to play, the rulebooks and the school surveys. Linked from the
// Money Masters section on /resources; not in the main navigation and not indexed. Ends with the
// footer (no "Book a demonstration" band; see layout.tsx).
export const metadata: Metadata = {
  title: "Money Masters | 8billionideas",
  description: "How to play Money Masters, the card game by Zoud and 8billionideas that teaches good money habits.",
  robots: { index: false, follow: false },
};

const EYEBROW = "text-[12px] uppercase tracking-[0.25em] text-accent";
const H2 = "mt-eyebrow text-balance text-[32px] font-light leading-[1.15] tracking-[-0.01em] text-ink md:text-[52px]";

function VideoCard({ video }: { video: MoneyMastersVideo }) {
  return (
    <div>
      <p className="text-[17px] font-medium text-ink">
        {video.key === "ar" ? (
          <>
            <span lang="ar" dir="rtl">
              العربية
            </span>{" "}
            · Arabic
          </>
        ) : (
          video.label
        )}
      </p>
      {/* Native player, streamed from HubSpot's file hosting; nothing loads until it's played. */}
      <video
        controls
        preload="none"
        playsInline
        poster={video.poster}
        className="mt-3 aspect-video w-full rounded-xl bg-ink object-cover"
        aria-label={`How to play Money Masters (${video.label})`}
      >
        <source src={video.src} type="video/mp4" />
        {video.captions && (
          <track kind="captions" srcLang={video.captions.srcLang} label={video.captions.label} src={video.captions.src} />
        )}
      </video>
      <p className="mt-2 text-[14px] text-ink/60">Duration {video.duration}</p>
      <div className="mt-5">
        <Button href={video.rulebook} target="_blank" rel="noopener noreferrer" arrow className="w-full sm:w-auto">
          See the rulebook
          <span className="sr-only"> ({video.label}, opens in a new tab)</span>
        </Button>
      </div>
    </div>
  );
}

export default function MoneyMastersPage() {
  // Offline (the site's 404) while SHOW_MONEY_MASTERS is false.
  if (!SHOW_MONEY_MASTERS) notFound();
  const { partnership, game } = moneyMastersLogos;
  return (
    <div className="bg-paper">
      {/* Top: logos and the game's introduction, with the main image on the right from lg. */}
      <section className="bg-paper py-section">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <Link
              href="/resources"
              className="rounded-sm text-[14px] font-medium text-ink underline decoration-ink/30 underline-offset-2 transition-colors hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              ← Back to resources
            </Link>
            {/* The logos are cream, made for the game's dark green, so they sit on a green panel. */}
            <div
              className="mt-6 flex w-fit flex-col items-start gap-5 rounded-2xl px-7 py-6"
              style={{ backgroundColor: MONEY_MASTERS_GREEN }}
            >
              <Image
                src={partnership.src}
                alt={partnership.alt}
                width={partnership.width}
                height={partnership.height}
                preload
                className="h-auto w-[160px] md:w-[200px]"
              />
              <h1>
                <Image
                  src={game.src}
                  alt={game.alt}
                  width={game.width}
                  height={game.height}
                  preload
                  className="h-auto w-[220px] md:w-[280px]"
                />
              </h1>
            </div>
            <div className="mt-8 max-w-[600px] space-y-4 text-[18px] leading-[1.6] text-ink/75">
              {moneyMastersIntro.map((paragraph) => (
                <p key={paragraph.slice(0, 30)}>{paragraph}</p>
              ))}
              <p className="font-semibold text-ink">{moneyMastersIntroCta}</p>
            </div>
          </div>
          <MoneyMastersImage sizes="(min-width: 1024px) 50vw, 100vw" priority />
        </Container>
      </section>

      {/* How to play: the two rules videos, each with its rulebook. */}
      <section className="bg-accent/[0.06] py-section">
        <Container>
          <p className={EYEBROW}>HOW TO PLAY</p>
          <h2 className={H2}>
            Watch the rules,
            <br />
            <em className="text-accent">then play</em>
          </h2>
          <div className="mt-content grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
            {moneyMastersVideos.map((video) => (
              <VideoCard key={video.key} video={video} />
            ))}
          </div>
        </Container>
      </section>

      {/* For schools: the activity log and the two Zoud surveys (SurveyMonkey, new tab). */}
      <section className="bg-paper py-section">
        <Container>
          <p className={EYEBROW}>FOR SCHOOLS</p>
          <h2 className={H2}>Track activity and share feedback</h2>
          <ul className="mt-content grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-3">
            {moneyMastersSurveys.map((survey) => (
              <li key={survey.href} className="flex flex-col rounded-xl border border-ink/10 bg-white p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-[20px] font-normal leading-[1.3] text-ink">{survey.title}</h3>
                  <ExternalLink className="mt-1 h-5 w-5 shrink-0 text-ink/50" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div className="mt-auto pt-6">
                  <Button href={survey.href} target="_blank" rel="noopener noreferrer" size="small" className="w-full">
                    {survey.cta}
                    <span className="sr-only"> ({survey.title}, opens in a new tab)</span>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Request the cards: a compact card, then the footer. */}
      <section className="bg-paper pb-section">
        <Container>
          <div className="mx-auto max-w-[760px] rounded-2xl border border-ink/10 bg-white p-6 text-center md:p-8">
            <h2 className="text-balance text-[26px] font-light leading-[1.2] tracking-[-0.01em] text-ink md:text-[32px]">
              {moneyMastersRequest.ctaHeading}
            </h2>
            <p className="mt-3 text-[16px] leading-[1.6] text-ink/70">{moneyMastersRequest.ctaLine}</p>
            <div className="mt-6">
              <MoneyMastersRequestTrigger />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

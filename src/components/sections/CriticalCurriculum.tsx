import Container from "@/components/layout/Container";
import PillarCarousel from "@/components/sections/PillarCarousel";
import { SHOW_HOME_QUOTE } from "@/components/sections/HomeQuoteBand";
import { pillarCarousel } from "@/content/pillarCarousel";
import { resolvePillarCards } from "@/lib/pillar-example-lessons";

// Resolved here, on the server, so the Lesson Explorer data stays out of the homepage's client code.
const CARDS = resolvePillarCards(pillarCarousel.cards);

export default function CriticalCurriculum() {
  return (
    // Standard section padding above. Below: the standard padding before the quote band, or
    // none when the band is hidden (the next paper section's top padding is the gap).
    <section id="critical-curriculum" className={`scroll-mt-24 pt-section ${SHOW_HOME_QUOTE ? "pb-section" : ""}`}>
      <Container>
        <PillarCarousel cards={CARDS} />
      </Container>
    </section>
  );
}

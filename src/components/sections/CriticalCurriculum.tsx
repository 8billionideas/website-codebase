import Container from "@/components/layout/Container";
import PillarCarousel from "@/components/sections/PillarCarousel";
import { SHOW_HOME_QUOTE } from "@/components/sections/HomeQuoteBand";

export default function CriticalCurriculum() {
  return (
    // Standard section padding above. Below: the standard padding before the quote band, or
    // none when the band is hidden (the next paper section's top padding is the gap).
    <section id="critical-curriculum" className={`scroll-mt-24 pt-section ${SHOW_HOME_QUOTE ? "pb-section" : ""}`}>
      <Container>
        <PillarCarousel />
      </Container>
    </section>
  );
}

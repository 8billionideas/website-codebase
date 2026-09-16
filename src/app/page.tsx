import Hero from "@/components/sections/Hero";
import CriticalCurriculum from "@/components/sections/CriticalCurriculum";
import Gcse from "@/components/sections/Gcse";
import WhyDifferent from "@/components/sections/WhyDifferent";
import Proof from "@/components/sections/Proof";
import Pricing from "@/components/sections/Pricing";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <CriticalCurriculum />
      <Gcse />
      <WhyDifferent />
      <Proof />
      <Pricing />
      <Faq />
      <FinalCta />
    </>
  );
}

import Hero from "@/components/sections/Hero";
import CriticalCurriculum from "@/components/sections/CriticalCurriculum";
import Gcse from "@/components/sections/Gcse";
import StageFlow from "@/components/sections/StageFlow";
import ChampionSchools from "@/components/sections/ChampionSchools";
import CrossCurricularAlignment from "@/components/sections/CrossCurricularAlignment";
import Proof from "@/components/sections/Proof";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <CriticalCurriculum />
      <Gcse />
      <StageFlow />
      <ChampionSchools />
      <CrossCurricularAlignment />
      <Proof />
      <Faq />
      <FinalCta />
    </>
  );
}

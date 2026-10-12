import Hero from "@/components/sections/Hero";
import CriticalCurriculum from "@/components/sections/CriticalCurriculum";
import QualificationSection from "@/components/sections/QualificationSection";
import CurriculumFitSection from "@/components/home/CurriculumFitSection";
import SkillsFramework from "@/components/sections/SkillsFramework";
import Progression from "@/components/sections/Progression";
import HowLearningWorks from "@/components/sections/HowLearningWorks";
import Faq from "@/components/sections/Faq";

export default function Home() {
  return (
    <>
      <Hero />
      <CriticalCurriculum />
      <SkillsFramework />
      <HowLearningWorks />
      <Progression />
      <QualificationSection />
      <CurriculumFitSection />
      <Faq />
    </>
  );
}

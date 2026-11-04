import type { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";
import ContactSection from "@/components/contact/ContactSection";
import OfficesSection from "@/components/contact/OfficesSection";

export const metadata: Metadata = {
  title: "Contact us | 8billionideas",
  description: "Get in touch with the 8billionideas team about bringing future-focused learning to your school.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactSection />
      <OfficesSection />
    </>
  );
}

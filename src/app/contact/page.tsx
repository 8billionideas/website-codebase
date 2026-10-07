import type { Metadata } from "next";
import ContactSection from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact us | 8billionideas",
  description: "Get in touch with the 8billionideas team about bringing future-focused learning to your school.",
};

export default function ContactPage() {
  return <ContactSection />;
}

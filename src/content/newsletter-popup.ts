// Site-wide newsletter sign-up pop-up (src/components/shared/NewsletterPopup.tsx). Copy is word
// for word from the brief.
export const newsletterPopup = {
  eyebrow: "JOIN OUR NEWSLETTER",
  headingLine1: "Get 10% off",
  headingLine2: "our programmes",
  line: "Sign up to the 8billionideas newsletter for ideas, resources and updates for schools, and we’ll email you a code for 10% off our courses, the International GCSE and add-ons.",
  email: { label: "Work email", placeholder: "name@school.com" },
  button: "Send me my code",
  buttonLoading: "Sending…",
  // Small print, split around the "Privacy Policy" link.
  smallPrintBefore: "By signing up, you agree to receive the 8billionideas newsletter. You can unsubscribe at any time. ",
  smallPrintLink: "Privacy Policy",
  smallPrintAfter: ". One use per school, valid for 90 days.",
  // Sent as the subscription's consent text (HubSpot legalConsentOptions).
  consentText: "By signing up, you agree to receive the 8billionideas newsletter.",
  notConnected: "Newsletter sign-ups aren’t connected yet (review version).",
  emailError: "Please enter a valid email address",
  successHeading: "You’re in!",
  successLine: (email: string) => `Your discount code is on its way to ${email}.`,
  close: "Close",
};

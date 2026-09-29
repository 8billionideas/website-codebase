export interface PageContent {
  title: string;
  description: string;
}

export interface CtaLink {
  label: string;
  href: string;
}

export interface NamedItem {
  name: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  excerpt?: string;
  name: string;
  role: string;
  sourceUrl?: string | null;
}

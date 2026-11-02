"use client";

import { useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { openCookieSettings } from "@/lib/consent";
import Container from "@/components/layout/Container";
import Logo from "@/components/layout/Logo";
import LoginModal from "@/components/layout/LoginModal";
import DemoTrigger from "@/components/demo/DemoTrigger";
import { siteConfig, type SocialNetwork } from "@/lib/site-config";

const FOCUS_RING =
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink";
const COLUMN_LINK = `text-[16px] text-white/90 transition-colors hover:text-accent xl:whitespace-nowrap ${FOCUS_RING}`;

// Simple-icons style glyphs on a 24×24 grid, all filled with currentColor so they match.
const SOCIAL_ICONS: Record<SocialNetwork, ReactNode> = {
  LinkedIn: (
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  ),
  Instagram: (
    <>
      <path
        fillRule="evenodd"
        d="M7 0h10a7 7 0 0 1 7 7v10a7 7 0 0 1-7 7H7a7 7 0 0 1-7-7V7a7 7 0 0 1 7-7zm0 2.16A4.84 4.84 0 0 0 2.16 7v10A4.84 4.84 0 0 0 7 21.84h10A4.84 4.84 0 0 0 21.84 17V7A4.84 4.84 0 0 0 17 2.16H7z"
      />
      <path
        fillRule="evenodd"
        d="M12 5.84a6.16 6.16 0 1 1 0 12.32 6.16 6.16 0 0 1 0-12.32zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
      />
      <circle cx="18.406" cy="5.594" r="1.44" />
    </>
  ),
  YouTube: (
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  ),
  Spotify: (
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  ),
};

function NewTabNote() {
  return <span className="sr-only"> (opens in a new tab)</span>;
}

function FooterColumn({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="text-[12px] font-normal uppercase tracking-[0.25em] text-accent">{heading}</h2>
      <ul className="mt-5 flex list-none flex-col gap-3.5 p-0">{children}</ul>
    </div>
  );
}

export default function Footer() {
  const [loginOpen, setLoginOpen] = useState(false);
  const loginButtonRef = useRef<HTMLButtonElement>(null);
  const { email, phone, social, legal, externalKits } = siteConfig;
  const legalLinks = legal.filter((link): link is { label: string; url: string } => Boolean(link.url));
  const year = new Date().getFullYear();

  return (
    // The top hairline keeps the footer from merging with a dark band above it.
    <footer className="border-t border-white/10 bg-ink text-white">
      <Container className="pt-14 pb-8 md:pt-20">
        {/* Desktop (xl, as the nav): brand | three link columns | CTA, with the link and CTA
            columns sized to their content. Below xl the brand and CTA run full width. */}
        <div className="grid grid-cols-1 gap-12 xl:grid-cols-[25%_minmax(0,1fr)_auto] xl:gap-8">
          {/* Brand */}
          <div>
            {/* Same 40px box as the old logo, so the spacing below is unchanged. */}
            <Link href="/" className={`inline-flex h-10 items-center ${FOCUS_RING}`}>
              <Logo variant="dark" className="h-[23px] w-auto" />
            </Link>
            <p className="mt-5 max-w-[300px] text-[16px] leading-[1.6] text-white/75">
              We give every student on the planet the skills, belief and values to change the world.
            </p>
            <p className="mt-5">
              <a href={`mailto:${email}`} className={`text-[15px] text-white hover:underline ${FOCUS_RING}`}>
                {email}
              </a>
            </p>
            {phone && (
              <p className="mt-2">
                <a href={`tel:${phone.replace(/\s/g, "")}`} className={`text-[15px] text-white hover:underline ${FOCUS_RING}`}>
                  {phone}
                </a>
              </p>
            )}
            <ul className="mt-6 flex list-none items-center gap-5 p-0">
              {social.map(({ network, url }) => (
                <li key={network}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`8billionideas on ${network}`}
                    className={`block text-white/85 transition-colors hover:text-accent ${FOCUS_RING}`}
                  >
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
                      {SOCIAL_ICONS[network]}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns: 2-up on mobile (Explore + About, then Resources), 3-up from md. */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-8 md:grid-cols-3 xl:flex xl:justify-between xl:gap-6"
          >
            <FooterColumn heading="Explore">
              <li><Link href="/curriculum-mapping" className={COLUMN_LINK}>Our Curriculum</Link></li>
              <li><Link href="/gcse" className={COLUMN_LINK}>Qualifications</Link></li>
              <li><Link href="/case-studies" className={COLUMN_LINK}>Case Studies</Link></li>
              <li><Link href="/pricing" className={COLUMN_LINK}>Pricing</Link></li>
              <li><Link href="/resources" className={COLUMN_LINK}>Resources</Link></li>
            </FooterColumn>
            <FooterColumn heading="About">
              <li><Link href="/about" className={COLUMN_LINK}>About 8billionideas</Link></li>
              <li><Link href="/contact" className={COLUMN_LINK}>Contact us</Link></li>
            </FooterColumn>
            <FooterColumn heading="Resources">
              <li><Link href="/resources" className={COLUMN_LINK}>Free Resources</Link></li>
              {externalKits.filter((kit) => kit.inFooter).map((kit) => (
                <li key={kit.label}>
                  <a href={kit.url} target="_blank" rel="noopener noreferrer" className={COLUMN_LINK}>
                    {kit.label}
                    <NewTabNote />
                  </a>
                </li>
              ))}
              <li>
                <button
                  ref={loginButtonRef}
                  type="button"
                  aria-haspopup="dialog"
                  onClick={() => setLoginOpen(true)}
                  className={`cursor-pointer text-left ${COLUMN_LINK}`}
                >
                  Login
                </button>
              </li>
            </FooterColumn>
          </nav>

          {/* CTA — divider above it below xl, beside it from xl */}
          <div className="border-t border-white/12 pt-10 xl:border-t-0 xl:border-l xl:pt-0 xl:pl-8">
            <p className="max-w-[240px] text-[12px] uppercase leading-[1.8] tracking-[0.2em] text-accent">
              Ready to see what this could look like in your school?
            </p>
            <DemoTrigger trackingLocation="footer" appearance="button" className="mt-6 w-full md:w-auto">
              Request a demo
            </DemoTrigger>
          </div>
        </div>

        <div className="mt-14 h-px w-full bg-white/12" aria-hidden="true" />

        <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-[14px] text-white/65">&copy; {year} 8billionideas. All rights reserved.</p>
          <ul className="flex list-none flex-wrap items-center p-0">
            {legalLinks.map((link, i) => (
              <li key={link.label} className={i > 0 ? "ml-3 border-l border-white/20 pl-3" : ""}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-[14px] text-white/65 transition-colors hover:text-white ${FOCUS_RING}`}
                >
                  {link.label}
                  <NewTabNote />
                </a>
              </li>
            ))}
            {/* Reopens the cookie banner; focus comes back here after a choice. */}
            <li className={legalLinks.length > 0 ? "ml-3 border-l border-white/20 pl-3" : ""}>
              <button
                type="button"
                onClick={(event) => openCookieSettings(event.currentTarget)}
                className={`cursor-pointer text-[14px] text-white/65 transition-colors hover:text-white ${FOCUS_RING}`}
              >
                Cookie settings
              </button>
            </li>
          </ul>
        </div>
      </Container>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} returnFocusTo={() => loginButtonRef.current} />
    </footer>
  );
}

"use client";

import { Logo } from "./Logo";
import { openNewsletterPopup } from "@/lib/newsletter";

export function Footer() {
  return (
    <footer className="relative mt-20 md:mt-28">
      {/* Distinctive top boundary — thin gradient line, our visual signal that you've reached the bottom */}
      <div className="relative h-px bg-gradient-to-r from-transparent via-brand-orange/40 to-transparent" />

      {/* CTA section */}
      <div className="site-container py-14 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 max-w-5xl">
          <div>
            <h3 className="text-3xl md:text-5xl font-black tracking-tighter leading-[1.05] text-white">
              Ready when you are.
            </h3>
            <p className="mt-3 text-brand-gray-light text-base md:text-lg max-w-md">
              We&apos;ll let you know the moment Vaultra Pay opens.
            </p>
          </div>
          <button
            type="button"
            onClick={openNewsletterPopup}
            className="btn-shine inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark transition-all hover:scale-[1.02] active:scale-[0.98] text-white text-sm md:text-base font-semibold px-6 py-3.5 rounded-full shadow-xl shadow-brand-orange/25 self-start md:self-auto whitespace-nowrap"
          >
            Join the waitlist
            <ArrowIcon />
          </button>
        </div>
      </div>

      <div className="border-t border-white/[0.06]" />

      {/* Main: brand + link columns */}
      <div className="site-container py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-5">
            <Logo size={57} wordmarkSize={22} className="sm:hidden" />
            <Logo size={63} wordmarkSize={28} className="hidden sm:flex" />
            <p className="mt-5 text-brand-gray-light text-sm leading-relaxed max-w-sm">
              The pathway between worlds. Vaultra Pay bridges crypto and
              fiat - built for speed, clarity, and trust.
            </p>
          </div>

          {/* Product */}
          <div className="md:col-span-3 md:col-start-7">
            <div className="text-[11px] uppercase tracking-[0.18em] text-brand-gray mb-5 font-medium">
              Product
            </div>
            <ul className="space-y-3">
              <li>
                <FooterLink href="/#features">Features</FooterLink>
              </li>
              <li>
                <FooterLink href="/#how-it-works">How it works</FooterLink>
              </li>
              <li>
                <FooterLink href="/#faq">FAQ</FooterLink>
              </li>
              <li>
                <FooterLink href="/blog">Blog</FooterLink>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-3">
            <div className="text-[11px] uppercase tracking-[0.18em] text-brand-gray mb-5 font-medium">
              Connect
            </div>
            <div className="flex items-center gap-2 mb-5">
              <SocialLink
                href="https://x.com/VaultraPayNG"
                label="Follow Vaultra on X"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </SocialLink>
              <SocialLink
                href="https://www.linkedin.com/company/vaultrapay"
                label="Follow Vaultra on LinkedIn"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </SocialLink>
              <SocialLink
                href="mailto:support@vaultra-pay.com"
                label="Email Vaultra"
                external={false}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </SocialLink>
            </div>
            <a
              href="mailto:support@vaultra-pay.com"
              className="text-sm text-brand-gray-light hover:text-brand-orange transition-colors"
            >
              support@vaultra-pay.com
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.06]" />

      {/* Bottom legal bar */}
      <div className="site-container py-6 text-center text-xs text-brand-gray">
        <p>© {new Date().getFullYear()} Vaultra Pay. All rights reserved.</p>
      </div>

      {/* Signature: giant wordmark bleeding off the bottom edge */}
      <div
        aria-hidden="true"
        className="relative overflow-hidden h-[70px] sm:h-[100px] md:h-[150px] lg:h-[190px] pointer-events-none select-none"
      >
        <div className="absolute inset-x-0 -bottom-[22%] md:-bottom-[28%] text-center px-4">
          <span className="block font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/[0.06] via-white/[0.025] to-transparent text-[22vw] md:text-[18vw] lg:text-[15vw]">
            VAULTRA
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="text-white/80 hover:text-brand-orange transition-colors text-sm"
    >
      {children}
    </a>
  );
}

function SocialLink({
  href,
  label,
  children,
  external = true,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="w-9 h-9 rounded-full glass glass-hover flex items-center justify-center text-white/80 hover:text-brand-orange transition-colors"
    >
      {children}
    </a>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

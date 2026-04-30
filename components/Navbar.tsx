"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when viewport crosses md breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-brand-black/90 backdrop-blur-xl border-white/10"
          : "bg-brand-black/40 backdrop-blur-md border-white/5"
      }`}
    >
      <div className="site-container flex items-center justify-between py-3.5 md:py-5">
        {/* Logo */}
        <a href="#" aria-label="Vaultra Pay home" className="flex-shrink-0">
          <Logo size={57} wordmarkSize={22} className="sm:hidden" />
          <Logo size={63} wordmarkSize={28} className="hidden sm:flex" />
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm text-brand-gray-light hover:text-white transition-colors font-medium"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm text-brand-gray-light hover:text-white transition-colors font-medium"
          >
            How it works
          </a>
          <a
            href="#waitlist"
            className="btn-shine bg-brand-orange hover:bg-brand-orange-dark transition-colors text-white text-sm font-semibold px-5 py-2.5 rounded-full"
          >
            Join Waitlist
          </a>
        </div>

        {/* Mobile right side */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="#waitlist"
            onClick={() => setMenuOpen(false)}
            className="btn-shine bg-brand-orange hover:bg-brand-orange-dark transition-colors text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-full whitespace-nowrap"
          >
            Join Waitlist
          </a>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/90 hover:bg-white/5 transition"
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden overflow-hidden border-t border-white/5 bg-brand-black/95 backdrop-blur-xl"
          >
            <div className="site-container py-4 flex flex-col gap-1">
              <MobileLink href="#features" onClick={() => setMenuOpen(false)}>
                Features
              </MobileLink>
              <MobileLink
                href="#how-it-works"
                onClick={() => setMenuOpen(false)}
              >
                How it works
              </MobileLink>
              <MobileLink href="#waitlist" onClick={() => setMenuOpen(false)}>
                Join waitlist
              </MobileLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function MobileLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="px-3 py-3 rounded-xl text-white/90 hover:bg-white/5 active:bg-white/10 transition-colors text-base font-medium"
    >
      {children}
    </a>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <motion.line
        x1="2"
        y1={open ? "9" : "5"}
        x2="16"
        y2={open ? "9" : "5"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        animate={{ rotate: open ? 45 : 0 }}
        style={{ transformOrigin: "center" }}
        transition={{ duration: 0.2 }}
      />
      <motion.line
        x1="2"
        y1="9"
        x2="16"
        y2="9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.line
        x1="2"
        y1={open ? "9" : "13"}
        x2="16"
        y2={open ? "9" : "13"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        animate={{ rotate: open ? -45 : 0 }}
        style={{ transformOrigin: "center" }}
        transition={{ duration: 0.2 }}
      />
    </svg>
  );
}

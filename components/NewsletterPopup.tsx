"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LogoMark } from "./Logo";
import { NEWSLETTER_POPUP_EVENT } from "@/lib/newsletter";

type Status = "idle" | "loading" | "success" | "error";

// Marks that the first-visit auto-popup has already fired.
const SEEN_KEY = "vaultra_newsletter_seen";
// Fraction of total page scroll before the popup auto-opens (0–1).
const SCROLL_TRIGGER = 0.4;

export function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  // Manual open — fired by "Join Waitlist" buttons across the site.
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(NEWSLETTER_POPUP_EVENT, onOpen);
    return () => window.removeEventListener(NEWSLETTER_POPUP_EVENT, onOpen);
  }, []);

  // Auto open on scroll depth — first visit only.
  useEffect(() => {
    if (localStorage.getItem(SEEN_KEY)) return;

    const onScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if (window.scrollY / scrollable >= SCROLL_TRIGGER) {
        setOpen(true);
        localStorage.setItem(SEEN_KEY, "1");
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the popup is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Something went wrong");
      setStatus("success");
      setMessage("You're on the list. We'll be in touch.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error ? err.message : "Something went wrong. Try again."
      );
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Join the Vaultra Pay waitlist"
            className="relative w-full max-w-md"
          >
            {/* Gradient border wrapper */}
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 rounded-3xl p-[1.5px] bg-gradient-to-br from-brand-orange/60 via-brand-orange/10 to-brand-orange/60">
                <div className="w-full h-full rounded-3xl bg-brand-black" />
              </div>

              {/* Inner content */}
              <div className="relative bg-gradient-to-br from-brand-black-soft via-brand-black to-brand-black-soft rounded-3xl px-6 py-10 sm:px-9 sm:py-12 text-center overflow-hidden">
                {/* Corner glows */}
                <div className="absolute -top-16 -left-16 w-44 h-44 bg-brand-orange/15 rounded-full blur-3xl" />
                <div className="absolute -bottom-16 -right-16 w-44 h-44 bg-brand-orange/10 rounded-full blur-3xl" />

                {/* Close button */}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="6" y1="18" x2="18" y2="6" />
                  </svg>
                </button>

                <div className="relative">
                  {/* Logo mark */}
                  <div className="flex justify-center mb-5">
                    <div className="relative">
                      <div className="absolute inset-0 blur-2xl bg-brand-orange/40 scale-150" />
                      <LogoMark size={54} className="relative animate-float" />
                    </div>
                  </div>

                  {/* Tag */}
                  <div className="inline-block px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-semibold tracking-wider uppercase mb-4">
                    Early Access
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black tracking-tighter mb-3 leading-[1.1]">
                    <span className="gradient-text">Be first in</span>{" "}
                    <span className="gradient-text-orange">the vault.</span>
                  </h2>
                  <p className="text-brand-gray-light text-sm mb-7 leading-relaxed">
                    Join the waitlist and get early access the moment Vaultra
                    Pay launches on iOS and Android.
                  </p>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div className="relative">
                      <svg
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray pointer-events-none"
                        width="15"
                        height="15"
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
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        disabled={status === "loading" || status === "success"}
                        className="w-full pl-11 pr-4 h-12 sm:h-13 rounded-full bg-white/5 border border-white/10 text-sm sm:text-base text-white placeholder:text-white/40 focus:outline-none focus:border-brand-orange/60 focus:bg-white/[0.08] focus:ring-2 focus:ring-brand-orange/20 transition-all disabled:opacity-50"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === "loading" || status === "success"}
                      className="btn-shine inline-flex items-center justify-center gap-2 h-12 sm:h-13 px-6 bg-brand-orange hover:bg-brand-orange-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all text-white font-semibold rounded-full text-sm sm:text-base shadow-xl shadow-brand-orange/30 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>
                        {status === "loading"
                          ? "Joining..."
                          : status === "success"
                          ? "You're in"
                          : "Join Waitlist"}
                      </span>
                      {status === "success" ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : status !== "loading" ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      ) : null}
                    </button>
                  </form>

                  {message && (
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-4 text-sm ${
                        status === "success"
                          ? "text-green-400"
                          : status === "error"
                          ? "text-red-400"
                          : "text-brand-gray-light"
                      }`}
                    >
                      {message}
                    </motion.p>
                  )}

                  <p className="mt-5 text-xs text-brand-gray">
                    Unsubscribe anytime.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

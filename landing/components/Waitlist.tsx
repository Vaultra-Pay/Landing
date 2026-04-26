"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { LogoMark } from "./Logo";

type Status = "idle" | "loading" | "success" | "error";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

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
    <section
      id="waitlist"
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] hero-glow pointer-events-none" />

      <div className="site-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative max-w-4xl mx-auto"
      >
        {/* Premium bordered card */}
        <div className="relative rounded-3xl overflow-hidden">
          {/* Animated gradient border */}
          <div className="absolute inset-0 rounded-3xl p-[1.5px] bg-gradient-to-br from-brand-orange/60 via-brand-orange/10 to-brand-orange/60 animate-gradient-shift">
            <div className="w-full h-full rounded-3xl bg-brand-black" />
          </div>

          {/* Inner content */}
          <div className="relative bg-gradient-to-br from-brand-black-soft via-brand-black to-brand-black-soft rounded-3xl px-6 py-14 md:px-16 md:py-20 text-center overflow-hidden">
            {/* Decorative corner glows */}
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-brand-orange/15 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-brand-orange/10 rounded-full blur-3xl" />

            <div className="relative">
              {/* Logo mark */}
              <div className="flex justify-center mb-7">
                <div className="relative">
                  <div className="absolute inset-0 blur-2xl bg-brand-orange/40 scale-150" />           
                  <LogoMark size={57} className="relative animate-float sm:hidden" />
                  <LogoMark size={63} className="relative animate-float hidden sm:flex" />
                </div>
              </div>

              {/* Tag */}
              <div className="inline-block px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-semibold tracking-wider uppercase mb-5">
                Early Access
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-5 leading-[1.05]">
                <span className="gradient-text">Be first in</span>{" "}
                <span className="gradient-text-orange">the vault.</span>
              </h2>
              <p className="text-brand-gray-light text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Join the waitlist. Get early access the moment Vaultra Pay
                launches on iOS and Android.
              </p>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              >
                <div className="relative flex-1">
                  <svg
                    className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-brand-gray pointer-events-none"
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
                    className="w-full pl-11 pr-4 h-11 sm:h-14 sm:pl-12 sm:pr-5 rounded-full bg-white/5 border border-white/10 text-sm sm:text-base text-white placeholder:text-white/40 focus:outline-none focus:border-brand-orange/60 focus:bg-white/[0.08] focus:ring-2 focus:ring-brand-orange/20 transition-all disabled:opacity-50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className="btn-shine inline-flex items-center justify-center gap-2 h-11 px-5 text-sm sm:h-14 sm:px-8 sm:text-base bg-brand-orange hover:bg-brand-orange-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all text-white font-semibold rounded-full whitespace-nowrap shadow-xl shadow-brand-orange/30 hover:scale-[1.02] active:scale-[0.98]"
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
                  className={`mt-5 text-sm ${
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

              <p className="mt-6 text-xs text-brand-gray">
                Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { PhoneMockup } from "./PhoneMockup";
import { openNewsletterPopup } from "@/lib/newsletter";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-28 md:pt-32 pb-16">
      {/* Ambient glows */}
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] hero-glow animate-gradient-shift pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] hero-glow-secondary pointer-events-none" />

      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-black pointer-events-none" />

      {/* Noise texture */}
      <div className="noise" />

      <div className="site-container relative w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* LEFT: Copy */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Badge */}
           

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
              className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black tracking-tighter leading-[0.95] mb-5 md:mb-6"
            >
              <span className="gradient-text">Crypto In. Fiat Out.</span>
              <br />
              <span className="gradient-text">One App. </span>
              <span className="gradient-text-orange">Zero Friction.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="text-lg md:text-xl text-brand-gray-light leading-relaxed mb-2 max-w-xl lg:max-w-2xl mx-auto lg:mx-0"
            >
              Receive USDT, BTC, ETH, and more into your wallet.
              Convert instantly to Naira and spend freely. From bank transfers to bills and virtual cards all in one seamless app.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-10"
            >
              <button
                type="button"
                onClick={openNewsletterPopup}
                className="btn-shine bg-brand-orange hover:bg-brand-orange-dark transition-all hover:scale-[1.03] text-white font-semibold px-5 py-2.5 text-sm sm:px-7 sm:py-3.5 sm:text-base rounded-full shadow-2xl shadow-brand-orange/25 w-auto text-center"
              >
                Join the Waitlist
              </button>
              <a
                href="#how-it-works"
                className="text-brand-gray-light hover:text-white transition-colors font-medium px-4 py-3.5"
              >
                See how it works →
              </a>
            </motion.div>

            {/* Store badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.85 }}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3"
            >
              <StoreBadge
                platform="App Store"
                topText="Coming soon on"
                icon={<AppleIcon />}
              />
              <StoreBadge
                platform="Google Play"
                topText="Coming soon on"
                icon={<PlayIcon />}
              />
            </motion.div>
          </div>

          {/* RIGHT: Phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center lg:justify-end relative order-last lg:order-none mt-4 lg:mt-0"
          >
            {/* Glow behind phone */}
            <div className="absolute inset-0 bg-brand-orange/25 blur-[100px] rounded-full" />
            <PhoneMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StoreBadge({
  platform,
  topText,
  icon,
}: {
  platform: string;
  topText: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="glass glass-hover cursor-not-allowed flex items-center gap-3 px-5 py-3 rounded-xl opacity-75 hover:opacity-95 transition-all"
      aria-disabled
      title="Coming soon"
    >
      <div className="text-white/90">{icon}</div>
      <div className="text-left">
        <div className="text-[10px] text-brand-gray uppercase tracking-wider">
          {topText}
        </div>
        <div className="text-sm font-semibold text-white">{platform}</div>
      </div>
    </div>
  );
}

function AppleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.609 1.814L13.792 12 3.609 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.61-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.5 12l2.198-2.491zM5.864 2.658L16.802 8.99l-2.302 2.303L5.864 2.658z" />
    </svg>
  );
}

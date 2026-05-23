"use client";

import { motion } from "framer-motion";

const bullets = [
  {
    title: "Multi-chain support",
    desc: "USDT, ETH, BTC and more.",
  },
  {
    title: "Real-time rates",
    desc: "Clean, transparent pricing. No hidden spread.",
  },
  {
    title: "One-tap settlement",
    desc: "Bank transfer, card fund, bill pay in seconds.",
  },
  {
    title: "Biometric security",
    desc: "Face & fingerprint. Full self-custody, always.",
  },
];

export function Showcase() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="site-container relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-semibold tracking-wider uppercase mb-6">
            The Experience
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-6 leading-[1.05]">
            <span className="gradient-text">Your personal financial engine </span>{" "}
            <span className="gradient-text-orange">built for trust.</span>
          </h2>
          <p className="text-lg text-brand-gray-light leading-relaxed">
            One app for everything. Secure your assets, convert between worlds, and spend with ease.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {bullets.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass glass-hover rounded-2xl p-6 group"
            >
              <div className="w-8 h-8 rounded-lg bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center mb-4 group-hover:bg-brand-orange group-hover:border-brand-orange transition-all">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="text-brand-orange group-hover:text-white transition-colors"
                >
                  <path
                    d="M3 7l3 3 5-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{b.title}</h3>
              <p className="text-sm text-brand-gray-light leading-relaxed">
                {b.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

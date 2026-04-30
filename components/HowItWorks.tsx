"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Receive Crypto",
    description:
      "USDT, ETH, BTC and more — land directly in your non-custodial Vaultra wallet.",
    accent: "Receive",
  },
  {
    number: "02",
    title: "Convert Instantly",
    description:
      "A single tap converts your digital assets to local fiat — clean rates, no middlemen.",
    accent: "Convert",
  },
  {
    number: "03",
    title: "Spend Anywhere",
    description:
      "Send to a bank, fund a card, pay bills. Your digital value, now everyday money.",
    accent: "Spend",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] hero-glow-secondary pointer-events-none" />

      <div className="site-container relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-semibold tracking-wider uppercase mb-6">
            How it works
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 gradient-text">
            Three steps.
            <br />
            Zero friction.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <StepCard key={step.number} {...step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({
  number,
  title,
  description,
  accent,
  index,
}: {
  number: string;
  title: string;
  description: string;
  accent: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="relative"
    >
      {/* Connecting line (desktop) */}
      {index < 2 && (
        <div className="hidden md:block absolute top-12 left-[calc(100%-1rem)] right-0 h-px bg-gradient-to-r from-brand-orange/40 to-transparent z-0" />
      )}

      <div className="relative glass rounded-2xl p-8 h-full group hover:border-brand-orange/30 transition-all">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-5xl md:text-6xl font-black gradient-text-orange leading-none">
            {number}
          </div>
          <div className="text-xs uppercase tracking-[0.2em] text-brand-gray">
            {accent}
          </div>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">
          {title}
        </h3>
        <p className="text-brand-gray-light leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

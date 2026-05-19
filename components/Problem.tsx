"use client";

import { motion } from "framer-motion";

const problems = [
  {
    title: "Too Many Steps",
    description:
      "Moving from crypto to cash still requires multiple apps, manual transfers, and unnecessary stress.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5" cy="12" r="2" />
        <circle cx="12" cy="12" r="2" />
        <circle cx="19" cy="12" r="2" />
        <line x1="7" y1="12" x2="10" y2="12" />
        <line x1="14" y1="12" x2="17" y2="12" />
        <path d="M5 10V7a1 1 0 011-1h3" />
        <path d="M19 10V7a1 1 0 00-1-1h-3" />
      </svg>
    ),
  },
  {
    title: "Risky P2P Transactions",
    description:
      "Users are forced to rely on strangers, brokers, and Telegram groups just to access their money.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    title: "Delays & Failures",
    description:
      "What should take seconds often takes minutes, hours, or sometimes fails completely.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      </svg>
    ),
  },
  {
    title: "Built for Traders, Not Everyday Users",
    description:
      "Most crypto products feel too technical for normal daily use.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <path d="M3 20h18" />
        <circle cx="20" cy="7" r="2" />
        <line x1="20" y1="5" x2="20" y2="2" />
      </svg>
    ),
  },
];

export function Problem() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="site-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold tracking-wider uppercase mb-6">
            The Problem
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
            <span className="text-white">Crypto works.</span>
            <br />
            <span className="gradient-text">Using it doesn&apos;t.</span>
          </h2>
          <p className="text-lg text-brand-gray-light leading-relaxed">
            The hardest part of crypto is using it in real life. People use
            crypto every day — but turning it into spendable money is still
            stressful, slow, and fragmented.
          </p>
        </motion.div>

        {/* Narrative block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-2xl mx-auto mb-14 glass rounded-2xl p-7 text-center text-brand-gray-light text-base leading-relaxed space-y-2"
        >
          <p>You receive crypto in one app.</p>
          <p>Find a P2P trader in another.</p>
          <p>Wait for confirmation and hope nothing goes wrong.</p>
          <p className="text-white font-semibold pt-2">
            That&apos;s not how money should work.
          </p>
        </motion.div>

        {/* Problem cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass rounded-2xl p-7 flex gap-5 group"
            >
              <div className="shrink-0 w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                <div className="w-6 h-6">{problem.icon}</div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {problem.title}
                </h3>
                <p className="text-brand-gray-light text-sm leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Transition line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center max-w-xl mx-auto"
        >
          <p className="text-brand-gray-light text-lg leading-relaxed">
            Crypto adoption is growing fast.
            <br />
            The experience hasn&apos;t caught up.
          </p>
          <p className="mt-3 text-xl font-bold gradient-text">
            That&apos;s where Vaultra comes in.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

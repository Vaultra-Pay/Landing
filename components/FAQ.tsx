"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type FAQItem = {
  question: string;
  answer: React.ReactNode;
};

const faqs: FAQItem[] = [
  {
    question: "What is Vaultra Pay?",
    answer: (
      <>
        <p>
          Vaultra Pay is a hybrid crypto-fiat app that lets you receive crypto,
          convert it instantly to Naira, and spend it in real life - all in
          one place.
        </p>
        <p>You can:</p>
        <ul>
          <li>Receive USDT, BTC, ETH, and more</li>
          <li>Convert instantly to NGN</li>
          <li>Send money to Nigerian bank accounts</li>
          <li>Pay bills and buy airtime</li>
          <li>Use virtual cards for online payments</li>
        </ul>
        <p>All while staying in control of your assets.</p>
      </>
    ),
  },
  {
    question: "Is Vaultra an exchange?",
    answer: (
      <>
        <p>
          <strong className="text-white">No.</strong> Vaultra is not a
          traditional crypto exchange or trading platform.
        </p>
        <p>
          We&apos;re building a seamless bridge between crypto and everyday
          spending - focused on utility, not trading.
        </p>
      </>
    ),
  },
  {
    question: "What makes Vaultra different from a CeFi or DeFi wallet?",
    answer: (
      <>
        <p>
          Most platforms force users to choose between{" "}
          <strong className="text-white">crypto control</strong> or{" "}
          <strong className="text-white">real-world usability</strong>. Vaultra
          combines both.
        </p>
        <p>
          You keep control of your assets through a non-custodial wallet while
          still being able to convert and spend instantly using local fiat
          rails.
        </p>
      </>
    ),
  },
  {
    question: "What does “non-custodial” mean?",
    answer: (
      <>
        <p>
          Non-custodial means you own and control your crypto assets. Vaultra
          does not hold your private keys or control your wallet funds.
        </p>
        <p>
          Even if Vaultra disappeared tomorrow, your assets would still belong
          to you.
        </p>
      </>
    ),
  },
  {
    question: "Can I convert crypto to Naira instantly?",
    answer: (
      <>
        <p>
          <strong className="text-white">Yes.</strong> Vaultra lets you convert
          supported cryptocurrencies into Naira instantly.
        </p>
        <p>No Telegram brokers. No manual P2P process.</p>
      </>
    ),
  },
  {
    question: "Which cryptocurrencies does Vaultra support?",
    answer: (
      <>
        <p>At launch, Vaultra plans to support:</p>
        <ul>
          <li>USDT</li>
          <li>Bitcoin (BTC)</li>
          <li>Ethereum (ETH)</li>
        </ul>
        <p>Additional assets and networks will be added over time.</p>
      </>
    ),
  },
  {
    question: "How fast are conversions?",
    answer: (
      <>
        <p>
          Our target is under{" "}
          <strong className="text-white">60 seconds</strong> from crypto
          receipt to Naira availability.
        </p>
        <p>Speed is a core part of the Vaultra experience.</p>
      </>
    ),
  },
  {
    question: "Do I need crypto experience to use Vaultra?",
    answer: (
      <>
        <p>
          <strong className="text-white">No.</strong> Vaultra is designed for
          everyday users - not just crypto experts.
        </p>
        <p>
          The goal is simple:{" "}
          <em className="text-white">Receive money. Convert it. Spend it.</em>{" "}
          We handle the complexity in the background.
        </p>
      </>
    ),
  },
  {
    question: "Can I send money to Nigerian bank accounts?",
    answer: (
      <p>
        <strong className="text-white">Yes.</strong> You&apos;ll be able to
        transfer Naira directly from your Vaultra wallet to any Nigerian bank
        account using local payment rails.
      </p>
    ),
  },
  {
    question: "Will Vaultra offer virtual cards?",
    answer: (
      <p>
        <strong className="text-white">Yes.</strong> Vaultra plans to offer
        virtual debit cards for online payments and subscriptions, with
        physical cards introduced later.
      </p>
    ),
  },
  {
    question: "Can I pay bills and buy airtime with Vaultra?",
    answer: (
      <>
        <p>
          <strong className="text-white">Yes.</strong> Vaultra is designed to
          support:
        </p>
        <ul>
          <li>Airtime top-ups</li>
          <li>Data purchases</li>
          <li>Electricity bills</li>
          <li>Cable TV payments</li>
          <li>Other everyday services</li>
        </ul>
      </>
    ),
  },
  {
    question: "Is Vaultra available only in Nigeria?",
    answer: (
      <>
        <p>
          Vaultra is launching in Nigeria first because it&apos;s one of the
          world&apos;s largest crypto markets.
        </p>
        <p>Expansion into other African markets is planned in future phases.</p>
      </>
    ),
  },
  {
    question: "Is Vaultra regulated?",
    answer: (
      <>
        <p>Vaultra is being built with a compliance-first approach.</p>
        <p>
          The platform is designed around Nigeria&apos;s evolving SEC and VASP
          regulatory framework, alongside compliant banking and payment
          infrastructure partnerships.
        </p>
      </>
    ),
  },
  {
    question: "Why does Vaultra require KYC?",
    answer: (
      <>
        <p>KYC helps keep the platform secure and compliant.</p>
        <p>Verification may include:</p>
        <ul>
          <li>BVN</li>
          <li>NIN</li>
          <li>Facial verification</li>
        </ul>
        <p>This helps protect users and reduce fraud.</p>
      </>
    ),
  },
];

export function FAQ() {
  const [openSet, setOpenSet] = useState<Set<number>>(new Set());

  const toggle = (i: number) =>
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <section id="faq" className="relative py-20 md:py-28">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-semibold tracking-wider uppercase mb-6">
            FAQ
          </div>
          <h4 className="text-3xl md:text-5xl font-black tracking-tighter mb-6 gradient-text">
            Popular Questions and answers
          </h4>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <FAQRow
              key={faq.question}
              index={i}
              question={faq.question}
              answer={faq.answer}
              isOpen={openSet.has(i)}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQRow({
  index,
  question,
  answer,
  isOpen,
  onToggle,
}: {
  index: number;
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
      className="glass rounded-2xl overflow-hidden"
    >
      <button
        id={buttonId}
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full flex items-center justify-between gap-4 px-5 py-5 md:px-6 md:py-6 text-left group"
      >
        <span className="text-base md:text-lg font-semibold text-white group-hover:text-brand-orange transition-colors">
          {question}
        </span>
        <span
          className={`shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
            isOpen
              ? "bg-brand-orange/15 border-brand-orange/40 text-brand-orange"
              : "border-white/10 text-white/70 group-hover:border-brand-orange/40 group-hover:text-brand-orange"
          }`}
        >
          <motion.svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </motion.svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-6 pb-6 -mt-1 text-brand-gray-light leading-relaxed text-sm md:text-base space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:marker:text-brand-orange">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

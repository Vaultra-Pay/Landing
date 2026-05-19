"use client";

import { motion } from "framer-motion";
import { LogoMark } from "./Logo";

export function PhoneMockup() {
  return (
    <div className="relative w-[260px] sm:w-[290px] md:w-[320px] lg:w-[340px] h-[540px] sm:h-[600px] md:h-[660px] lg:h-[700px]">
      {/* Phone frame */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-[48px] border border-white/10 shadow-2xl shadow-brand-orange/20 overflow-hidden">
        {/* Inner screen */}
        <div className="absolute inset-[10px] bg-brand-black rounded-[40px] overflow-hidden">
          {/* Notch */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-20" />

          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-between px-8 pt-2 text-xs text-white/70 z-10">
            <span className="font-semibold">9:41</span>
            <span className="flex gap-1 items-center">
              <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor">
                <path d="M1 8h2v1H1zm3-2h2v3H4zm3-2h2v5H7zm3-2h2v7h-2z" />
              </svg>
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor">
                <rect x="1" y="3" width="10" height="4" rx="1" />
                <rect x="2.5" y="4.5" width="7" height="1" fill="currentColor" />
              </svg>
            </span>
          </div>

          {/* App content */}
          <div className="absolute inset-0 pt-14 pb-6 px-5 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <LogoMark size={22} />
                <span className="text-sm font-bold">Vaultra Pay</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/10" />
            </div>

            {/* Balance card */}
            <div className="relative rounded-2xl p-5 mb-4 overflow-hidden bg-gradient-to-br from-brand-orange to-brand-orange-dark">
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <div className="relative">
                <div className="text-[10px] uppercase tracking-wider text-white/70 mb-1">
                  Total Balance
                </div>
                <AnimatedBalance />
                <div className="text-xs text-white/70 mt-1">≈ ₦4,819,995</div>
              </div>
            </div>

            {/* Conversion tile */}
            <ConversionCard />

            {/* Action buttons */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              {[
                { label: "Receive", icon: "↓" },
                { label: "Send", icon: "↑" },
                { label: "Convert", icon: "⇄" },
                { label: "Card", icon: "▦" },
              ].map((a) => (
                <div
                  key={a.label}
                  className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-white/5 border border-white/5"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center text-sm font-bold">
                    {a.icon}
                  </div>
                  <span className="text-[10px] text-white/70">{a.label}</span>
                </div>
              ))}
            </div>

            {/* Recent activity */}
            <div className="mt-4 flex-1 overflow-hidden">
              <div className="text-[10px] uppercase tracking-wider text-white/50 mb-2">
                Recent Activity
              </div>
              <div className="space-y-2">
                <ActivityRow
                  label="Received USDT"
                  sub="From 0x8f...3d21"
                  amount="+$250.00"
                  positive
                />
                <ActivityRow
                  label="Converted to NGN"
                  sub="USDT → Naira"
                  amount="₦402,500"
                />
                <ActivityRow
                  label="Sent to GTBank"
                  sub="•••• 4021"
                  amount="−₦150,000"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnimatedBalance() {
  return (
    <motion.div
      animate={{ opacity: [0.9, 1, 0.9] }}
      transition={{ duration: 3, repeat: Infinity }}
      className="text-3xl font-black text-white tracking-tight"
    >
      $3,492.75
    </motion.div>
  );
}

function ConversionCard() {
  return (
    <div className="relative rounded-xl p-4 bg-white/5 border border-white/5 overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-white/50 mb-1">
            You send
          </div>
          <div className="text-lg font-bold text-white">100 USDT</div>
        </div>
        <motion.div
          animate={{ rotate: [0, 180, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-8 h-8 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center"
        >
          ⇄
        </motion.div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-wider text-white/50 mb-1">
            You get
          </div>
          <div className="text-lg font-bold text-brand-orange">₦138,000</div>
        </div>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-brand-orange to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        style={{ width: "50%" }}
      />
    </div>
  );
}

function ActivityRow({
  label,
  sub,
  amount,
  positive,
}: {
  label: string;
  sub: string;
  amount: string;
  positive?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <div className="text-xs font-semibold text-white">{label}</div>
        <div className="text-[10px] text-white/50">{sub}</div>
      </div>
      <div
        className={`text-xs font-semibold ${
          positive ? "text-green-400" : "text-white"
        }`}
      >
        {amount}
      </div>
    </div>
  );
}

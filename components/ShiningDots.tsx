"use client";

import { useMemo } from "react";

// Deterministic pseudo-random so server and client match (hydration-safe).
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Dot = {
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  opacity: number;
  hue: "orange" | "white";
};

export function ShiningDots({
  count = 60,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const dots = useMemo<Dot[]>(() => {
    const rand = mulberry32(42);
    return Array.from({ length: count }, () => {
      const isOrange = rand() < 0.22;
      return {
        left: `${rand() * 100}%`,
        top: `${rand() * 100}%`,
        size: 1 + rand() * 2.2,
        delay: rand() * 8,
        duration: 3 + rand() * 6,
        drift: -10 + rand() * 20,
        opacity: 0.4 + rand() * 0.6,
        hue: isOrange ? "orange" : "white",
      };
    });
  }, [count]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {dots.map((d, i) => (
        <span
          key={i}
          className="dot"
          style={
            {
              left: d.left,
              top: d.top,
              width: d.size,
              height: d.size,
              animationDelay: `${d.delay}s`,
              animationDuration: `${d.duration}s`,
              "--drift": `${d.drift}px`,
              "--max-opacity": d.opacity,
              background:
                d.hue === "orange"
                  ? "rgba(255, 140, 60, 0.95)"
                  : "rgba(255, 255, 255, 0.9)",
              boxShadow:
                d.hue === "orange"
                  ? "0 0 8px rgba(255, 90, 31, 0.7)"
                  : "0 0 6px rgba(255, 255, 255, 0.5)",
            } as React.CSSProperties
          }
        />
      ))}
      <style jsx>{`
        .dot {
          position: absolute;
          border-radius: 9999px;
          opacity: 0;
          animation-name: twinkle;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
          will-change: opacity, transform;
        }
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0;
            transform: translate(0, 0) scale(0.6);
          }
          30% {
            opacity: var(--max-opacity, 0.8);
            transform: translate(calc(var(--drift, 0px) * 0.3), -4px) scale(1);
          }
          70% {
            opacity: calc(var(--max-opacity, 0.8) * 0.7);
            transform: translate(var(--drift, 0px), -10px) scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}

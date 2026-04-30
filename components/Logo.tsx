"use client";

import Image from "next/image";

type LogoProps = {
  size?: number;
  showWordmark?: boolean;
  className?: string;
  wordmarkSize?: number;
};

export function LogoMark({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/vaultra-logo.svg"
      alt="Vaultra"
      width={size}
      height={size}
      priority
      className={className}
      style={{ width: size, height: size }}
    />
  );
}

export function Wordmark({
  size = 22,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`font-black tracking-tight leading-none ${className}`}
      style={{
        fontSize: size,
        letterSpacing: "-0.035em",
      }}
    >
      Vaultra<span className="text-brand-orange"> Pay</span>
    </span>
  );
}

export function Logo({
  size = 40,
  showWordmark = true,
  className = "",
  wordmarkSize,
}: LogoProps) {
  const computedWordmark = wordmarkSize ?? Math.round(size * 0.62);
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <LogoMark size={size} />
      {showWordmark && <Wordmark size={computedWordmark} />}
    </div>
  );
}

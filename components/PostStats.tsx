"use client";

import { useEffect, useState } from "react";

type Props = {
  slug: string;
  initialLoves: number;
  initialViews: number;
  postUrl: string;
  postTitle: string;
};

export function PostStats({
  slug,
  initialLoves,
  initialViews,
  postUrl,
  postTitle,
}: Props) {
  const [loves, setLoves] = useState(initialLoves);
  const [loved, setLoved] = useState(false);

  useEffect(() => {
    setLoved(localStorage.getItem(`loved:${slug}`) === "1");
  }, [slug]);

  async function toggleLove() {
    const willLove = !loved;
    const delta = willLove ? 1 : -1;
    setLoved(willLove);
    setLoves((n) => Math.max(0, n + delta));
    if (willLove) localStorage.setItem(`loved:${slug}`, "1");
    else localStorage.removeItem(`loved:${slug}`);
    try {
      const res = await fetch("/api/blog/love", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, delta }),
      });
      if (!res.ok) throw new Error("server rejected");
    } catch {
      setLoved(!willLove);
      setLoves((n) => Math.max(0, n - delta));
      if (willLove) localStorage.removeItem(`loved:${slug}`);
      else localStorage.setItem(`loved:${slug}`, "1");
    }
  }

  const formattedViews = new Intl.NumberFormat().format(initialViews);
  const formattedLoves = new Intl.NumberFormat().format(loves);

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    postTitle
  )}&url=${encodeURIComponent(postUrl)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    postUrl
  )}`;

  return (
    <div className="max-w-3xl mt-14 pt-7 border-t border-white/5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggleLove}
            aria-label={loved ? "Unlove this post" : "Love this post"}
            aria-pressed={loved}
            className={`group inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all active:scale-95 ${
              loved
                ? "bg-brand-orange/15 border-brand-orange/40 text-brand-orange"
                : "border-white/10 text-white/80 hover:border-brand-orange/40 hover:text-brand-orange"
            }`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={loved ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-active:scale-125"
            >
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
            <span className="text-sm font-semibold tabular-nums">
              {formattedLoves}
            </span>
          </button>

          <div className="inline-flex items-center gap-2 text-white/70 text-sm">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span className="tabular-nums">
              {formattedViews} {initialViews === 1 ? "view" : "views"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-brand-gray mr-1">
            Share
          </span>
          <ShareLink href={tweetUrl} label="Share on X">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </ShareLink>
          <ShareLink href={linkedinUrl} label="Share on LinkedIn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </ShareLink>
        </div>
      </div>
    </div>
  );
}

function ShareLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-full glass glass-hover flex items-center justify-center text-white/80 hover:text-brand-orange transition-colors"
    >
      {children}
    </a>
  );
}

"use client";

import { useEffect } from "react";

/**
 * Fires a single /api/blog/view call per browser session per slug.
 * Renders nothing.
 */
export function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const key = `viewed:${slug}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    fetch("/api/blog/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    }).catch(() => {
      sessionStorage.removeItem(key);
    });
  }, [slug]);

  return null;
}

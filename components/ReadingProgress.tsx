"use client";

import { useEffect, useState } from "react";

/**
 * Thin orange progress bar fixed to the top of the viewport, showing
 * how far through the page the reader has scrolled.
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct =
        scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0;
      setProgress(pct);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none">
      <div
        className="h-full bg-brand-orange origin-left"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

"use client";

/**
 * Client wrapper for the embedded Sanity Studio.
 *
 * The Sanity library uses React.createContext at module-load time, which
 * doesn't work in React Server Components. Importing `sanity.config` here
 * (behind the "use client" boundary) keeps that initialization on the client
 * while leaving page.tsx free to export Next.js `metadata` / `viewport`.
 */

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export default function StudioClient() {
  return <NextStudio config={config} />;
}

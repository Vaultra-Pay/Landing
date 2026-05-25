/**
 * Embedded Sanity Studio — admin UI at /studio.
 * Auth is handled by Sanity; only project members can sign in.
 *
 * The actual Studio is rendered by StudioClient (a client component) so
 * Sanity's React-hook-based initialization runs only in the browser.
 */

import StudioClient from "./StudioClient";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <StudioClient />;
}

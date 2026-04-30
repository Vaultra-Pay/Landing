import { NextResponse } from "next/server";

/**
 * Vaultra waitlist endpoint.
 *
 * Email-capture strategy (swap as needed):
 *   - Default: Web3Forms (recommended — 5-min setup, no backend)
 *     Set WEB3FORMS_ACCESS_KEY in .env.local
 *     Get a key at https://web3forms.com (free, no account required)
 *   - Alternative: Formspree (set FORMSPREE_ENDPOINT)
 *   - Long-term: Supabase / Postgres (replace the forwarding block)
 *
 * If no provider is configured, submissions are logged to the server console
 * and the request still returns 200 so the UI confirms success in dev.
 */

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = (body?.email ?? "").toString().trim().toLowerCase();

    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const web3FormsKey = process.env.WEB3FORMS_ACCESS_KEY;
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;

    // Option 1: Web3Forms
    if (web3FormsKey) {
      const r = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: web3FormsKey,
          email,
          subject: "New Vaultra waitlist signup",
          from_name: "Vaultra Landing",
          message: `New waitlist signup: ${email}`,
        }),
      });
      if (!r.ok) {
        const text = await r.text();
        console.error("Web3Forms error:", text);
        return NextResponse.json(
          { error: "Could not submit. Please try again." },
          { status: 500 }
        );
      }
      return NextResponse.json({ ok: true });
    }

    // Option 2: Formspree
    if (formspreeEndpoint) {
      const r = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, source: "Vaultra landing" }),
      });
      if (!r.ok) {
        console.error("Formspree error:", await r.text());
        return NextResponse.json(
          { error: "Could not submit. Please try again." },
          { status: 500 }
        );
      }
      return NextResponse.json({ ok: true });
    }

    // Fallback: log only (dev mode / unconfigured)
    console.log(
      `[vaultra-waitlist] No provider configured. Signup received: ${email}`
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Waitlist error:", err);
    return NextResponse.json(
      { error: "Unexpected server error." },
      { status: 500 }
    );
  }
}

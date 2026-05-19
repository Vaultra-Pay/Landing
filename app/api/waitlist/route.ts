import { NextResponse } from "next/server";

/**
 * Vaultra waitlist endpoint 
 * If MAILERLITE_API_KEY is missing, submissions are logged to the server
 * console and the request still returns 200, so the UI works in local dev
 * before credentials are configured.
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

    const apiKey = process.env.MAILERLITE_API_KEY;
    const groupId = process.env.MAILERLITE_GROUP_ID;

    // No credentials yet — log only so the UI still confirms success in dev.
    if (!apiKey) {
      console.log(
        `[vaultra-waitlist] MAILERLITE_API_KEY not set. Signup received: ${email}`
      );
      return NextResponse.json({ ok: true });
    }

    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        ...(groupId ? { groups: [groupId] } : {}),
      }),
    });

    // 201 = new subscriber, 200 = existing subscriber updated. Both succeed —
    // MailerLite upserts, so a duplicate signup is not an error.
    if (res.ok) {
      return NextResponse.json({ ok: true });
    }

    // 422 = MailerLite rejected the address (invalid / role-based / banned).
    if (res.status === 422) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const detail = await res.text();
    console.error(`MailerLite error (${res.status}):`, detail);
    return NextResponse.json(
      { error: "Could not join the waitlist. Please try again." },
      { status: 502 }
    );
  } catch (err) {
    console.error("Waitlist error:", err);
    return NextResponse.json(
      { error: "Unexpected server error." },
      { status: 500 }
    );
  }
}

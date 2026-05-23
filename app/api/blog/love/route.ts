import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/client";

/**
 * POST /api/blog/love  body: { slug, delta }
 * delta: 1 to love, -1 to unlove. Toggle behavior is enforced client-side
 * via localStorage; the server just applies the increment.
 */
export async function POST(req: Request) {
  try {
    const { slug, delta } = (await req.json()) as {
      slug?: unknown;
      delta?: unknown;
    };
    if (typeof slug !== "string" || !slug) {
      return NextResponse.json({ error: "Missing slug." }, { status: 400 });
    }
    const change = delta === -1 ? -1 : 1;

    if (!process.env.SANITY_API_WRITE_TOKEN) {
      console.log(
        `[blog-love] SANITY_API_WRITE_TOKEN missing — skipping love (${change}) for "${slug}".`
      );
      return NextResponse.json({ ok: true });
    }

    await writeClient
      .patch({
        query: `*[_type == "post" && slug.current == $slug][0]`,
        params: { slug },
      })
      .setIfMissing({ loves: 0 })
      .inc({ loves: change })
      .commit({ autoGenerateArrayKeys: true });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Love increment error:", err);
    return NextResponse.json(
      { error: "Failed to record love." },
      { status: 500 }
    );
  }
}

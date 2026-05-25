import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/client";

/**
 * POST /api/blog/view  body: { slug }
 * Increments the view counter on a post. Called once per browser session per
 * post by the ViewTracker client component, so refreshes don't inflate counts.
 */
export async function POST(req: Request) {
  try {
    const { slug } = (await req.json()) as { slug?: unknown };
    if (typeof slug !== "string" || !slug) {
      return NextResponse.json({ error: "Missing slug." }, { status: 400 });
    }

    if (!process.env.SANITY_API_WRITE_TOKEN) {
      console.log(
        `[blog-view] SANITY_API_WRITE_TOKEN missing — skipping view for "${slug}".`
      );
      return NextResponse.json({ ok: true });
    }

    await writeClient
      .patch({
        query: `*[_type == "post" && slug.current == $slug][0]`,
        params: { slug },
      })
      .setIfMissing({ views: 0 })
      .inc({ views: 1 })
      .commit({ autoGenerateArrayKeys: true });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("View increment error:", err);
    return NextResponse.json(
      { error: "Failed to record view." },
      { status: 500 }
    );
  }
}

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { PortableTextBlock } from "sanity";
import { client } from "@/sanity/client";
import {
  postBySlugQuery,
  postSlugsQuery,
  relatedPostsQuery,
} from "@/sanity/queries";
import { urlForImage } from "@/sanity/image";
import { readingTimeMinutes } from "@/lib/readingTime";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShiningDots } from "@/components/ShiningDots";
import { PostBody } from "@/components/PostBody";
import { ReadingProgress } from "@/components/ReadingProgress";
import { ViewTracker } from "@/components/ViewTracker";
import { PostStats } from "@/components/PostStats";

export const revalidate = 60;

type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  coverImage?: { asset?: unknown; alt?: string };
  coverImageDimensions?: { width: number; height: number; aspectRatio: number };
  body?: PortableTextBlock[];
  views: number;
  loves: number;
  author?: {
    name: string;
    avatar?: { asset?: unknown };
    bio?: string;
  };
};

type RelatedPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  coverImage?: { asset?: unknown; alt?: string };
  author?: { name: string };
};

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://vaultra-pay.com"
).replace(/\/$/, "");

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(postSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await client.fetch<Post | null>(postBySlugQuery, {
    slug: params.slug,
  });
  if (!post) return { title: "Post not found — Vaultra Pay" };
  return {
    title: `${post.title} — Vaultra Pay`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const [post, related] = await Promise.all([
    client.fetch<Post | null>(postBySlugQuery, { slug: params.slug }),
    client.fetch<RelatedPost[]>(relatedPostsQuery, { slug: params.slug }),
  ]);
  if (!post) notFound();

  const date = new Date(post.publishedAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const readMinutes = readingTimeMinutes(post.body);

  const coverWidth = post.coverImageDimensions?.width ?? 1600;
  const coverHeight = post.coverImageDimensions?.height ?? 900;
  const cover = post.coverImage?.asset
    ? urlForImage(post.coverImage as Parameters<typeof urlForImage>[0])
        .width(Math.min(coverWidth, 1600))
        .url()
    : null;

  const avatar = post.author?.avatar?.asset
    ? urlForImage(post.author.avatar as Parameters<typeof urlForImage>[0])
        .width(80)
        .height(80)
        .url()
    : null;

  const postUrl = `${SITE_URL}/blog/${post.slug}`;

  return (
    <main className="relative min-h-screen bg-brand-black overflow-x-clip">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ShiningDots count={70} />
      </div>

      <ReadingProgress />
      <ViewTracker slug={post.slug} />

      <div className="relative z-10">
        <Navbar />

        <article className="relative pt-32 md:pt-40 pb-16">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] hero-glow pointer-events-none" />

          <div className="site-container relative">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[180px_minmax(0,1fr)] gap-8 md:gap-14">
              {/* LEFT — sticky metadata sidebar */}
              <aside className="md:sticky md:top-28 md:self-start space-y-5 text-sm">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-brand-gray-light hover:text-brand-orange transition-colors"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  Back to blog
                </Link>

                <div className="h-px w-12 bg-white/10" />

                <ul className="space-y-3 text-brand-gray-light">
                  <li className="inline-flex items-center gap-2">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-brand-gray"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {readMinutes} min read
                  </li>
                  <li>
                    <time dateTime={post.publishedAt}>{date}</time>
                  </li>
                  {post.author?.name && (
                    <li>
                      <span className="text-brand-gray">By </span>
                      <span className="text-white">{post.author.name}</span>
                    </li>
                  )}
                </ul>
              </aside>

              {/* RIGHT — content */}
              <div className="min-w-0">
                {cover && (
                  <div className="mb-10">
                    <Image
                      src={cover}
                      alt={post.coverImage?.alt || post.title}
                      width={coverWidth}
                      height={coverHeight}
                      priority
                      sizes="(max-width: 768px) 100vw, 720px"
                      className="w-full h-auto rounded-2xl border border-white/5"
                    />
                  </div>
                )}

                <header className="mb-10">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05] mb-5 gradient-text">
                    {post.title}
                  </h1>
                  {post.excerpt && (
                    <p className="text-lg md:text-xl text-brand-gray-light leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                </header>

                <PostBody value={post.body || []} />

                <PostStats
                  slug={post.slug}
                  initialLoves={post.loves}
                  initialViews={post.views}
                  postUrl={postUrl}
                  postTitle={post.title}
                />

                {post.author && (
                  <div className="mt-14 pt-8 border-t border-white/5">
                    <div className="flex items-start gap-4">
                      {avatar ? (
                        <Image
                          src={avatar}
                          alt={post.author.name}
                          width={56}
                          height={56}
                          className="rounded-full border border-white/10"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-brand-orange/15 border border-brand-orange/20 flex items-center justify-center text-brand-orange font-bold">
                          {post.author.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="text-xs text-brand-gray uppercase tracking-wider mb-1">
                          Written by
                        </div>
                        <div className="text-white font-semibold">
                          {post.author.name}
                        </div>
                        {post.author.bio && (
                          <p className="mt-1 text-sm text-brand-gray-light leading-relaxed">
                            {post.author.bio}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>

        {related.length > 0 && <RelatedPosts posts={related} />}

        <Footer />
      </div>
    </main>
  );
}

function RelatedPosts({ posts }: { posts: RelatedPost[] }) {
  return (
    <section className="relative pb-24">
      <div className="site-container">
        <div className="mb-8 max-w-3xl">
          <div className="text-xs uppercase tracking-wider text-brand-gray mb-2">
            More reading
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">
            More from the blog
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <RelatedCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedCard({ post }: { post: RelatedPost }) {
  const cover = post.coverImage?.asset
    ? urlForImage(post.coverImage as Parameters<typeof urlForImage>[0])
        .width(800)
        .height(500)
        .url()
    : null;

  const date = new Date(post.publishedAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="glass glass-hover group relative rounded-2xl overflow-hidden flex flex-col transition-transform hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] w-full bg-brand-black-soft overflow-hidden">
        {cover ? (
          <Image
            src={cover}
            alt={post.coverImage?.alt || post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/10 via-transparent to-brand-orange/5" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent" />
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="text-xs text-brand-gray uppercase tracking-wider mb-2">
          {date}
          {post.author?.name && (
            <>
              <span className="mx-2 text-brand-gray/60">·</span>
              <span className="text-brand-gray-light normal-case tracking-normal">
                {post.author.name}
              </span>
            </>
          )}
        </div>
        <h3 className="text-lg font-bold text-white leading-snug mb-1 group-hover:text-brand-orange transition-colors line-clamp-2">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-sm text-brand-gray-light leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}

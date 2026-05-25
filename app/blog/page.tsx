import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/client";
import { postsQuery } from "@/sanity/queries";
import { urlForImage } from "@/sanity/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShiningDots } from "@/components/ShiningDots";
import type { Metadata } from "next";

// Rebuild every 60 seconds so newly published posts appear without redeploying.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog — Vaultra Pay",
  description:
    "Notes, updates and product thinking from the team building Vaultra Pay.",
};

type PostListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  coverImage?: { asset?: unknown; alt?: string };
  author?: { name: string; avatar?: { asset?: unknown } };
};

export default async function BlogIndex() {
  const posts = await client.fetch<PostListItem[]>(postsQuery);

  return (
    <main className="relative min-h-screen bg-brand-black overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ShiningDots count={70} />
      </div>

      <div className="relative z-10">
        <Navbar />

        <section className="relative pt-36 md:pt-44 pb-12">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] hero-glow pointer-events-none" />

          <div className="site-container relative">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.1] pb-2 mb-5 gradient-text">
                Vaultra Blog
              </h1>
              <p className="text-lg md:text-xl text-brand-gray-light leading-relaxed">
                The future of money, made simple. Notes on crypto, payments,
                and how Africa actually spends. From the team building Vaultra
                Pay.
              </p>
            </div>
          </div>
        </section>

        <section className="relative pb-24">
          <div className="site-container">
            {posts.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}

function PostCard({ post }: { post: PostListItem }) {
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

      <div className="p-6 flex-1 flex flex-col">
        <div className="text-xs text-brand-gray uppercase tracking-wider mb-2">
          {date}
          {post.author?.name && (
            <span className="mx-2 text-brand-gray/60">·</span>
          )}
          {post.author?.name && (
            <span className="text-brand-gray-light normal-case tracking-normal">
              {post.author.name}
            </span>
          )}
        </div>
        <h2 className="text-xl font-bold text-white leading-snug mb-2 group-hover:text-brand-orange transition-colors">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-sm text-brand-gray-light leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        )}
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-brand-orange font-medium">
          Read post
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:translate-x-1"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="glass rounded-2xl p-12 text-center">
      <h2 className="text-2xl font-bold text-white mb-2">No posts yet.</h2>
      <p className="text-brand-gray-light">
        We&apos;re publishing the first one soon. Check back shortly.
      </p>
    </div>
  );
}

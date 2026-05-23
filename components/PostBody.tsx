import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/image";
import type { PortableTextBlock } from "sanity";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-brand-gray-light text-base md:text-lg leading-relaxed mb-5">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white mt-12 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mt-10 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg md:text-xl font-bold text-white mt-8 mb-2">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-7 pl-5 border-l-2 border-brand-orange/60 text-white/90 italic text-lg leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-5 ml-5 list-disc space-y-2 text-brand-gray-light marker:text-brand-orange">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-5 ml-5 list-decimal space-y-2 text-brand-gray-light marker:text-brand-orange">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-base md:text-lg leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-base md:text-lg leading-relaxed">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-white">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-sm text-brand-orange font-mono">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const href = value?.href || "#";
      const isExternal = /^https?:\/\//.test(href);
      return (
        <Link
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-brand-orange underline decoration-brand-orange/40 hover:decoration-brand-orange transition-colors"
        >
          {children}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const url = urlForImage(value).width(1600).url();
      return (
        <figure className="my-8">
          <div className="relative w-full overflow-hidden rounded-2xl border border-white/5">
            <Image
              src={url}
              alt={value.alt || ""}
              width={1600}
              height={900}
              className="w-full h-auto"
            />
          </div>
          {value.alt && (
            <figcaption className="mt-2 text-center text-xs text-brand-gray">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export function PostBody({ value }: { value: PortableTextBlock[] }) {
  if (!value || value.length === 0) {
    return (
      <p className="text-brand-gray italic">This post has no content yet.</p>
    );
  }
  return <PortableText value={value} components={components} />;
}

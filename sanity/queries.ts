import { groq } from "next-sanity";

export const postsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    coverImage,
    "author": author->{ name, avatar }
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    coverImage,
    "coverImageDimensions": coverImage.asset->metadata.dimensions,
    body,
    "views": coalesce(views, 0),
    "loves": coalesce(loves, 0),
    "author": author->{ name, avatar, bio }
  }
`;

export const relatedPostsQuery = groq`
  *[_type == "post" && slug.current != $slug && defined(slug.current)]
    | order(publishedAt desc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    coverImage,
    "author": author->{ name }
  }
`;

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;

import type { PortableTextBlock } from "sanity";

const WORDS_PER_MINUTE = 200;

type BlockChild = { _type?: string; text?: string };
type BodyBlock = PortableTextBlock & { _type?: string; children?: BlockChild[] };

export function readingTimeMinutes(
  body: PortableTextBlock[] | undefined
): number {
  if (!body || body.length === 0) return 1;

  let words = 0;
  for (const block of body as BodyBlock[]) {
    if (block._type !== "block" || !Array.isArray(block.children)) continue;
    for (const child of block.children) {
      if (typeof child.text === "string") {
        words += child.text.trim().split(/\s+/).filter(Boolean).length;
      }
    }
  }

  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

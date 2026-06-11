import type { Metadata } from "next";
// Relative import — vitest runs without the "@/" alias.
import { site } from "./site";

type PageMetaInput = {
  title: string;
  description: string;
  /** Route path, e.g. "/carnet/mon-article" — resolved against metadataBase. */
  path: string;
  article?: { publishedTime: string; tags: string[] };
};

// Next merges metadata segments *shallowly*: a page that sets only `title`
// inherits the layout's `alternates`/`openGraph` wholesale — canonical and
// og:url would then point to the homepage. Every page below the root must
// build its metadata through this helper so the full block is restated.
export function pageMeta({ title, description, path, article }: PageMetaInput): Metadata {
  const shared = {
    locale: site.locale,
    url: path,
    siteName: site.name,
    title,
    description,
    // The root opengraph-image.png file convention is wiped by this openGraph
    // block (same shallow merge) — restate it. Keep alt in sync with
    // src/app/opengraph-image.alt.txt.
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Mathieu Cadu — ingénieur & développeur fullstack. Des produits faits maison, du web au natif.",
      },
    ],
  };
  return {
    title,
    description,
    alternates: {
      canonical: path,
      types: { "application/rss+xml": `${site.url}/feed.xml` },
    },
    openGraph: article
      ? {
          ...shared,
          type: "article",
          publishedTime: article.publishedTime,
          tags: article.tags,
        }
      : { ...shared, type: "website" },
  };
}

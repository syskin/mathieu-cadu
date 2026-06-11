import { describe, expect, it } from "vitest";
import { pageMeta } from "./seo";
import { site } from "./site";

describe("pageMeta (per-page SEO rail)", () => {
  it("restates canonical + full OG block — never inherits the homepage's", () => {
    const m = pageMeta({ title: "Projets", description: "desc", path: "/projets" });
    expect(m.alternates?.canonical).toBe("/projets");
    expect(m.openGraph).toMatchObject({
      type: "website",
      url: "/projets",
      title: "Projets",
      description: "desc",
      siteName: site.name,
      locale: site.locale,
      // The root file-convention image is wiped by the shallow merge — the
      // helper must restate it or shared pages lose their og:image.
      images: [expect.objectContaining({ url: "/opengraph-image.png" })],
    });
  });

  it("keeps the RSS discovery link on every page", () => {
    const m = pageMeta({ title: "T", description: "d", path: "/carnet" });
    expect(m.alternates?.types).toEqual({
      "application/rss+xml": `${site.url}/feed.xml`,
    });
  });

  it("marks articles as og:article with publishedTime and tags", () => {
    const m = pageMeta({
      title: "Note",
      description: "d",
      path: "/carnet/note",
      article: { publishedTime: "2026-06-09", tags: ["ia", "atelier"] },
    });
    expect(m.openGraph).toMatchObject({
      type: "article",
      publishedTime: "2026-06-09",
      tags: ["ia", "atelier"],
    });
  });
});

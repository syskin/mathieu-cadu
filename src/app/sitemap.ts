import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getPublished } from "@/lib/writing";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${site.url}/carnet`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${site.url}/projets`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...getPublished().map((a) => ({
      url: `${site.url}/carnet/${a.slug}`,
      lastModified: new Date(`${a.date}T00:00:00`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

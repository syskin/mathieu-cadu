import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getPublished } from "@/lib/writing";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getPublished(); // newest first
  // La home et le carnet bougent au rythme des publications ; pas de fausse
  // fraîcheur datée du build.
  const latest = articles[0]?.date;
  return [
    {
      url: site.url,
      ...(latest && { lastModified: latest }),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${site.url}/carnet`,
      ...(latest && { lastModified: latest }),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${site.url}/projets`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...articles.map((a) => ({
      url: `${site.url}/carnet/${a.slug}`,
      lastModified: a.date,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

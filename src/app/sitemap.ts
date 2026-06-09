import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getPublished } from "@/lib/writing";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${site.url}/ecrits`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...getPublished().map((a) => ({
      url: `${site.url}/ecrits/${a.slug}`,
      lastModified: new Date(`${a.date}T00:00:00`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

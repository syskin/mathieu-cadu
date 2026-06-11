import { site } from "@/lib/site";
import { getPublished } from "@/lib/writing";

// Flux figé au build, comme le reste du site (SSG).
export const dynamic = "force-static";

const ENTITIES: Record<string, string> = {
  "<": "&lt;",
  ">": "&gt;",
  "&": "&amp;",
  "'": "&apos;",
  '"': "&quot;",
};

const escapeXml = (s: string) => s.replace(/[<>&'"]/g, (c) => ENTITIES[c]);

export function GET() {
  const items = getPublished()
    .map((a) => {
      const url = `${site.url}/carnet/${a.slug}`;
      return `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(a.summary)}</description>
      <pubDate>${new Date(`${a.date}T00:00:00Z`).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${site.name} — Carnet`)}</title>
    <link>${site.url}/carnet</link>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>${escapeXml(site.description)}</description>
    <language>${site.lang}</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}

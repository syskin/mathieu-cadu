import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { articleMetaSchema, type ArticleMeta } from "../content/writing/schema";

const DIR = join(process.cwd(), "src/content/writing");

function slugsOnDisk(): string[] {
  return readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/** Read + validate one article's frontmatter and body. Throws on invalid frontmatter. */
export function getArticle(slug: string): { meta: ArticleMeta; content: string } {
  const raw = readFileSync(join(DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  const meta = articleMetaSchema.parse(data);
  return { meta: { ...meta, slug }, content };
}

/** All article metas, validated. `includeDrafts` true only for the build gate. */
export function getAllMeta(includeDrafts = false): ArticleMeta[] {
  return slugsOnDisk()
    .map((slug) => getArticle(slug).meta)
    .filter((m) => includeDrafts || !m.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Published articles, newest first (drafts hidden). For the site + sitemap. */
export const getPublished = (): ArticleMeta[] => getAllMeta(false);

import { z } from "zod";

/** Article kinds — the recurring content engine (XP, sides, tool tests, notes). */
export const ArticleKind = z.enum([
  "retour-xp",
  "side-project",
  "test-outil",
  "note",
]);
export type ArticleKind = z.infer<typeof ArticleKind>;

export const KIND_LABEL: Record<ArticleKind, string> = {
  "retour-xp": "Retour d'expérience",
  "side-project": "Side project",
  "test-outil": "Test d'outil",
  note: "Note",
};

/** Article frontmatter. Validated at build (the writing rail). */
export const articleMetaSchema = z.object({
  title: z.string().min(1),
  // YAML turns an unquoted `2026-06-09` into a Date; coerce back to an ISO day string.
  date: z.preprocess(
    (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v),
    z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD"),
  ),
  summary: z.string().min(1).max(200),
  kind: ArticleKind,
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});
export type ArticleMetaInput = z.input<typeof articleMetaSchema>;
export type ArticleMeta = z.infer<typeof articleMetaSchema> & { slug: string };

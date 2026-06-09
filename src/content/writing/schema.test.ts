import { describe, it, expect } from "vitest";
import { articleMetaSchema } from "./schema";

const base = {
  title: "Titre",
  date: "2026-06-09",
  summary: "Résumé court.",
  kind: "note",
} as const;

describe("article rail", () => {
  it("rejects a malformed date", () => {
    expect(() => articleMetaSchema.parse({ ...base, date: "2026/06/09" })).toThrow();
  });
  it("rejects an unknown kind", () => {
    expect(() => articleMetaSchema.parse({ ...base, kind: "blog" })).toThrow();
  });
  it("accepts valid frontmatter and defaults draft to false", () => {
    const parsed = articleMetaSchema.parse(base);
    expect(parsed.draft).toBe(false);
  });
});

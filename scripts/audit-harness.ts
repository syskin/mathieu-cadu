/**
 * Harness self-audit — keeps the harness in lockstep with the platform.
 *
 * As the platform grows (new content, pages, pillars), these invariants fail loudly
 * the moment the harness falls behind — so coverage can never silently rot.
 * Wired into `pnpm check`. Run: pnpm harness:audit.
 */
import { readdirSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { projects } from "../src/content/projects";

const root = process.cwd();
let errors = 0;
const fail = (m: string) => {
  console.error(`✗ ${m}`);
  errors++;
};

// 1. No orphan content — every project module is registered on the rail (= validated).
const dir = join(root, "src/content/projects");
const moduleFiles = readdirSync(dir).filter(
  (f) => f.endsWith(".ts") && f !== "index.ts" && !f.endsWith(".test.ts"),
);
const slugs = new Set(projects.map((p) => p.slug));
if (moduleFiles.length !== projects.length) {
  fail(
    `content drift: ${moduleFiles.length} file(s) in src/content/projects but ${projects.length} registered. Every content file must be imported + parsed in index.ts.`,
  );
}
for (const f of moduleFiles) {
  const slug = f.replace(/\.ts$/, "");
  if (!slugs.has(slug)) {
    fail(`content drift: ${f} has no registered project with slug "${slug}". Register it or rename to match its slug.`);
  }
}

// 2. Homepage invariant — at least one featured project.
if (!projects.some((p) => p.featured)) fail("no featured project — the homepage would be empty.");

// 3. SEO rail present.
for (const f of ["src/app/sitemap.ts", "src/app/robots.ts", "src/app/layout.tsx"]) {
  if (!existsSync(join(root, f))) fail(`SEO rail missing: ${f}`);
}

// 4. Governance present.
for (const f of ["AGENTS.md", "CLAUDE.md", "docs/strategy.md", "docs/SOURCES.md"]) {
  if (!existsSync(join(root, f))) fail(`governance doc missing: ${f}`);
}
const adrDir = join(root, "docs/adr");
const adrs = existsSync(adrDir) ? readdirSync(adrDir).filter((f) => f.endsWith(".md")) : [];
if (adrs.length === 0) fail("no ADRs in docs/adr — decisions must be journaled.");

// 5. Gate completeness — `check` must run all the rails (self-referential).
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const check: string = pkg.scripts?.check ?? "";
for (const step of ["validate", "harness:security", "vitest", "harness:audit"]) {
  if (!check.includes(step)) fail(`pnpm check is missing the "${step}" step — the gate would skip it.`);
}

if (errors > 0) {
  console.error(`\nHarness audit FAILED: ${errors} issue(s). The harness has drifted from the platform.`);
  process.exit(1);
}
console.log(
  `✓ Harness in lockstep: ${projects.length} project(s) on the rail, ${adrs.length} ADR(s), SEO + governance + gate intact.`,
);

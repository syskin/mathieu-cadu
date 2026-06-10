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

// 3. SEO rail present (incl. identity assets: favicon, apple icon, OG image, portrait).
for (const f of [
  "src/app/sitemap.ts",
  "src/app/robots.ts",
  "src/app/layout.tsx",
  "src/app/icon.png",
  "src/app/apple-icon.png",
  "src/app/opengraph-image.png",
  "public/portrait.webp",
]) {
  if (!existsSync(join(root, f))) fail(`SEO rail missing: ${f}`);
}

// 4. Governance present (incl. brand foundation).
for (const f of [
  "AGENTS.md",
  "CLAUDE.md",
  "docs/strategy.md",
  "docs/SOURCES.md",
  "docs/tone.md",
  "PRODUCT.md",
  "DESIGN.md",
]) {
  if (!existsSync(join(root, f))) fail(`governance doc missing: ${f}`);
}
const adrDir = join(root, "docs/adr");
const adrs = existsSync(adrDir) ? readdirSync(adrDir).filter((f) => f.endsWith(".md")) : [];
if (adrs.length === 0) fail("no ADRs in docs/adr — decisions must be journaled.");

// 5. Illustration rail — every project ships its cover (pages render /projects/<slug>.webp),
// and the intake space stays wired: drop/ is gitignored (public repo — raw drops never ship),
// the pipeline + cadrage flow exist.
for (const p of projects) {
  if (!existsSync(join(root, "public/projects", `${p.slug}.webp`)))
    fail(`missing cover: public/projects/${p.slug}.webp — run \`pnpm illustrate ${p.slug}\` (raw file in drop/${p.slug}/).`);
}
for (const f of ["drop/README.md", "scripts/illustrate.mjs", ".claude/skills/cadrage/SKILL.md"]) {
  if (!existsSync(join(root, f))) fail(`intake rail missing: ${f}`);
}
const gitignore = readFileSync(join(root, ".gitignore"), "utf8");
if (!gitignore.includes("/drop/*"))
  fail(".gitignore must ignore /drop/* — raw illustration drops must never reach the public tree.");

// 6. Gate completeness — `check` must run all the rails (self-referential).
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

/**
 * Content validation gate.
 *
 * Importing ./src/content/projects already runs the Zod schema on every project
 * (the rail). This script makes that guarantee explicit and adds anti-invention
 * guards on top: a fact may not be a placeholder while claiming a source.
 *
 * Run: pnpm validate  (tsx scripts/validate-content.ts)
 * Exit 0 = clean, exit 1 = fail.
 */
import { projects } from "../src/content/projects";

const PLACEHOLDER = /\b(TODO|TBD|XXX|FIXME|lorem|à ?remplir)\b|\?\?\?/i;

type Fact = { where: string; value: string; ref: string };

let errors = 0;
const fail = (msg: string) => {
  console.error(`✗ ${msg}`);
  errors++;
};

for (const p of projects) {
  const facts: Fact[] = [];

  if (p.build?.agenticFlow) {
    facts.push({
      where: `${p.slug}.build.agenticFlow`,
      value: p.build.agenticFlow.summary,
      ref: p.build.agenticFlow.source.ref,
    });
  }
  for (const g of p.build?.guardrails ?? []) {
    facts.push({ where: `${p.slug}.build.guardrail`, value: g.text, ref: g.source.ref });
  }
  for (const m of p.build?.metrics ?? []) {
    facts.push({
      where: `${p.slug}.build.metric:${m.label}`,
      value: m.value,
      ref: m.source.ref,
    });
  }

  for (const f of facts) {
    if (PLACEHOLDER.test(f.value)) {
      fail(`${f.where}: placeholder value "${f.value}" claims a source — fill it with a real fact or remove the entry.`);
    }
    if (PLACEHOLDER.test(f.ref)) {
      fail(`${f.where}: placeholder source "${f.ref}" — a fact must carry a real source (never invent).`);
    }
  }
}

if (errors > 0) {
  console.error(`\nContent validation FAILED: ${errors} issue(s).`);
  process.exit(1);
}

const sourced = projects.reduce(
  (n, p) =>
    n +
    (p.build?.agenticFlow ? 1 : 0) +
    (p.build?.guardrails.length ?? 0) +
    (p.build?.metrics.length ?? 0),
  0,
);
console.log(`✓ Content valid: ${projects.length} project(s), ${sourced} sourced fact(s), 0 unsourced.`);

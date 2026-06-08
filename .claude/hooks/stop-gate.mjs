#!/usr/bin/env node
/**
 * Claude Code Stop hook.
 *
 * The agent cannot finish a session on a broken tree. Runs the full local gate
 * (`pnpm check`: types + lint + content provenance + tests). If anything is red,
 * blocks the stop (exit 2) and feeds the failure back so the agent keeps fixing.
 *
 * Loop guard: if a Stop hook already blocked once this turn (stop_hook_active),
 * allow the stop to avoid an infinite loop.
 */
import { execSync } from "node:child_process";

const projectDir = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();

async function readStdin() {
  const chunks = [];
  for await (const c of process.stdin) chunks.push(c);
  return Buffer.concat(chunks).toString("utf8");
}

const raw = await readStdin();
try {
  if (JSON.parse(raw)?.stop_hook_active === true) process.exit(0); // loop guard
} catch {
  // proceed with the check even if input is unparseable
}

try {
  execSync("pnpm -s check", { cwd: projectDir, stdio: "pipe" });
  process.exit(0);
} catch (err) {
  const out = `${err.stdout ?? ""}${err.stderr ?? ""}`.trim();
  console.error(
    `Local gate (pnpm check) is red — cannot finish on a broken tree:\n${out}`,
  );
  process.exit(2); // block stop, agent must keep fixing
}

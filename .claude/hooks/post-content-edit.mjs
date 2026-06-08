#!/usr/bin/env node
/**
 * Claude Code PostToolUse hook (matcher: Edit|Write).
 *
 * When content under src/content/ is edited, immediately re-validate it and feed
 * any failure straight back to the agent (exit 2 + stderr). This is the live
 * feedback loop: fabricated/unsourced facts get rejected the moment they're written,
 * not at commit time.
 */
import { execSync } from "node:child_process";

const projectDir = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();

async function readStdin() {
  const chunks = [];
  for await (const c of process.stdin) chunks.push(c);
  return Buffer.concat(chunks).toString("utf8");
}

const raw = await readStdin();
let filePath = "";
try {
  filePath = JSON.parse(raw)?.tool_input?.file_path ?? "";
} catch {
  process.exit(0); // unparseable input → don't block
}

// Only act on content rail edits.
if (!/[\\/]src[\\/]content[\\/].*\.ts$/.test(filePath)) process.exit(0);

try {
  execSync("pnpm -s validate", { cwd: projectDir, stdio: "pipe" });
  process.exit(0);
} catch (err) {
  const out = `${err.stdout ?? ""}${err.stderr ?? ""}`.trim();
  console.error(
    `Content validation failed after editing ${filePath}:\n${out}\n` +
      `Golden rule: every fact needs a real source, never invent. Fix before continuing.`,
  );
  process.exit(2); // feed error back to the agent
}

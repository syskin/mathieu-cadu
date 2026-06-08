#!/usr/bin/env node
/**
 * Micro-harness — perimeter: security.
 *
 * Scans every tracked file for things that must never reach the public repo:
 *   - personal emails / PII   (the gap that previously leaked a personal address)
 *   - secret tokens & private keys
 *   - tracked .env files
 *
 * Node-only, zero external dependency. Run: pnpm harness:security  (exit 1 = leak).
 */
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const NOREPLY = "users.noreply.github.com";
const BINARY = /\.(png|jpe?g|gif|ico|webp|svg|woff2?|ttf|eot|pdf|lock)$/i;
const SKIP_FILES = new Set(["pnpm-lock.yaml", "yarn.lock", "package-lock.json"]);

const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
const SECRETS = [
  { name: "GitHub PAT", re: /\bghp_[A-Za-z0-9]{36}\b/ },
  { name: "GitHub fine-grained PAT", re: /\bgithub_pat_[A-Za-z0-9_]{22,}\b/ },
  { name: "AWS access key id", re: /\bAKIA[0-9A-Z]{16}\b/ },
  { name: "Slack token", re: /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/ },
  { name: "OpenAI key", re: /\bsk-[A-Za-z0-9]{20,}\b/ },
  { name: "Private key", re: /-----BEGIN [A-Z ]*PRIVATE KEY-----/ },
];

const files = execSync("git ls-files", { encoding: "utf8" }).split("\n").filter(Boolean);

let findings = 0;
const flag = (file, msg) => {
  console.error(`✗ ${file}: ${msg}`);
  findings++;
};

const isAllowedEmail = (e) =>
  e.endsWith(NOREPLY) ||
  e.endsWith("@example.com") ||
  e.endsWith("@test.com") ||
  /^noreply@/.test(e) ||
  e === "git@github.com"; // SSH remote host, not PII

// Harness scripts legitimately contain secret *patterns* (they are the scanners).
// Email scan still applies to them; only the secret-pattern scan is skipped.
const isHarnessFile = (f) => f.startsWith(".githooks/") || f.startsWith("scripts/harness/");

for (const f of files) {
  const base = f.split("/").pop();

  // Tracked .env files (allow .example/.sample/.template).
  if (/^\.env(\..+)?$/.test(base) && !/\.(example|sample|template)$/.test(base)) {
    flag(f, "tracked .env file would be published");
  }

  if (BINARY.test(f) || SKIP_FILES.has(base)) continue;
  if (base.endsWith(".example") || base.endsWith(".sample")) continue;

  let text;
  try {
    text = readFileSync(f, "utf8");
  } catch {
    continue;
  }

  for (const m of text.matchAll(EMAIL)) {
    if (!isAllowedEmail(m[0])) flag(f, `personal email exposed: ${m[0]} (use a GitHub noreply address)`);
  }
  if (!isHarnessFile(f)) {
    for (const s of SECRETS) {
      if (s.re.test(text)) flag(f, `${s.name} detected`);
    }
  }
}

if (findings > 0) {
  console.error(`\nSecurity scan FAILED: ${findings} finding(s). Nothing sensitive may reach the public repo.`);
  process.exit(1);
}
console.log(`✓ Security: ${files.length} tracked file(s) scanned, no PII / secret / .env leak.`);

#!/usr/bin/env node
/**
 * Micro-harness — perimeter: supply chain.
 *
 * Fails the gate on HIGH/CRITICAL advisories in dependencies (`pnpm audit`).
 * Network-tolerant: if the registry is unreachable it warns and passes, so
 * offline work isn't falsely blocked. Run: pnpm harness:supply.
 * Wired into pre-push (network-bound, so not in the per-commit gate).
 */
import { execSync } from "node:child_process";

try {
  const out = execSync("pnpm audit --audit-level=high", {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  process.stdout.write(out);
  console.log("✓ Supply chain: no high/critical advisories.");
  process.exit(0);
} catch (err) {
  const out = `${err.stdout ?? ""}\n${err.stderr ?? ""}`;
  process.stdout.write(out);
  if (/ERR_PNPM_|ENOTFOUND|fetch failed|ETIMEDOUT|getaddrinfo|network|unable to/i.test(out)) {
    console.warn("⚠ Supply chain: registry unreachable — skipped (re-run online).");
    process.exit(0);
  }
  console.error("✗ Supply chain: high/critical advisory found. Resolve before pushing.");
  process.exit(1);
}

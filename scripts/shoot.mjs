#!/usr/bin/env node
/**
 * Visual check — starts `next start`, screenshots key routes (desktop + mobile),
 * dumps rendered text, then stops the server. Artifacts in .screenshots/.
 * Requires a prior `pnpm build`. Run: pnpm shoot.
 */
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";

const PORT = 4321;
const BASE = `http://127.0.0.1:${PORT}`;
const OUT = ".screenshots";
const ROUTES = [
  { path: "/", name: "home" },
  { path: "/carnet", name: "carnet" },
  { path: "/carnet/a-propos-du-carnet", name: "article" },
];

async function waitReady(url, tries = 80) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url);
      if (r.status < 500) return;
    } catch {
      /* not up yet */
    }
    await new Promise((res) => setTimeout(res, 500));
  }
  throw new Error("server not ready");
}

mkdirSync(OUT, { recursive: true });
const server = spawn("pnpm", ["exec", "next", "start", "-p", String(PORT)], {
  stdio: "ignore",
});

try {
  await waitReady(BASE);
  const browser = await chromium.launch();

  // Desktop
  const desktop = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  for (const r of ROUTES) {
    await desktop.goto(BASE + r.path, { waitUntil: "networkidle" });
    await desktop.screenshot({ path: `${OUT}/${r.name}.png`, fullPage: true });
    const text = (await desktop.locator("body").innerText()).replace(/\n{2,}/g, "\n");
    console.log(`\n===== ${r.path} (desktop) =====\n${text}`);
  }

  // Mobile home
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto(BASE, { waitUntil: "networkidle" });
  await mobile.screenshot({ path: `${OUT}/home-mobile.png`, fullPage: true });

  await browser.close();
  console.log(`\n✓ screenshots in ${OUT}/`);
} finally {
  server.kill();
}

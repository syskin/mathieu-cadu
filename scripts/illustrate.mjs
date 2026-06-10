#!/usr/bin/env node
/**
 * Illustration pipeline — turns raw drops into shippable web assets.
 *
 * Mathieu drops raw files (any size/format) in drop/<slug>/ (gitignored).
 * This script optimizes them into committed public/ assets:
 *
 *   Project (default):
 *     cover.*  (or the only image)  → public/projects/<slug>.webp        (≤1600w)
 *                                   → public/projects/<slug>-thumb.webp  (640×640, top-center crop)
 *     other images                  → public/projects/<slug>/<name>.webp (≤1600w)
 *
 *   Note (--note):
 *     all images                    → public/carnet/<slug>/<name>.webp   (≤1600w)
 *
 * Run: pnpm illustrate <slug> [--note]
 */
import sharp from "sharp";
import { readdirSync, mkdirSync, existsSync } from "node:fs";
import { join, parse } from "node:path";

const args = process.argv.slice(2);
const isNote = args.includes("--note");
const slug = args.find((a) => !a.startsWith("--"));
if (!slug) {
  console.error("Usage: pnpm illustrate <slug> [--note]");
  process.exit(1);
}

const srcDir = join("drop", slug);
if (!existsSync(srcDir)) {
  console.error(`✗ ${srcDir}/ not found. Drop raw images there first.`);
  process.exit(1);
}

const IMG = /\.(png|jpe?g|webp|avif|tiff?)$/i;
const files = readdirSync(srcDir).filter((f) => IMG.test(f));
if (files.length === 0) {
  console.error(`✗ no image in ${srcDir}/ (accepted: png, jpg, webp, avif, tiff).`);
  process.exit(1);
}

const toWebp = (input, output, width = 1600) =>
  sharp(input)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(output)
    .then(() => console.log(`✓ ${output}`));

if (isNote) {
  const outDir = join("public", "carnet", slug);
  mkdirSync(outDir, { recursive: true });
  for (const f of files) {
    await toWebp(join(srcDir, f), join(outDir, `${parse(f).name}.webp`));
  }
} else {
  mkdirSync("public/projects", { recursive: true });
  // cover.* wins; a single image is the cover by default.
  const cover =
    files.find((f) => parse(f).name.toLowerCase() === "cover") ??
    (files.length === 1 ? files[0] : undefined);

  if (cover) {
    const src = join(srcDir, cover);
    await toWebp(src, join("public/projects", `${slug}.webp`));
    const m = await sharp(src).metadata();
    const size = Math.min(m.width, m.height);
    await sharp(src)
      .extract({ left: Math.round((m.width - size) / 2), top: 0, width: size, height: size })
      .resize(640, 640)
      .webp({ quality: 82 })
      .toFile(join("public/projects", `${slug}-thumb.webp`));
    console.log(`✓ public/projects/${slug}-thumb.webp`);
  } else {
    console.warn(`! no cover.* among ${files.length} images — no cover/thumb generated.`);
  }

  const extras = files.filter((f) => f !== cover);
  if (extras.length > 0) {
    const outDir = join("public", "projects", slug);
    mkdirSync(outDir, { recursive: true });
    for (const f of extras) {
      await toWebp(join(srcDir, f), join(outDir, `${parse(f).name}.webp`));
    }
  }
}

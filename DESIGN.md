# DESIGN — mathieu-cadu

Design system. Concept, tokens, rules. Visual source of truth. Brief: `PRODUCT.md`.

## Concept directeur — Établi d'ingénieur (atelier + technique)

A builder's workbench. Warm and material like an atelier, but with the precision and depth of an instrument: layered surfaces, hairline grid, monospace for real data. The work is *made*, shown, never bragged about. No skeuomorphism (no wood textures), no neon-terminal cliché, no "handcrafted indie" cream template. Depth + monospace data carry the technical feel; warmth keeps it human.

## Register
Brand (design IS the product). Intent: humble, sober showcase of expertise + technical currency. NOT a "hire me / available" page. Key facts at a glance.

## Color — bi-mode (OKLCH)

Runtime tokens: `--c-*` defined in `:root` (light) and `html.dark` (dark), exposed to Tailwind via `@theme inline`. Toggle persists in `localStorage`; default follows `prefers-color-scheme`. Never `#000`/`#fff`.

Light — "Terre & laiton" (warm sand, espresso ink, bronze + terracotta):
| Token | light | role |
|---|---|---|
| `bg` / `surface` / `raised` | `0.965 0.01 80` / `0.94 0.012 78` / `0.99 0.006 80` | page / tiles / lifted |
| `ink` / `muted` / `faint` | `0.24 0.02 55` / `0.48 0.018 58` / `0.6 0.014 60` | text tiers |
| `line` | `0.86 0.012 72` | hairlines / grid |
| `accent` | `0.55 0.13 65` | bronze, text-safe |

Dark — "Atelier sombre / instrument" (warm charcoal, ivory ink, ember):
| Token | dark | role |
|---|---|---|
| `bg` / `surface` / `raised` | `0.2 0.012 60` / `0.24 0.014 58` / `0.27 0.016 58` | page / tiles / lifted |
| `ink` / `muted` / `faint` | `0.93 0.012 78` / `0.72 0.013 72` / `0.56 0.013 66` | text tiers |
| `line` | `0.33 0.014 60` | hairlines / grid |
| `accent` | `0.74 0.14 65` | ember, brighter for dark |

Shared roles: `brass` (fills/dots, not text), `terracotta`, `live`/`killed`/`dormant` (status), tuned per mode. Strategy: **Restrained** — warm neutrals + one accent ≤10%.

## Typography
- **Display** — Bricolage Grotesque (`--font-display`), 600–800. Hero, section + project titles.
- **Body** — Hanken Grotesk (`--font-body`), 400–700. Prose, descriptions.
- **Mono** — JetBrains Mono (`--font-mono`), for **real data only**: dates, status, kinds, stack, surfaces. Meaningful (data), not costume. The technical signal.
- No em dashes in copy (`:` `,` `()`). Fluid `clamp()` on hero, ≥1.25 ratio. Reading measure ≤72ch.

## Depth & texture (the "not flat" layer)
- Tiers: `bg` < `surface` (tiles) < `raised`. Tiles carry a subtle elevation (`.tile-depth`) + `--color-line` border.
- Faint technical **grid** background (`.grid-bg`, `--grid-line`, 32px) — very low contrast, instrument feel.
- Hover: subtle lift (transform) + accent border. Motion = opacity/transform only, ease-out, `prefers-reduced-motion` respected.

## Layout
- Landing = **bento of 3 cards** (Identité large · Carnet · Projets → `/projets`). No project list on home. Tiles content-height (`items-start`).
- Pages: max ~`64rem` shell; lists with hairline separators over identical card grids; no nested cards.

## Components
- **StatusBadge**: mono label + dot. live/killed/dormant → status tokens.
- **ThemeToggle**: client, toggles `html.dark` + persists; no-flash inline script in layout.

## Bans (on top of brand register)
- No neon-terminal. No mono as decoration (data only). No em dashes. No gradient text, no glassmorphism, no skeuomorphic textures. No personal email in markup. No availability/CV-selling language.

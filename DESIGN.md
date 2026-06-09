# DESIGN — mathieu-cadu

Design system. Concept, tokens, rules. Visual source of truth. Brief: `PRODUCT.md`.

## Concept directeur — Atelier / craft

A builder's workshop. Warm, material, concrete, human. The work is *made*, not talked about. Anti-corporate, but precise. No skeuomorphism (no wood textures), no "handcrafted indie" cream template. Craft comes from warm material tones + a humanist type with character + clean execution.

## Register
Brand (design IS the product). Audience: recruiters / senior-lead eng. Balance: not too plain, not overly technical, not over-artistic. Key facts at a glance.

## Color — "Terre & laiton" (OKLCH)

Material warmth: sand/plaster base, espresso ink, brass + terracotta. Neutrals tinted ~70°. Treatment: flat warm (no texture).

| Token | OKLCH | Role |
|---|---|---|
| `--color-bg` | `0.955 0.012 75` | page (warm sand/plaster) |
| `--color-surface` | `0.925 0.014 72` | raised blocks, subtle fills |
| `--color-ink` | `0.26 0.022 55` | primary text (espresso) |
| `--color-muted` | `0.50 0.018 58` | secondary text |
| `--color-faint` | `0.62 0.014 60` | metadata / tertiary |
| `--color-line` | `0.88 0.012 72` | hairlines |
| `--color-accent` | `0.55 0.12 70` | bronze — text-safe accent (links, kicker, marks) |
| `--color-brass` | `0.72 0.12 85` | brass — fills, dots, decoration only (low contrast for text) |
| `--color-terracotta` | `0.58 0.14 36` | secondary signal |
| `--color-live` | `0.55 0.10 150` | status: en ligne |
| `--color-killed` | `0.57 0.14 35` | status: arrêté (terracotta family) |
| `--color-dormant` | `0.62 0.015 60` | status: en pause |

Strategy: **Restrained** — warm neutrals + bronze accent ≤10%. Brass/terracotta are accents-of-accent, used sparingly. Never `#000`/`#fff`.

## Typography

- **Display** — Bricolage Grotesque (`--font-display`), weights 600–800. Headings, hero, section titles, project names. Contemporary, lightly irregular = the "made" character.
- **Body** — Hanken Grotesk (`--font-body` / default sans), weights 400–700. Everything else. Clean humanist.
- No monospace (would read as costume here). No em dashes in copy (use `:` `,` `()`).
- Scale: fluid `clamp()` on the hero, modular ≥1.25 ratio. Body 1rem–1.0625rem, line-length ≤72ch.

## Layout & rhythm
- Max content width ~ `48rem` (3xl), left-aligned. Generous vertical rhythm, varied (not uniform padding).
- Lists with hairline separators over identical card grids. No nested cards.
- Sections separated by `--color-line` rules.

## Components
- **StatusBadge** (`src/components/StatusBadge.tsx`): dot + label. live→`--color-live`, killed→`--color-killed`, dormant→`--color-dormant`.

## Motion
- None for v1 (flat warm, fast). Entrance choreography optional later via the `animate` pass.

## Bans (project-specific, on top of brand register)
- No mono costume. No em dashes. No gradient text, no glassmorphism. No personal email in markup (contact via LinkedIn/GitHub). No skeuomorphic textures.

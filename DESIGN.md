# DESIGN — mathieu-cadu

Design system. Concept, tokens, rules. Visual source of truth. Brief: `PRODUCT.md`.

## Concept directeur — Le Bento Monolithe (Industrial Overview)

A fusion of industrial weight and information density. Inspired by technical dashboards and monolithic engineering blocks. The site provides an immediate, structured overview via a bento-style grid of solid monoliths. Authority through structure, precision through density.

## Register
Brand (design IS the product). Intent: humble, sober showcase of expertise + technical currency. NOT a "hire me / available" page. Key facts at a glance.

## Color — bi-mode (OKLCH)

Direction: **Warm Charcoal & Steel Blue**. Deep technical grays, off-white text. Accent: **Steel Blue** (Bleu Acier) for focus and technical signals.

Light — "Acier Froid" (light gray, charcoal ink, steel blue):
| Token | light | role |
|---|---|---|
| `bg` / `surface` / `raised` | `0.94 0.01 240` / `0.9 0.015 240` / `0.98 0.005 240` | base / blocks / lifted |
| `ink` / `muted` / `faint` | `0.15 0.01 240` / `0.4 0.015 240` / `0.55 0.01 240` | text tiers |
| `line` | `0.8 0.015 240` | hairlines |
| `accent` | `0.5 0.12 230` | steel blue |

Dark — "Bleu de Minuit" (warm charcoal, ivory ink, luminous steel blue):
| Token | dark | role |
|---|---|---|
| `bg` / `surface` / `raised` | `0.14 0.01 240` / `0.18 0.015 240` / `0.22 0.02 240` | ink / monolithic / lifted |
| `ink` / `muted` / `faint` | `0.94 0.01 240` / `0.7 0.015 240` / `0.5 0.01 240` | text tiers |
| `line` | `0.25 0.015 240` | hairlines |
| `accent` | `0.7 0.12 230` | luminous steel blue |

## Typography
- **Display & Body** — Schibsted Grotesk (`--font-sans`), 400–900. Authoritative, industrial.
- **Mono** — JetBrains Mono (`--font-mono`), for **real data only**.
- Zero rounded corners. Extreme weight contrast.

## UI copy & labels (anti-drift)
- **La voix éditoriale (prose) vit dans `docs/tone.md`** : adresse impersonnelle, « je » chaleureux, registre unique. Ici, uniquement les labels d'interface.
- **FR partout**, y compris titres de pages et micro-labels. Titres de sections = la terminologie de PRODUCT.md (« Projets », « Carnet »), jamais de titres anglais (« Blueprint Archive », « Workshop Notes » = dérive).
- **Mono = vraies données** (dates, statuts, stack, surfaces). Jamais de snake_case décoratif (`CURRENT_STATUS`, `LIRE_ENTRY`, `RUN[x]`) : c'est le cosplay terminal que PRODUCT.md bannit.
- Labels d'action courts et littéraux : « Lire la note → », « Tous les projets → », « Tout le carnet → », `{label} ↗` pour les liens externes.
- Aucun texte fabriqué en attendant le vrai contenu : afficher les faits du rail (problem / decision / architecture / lesson) ou rien.
- Aucune mention de disponibilité ni d'appel au recrutement (registre interdit par PRODUCT.md).

## Texture & Layout
- **Bento Monoliths**: High-density grid of sharp-edged blocks.
- **Overview at a glance**: The landing page is a compact grid of different heights/widths.
- **Technical Shadows**: Sharp, 4px/6px offset shadows for depth.
- **Functional Density**: Maximize information without clutter; use mono for metadata.

## Entity Archetypes

### 01 / Projets (The Blueprint)
- **Intent**: Technical evidence & architectural depth.
- **Visuals**: Large "Blueprint" zones for technical diagrams, screenshots, or infra maps.
- **Layout**: High-density specs (stack, surfaces, dates) paired with a post-mortem/lesson area.
- **Affordance**: Primary links lead to the live product or repo.

### 02 / Carnet (The Workshop Note)
- **Intent**: Intellectual currency & technical writing.
- **Visuals**: Lead illustrations or code snippets as visual anchors.
- **Layout**: Optimized for reading (max 65ch), vertical flow, technical margin-notes for metadata.
- **Affordance**: Smooth transitions between notes.

## Identity assets
- **Portrait** (cartoon, profil) : source brute dans `drop/portrait/`, servi en `public/portrait.webp`. Usages : header (36px, carré monolith), carte Repères (aspect 5/4, object-top), JSON-LD Person.
- **Favicon / apple-icon** : crop tête du portrait → `src/app/icon.png` (512) + `apple-icon.png` (180).
- **OG image** : `src/app/opengraph-image.png` (1200×630) — fond charcoal, liseré accent, nom + rôle, portrait à droite. Régénération : pipeline sharp depuis `drop/portrait/portrait.png`.
- Tout asset d'identité est exigé par `audit-harness.ts` (rail SEO).

## Illustration Strategy
- **Projects**: real product captures only (`public/projects/{slug}.webp`, vignettes carrées `{slug}-thumb.webp`). Captures live via Playwright ; archive nuxtolio pour les projets arrêtés. Pas de zones placeholder grises.
- **Carnet**: pas d'image tant qu'il n'y a pas de visuel réel ; la typo porte la carte.
- **Style**: Grayscale au repos, couleur au hover. No generic stock photos. High-contrast, sharp.


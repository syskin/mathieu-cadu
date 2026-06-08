# ADR 0001 — Positionnement, cible et stack

- **Statut :** accepté
- **Date :** 2026-06
- **Contexte :** refonte du site de personal branding (successeur de `nuxtolio`, Nuxt 2 gelé).

## Décision

### Positionnement & cible
- Cible #1 : **recruteurs / employeurs**, niveau lead / staff / product-minded engineer.
- Positionnement **hybride A+C** : product-minded engineer + lucidité assumée.
- 3 piliers : jugement produit · écosystèmes multi-plateformes · ingénierie AI cadrée.
- Règle d'or : **show, don't tell** — preuve par artefact, jamais par prose.

### Stack
- **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind 4 + Zod.**
- Raisons : stack actuelle de Mathieu (Boney, Changelogit, Pertinent) ; SSG/SSR = SEO natif ; écosystème mûr.
- Rejeté : migrer Nuxt 2 (EOL, dette) ; rester en SPA non indexable.

### Agentic-first
- Le repo est l'artefact prouvant le pilier 3. Conventions dans `AGENTS.md`.
- Contenu = **rail typé Zod** validé au build ; un projet `killed` doit porter sa `lesson` (contrainte de schéma).
- Décisions journalisées en ADR.

### SEO
- Metadata API, `sitemap.ts`, `robots.ts`, JSON-LD. SSG par défaut.

## Conséquences
- Pas de contenu non typé. Toute fiche projet passe par `schema.ts`.
- Le bloc `build` reste vide tant que Mathieu n'a pas fourni les données réelles (flow, garde-fous, métriques). Aucune invention.
- Contrainte : pas d'open-source disponible → la preuve s'appuie sur artefacts montrables (flows sanitizés, métriques, propreté du repo).

# PRODUCT — mathieu-cadu

register: brand

Personal branding site for Mathieu Cadu. Design IS the product. Full positioning rationale: `docs/strategy.md`.

## Identity (read this first)
Mathieu is an **engineer / developer** — NOT a "product" profile. The headline is engineering. Product judgment, lucidity and ecosystem-thinking are *traits* that set him apart, never the job title.

## Intent (read this second)
This is **NOT** a "hire me / available" page. No availability badges, no CV-selling, no solicitation. It is a **humble, sober showcase of expertise** that demonstrates — without claiming — that Mathieu is skilled and **technically current**. Proof comes from artifacts: an active Carnet on recent tools, real projects, depth. Never from adjectives ("expert", "senior", "available").

The **Carnet is the heart**: publishing regularly on current tech IS the proof of being up to date. The home is a quiet statement of what he does and writes, not a pitch.

## Users
Read by peers and, incidentally, recruiters. They skim fast, distrust buzzwords, value evidence. The site earns credibility by showing craft, never by asking for anything.

## Positioning (the one idea)
Engineer who ships complete products and owns his calls (incl. the kills). Accroche retenue (2026-06-10) : *"Des produits faits maison. Web, mobile, jusqu'à la prod : je les fabrique en entier. Ici je raconte ce qui tourne, ce qui s'est arrêté, et ce que j'en retiens."*

## Three differentiators (traits, not titles)
1. **Lucidity / judgment** — launches AND kills; learns from it. (Content-LD, killed, carries its lesson.)
2. **Multi-platform ecosystems** — web + native around one idea. (Boney: web/Android/Supabase.)
3. **Disciplined AI engineering** — framed agentic flows, not vibe coding. Shown by artifacts, never claimed.

## Voix & copy — l'atelier ouvert
**Référence complète : `docs/tone.md`** (source de vérité, arbitrée 2026-06-10). Résumé :
First person ("je"), concrete, **warm**. The builder telling what he made, what lives, what he stopped and why. Owns the calls, including the kills. Show, don't tell: a killed project with its lesson is a feature, not a confession.

Rules:
- **Langue : FR uniquement** (pour l'instant). EN plus tard si besoin.
- **Adresse impersonnelle** : on ne s'adresse jamais au lecteur (ni « vous », ni « tu », ni question posée au visiteur).
- **Personnel et chaleureux** : le « je » raconte (contexte, intention, anecdote qui porte un fait). Chaleureux ≠ marketing.
- **Registre unique strict** : même voix sur toutes les surfaces (hero, fiches, carnet, README).
- Faits, dates, statuts, chiffres (sourcés) > adjectifs.
- Bannis : buzzwords ("passionné", "expert", "ninja", "rockstar", "fullstack passionné"), superlatifs creux, tiret cadratin (`—`), jargon marketing.
- Un arrêt se dit simplement, suivi de la leçon. Pas d'excuse, pas de drame.

Exemples (avant → après) :
- "Développeur passionné par les nouvelles technologies" → "Je construis des écosystèmes : web et mobile."
- "Projet malheureusement abandonné faute de traction" → "Content-LD, arrêté en 2023. Leçon : valider le marché avant le moteur."
- "…ce que vous y trouverez." → "…ce qu'on y trouve."

## Design target
Concept: **établi d'ingénieur** — atelier warmth + technical precision and depth. NOT flat: layered surfaces, subtle elevation, hairline grid, monospace for real data (dates, status, stack). NOT over-artistic, NOT a neon-terminal cliché. **Bi-mode light/dark** (the dark mode carries the technical mood). Landing = a compact bento of 3 cards (Identité, Carnet, Projets→/projets); no project list on the home.

## Anti-references (AI-slop traps to avoid)
- NOT the neon/terminal-green dev cliché. (Warm dark mode + monospace used for real data are fine; neon-on-black is the trap.)
- NOT cream editorial "indie hacker" template.
- NOT the hero-metric template (big number + gradient + supporting stats).
- NOT identical card grids of projects.
- No gradient text, no glassmorphism, no buzzword soup ("passionate full-stack developer").

## Terminologie (entités) — à respecter partout

Code en anglais (stable) ; labels FR figés ci-dessous. Ne PAS réintroduire "Travaux", "Écrits", ni le kind "side-project".

| Entité (code) | FR / section | Route | Sous-types (code → label FR) |
|---|---|---|---|
| `Project` | **Projets** (ce que je construis) | `/projets` | statut: `live`→En ligne, `killed`→Arrêté, `dormant`→En pause · surfaces: web/ios/android/api/infra/cli → Web/iOS/Android/API/Infra/CLI |
| `Article` | **Carnet** (ce que j'écris) | `/carnet`, `/carnet/[slug]` | kind: `retour-xp`→Retour d'expérience, `chantier`→Chantier (avancement d'un side), `test-outil`→Test d'outil, `note`→Note |
| `Source` | provenance d'un fait | — | `mathieu` / `linkedin` / `url` / `repo` / `commit` / `dashboard` |

Un **Projet** = ce qui est construit (Boney, Content-LD…). Un **Chantier** (article) = le journal d'avancement d'un side ; ça parle d'un Projet, ce n'en est pas un.

## Content shape
Typed rail (`src/content/`): projects carry status (live / killed / dormant), surfaces, stack, and (when sourced) build evidence. The status + lesson is the differentiator and must be visible, not buried.

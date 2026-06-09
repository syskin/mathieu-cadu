# PRODUCT — mathieu-cadu

register: brand

Personal branding site for Mathieu Cadu. Design IS the product. Full positioning rationale: `docs/strategy.md`.

## Identity (read this first)
Mathieu is an **engineer / developer** — NOT a "product" profile. The headline is engineering. Product judgment, lucidity and ecosystem-thinking are *traits* that set him apart, never the job title.

## Users
Audience #1: recruiters / employers, reading for **senior / lead software engineer** level. They skim fast, distrust buzzwords, value evidence. Main info must land at a glance.

## Positioning (the one idea)
Engineer who ships complete ecosystems and owns his calls (incl. the kills): *"Ingénieur logiciel. Je construis des écosystèmes complets — web, mobile, infra — et j'assume mes choix : ceux qui vivent comme ceux que j'ai enterrés."*

## Three differentiators (traits, not titles)
1. **Lucidity / judgment** — launches AND kills; learns from it. (Content-LD, killed, carries its lesson.)
2. **Multi-platform ecosystems** — web + native + infra around one idea. (Boney: web/iOS/Android/Supabase.)
3. **Disciplined AI engineering** — framed agentic flows, not vibe coding. Shown by artifacts, never claimed.

## Voix & copy — Carnet d'atelier
First person ("je"), concrete, terse, factual. The builder noting what he made, what lives, what he stopped and why. Owns the calls, including the kills. Show, don't tell: a killed project with its lesson is a feature, not a confession.

Rules:
- **Langue : FR uniquement** (pour l'instant). EN plus tard si besoin.
- 1re personne, phrases courtes, voix active.
- Faits, dates, statuts, chiffres (sourcés) > adjectifs.
- Bannis : buzzwords ("passionné", "expert", "ninja", "rockstar", "fullstack passionné"), superlatifs creux, tiret cadratin (`—`), jargon marketing.
- Un arrêt se dit simplement, suivi de la leçon. Pas d'excuse, pas de drame.

Exemples (avant → après) :
- "Développeur passionné par les nouvelles technologies" → "Je construis des écosystèmes : web, mobile, infra."
- "Projet malheureusement abandonné faute de traction" → "Content-LD, arrêté en 2023. Leçon : valider le marché avant le moteur."

## Design target (balance)
Clean, professional, scannable — NOT too plain, NOT overly technical (no spec-sheet costume), NOT over-artistic. The key facts (who he is, what he builds, the projects, how to reach him) graspable in one glance.

## Anti-references (AI-slop traps to avoid)
- NOT the generic dev-portfolio: dark mode + monospace + neon/terminal green.
- NOT cream editorial "indie hacker" template.
- NOT the hero-metric template (big number + gradient + supporting stats).
- NOT identical card grids of projects.
- No gradient text, no glassmorphism, no buzzword soup ("passionate full-stack developer").

## Terminologie (entités) — à respecter partout

Code en anglais (stable) ; labels FR figés ci-dessous. Ne PAS réintroduire "Travaux", "Écrits", ni le kind "side-project".

| Entité (code) | FR / section | Route | Sous-types (code → label FR) |
|---|---|---|---|
| `Project` | **Projets** (ce que je construis) | `/#projets` | statut: `live`→En ligne, `killed`→Arrêté, `dormant`→En pause · surfaces: web/ios/android/api/infra/cli → Web/iOS/Android/API/Infra/CLI |
| `Article` | **Carnet** (ce que j'écris) | `/carnet`, `/carnet/[slug]` | kind: `retour-xp`→Retour d'expérience, `chantier`→Chantier (avancement d'un side), `test-outil`→Test d'outil, `note`→Note |
| `Source` | provenance d'un fait | — | `mathieu` / `linkedin` / `url` / `repo` / `commit` / `dashboard` |

Un **Projet** = ce qui est construit (Boney, Content-LD…). Un **Chantier** (article) = le journal d'avancement d'un side ; ça parle d'un Projet, ce n'en est pas un.

## Content shape
Typed rail (`src/content/`): projects carry status (live / killed / dormant), surfaces, stack, and (when sourced) build evidence. The status + lesson is the differentiator and must be visible, not buried.

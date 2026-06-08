# ADR 0002 — Harness local, hooks, et provenance obligatoire

- **Statut :** accepté
- **Date :** 2026-06
- **Contexte :** besoin d'une boucle itérative robuste et professionnelle, 100 % locale (pas de CI/remote), qui *enforce* la règle d'or « ne rien inventer ».

## Décision

### Boucle de gate locale
`pnpm check` = `tsc --noEmit` + `eslint` + `pnpm validate` (provenance) + `vitest run`. Source unique de vérité du « vert ».

### Deux couches de hooks

**Git (natif, zéro dépendance)** — `core.hooksPath = .githooks` (câblé par le script `prepare` au `pnpm install`).
- `pre-commit` lance `pnpm check` → commit bloqué si rouge.
- `pre-push` (frontière publique — remote `git@github.com:syskin/mathieu-cadu.git` est **public**) lance `pnpm check` + **build de prod** + **scan secrets** (clés privées, fichiers `.env` trackés). Push bloqué si rouge. Plus lourd que pre-commit car un push public est rare et à fort enjeu.

**Claude Code (`.claude/settings.json`, committé)** — harness agentique :
- `PostToolUse` (matcher `Edit|Write`) → `post-content-edit.mjs` : si édition sous `src/content/`, revalide et renvoie l'erreur à l'agent (exit 2). Feedback live.
- `Stop` → `stop-gate.mjs` : lance `pnpm check`, bloque la fin de session si rouge (exit 2). Loop-guard via `stop_hook_active`.

Hooks écrits en Node (pas de dépendance à `jq`, absent de l'environnement).

### Provenance obligatoire (anti-invention mécanique)
Schéma : tout fait (`metrics`, `agenticFlow`, `guardrails`) porte une `source` (`{ kind, ref }`) sinon rejeté au build. `kind` inclut `linkedin` (source canonique, voir `docs/SOURCES.md`). Le script `validate-content.ts` rejette en plus toute valeur/source de type placeholder (`TODO`, `???`, …). Conséquence : impossible de glisser une donnée plausible non sourcée en silence.

## Conséquences
- Un fait non sourçable n'est pas écrit : il reste absent (champ vide = « pas encore documenté », valide).
- L'agent ne peut pas terminer une session sur un arbre cassé (Stop gate).
- `core.hooksPath` est config locale → un clone neuf doit lancer `pnpm install` (le `prepare` recâble). 
- Rejeté : husky/lint-staged (dépendance superflue), CI distante (pas de remote, tout local voulu).

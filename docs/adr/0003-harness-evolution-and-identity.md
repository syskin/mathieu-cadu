# ADR 0003 — Évolution continue du harness + identité de commit

- **Statut :** accepté
- **Date :** 2026-06
- **Contexte :** le harness doit rester en phase avec la plateforme (sinon il pourrit : nouveau contenu/page non couvert → l'invention et la dette repassent). Et le repo est public : l'identité des commits doit être maîtrisée.

## Décision

### Méta-gate anti-drift
`scripts/audit-harness.ts` (`pnpm harness:audit`, intégré à `pnpm check`) enforce le couplage plateforme ↔ harness. Invariants vérifiés :
1. **Pas de contenu orphelin** — tout fichier `src/content/projects/*.ts` est enregistré sur le rail (donc validé). Le nombre de fichiers == nombre de projets enregistrés ; chaque nom de fichier == un slug existant.
2. **Invariant homepage** — au moins un projet `featured`.
3. **Rail SEO présent** — `sitemap.ts`, `robots.ts`, `layout.tsx`.
4. **Gouvernance présente** — `AGENTS.md`, `CLAUDE.md`, `docs/strategy.md`, `docs/SOURCES.md`, ≥1 ADR.
5. **Complétude du gate** — `check` lance `validate`, `vitest`, `harness:audit` (auto-référentiel : retirer une étape casse l'audit).

Definition of Done documentée dans `AGENTS.md` : tout ajout (type, item, page, décision, étape de gate) doit étendre le harness dans le même changement.

### Identité de commit (enforcée)
Le repo public ne porte que les commits de syskin, avec une adresse GitHub **noreply** comme email de commit (aucune PII dans l'arbre ni dans les métadonnées). L'identité attendue est dans `.githooks/identity.local` (gitignoré, voir `.example`). Le `pre-commit` bloque toute autre identité. Config locale du repo fixée à syskin ; `core.sshCommand` déjà réglé.

**Incident corrigé :** des commits avaient été créés avec un email pro (mappé à un autre compte GitHub), puis un email perso s'était retrouvé en clair dans des fichiers trackés. Historique réécrit (`git filter-branch`, contenu + métadonnées) vers l'identité noreply de syskin et force-push (repo solo). Le guard pre-commit + le micro-harness `security` (scan PII/secrets) empêchent la récidive.

## Conséquences
- Impossible d'ajouter du contenu/des pages qui échappent au harness sans casser le gate.
- Les commits hors-identité sont bloqués localement avant d'atteindre le repo public.
- Rejeté : laisser le harness statique (drift garanti) ; se fier à une revue manuelle pour l'identité.

# ADR 0004 — Flow de cadrage `/cadrage` + espace d'illustrations `drop/`

- **Statut :** accepté
- **Date :** 2026-06
- **Contexte :** le contenu (projets, notes) arrive de manière ad hoc : champs oubliés, faits non sourcés, visuels gérés à la main. Le rail Zod valide la forme finale mais rien ne structure la **collecte** des faits auprès de Mathieu, ni le chemin des illustrations vers `public/` (repo public : aucun brut ne doit shipper tel quel).

## Décision

### Flow de cadrage (skill projet)
`.claude/skills/cadrage/SKILL.md` définit une interview structurée, pilotée par l'agent :

- **Deux modes** : `projet` (→ `src/content/projects/<slug>.ts`, type `ProjectInput`) et `note` (→ `src/content/writing/<slug>.mdx`, frontmatter validé, `draft: true` par défaut).
- **Questions mappées sur les schémas Zod** : enums posés en questions fermées, faits en questions libres, par paquets de 3-4. Ordre projet : identité → jugement produit → écosystème → preuve de build → preuve/visuels. Un projet `killed` exige sa leçon dès le cadrage.
- **Anti-fabrication mécanique** : un fait non donné par Mathieu = champ omis ou `TODO(mathieu)` ; toute métrique/guardrail/flow exige sa `Source` au moment de la collecte. La prose des notes reste celle de Mathieu : le flow structure, il n'écrit pas à sa place.
- Sortie systématique : enregistrement sur le rail, `pnpm validate` + `pnpm check`, récap des TODO restants.

### Espace d'illustrations
- `drop/<slug>/` = dépôt de bruts, **gitignoré** (`/drop/*`, README excepté) : rien ne part du dépôt brut vers le repo public.
- `scripts/illustrate.mjs` (`pnpm illustrate <slug> [--note]`) optimise vers les assets commités : `public/projects/<slug>.webp` (≤1600w, q82) + `<slug>-thumb.webp` (640² crop haut-centre), ou `public/carnet/<slug>/*.webp` pour les notes. `sharp` en devDependency.

### Harness (lockstep)
`audit-harness.ts` gagne l'invariant **rail d'illustration** :
1. chaque projet du rail possède sa couverture `public/projects/<slug>.webp` (les pages la rendent — son absence casserait le rendu silencieusement) ;
2. l'intake reste câblé : `drop/README.md`, `scripts/illustrate.mjs`, `.claude/skills/cadrage/SKILL.md` présents ;
3. `.gitignore` couvre `/drop/*`.

## Conséquences
- Créer une entité = une session de questions ciblées, pas un fichier écrit de mémoire ; les champs des trois piliers sont systématiquement posés.
- Un projet sans visuel ou un drop dé-gitignoré casse `pnpm check` avant le push.
- Rejeté : formulaire/CMS externe (sur-outillage pour un solo, et le repo lui-même est l'artefact) ; commit direct des images brutes (poids, formats, repo public).

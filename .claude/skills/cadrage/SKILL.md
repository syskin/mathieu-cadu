---
name: cadrage
description: Flow de cadrage interview pour structurer un projet ou une note du carnet. Pose des questions ciblées mappées sur les schémas Zod, génère le fichier typé sur le rail, traite les illustrations déposées dans drop/. Déclencheurs - /cadrage projet, /cadrage note, "cadrer un projet", "nouvelle note", "ajouter un projet".
---

# Cadrage — interview structurée vers le rail de contenu

Transforme une session de questions/réponses en entité validée sur le rail.
Deux modes : `projet` (→ `src/content/projects/<slug>.ts`) et `note` (→ `src/content/writing/<slug>.mdx`).
Si le mode n'est pas donné en argument, le demander d'abord.

## Règles non négociables (les trois piliers passent par là)

1. **Jamais fabriquer.** Chaque réponse de Mathieu est un fait ; ce qu'il n'a pas dit n'existe pas.
   Fait manquant = champ optionnel omis ou `TODO(mathieu)`, jamais un texte plausible.
2. **Provenance.** Toute métrique / guardrail / flow agentique exige une `Source` valide
   (voir `src/content/schema.ts` : `mathieu` exige une date, `url` un lien http, `commit` un sha…).
   Demander la source **avec** le fait : « le chiffre, et d'où il vient ». Pas de source = on n'écrit pas le fait.
3. **Voix** (`docs/tone.md`, la référence) : FR, « je » chaleureux, adresse impersonnelle (jamais
   « vous »/« tu »), zéro buzzword, zéro tiret cadratin. Un arrêt se dit simplement, suivi de sa leçon.
4. **Questions par paquets de 3-4 max**, fermées quand l'enum existe (utiliser AskUserQuestion
   avec les valeurs du schéma), libres pour les faits. Ne jamais redemander ce qui est déjà connu
   (LinkedIn, repo, conversation).

## Mode `projet`

Lire `src/content/schema.ts` avant de commencer. Interview en 5 paquets, dans cet ordre :

1. **Identité** : nom, slug (kebab-case), dates (« depuis 2024 », « 2022 – 2023 »),
   rôle (`solo`/`lead`/`team`), statut (`live`/`killed`/`dormant`).
   Si `killed` → demander la **leçon** immédiatement (obligatoire, le build échoue sans elle) :
   « Qu'est-ce que tu referais différemment ? Une phrase, factuelle. »
2. **Jugement produit** (pilier 1) : le problème (1 phrase), la décision produit (1 phrase),
   la tagline (≤ 90 caractères, le problème résolu, pas un slogan).
3. **Écosystème** (pilier 2) : surfaces (`web`/`ios`/`android`/`api`/`infra`/`cli`, multi),
   stack (libre), architecture en 1-2 phrases factuelles (optionnel, format
   « X → Y (rôle). Déployé sur Z »).
4. **Preuve de build** (pilier 3, tout optionnel mais tout sourcé) :
   - flow agentique réellement utilisé pour shipper (résumé sanitisé + source) ;
   - guardrails (evals, tests, structured output, gates humains) + source chacun ;
   - métriques (chiffres uniquement : délai concept→prod, cadence de ship…) + source chacune.
   Si rien n'est documentable aujourd'hui : laisser vide avec `TODO(mathieu)`, le dire, passer.
5. **Preuve & visuels** : liens publics (label + URL), featured ?, position dans la liste,
   illustrations (voir « Illustrations » ci-dessous).

Puis :
- Écrire `src/content/projects/<slug>.ts` (type `ProjectInput`, style des fichiers existants —
  imiter `boney.ts`).
- L'enregistrer dans `src/content/projects/index.ts` (l'audit rejette les orphelins).
- `pnpm validate` puis `pnpm check`. Échec de validation = corriger le contenu, pas le schéma.

## Mode `note`

Lire `src/content/writing/schema.ts`. Interview en 2 paquets :

1. **Frontmatter** : kind (`retour-xp`/`chantier`/`test-outil`/`note`), titre, date (YYYY-MM-DD),
   summary (≤ 200 caractères, factuel), tags, `draft: true` par défaut.
   Un **chantier** parle d'un projet existant du rail : demander lequel.
2. **Fond**, questions selon le kind :
   - `retour-xp` : contexte (quoi, quand) ; ce qui a marché ; ce qui a cassé ; ce que j'en retiens.
   - `chantier` : où en est le side, concrètement ; décisions et arbitrages depuis la dernière note ;
     prochaine étape engagée.
   - `test-outil` : l'outil et dans quel flux il est branché ; verdict — gardé ou jeté, et pourquoi.
   - `note` : l'idée en une phrase ; pourquoi maintenant.

Puis :
- Écrire `src/content/writing/<slug>.mdx` : frontmatter validé + squelette structuré à partir
  des réponses **verbatim ou reformulées a minima**. Les trous restent des `{/* TODO(mathieu): … */}`.
  La prose finale appartient à Mathieu : le flow structure, il n'écrit pas à sa place.
- `pnpm validate` puis `pnpm check`. La note reste `draft: true` jusqu'à relecture explicite.

## Illustrations

Espace de dépôt : `drop/<slug>/` (gitignoré — voir `drop/README.md`).

1. Demander : « Des visuels ? Dépose-les dans `drop/<slug>/` (cover.* pour la couverture),
   ou je capture le produit live moi-même. »
2. Si dépôt → `pnpm illustrate <slug>` (projet) ou `pnpm illustrate <slug> --note`.
3. Si produit live sans dépôt → proposer une capture Playwright du site (viewport 1440×900,
   deviceScaleFactor 2), puis pipeline identique.
4. Vérifier le rendu : `pnpm build && pnpm shoot`, regarder les screenshots.
   Un projet sans `public/projects/<slug>.webp` casse l'audit harness.

## Sortie de session

Terminer par un récap court : fichier créé, champs remplis, liste des `TODO(mathieu)` restants,
illustrations traitées ou manquantes. Pas de commit sans demande explicite.

# Stratégie — site personal branding

> Source de vérité du positionnement. Toute décision de contenu/design doit servir ce document.

## Contexte

Refonte du site de personal branding de Mathieu Cadu. L'ancien (`nuxtolio`, Nuxt 2) est gelé. Marché 2026 : « j'ai build un side avec l'IA » est devenu du bruit. Se différencier ne passe pas par *un* projet, mais par le **système** qui les produit, les **écosystèmes** autour, et la **lucidité produit**.

## Cible

**#1 : recruteurs / employeurs.** Objectif : être lu comme un profil **lead / staff / product-minded engineer**, au-dessus de « exécutant senior ».

## Edge

- Vision produit + lucidité (savoir lancer **et** tuer un produit).
- Écosystèmes multi-plateformes (web + natif autour d'une idée).
- Pas positionné sur la vélocité brute ni la profondeur perf pure.

## Positionnement (verrouillé — hybride A+C)

> *« Ingénieur produit. Le code est un moyen — la décision produit est le métier. Je construis des écosystèmes complets (web, mobile) et j'assume mes choix : ceux qui vivent comme ceux que j'ai enterrés. »*

## Les 3 piliers

1. **Jugement produit** — lancer ET tuer ; post-mortems assumés (ex : Content-LD).
2. **Écosystèmes multi-plateformes** — pas des features isolées, des systèmes complets.
3. **Ingénierie AI cadrée** — flows agentiques cadrés, pas du vibe coding.

## Règle d'or : show, don't tell

La discipline AI doit se **ressentir par les projets (artefacts)**, jamais par de la prose. Écrire « workflows agentiques avancés » = bruit qui range Mathieu avec les vibe-codeurs. On montre les **rails** : evals, tests, structured output, gates humains, métriques de livraison, diagrammes de flow.

Contrainte : **rien d'open source** pour l'instant → preuve via artefacts montrables sans ouvrir le code (flows sanitizés, métriques, contenu typé, propreté de ce repo). L'OSS (« builder OS ») est un chantier futur possible, pas un prérequis.

## Modèle de fiche projet

Chaque projet = fiche structurée (voir `src/content/schema.ts`), blocs :

- **En-tête** : nom · tagline (= problème résolu) · statut (live/tué/dormant) · rôle · dates.
- **Produit** (pilier 1) : problème · décision clé · *leçon* (obligatoire si tué).
- **Écosystème** (pilier 2) : surfaces réelles · stack · archi.
- **Build** (pilier 3, artefact) : flow agentique · garde-fous · métriques. Données fournies par Mathieu uniquement — jamais inventées.
- **Preuve** : liens live · métriques d'usage · capture.

## Inventaire projets (legacy nuxtolio)

| Projet | Statut | Note |
|---|---|---|
| Boney | live (2024) | écosystème web+natif+supabase — vitrine pilier 2 |
| Nutriwi | live (2018) | longévité |
| Changelogit | live (2023) | tech → non-tech |
| Content-LD | **tué** (2022–2023) | post-mortem = vitrine pilier 1 |
| Pertinent CMS | — | collaboratif |
| api-admin-dashboard | — | outil |
| HabiliParis | — | projet école/entreprise |

## Itérations

1. ✅ Positionnement, cible, edge.
2. ✅ Modèle de fiche projet (schéma typé).
3. ✅ Création du projet (Next.js, SEO, agentic-first, versionné).
4. ⏳ Remplir le bloc **Build** des projets pilotes (données réelles de Mathieu).
5. ⏳ UI / design.

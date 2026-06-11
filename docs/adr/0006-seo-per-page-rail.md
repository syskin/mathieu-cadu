# ADR 0006 — SEO par page : rail `pageMeta()`, JSON-LD reliés, flux RSS

- **Statut :** accepté
- **Date :** 2026-06
- **Contexte :** audit SEO (2026-06-11). Le root layout déclarait `alternates.canonical = site.url` ; le merge des metadata Next étant *shallow*, toutes les pages qui ne redéclaraient pas `alternates`/`openGraph` héritaient du bloc de la home : canonical pointant sur `/` partout (risque de désindexation de tout sauf l'accueil), `og:title`/`og:url` de la home sur chaque article partagé. S'y ajoutaient : pas de `BlogPosting` ni de `BreadcrumbList` JSON-LD, `lastModified` daté du build dans le sitemap, pas de flux RSS.

## Décision

1. **Helper unique `src/lib/seo.ts` (`pageMeta()`)** : toute page sous la racine construit son metadata par ce helper, qui restate le bloc complet — canonical relatif (résolu par `metadataBase`), `openGraph` entier (`website` ou `article` + `publishedTime`/`tags`, **y compris `og:image`** — la convention de fichier racine est elle aussi écrasée par le merge shallow), lien de découverte RSS. Le root layout ne garde que le bloc de la home (`canonical: "/"`).
2. **Twitter réduit à `card`** dans le layout : X retombe sur les balises `og:*` ; un bloc de moins à synchroniser.
3. **JSON-LD reliés par `@id`** : le `Person` du layout porte `@id = {site.url}/#person` ; chaque article émet un `BlogPosting` dont `author` référence cet `@id`. Le composant `Breadcrumb` émet lui-même son `BreadcrumbList` (le visuel et le balisage ne peuvent pas diverger).
4. **Sitemap sans fausse fraîcheur** : `lastModified` = date du dernier article (home, carnet) ou date de l'article ; plus jamais `new Date()` au build.
5. **Flux RSS `/feed.xml`** (route handler statique). Pas d'entrée sitemap : un flux n'est pas une page indexable ; il est découvert via `alternates.types` sur chaque page.

Harness (DoD) : `audit-harness.ts` exige les nouveaux fichiers du rail SEO (`feed.xml/route.ts`, `opengraph-image.alt.txt`, `seo.ts`) **et** vérifie que chaque `page.tsx` sous la racine passe par `pageMeta()` — une future page qui ne le ferait pas casse `pnpm check` au lieu de retomber silencieusement sur le canonical de la home. `seo.test.ts` fige le contrat du helper.

## Conséquences

- Une nouvelle page sans `pageMeta()` échoue à l'audit avec le pourquoi dans le message.
- Le partage d'un article (LinkedIn, X) porte le titre, la description et l'URL de l'article.
- Rejeté : corriger page par page sans helper (la dérive reviendrait à la première page ajoutée) ; canonical absolu en dur par page (redondant avec `metadataBase`).

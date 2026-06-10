# drop/ — dépôt d'illustrations brutes

Espace d'entrée pour les visuels, **jamais publié** (gitignoré, sauf ce README).
Le repo est public : rien ne part d'ici sans passer par le pipeline.

## Convention

```
drop/<slug>/cover.png      → couverture du projet (n'importe quel format/taille)
drop/<slug>/autre-vue.jpg  → visuel additionnel
```

- `<slug>` = slug de l'entité (projet ou note), ex. `boney`, `a-propos-du-carnet`.
- `cover.*` (ou l'unique image du dossier) devient la couverture du projet.

## Traitement

```
pnpm illustrate <slug>          # projet → public/projects/<slug>.webp + <slug>-thumb.webp
pnpm illustrate <slug> --note   # note   → public/carnet/<slug>/<nom>.webp
```

Optimisation : webp q82, ≤1600px de large, vignette carrée 640×640 (crop haut-centre).
Les sorties dans `public/` sont commitées ; les bruts restent ici, hors du tree.

Le flow `/cadrage` (`.claude/skills/cadrage/`) s'appuie sur cette convention.

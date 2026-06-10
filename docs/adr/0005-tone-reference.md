# ADR 0005 — Ton homogénéisé : référence unique `docs/tone.md`

- **Statut :** accepté
- **Date :** 2026-06
- **Contexte :** les règles de voix étaient éparpillées (PRODUCT.md, DESIGN.md, skill cadrage) et le curseur restait implicite, donc la copy dérivait : mélange « vous » / « tes » / impersonnel d'une surface à l'autre, ton sec ici, produit là.

## Décision

Trois arbitrages de Mathieu (2026-06-10), figés dans `docs/tone.md` (source de vérité, identité « l'atelier ouvert ») :

1. **Adresse impersonnelle** : on ne s'adresse jamais au lecteur (ni « vous », ni « tu », ni question au visiteur).
2. **Personnalité : personnelle et chaleureuse** : le « je » raconte ; les bannis anti-marketing de PRODUCT.md tiennent toujours.
3. **Registre unique strict** : même voix sur toutes les surfaces, site et hors-site (README, LinkedIn).

Articulation : `docs/tone.md` = la voix (prose) ; `DESIGN.md` = les labels d'UI ; `PRODUCT.md` résume et pointe la référence ; le skill `/cadrage` l'applique à la collecte.

Application immédiate : summary du carnet (« vous » → impersonnel), tagline Changelogit (« tes repos » → « les repos »), footer (« Envie d'en discuter ? » supprimé, les liens suffisent), intro du carnet (inventaire → récit en « je »).

Harness : `docs/tone.md` ajouté aux documents de gouvernance exigés par `audit-harness.ts`.

## Conséquences
- Toute nouvelle copy a une référence unique et trois règles vérifiables ; la dérive tu/vous est détectable en revue.
- Supprimer ou renommer `docs/tone.md` casse `pnpm check`.
- Rejeté : un ton par surface (dégradé contrôlé) — Mathieu veut une voix unique stricte ; laisser les règles éparpillées (cause de la dérive constatée).

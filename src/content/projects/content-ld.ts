import type { ProjectInput } from "../schema";

// Pillar-1 showcase: an assumed kill. The `lesson` is the differentiator.
export const contentLd: ProjectInput = {
  slug: "content-ld",
  name: "Content-LD",
  tagline: "Génération d'images structurées depuis une URL",
  status: "killed",
  role: "solo",
  dates: "2022 – 2023",

  problem:
    "Industrialiser la production de visuels sociaux à partir des données structurées d'une page.",
  decision:
    "SaaS de templating d'images généré à la volée depuis un simple lien.",
  lesson:
    "Marché cible jamais clairement identifié, demande surestimée. Arrêté après un an. Valider le marché avant de construire le moteur.",

  surfaces: ["web", "api"],
  stack: ["typescript", "nuxtjs", "vuejs", "tailwindcss", "expressjs"],

  links: [],
  index: 1,
};

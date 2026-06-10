import type { ProjectInput } from "../schema";

export const nutriwi: ProjectInput = {
  slug: "nutriwi",
  name: "Nutriwi",
  tagline: "Analyser la qualité nutritionnelle de ses recettes, anti-gaspillage.",
  status: "live",
  role: "solo",
  dates: "depuis 2018",

  problem:
    "Savoir si ce qu'on cuisine au quotidien est nutritionnellement bon, simplement.",
  decision:
    "Une app grand public : analyse nutritionnelle des recettes et scanner produits, orientée anti-gaspillage.",

  surfaces: ["web"],
  stack: [
    "javascript",
    "nuxtjs",
    "vuejs",
    "tailwindcss",
    "expressjs",
    "mongodb",
    "ansible",
  ],

  links: [{ label: "nutriwi.com", href: "https://www.nutriwi.com" }],
  featured: true,
  index: 2,
};

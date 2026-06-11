import type { ProjectInput } from "../schema";

export const changelogit: ProjectInput = {
  slug: "changelogit",
  name: "Changelogit",
  tagline: "Changelog auto-alimenté par IA, branché sur les repos.",
  status: "live",
  role: "solo",
  dates: "depuis oct. 2023",

  problem:
    "Tenir un changelog clair et à jour est fastidieux, donc vite abandonné.",
  decision:
    "Une plateforme qui génère le changelog automatiquement par IA, branchée sur les repos.",

  surfaces: ["web"],
  stack: ["typescript", "nextjs", "tailwindcss", "docker"],

  build: {
    // TODO(mathieu): flow agentique réel + garde-fous + métriques (chaque fait sourcé).
    guardrails: [],
    metrics: [],
  },

  links: [{ label: "changelogit.com", href: "https://changelogit.com" }],
  featured: true,
  index: 1,
};

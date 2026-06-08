import type { ProjectInput } from "../schema";

// Pillar-2 showcase: a real multi-platform ecosystem (web + native + backend + infra).
export const boney: ProjectInput = {
  slug: "boney",
  name: "Boney",
  tagline: "Gestion de budget partagée, sans la complexité",
  status: "live",
  role: "solo",
  dates: "depuis 2024",

  problem:
    "Les outils de budget sont soit trop complexes, soit amputés des fonctions essentielles.",
  decision:
    "Budget partagé + suivi des dépenses, avec une UX volontairement minimale.",

  surfaces: ["web", "ios", "android", "api", "infra"],
  stack: ["typescript", "nextjs", "supabase", "capacitor", "vercel"],
  architecture:
    "Next.js → Supabase (auth/db). Web déployé sur Vercel ; natif packagé via Capacitor (iOS/Android).",

  build: {
    // TODO(mathieu): flow agentique réel utilisé pour shipper (sanitizé). Artefact, pas blabla.
    guardrails: [], // TODO(mathieu): evals / tests / structured output / gates humains
    metrics: [], // TODO(mathieu): délai concept→prod, cadence de ship, etc. — chiffres uniquement
  },

  links: [{ label: "boney.app", href: "https://boney.app" }],
  featured: true,
  index: 0,
};

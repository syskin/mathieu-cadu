import type { ProjectInput } from "../schema";

// Pillar-2 showcase: a real multi-platform ecosystem (web + native + backend + infra).
export const boney: ProjectInput = {
  slug: "boney",
  name: "Boney",
  // Aligné sur le positionnement public (og:title / meta description de boney.app).
  tagline: "Partager les dépenses du foyer sans fusionner les comptes",
  status: "live",
  role: "solo",
  dates: "depuis 2024",

  problem:
    "Couples, familles, colocs : régler les dépenses partagées et garder une vue claire, sans avoir à fusionner les comptes.",
  decision:
    "On saisit la dépense, Boney calcule qui doit quoi selon les parts définies ensemble. Aucune connexion bancaire.",

  // iOS pas encore shippé — surface ajoutée le jour où l'app existe (Mathieu, 2026-06).
  surfaces: ["web", "android", "api"],
  stack: ["typescript", "nextjs", "supabase", "capacitor", "vercel"],

  build: {
    // TODO(mathieu): flow agentique réel utilisé pour shipper (sanitizé). Artefact, pas blabla.
    guardrails: [], // TODO(mathieu): evals / tests / structured output / gates humains
    metrics: [
      {
        label: "Téléchargements Android",
        value: "1 000+",
        source: { kind: "dashboard", ref: "Google Play Console, 2026-06" },
      },
      {
        label: "Inscrits",
        value: "2 000+",
        source: { kind: "dashboard", ref: "Supabase auth.users, 2026-06" },
      },
      {
        label: "Abonnés payants",
        value: "10",
        source: { kind: "dashboard", ref: "Stripe, 2026-06" },
      },
      {
        label: "Utilisateurs mensuels",
        value: "150",
        source: { kind: "dashboard", ref: "PostHog, projet Boney, 2026-06" },
      },
    ],
  },

  links: [{ label: "boney.app", href: "https://boney.app" }],
  featured: true,
  index: 0,
};

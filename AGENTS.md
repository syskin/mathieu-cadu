<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project: mathieu-cadu — personal branding site

Personal branding site for Mathieu Cadu. Successor to the legacy `nuxtolio` (Nuxt 2, frozen). Built **agentic-first**: the repository itself is the artifact that proves disciplined AI engineering. A recruiter who clones this should *see* the discipline, not read a claim about it.

## Audience & positioning (do not drift)

- **Audience #1:** recruiters / employers. Aim the narrative at lead / staff / product-minded engineer level.
- **Positioning:** product-minded engineer + assumed lucidity. *"Le code est un moyen, la décision produit est le métier. Je construis des écosystèmes complets et j'assume mes choix — ceux qui vivent comme ceux que j'ai enterrés."*
- **Three pillars** every feature must serve:
  1. **Product judgment** — launching *and* killing products; lucidity.
  2. **Multi-platform ecosystems** — web + native + infra around one idea, not isolated features.
  3. **Disciplined AI engineering** — framed agentic flows, not vibe coding.

## The golden rule: show, don't tell

The pillar-3 trap is writing *"advanced agentic workflows"* — that is noise that files Mathieu with the vibe-coders. **Prove discipline through artifacts, never prose.** Every claim must be backed by a fact, a metric, a diagram, or code. If a content line cannot stand without a marketing adjective, delete it.

There is currently **no open-source** to point to. So evidence comes from: sanitized flow descriptions, delivery metrics, structured/typed content, and the cleanliness of this repo itself. Open-sourcing a "builder OS" is a possible future chantier, not a prerequisite.

## Content is a typed rail

Project content lives in `src/content/projects/*.ts`, validated by `src/content/schema.ts` (Zod) at load time. Invalid content **fails the build** — it never ships silently. This typed/validated pipeline is itself a pillar-3 artifact (structured = anti-vibe).

- A `killed` project **must** carry its `lesson` (enforced by the schema). Lucidity is the differentiator — the rail guarantees it is never dropped.
- The `build` block (agentic flow / guardrails / metrics) holds only facts Mathieu supplies. Never fabricate metrics or flow details. Leave `TODO(mathieu)` markers.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind 4 · Zod. SEO baked in: Metadata API, `sitemap.ts`, `robots.ts`, JSON-LD. SSG by default.

## This repository is PUBLIC

Remote: `git@github.com:syskin/mathieu-cadu.git` — **public**. Everything pushed is visible to recruiters. Consequences:

- Quality is non-negotiable at the push boundary. `.githooks/pre-push` runs `pnpm check` + a production build + a secret scan before anything leaves the machine. Never bypass it (`--no-verify`) for a public push.
- Never commit secrets, tokens, private keys, or real `.env` files. The pre-push scan blocks the obvious cases; do not rely on it as the only line of defence.
- The repo itself is on display — it *is* the pillar-3 artifact. Clean history, clear commits, green tree.

## Evolving the harness (keep it in lockstep)

The harness must grow with the platform — it must never silently fall behind. `pnpm harness:audit` (part of `pnpm check`) enforces the coupling and fails loudly on drift: orphan content not on the rail, missing SEO/governance files, an incomplete `check` script.

**Definition of Done** — a change is not done until the harness covers it:

- New content **type** → add a Zod schema + a `validate` guard + a vitest case proving the rail holds. Provenance applies to every new fact field.
- New content **item** → it must be registered so it is parsed (the audit rejects orphans).
- New **page/route** → wire it into `sitemap.ts` and give it `metadata`.
- New **material decision** → write an ADR in `docs/adr/`.
- New **gate step** → add it to the `check` script (the audit asserts `check` runs validate, vitest, and harness:audit).

If you add a capability the audit can't see, extend `scripts/audit-harness.ts` with the new invariant in the same change.

## Commit identity (enforced)

This public repo carries **only syskin's commits**, using a GitHub **noreply** address as the commit email (no personal email in the tree or in commit metadata). The expected identity lives in `.githooks/identity.local` (gitignored — see `.githooks/identity.local.example`); the pre-commit hook blocks any other identity. Never commit with `-c user.email=…` overrides. If a wrong author lands, rewrite history and force-push (solo repo).

## Decisions

All material decisions are recorded as ADRs in `docs/adr/`. Read `docs/strategy.md` for the full positioning rationale before proposing content or design changes.

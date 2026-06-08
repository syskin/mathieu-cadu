import { z } from "zod";

/**
 * Project content rail.
 *
 * Every project is validated against this schema at load time (see ./projects/index.ts).
 * Invalid content fails the build — it never ships silently. The structured/typed
 * pipeline is itself a pillar-3 artifact: structured == anti-vibe.
 */

export const ProjectStatus = z.enum(["live", "killed", "dormant"]);
export type ProjectStatus = z.infer<typeof ProjectStatus>;

export const Surface = z.enum(["web", "ios", "android", "api", "infra", "cli"]);
export type Surface = z.infer<typeof Surface>;

/**
 * Pillar 3 — disciplined AI engineering, proven by artifacts only.
 * No marketing prose. Facts, guardrails, numbers. Supplied by Mathieu, never invented.
 */
export const BuildEvidence = z.object({
  /** The agentic flow actually used to ship, stated as facts (sanitized if needed). */
  agenticFlow: z.string().min(1).optional(),
  /** Guardrails separating framed agentic engineering from vibe coding (evals, tests, structured output, human gates). */
  guardrails: z.array(z.string()).default([]),
  /** Delivery metrics — label + value, numbers only. */
  metrics: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
});
export type BuildEvidence = z.infer<typeof BuildEvidence>;

export const ProjectLink = z.object({
  label: z.string(),
  href: z.string().url(),
});

export const projectSchema = z
  .object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    name: z.string(),
    /** One line = the problem solved. No fluff. */
    tagline: z.string().max(90),
    status: ProjectStatus,
    role: z.enum(["solo", "lead", "team"]),
    dates: z.string(),

    // Pillar 1 — product judgment
    problem: z.string(),
    decision: z.string(),
    /** The lucidity signal. Required for killed projects (enforced below). */
    lesson: z.string().optional(),

    // Pillar 2 — multi-platform ecosystem
    surfaces: z.array(Surface).min(1),
    stack: z.array(z.string()).min(1),
    architecture: z.string().optional(),

    // Pillar 3 — build evidence (artifact, not blabla)
    build: BuildEvidence.optional(),

    // Proof
    links: z.array(ProjectLink).default([]),
    cover: z.string().optional(),
    featured: z.boolean().default(false),
    index: z.number().int(),
  })
  .refine((p) => p.status !== "killed" || (p.lesson?.trim().length ?? 0) > 0, {
    message:
      "A killed project must carry its lesson — lucidity is the differentiator and must never be dropped.",
    path: ["lesson"],
  });

/** Validated/output type (defaults resolved). Use for consumed content. */
export type Project = z.infer<typeof projectSchema>;

/** Authoring/input type (defaulted fields optional). Use when writing content files. */
export type ProjectInput = z.input<typeof projectSchema>;

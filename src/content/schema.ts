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
 * Provenance. Enforces the golden rule "never invent" mechanically: every fact
 * carries a source, or it does not exist. Unsourced facts are rejected at build.
 * `linkedin` = https://www.linkedin.com/in/mathieucadu/ (a source of truth).
 */
export const Source = z
  .object({
    kind: z.enum(["mathieu", "linkedin", "url", "repo", "commit", "dashboard"]),
    /** Concrete reference: a URL, git sha, dashboard name, or "Mathieu, YYYY-MM". */
    ref: z.string().min(3),
  })
  .superRefine((s, ctx) => {
    // ref must match its kind — a source you can't follow is not a source.
    const isUrl = /^https?:\/\//.test(s.ref);
    const add = (message: string) => ctx.addIssue({ code: "custom", message, path: ["ref"] });
    if (s.kind === "url" && !isUrl) add('kind "url" requires an http(s) URL.');
    if (s.kind === "linkedin" && !s.ref.includes("linkedin.com/in/"))
      add('kind "linkedin" requires a linkedin.com/in/… URL.');
    if (s.kind === "repo" && !isUrl && !s.ref.includes("/"))
      add('kind "repo" requires a repo URL or owner/name path.');
    if (s.kind === "commit" && !/[0-9a-f]{7,40}/i.test(s.ref))
      add('kind "commit" requires a git sha (7–40 hex chars).');
    if (s.kind === "mathieu" && !/20\d\d/.test(s.ref))
      add('kind "mathieu" requires a date (e.g. "Mathieu, 2026-06") for verifiability.');
  });
export type Source = z.infer<typeof Source>;

/** A sourced metric — number only in `value`, never an adjective. */
export const Metric = z.object({
  label: z.string(),
  value: z.string(),
  source: Source,
});

/** A sourced guardrail (eval, test, structured output, human gate). */
export const Guardrail = z.object({
  text: z.string(),
  source: Source,
});

/** The agentic flow actually used to ship — facts, sanitized if needed, sourced. */
export const AgenticFlow = z.object({
  summary: z.string().min(1),
  source: Source,
});

/**
 * Pillar 3 — disciplined AI engineering, proven by artifacts only.
 * No marketing prose. Every entry is sourced (provenance enforced above).
 * Empty arrays / absent flow are valid (= not yet documented). Half-filled
 * unsourced facts are not: that is how silent fabrication is blocked.
 */
export const BuildEvidence = z.object({
  agenticFlow: AgenticFlow.optional(),
  guardrails: z.array(Guardrail).default([]),
  metrics: z.array(Metric).default([]),
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

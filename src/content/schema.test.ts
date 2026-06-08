import { describe, it, expect } from "vitest";
import { projectSchema } from "./schema";

// The rails ARE the product (pillar 3). These tests prove they hold.
const base = {
  slug: "demo",
  name: "Demo",
  tagline: "t",
  role: "solo",
  dates: "2024",
  problem: "p",
  decision: "d",
  surfaces: ["web"],
  stack: ["ts"],
  index: 0,
} as const;

const source = { kind: "mathieu", ref: "Mathieu, 2026-06" } as const;

describe("project content rail", () => {
  it("rejects a killed project without a lesson (lucidity is mandatory)", () => {
    expect(() => projectSchema.parse({ ...base, status: "killed" })).toThrow();
  });

  it("accepts a killed project that carries its lesson", () => {
    expect(() =>
      projectSchema.parse({ ...base, status: "killed", lesson: "learned the hard way" }),
    ).not.toThrow();
  });

  it("rejects a metric without a source (no invention)", () => {
    expect(() =>
      projectSchema.parse({
        ...base,
        status: "live",
        build: { metrics: [{ label: "users", value: "1000" }] },
      }),
    ).toThrow();
  });

  it("accepts a metric with a source", () => {
    expect(() =>
      projectSchema.parse({
        ...base,
        status: "live",
        build: { metrics: [{ label: "users", value: "1000", source }] },
      }),
    ).not.toThrow();
  });

  it("rejects a guardrail without a source", () => {
    expect(() =>
      projectSchema.parse({
        ...base,
        status: "live",
        build: { guardrails: [{ text: "typed structured output" }] },
      }),
    ).toThrow();
  });

  it("accepts an empty build block (not yet documented is fine)", () => {
    expect(() =>
      projectSchema.parse({ ...base, status: "live", build: {} }),
    ).not.toThrow();
  });
});

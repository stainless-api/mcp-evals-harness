import { describe, it, expect } from "vitest";
import { scoreToolUsage } from "./tool-usage.js";
import type { ToolCallRecord } from "../agent/types.js";

function tc(overrides: Partial<ToolCallRecord> = {}): ToolCallRecord {
  return { name: "foo", args: {}, result: "ok", ...overrides };
}

describe("scoreToolUsage", () => {
  it("returns score 0 for empty toolCalls", () => {
    const result = scoreToolUsage([]);
    expect(result.score).toBe(0);
    expect(result.metadata.totalCalls).toBe(0);
  });

  it("returns score 1 for a successful call", () => {
    const result = scoreToolUsage([tc()]);
    expect(result.score).toBe(1);
    expect(result.metadata.succeeded).toBe(1);
    expect(result.metadata.errored).toBe(0);
  });

  it("detects error via error field", () => {
    const result = scoreToolUsage([tc({ error: "bad thing" })]);
    expect(result.score).toBe(0);
    expect(result.metadata.errored).toBe(1);
  });

  it("detects error via ^Error: result pattern", () => {
    const result = scoreToolUsage([tc({ result: "Error: something broke" })]);
    expect(result.score).toBe(0);
    expect(result.metadata.errored).toBe(1);
  });

  it("detects error via ^Internal error result pattern", () => {
    const result = scoreToolUsage([tc({ result: "Internal error happened" })]);
    expect(result.score).toBe(0);
    expect(result.metadata.errored).toBe(1);
  });

  it("does not false-positive on Error mid-string", () => {
    const result = scoreToolUsage([tc({ result: "No Error: here" })]);
    expect(result.score).toBe(1);
  });

  it("returns proportional score when mix of success and error", () => {
    const result = scoreToolUsage([tc(), tc({ error: "bad" })]);
    expect(result.score).toBe(0.5);
    expect(result.metadata.succeeded).toBe(1);
    expect(result.metadata.errored).toBe(1);
  });

  it("deduplicates toolNames in metadata", () => {
    const result = scoreToolUsage([tc(), tc()]);
    expect(result.metadata.toolNames).toEqual(["foo"]);
  });

  it("includes truncated error details in metadata", () => {
    const longResult = "Error: " + "x".repeat(500);
    const result = scoreToolUsage([tc({ result: longResult })]);
    const errors = result.metadata.errors as { tool: string; error: string }[];
    expect(errors).toHaveLength(1);
    expect(errors[0].error.length).toBeLessThanOrEqual(200);
  });

  it("returns name ToolUsage", () => {
    expect(scoreToolUsage([]).name).toBe("ToolUsage");
  });
});

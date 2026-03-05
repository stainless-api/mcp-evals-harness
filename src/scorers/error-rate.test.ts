import { describe, it, expect } from "vitest";
import { scoreErrorRate } from "./error-rate.js";
import type { ToolCallRecord } from "../agent/types.js";

function tc(overrides: Partial<ToolCallRecord> = {}): ToolCallRecord {
  return { name: "foo", args: {}, result: "ok", ...overrides };
}

describe("scoreErrorRate", () => {
  it("returns score 1 for empty toolCalls (no calls = bad)", () => {
    const result = scoreErrorRate([]);
    expect(result.score).toBe(1);
    expect(result.metadata.totalCalls).toBe(0);
  });

  it("returns score 0 for all successful calls", () => {
    const result = scoreErrorRate([tc(), tc(), tc()]);
    expect(result.score).toBe(0);
    expect(result.metadata.errorCount).toBe(0);
  });

  it("returns proportional score for mixed results", () => {
    const result = scoreErrorRate([tc(), tc({ error: "bad" })]);
    expect(result.score).toBe(0.5);
    expect(result.metadata.errorCount).toBe(1);
  });

  it("classifies 400 errors as client_error", () => {
    const result = scoreErrorRate([
      tc({ result: "Error: 400 Max page length: 100" }),
    ]);
    expect(result.score).toBe(1);
    const clientErrors = result.metadata.clientErrors as any[];
    expect(clientErrors).toHaveLength(1);
    expect(clientErrors[0].type).toBe("client_error");
  });

  it("classifies Internal error as server_error", () => {
    const result = scoreErrorRate([
      tc({ result: "Internal error: something broke" }),
    ]);
    expect(result.score).toBe(1);
    const serverErrors = result.metadata.serverErrors as any[];
    expect(serverErrors).toHaveLength(1);
    expect(serverErrors[0].type).toBe("server_error");
  });

  it("classifies MCP error as server_error", () => {
    const result = scoreErrorRate([
      tc({ result: "MCP error -32603: internal failure" }),
    ]);
    expect(result.score).toBe(1);
    const serverErrors = result.metadata.serverErrors as any[];
    expect(serverErrors).toHaveLength(1);
    expect(serverErrors[0].type).toBe("server_error");
  });

  it("classifies timeout patterns as timeout", () => {
    const result = scoreErrorRate([tc({ error: "Request timed out" })]);
    expect(result.score).toBe(1);
    const timeouts = result.metadata.timeouts as any[];
    expect(timeouts).toHaveLength(1);
    expect(timeouts[0].type).toBe("timeout");
  });

  it("does not false-positive on Error mid-string", () => {
    const result = scoreErrorRate([tc({ result: "No Error: here" })]);
    expect(result.score).toBe(0);
  });

  it("truncates long error messages to 200 chars", () => {
    const longResult = "Error: " + "x".repeat(500);
    const result = scoreErrorRate([tc({ result: longResult })]);
    const clientErrors = result.metadata.clientErrors as any[];
    expect(clientErrors[0].message.length).toBeLessThanOrEqual(200);
  });

  it("deduplicates toolNames in metadata", () => {
    const result = scoreErrorRate([tc(), tc()]);
    expect(result.metadata.toolNames).toEqual(["foo"]);
  });

  it("returns name ErrorRate", () => {
    expect(scoreErrorRate([]).name).toBe("ErrorRate");
  });
});

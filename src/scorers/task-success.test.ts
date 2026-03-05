import { describe, it, expect } from "vitest";
import { scoreTaskSuccess } from "./task-success.js";
import type { ExpectedResult } from "../suite.js";

describe("scoreTaskSuccess", () => {
  it("returns 1 when all containsText checks pass", () => {
    const expected: ExpectedResult = {
      description: "test",
      containsText: ["hello", "world"],
    };
    const result = scoreTaskSuccess("Hello World!", expected);
    expect(result.score).toBe(1);
    expect(result.metadata.failures).toEqual([]);
  });

  it("returns 0 when a containsText check fails", () => {
    const expected: ExpectedResult = {
      description: "test",
      containsText: ["hello", "missing"],
    };
    const result = scoreTaskSuccess("Hello World!", expected);
    expect(result.score).toBe(0);
    expect(result.metadata.failures).toEqual(['missing: "missing"']);
  });

  it("is case-insensitive for containsText", () => {
    const expected: ExpectedResult = {
      description: "test",
      containsText: ["HELLO"],
    };
    expect(scoreTaskSuccess("hello world", expected).score).toBe(1);
  });

  it("normalizes $ and , for number matching", () => {
    const expected: ExpectedResult = {
      description: "test",
      containsText: ["5,000"],
    };
    expect(scoreTaskSuccess("The total is $5000.", expected).score).toBe(1);
    expect(scoreTaskSuccess("The total is 5000.", expected).score).toBe(1);
    expect(scoreTaskSuccess("The total is $5,000.00.", expected).score).toBe(1);
  });

  it("normalizes underscores to spaces for enum matching", () => {
    const expected: ExpectedResult = {
      description: "test",
      containsText: ["SINGLE_USE"],
    };
    expect(scoreTaskSuccess("Single Use cards: 2", expected).score).toBe(1);
    expect(scoreTaskSuccess("SINGLE_USE: 2", expected).score).toBe(1);
  });

  it("returns 1 when no checks are defined", () => {
    const expected: ExpectedResult = { description: "test" };
    const result = scoreTaskSuccess("anything", expected);
    expect(result.score).toBe(1);
    expect(result.metadata.totalChecks).toBe(0);
  });

  it("returns 0 for agent errors", () => {
    const expected: ExpectedResult = {
      description: "test",
      containsText: ["hello"],
    };
    const result = scoreTaskSuccess("[Agent error: max_turns]", expected);
    expect(result.score).toBe(0);
    expect(result.metadata.reason).toBe("agent_error");
  });

  it("checks fieldValues case-insensitively", () => {
    const expected: ExpectedResult = {
      description: "test",
      fieldValues: { status: "ACTIVE" },
    };
    expect(scoreTaskSuccess("The status is active.", expected).score).toBe(1);
  });

  it("fails when fieldValue is missing", () => {
    const expected: ExpectedResult = {
      description: "test",
      fieldValues: { count: "42" },
    };
    const result = scoreTaskSuccess("The count is 99.", expected);
    expect(result.score).toBe(0);
    expect(result.metadata.failures).toEqual(["missing field: count=42"]);
  });

  it("passes with verifyResult success", () => {
    const expected: ExpectedResult = {
      description: "test",
      containsText: ["created"],
    };
    const result = scoreTaskSuccess("Card created successfully.", expected, {
      success: true,
      details: "card found",
    });
    expect(result.score).toBe(1);
  });

  it("fails with verifyResult failure", () => {
    const expected: ExpectedResult = {
      description: "test",
      containsText: ["created"],
    };
    const result = scoreTaskSuccess("Card created successfully.", expected, {
      success: false,
      details: "no card found",
    });
    expect(result.score).toBe(0);
    expect(result.metadata.failures).toContain("verify failed: no card found");
  });

  it("reports correct totalChecks", () => {
    const expected: ExpectedResult = {
      description: "test",
      containsText: ["a", "b"],
      fieldValues: { x: "1" },
    };
    const result = scoreTaskSuccess("a b 1", expected, {
      success: true,
      details: "",
    });
    expect(result.metadata.totalChecks).toBe(4); // 2 text + 1 field + 1 verify
  });
});

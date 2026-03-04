import { describe, it, expect } from "vitest";
import { scoreCompleteness } from "./completeness.js";

describe("scoreCompleteness", () => {
  it("returns 1.0 when no checks defined", () => {
    expect(scoreCompleteness("anything", {})).toBe(1.0);
  });

  it("returns 1.0 when empty containsText array", () => {
    expect(scoreCompleteness("anything", { containsText: [] })).toBe(1.0);
  });

  it("returns 1.0 when all containsText match", () => {
    expect(
      scoreCompleteness("found foo and bar", {
        containsText: ["foo", "bar"],
      }),
    ).toBe(1.0);
  });

  it("matches containsText case-insensitively", () => {
    expect(scoreCompleteness("Found FOO", { containsText: ["foo"] })).toBe(1.0);
  });

  it("returns proportional score for partial containsText match", () => {
    expect(
      scoreCompleteness("found foo", { containsText: ["foo", "bar"] }),
    ).toBe(0.5);
  });

  it("returns 0 when nothing matches", () => {
    expect(
      scoreCompleteness("nothing here", { containsText: ["foo", "bar"] }),
    ).toBe(0);
  });

  it("returns 1.0 when all fieldValues found", () => {
    expect(
      scoreCompleteness("name is alice age 30", {
        fieldValues: { name: "alice", age: 30 },
      }),
    ).toBe(1.0);
  });

  it("coerces fieldValues via String()", () => {
    expect(
      scoreCompleteness("value is true", { fieldValues: { flag: true } }),
    ).toBe(1.0);
  });

  it("fieldValues are case-sensitive", () => {
    expect(scoreCompleteness("alice", { fieldValues: { name: "Alice" } })).toBe(
      0,
    );
  });

  it("scores combined containsText + fieldValues proportionally", () => {
    const score = scoreCompleteness("foo 42", {
      containsText: ["foo", "bar"],
      fieldValues: { x: 42 },
    });
    // 2 out of 3 checks pass (foo matched, bar missed, 42 matched)
    expect(score).toBeCloseTo(2 / 3);
  });
});

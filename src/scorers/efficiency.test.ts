import { describe, it, expect } from "vitest";
import { scoreEfficiency } from "./efficiency.js";

describe("scoreEfficiency", () => {
  it("returns 1.0 at perfect thresholds", () => {
    expect(scoreEfficiency({ turnCount: 1, totalTokens: 1000 })).toBe(1.0);
  });

  it("returns 1.0 at exactly the good thresholds", () => {
    expect(scoreEfficiency({ turnCount: 3, totalTokens: 5000 })).toBe(1.0);
  });

  it("returns 0 at max thresholds", () => {
    expect(scoreEfficiency({ turnCount: 50, totalTokens: 500_000 })).toBe(0);
  });

  it("clamps beyond max thresholds to 0", () => {
    expect(scoreEfficiency({ turnCount: 100, totalTokens: 1_000_000 })).toBe(0);
  });

  it("scores midpoint turns with perfect tokens", () => {
    // turnScore = 1 - (26.5 - 3) / (50 - 3) = 1 - 23.5/47 = 0.5
    // tokenScore = 1.0
    // combined = 0.5 * 0.5 + 0.5 * 1.0 = 0.75
    expect(scoreEfficiency({ turnCount: 26.5, totalTokens: 5000 })).toBeCloseTo(
      0.75,
    );
  });

  it("scores perfect turns with midpoint tokens", () => {
    // turnScore = 1.0
    // tokenScore = 1 - (252500 - 5000) / (500000 - 5000) = 1 - 247500/495000 = 0.5
    // combined = 0.5 * 1.0 + 0.5 * 0.5 = 0.75
    expect(scoreEfficiency({ turnCount: 3, totalTokens: 252_500 })).toBeCloseTo(
      0.75,
    );
  });

  it("scores both at midpoint", () => {
    expect(
      scoreEfficiency({ turnCount: 26.5, totalTokens: 252_500 }),
    ).toBeCloseTo(0.5);
  });

  it("decays linearly just above good turn threshold", () => {
    // turnScore = 1 - 1/47
    // tokenScore = 1.0
    // combined = 0.5 * (1 - 1/47) + 0.5 * 1.0
    const expected = 0.5 * (1 - 1 / 47) + 0.5;
    expect(scoreEfficiency({ turnCount: 4, totalTokens: 5000 })).toBeCloseTo(
      expected,
    );
  });
});

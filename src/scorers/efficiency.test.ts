import { describe, it, expect } from "vitest";
import { scoreEfficiency } from "./efficiency.js";

describe("scoreEfficiency", () => {
  it("returns near 1.0 for minimal turns", () => {
    const result = scoreEfficiency({ turnCount: 1, totalTokens: 5000 });
    expect(result.score).toBeCloseTo(0.98); // 1 - 1/50
    expect(result.name).toBe("Efficiency");
    expect(result.metadata.turnCount).toBe(1);
  });

  it("returns 0 at max turns", () => {
    const result = scoreEfficiency({ turnCount: 50, totalTokens: 500_000 });
    expect(result.score).toBe(0);
  });

  it("clamps below 0 for over-limit turns", () => {
    const result = scoreEfficiency({ turnCount: 60, totalTokens: 100 });
    expect(result.score).toBe(0);
  });

  it("scores proportionally at midpoint", () => {
    const result = scoreEfficiency({ turnCount: 25, totalTokens: 100_000 });
    expect(result.score).toBeCloseTo(0.5); // 1 - 25/50
  });

  it("uses custom maxTurns", () => {
    const result = scoreEfficiency({
      turnCount: 5,
      totalTokens: 10_000,
      maxTurns: 10,
    });
    expect(result.score).toBeCloseTo(0.5); // 1 - 5/10
    expect(result.metadata.maxTurns).toBe(10);
  });

  it("includes totalTokens in metadata", () => {
    const result = scoreEfficiency({ turnCount: 2, totalTokens: 50_000 });
    expect(result.metadata.totalTokens).toBe(50_000);
  });
});

import { ClosedQA } from "autoevals";

/**
 * LLM-as-judge correctness scorer.
 *
 * Uses autoevals ClosedQA to evaluate whether the agent's output correctly
 * answers the question. Unlike Factuality (which penalizes superset answers),
 * ClosedQA judges whether the output answers the input using the expected
 * answer as criteria.
 *
 * This is a secondary diagnostic alongside the deterministic TaskSuccess
 * scorer — it catches semantic equivalences that string matching misses
 * (e.g. "Single Use" vs "SINGLE_USE") and flags plausible-sounding wrong
 * answers that happen to contain the right keywords.
 */
export async function scoreCorrectness(
  input: string,
  output: string,
  expected: string,
): Promise<{ name: string; score: number; metadata: Record<string, unknown> }> {
  if (output.startsWith("[Agent error:")) {
    return {
      name: "Correctness",
      score: 0,
      metadata: { reason: "agent_error" },
    };
  }

  const result = await ClosedQA({
    input,
    output,
    criteria: expected,
  });

  return {
    name: "Correctness",
    score: result.score ?? 0,
    metadata: {
      ...(result.metadata ?? {}),
    },
  };
}

import type { ExpectedResult } from "../suite.js";

/**
 * Normalize a string for comparison: lowercase, strip $ and , characters.
 * This handles common number formatting differences like "$5,000" vs "5000".
 */
function normalizeForComparison(s: string): string {
  return s
    .toLowerCase()
    .replace(/[$,]/g, "")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ");
}

/**
 * Binary task success scorer. Did the agent produce the correct answer?
 *
 * Returns 1 if ALL checks pass, 0 if any fail. The `failures` metadata
 * array explains exactly what went wrong.
 *
 * Checks:
 * - containsText: case-insensitive, number-normalized substring match
 * - fieldValues: case-insensitive substring match
 * - verifyResult: optional post-execution verification for write tests
 */
export function scoreTaskSuccess(
  output: string,
  expected: ExpectedResult,
  verifyResult?: { success: boolean; details: string },
): { name: string; score: 0 | 1; metadata: Record<string, unknown> } {
  if (output.startsWith("[Agent error:")) {
    return {
      name: "TaskSuccess",
      score: 0,
      metadata: { reason: "agent_error", failures: ["agent_error"] },
    };
  }

  const failures: string[] = [];

  if (expected.containsText?.length) {
    const normalizedOutput = normalizeForComparison(output);
    for (const text of expected.containsText) {
      if (!normalizedOutput.includes(normalizeForComparison(text))) {
        failures.push(`missing: "${text}"`);
      }
    }
  }

  if (expected.fieldValues) {
    const lower = output.toLowerCase();
    for (const [key, value] of Object.entries(expected.fieldValues)) {
      if (!lower.includes(String(value).toLowerCase())) {
        failures.push(`missing field: ${key}=${value}`);
      }
    }
  }

  if (verifyResult && !verifyResult.success) {
    failures.push(`verify failed: ${verifyResult.details}`);
  }

  const totalChecks =
    (expected.containsText?.length ?? 0) +
    Object.keys(expected.fieldValues ?? {}).length +
    (verifyResult ? 1 : 0);

  return {
    name: "TaskSuccess",
    score: failures.length === 0 ? 1 : 0,
    metadata: { failures, totalChecks },
  };
}

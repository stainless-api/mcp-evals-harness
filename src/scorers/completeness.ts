import type { ExpectedResult } from "../dataset/test-cases.js";

/**
 * Heuristic scorer: checks whether the output contains expected text strings
 * and JSON fields. Returns a score between 0 and 1.
 */
export function scoreCompleteness(
  output: string,
  expected: ExpectedResult,
): number {
  const checks: boolean[] = [];

  // Check containsText
  if (expected.containsText && expected.containsText.length > 0) {
    const lower = output.toLowerCase();
    for (const text of expected.containsText) {
      checks.push(lower.includes(text.toLowerCase()));
    }
  }

  // Check jsonFields — look for field names in the output
  if (expected.jsonFields && expected.jsonFields.length > 0) {
    for (const field of expected.jsonFields) {
      // Match "field": or "field" : patterns
      const pattern = new RegExp(`"${field}"\\s*:`, "i");
      checks.push(pattern.test(output));
    }
  }

  // Check fieldValues
  if (expected.fieldValues) {
    for (const [key, value] of Object.entries(expected.fieldValues)) {
      const stringValue = String(value);
      checks.push(output.includes(stringValue));
    }
  }

  if (checks.length === 0) return 1.0; // No checks = passes
  const passed = checks.filter(Boolean).length;
  return passed / checks.length;
}

import type { ExpectedResult } from "../dataset/test-cases.js";

/**
 * Heuristic scorer for direct invocation experiments.
 * Validates JSON structure: object type, minimum items, field presence.
 * Returns a score between 0 and 1.
 */
export function scoreStructuredMatch(
  output: string,
  expected: ExpectedResult,
): number {
  const checks: boolean[] = [];

  // Try to parse as JSON
  let parsed: unknown;
  try {
    parsed = JSON.parse(output);
  } catch {
    // If output contains JSON embedded in text, try to extract it
    const jsonMatch = output.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    if (jsonMatch) {
      try {
        parsed = JSON.parse(jsonMatch[0]);
      } catch {
        // Not valid JSON at all — still check text-based patterns
      }
    }
  }

  // Check objectType = "list"
  if (expected.objectType === "list") {
    if (parsed) {
      // Stripe lists have { object: "list", data: [...] }
      const isList =
        (typeof parsed === "object" &&
          parsed !== null &&
          "data" in parsed &&
          Array.isArray((parsed as Record<string, unknown>).data)) ||
        Array.isArray(parsed);
      checks.push(isList);

      // Check minItems
      if (expected.minItems && isList) {
        const items = Array.isArray(parsed)
          ? parsed
          : ((parsed as Record<string, unknown>).data as unknown[]);
        checks.push(items.length >= expected.minItems);
      }
    } else {
      // No parsed JSON — check for list-like patterns in text
      checks.push(
        output.includes('"data"') || output.includes("[") || false,
      );
    }
  }

  // Check jsonFields in the raw output text (handles both parsed and unparsed)
  if (expected.jsonFields && expected.jsonFields.length > 0) {
    for (const field of expected.jsonFields) {
      const pattern = new RegExp(`"${field}"\\s*:`, "i");
      checks.push(pattern.test(output));
    }
  }

  // Check containsText
  if (expected.containsText && expected.containsText.length > 0) {
    const lower = output.toLowerCase();
    for (const text of expected.containsText) {
      checks.push(lower.includes(text.toLowerCase()));
    }
  }

  if (checks.length === 0) return 1.0;
  const passed = checks.filter(Boolean).length;
  return passed / checks.length;
}

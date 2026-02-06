import type { ToolCallRecord } from "../agent/loop.js";

/**
 * Heuristic scorer: checks whether the agent called the expected tool(s).
 * Returns 1.0 if the expected tool was called, 0.0 otherwise.
 * Used in E2E experiments only.
 */
export function scoreToolSelection(
  toolCalls: ToolCallRecord[],
  expectedToolName: string,
): number {
  if (!expectedToolName) return 1.0;
  const calledNames = toolCalls.map((tc) => tc.name.toLowerCase());
  return calledNames.includes(expectedToolName.toLowerCase()) ? 1.0 : 0.0;
}

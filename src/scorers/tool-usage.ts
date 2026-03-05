import type { ToolCallRecord } from "../agent/types.js";

// Fallback heuristic for detecting errors when the structured `error` field
// isn't set (e.g. anthropic-runner where the Agent SDK controls tool execution).
// Only matches patterns the runners actually produce — anchored to avoid
// false positives on legitimate tool results containing these words.
const ERROR_PATTERNS = [/^Error:/i, /^Internal error/i, /^MCP error/i];

function isErrorResult(tc: ToolCallRecord): boolean {
  if (tc.error) return true;
  return ERROR_PATTERNS.some((p) => p.test(tc.result));
}

/**
 * Scores whether the agent actually used MCP tools and whether those calls succeeded.
 *
 * Returns 1 if at least one tool call was made and none errored, 0 otherwise.
 * Attaches metadata with tool call counts and error details for the Braintrust dashboard.
 */
export function scoreToolUsage(toolCalls: ToolCallRecord[]): {
  name: string;
  score: number;
  metadata: Record<string, unknown>;
} {
  const totalCalls = toolCalls.length;
  const errors = toolCalls.filter(isErrorResult);
  const succeeded = totalCalls - errors.length;

  const toolNames = [...new Set(toolCalls.map((tc) => tc.name))];

  const score = totalCalls > 0 ? succeeded / totalCalls : 0;

  return {
    name: "ToolUsage",
    score,
    metadata: {
      totalCalls,
      succeeded,
      errored: errors.length,
      toolNames,
      ...(errors.length > 0
        ? {
            errors: errors.map((tc) => ({
              tool: tc.name,
              error: tc.error ?? tc.result.slice(0, 200),
            })),
          }
        : {}),
    },
  };
}

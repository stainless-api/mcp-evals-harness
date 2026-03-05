import type { ToolCallRecord } from "../agent/types.js";

type ErrorType = "server_error" | "client_error" | "timeout";

interface ClassifiedError {
  tool: string;
  type: ErrorType;
  message: string;
}

const SERVER_ERROR_PATTERNS = [
  /^Internal error/i,
  /^MCP error/i,
  /\b5\d{2}\b.*error/i,
];

const CLIENT_ERROR_PATTERNS = [
  /^Error:/i,
  /\b400\b/,
  /\b404\b/,
  /\b422\b/,
  /invalid param/i,
  /required field/i,
  /Max page/i,
];

const TIMEOUT_PATTERNS = [/timeout/i, /timed out/i, /ETIMEDOUT/i];

function classifyError(tc: ToolCallRecord): ClassifiedError {
  const msg = tc.error ?? tc.result;

  for (const p of TIMEOUT_PATTERNS) {
    if (p.test(msg))
      return { tool: tc.name, type: "timeout", message: msg.slice(0, 200) };
  }
  for (const p of SERVER_ERROR_PATTERNS) {
    if (p.test(msg))
      return {
        tool: tc.name,
        type: "server_error",
        message: msg.slice(0, 200),
      };
  }
  for (const p of CLIENT_ERROR_PATTERNS) {
    if (p.test(msg))
      return {
        tool: tc.name,
        type: "client_error",
        message: msg.slice(0, 200),
      };
  }

  // Default: if we know it's an error but can't classify, call it client_error
  return { tool: tc.name, type: "client_error", message: msg.slice(0, 200) };
}

function isErrorResult(tc: ToolCallRecord): boolean {
  if (tc.error) return true;
  return [/^Error:/i, /^Internal error/i, /^MCP error/i].some((p) =>
    p.test(tc.result),
  );
}

/**
 * Scores the error rate of tool calls. Lower is better.
 *
 * Returns errors/totalCalls (0 = no errors, 1 = all errors or no calls).
 * Classifies errors as server_error, client_error, or timeout.
 */
export function scoreErrorRate(toolCalls: ToolCallRecord[]): {
  name: string;
  score: number;
  metadata: Record<string, unknown>;
} {
  const totalCalls = toolCalls.length;
  if (totalCalls === 0) {
    return { name: "ErrorRate", score: 1, metadata: { totalCalls: 0 } };
  }

  const errorCalls = toolCalls.filter(isErrorResult);
  const classified = errorCalls.map(classifyError);

  return {
    name: "ErrorRate",
    score: errorCalls.length / totalCalls,
    metadata: {
      totalCalls,
      errorCount: errorCalls.length,
      serverErrors: classified.filter((e) => e.type === "server_error"),
      clientErrors: classified.filter((e) => e.type === "client_error"),
      timeouts: classified.filter((e) => e.type === "timeout"),
      toolNames: [...new Set(toolCalls.map((tc) => tc.name))],
    },
  };
}

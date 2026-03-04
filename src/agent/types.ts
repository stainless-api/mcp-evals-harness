import type { ServerConfig } from "../suite.js";
import type { ModelAlias } from "./models.js";

export type Provider = "anthropic" | "openai";

export interface ModelConfig {
  alias: ModelAlias;
  modelId: string;
  provider: Provider;
  displayName: string;
  betas?: string[];
  /**
   * When true, the runner should enable tool search (defer-loading MCP tools)
   * and code execution capabilities via the advanced-tool-use beta.
   */
  codeMode?: boolean;
  providerOptions?: Record<string, unknown>;
}

export interface ToolCallRecord {
  name: string;
  args: Record<string, unknown>;
  result: string;
  durationMs?: number;
  error?: string;
}

export interface AgentResult {
  finalText: string;
  toolCalls: ToolCallRecord[];
  wallClockMs: number;
  inputTokens: number;
  outputTokens: number;
  turnCount: number;
  costUsd: number;
  model: string;
}

export interface AgentRunnerOptions {
  maxTurns?: number;
  model?: ModelConfig;
  systemPrompt?: string;
}

export interface AgentRunner {
  run(
    prompt: string,
    serverConfig: ServerConfig,
    options?: AgentRunnerOptions,
  ): Promise<AgentResult>;
}

/**
 * Abstraction over Braintrust span logging. Runners call these instead of
 * importing currentSpan() directly. Tests can supply a no-op or recording mock.
 */
export interface SpanLogger {
  logToolCallSpan: (opts: {
    name: string;
    input: unknown;
    output: string;
    startTimeMs: number;
    endTimeMs: number;
    metadata?: Record<string, unknown>;
    metrics?: Record<string, unknown>;
  }) => void;

  withTurnSpan: (
    name: string,
    fn: () => Promise<Record<string, unknown> | void>,
  ) => Promise<void>;
}

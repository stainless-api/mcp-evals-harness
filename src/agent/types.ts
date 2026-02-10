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

import type { ServerConfig } from "../servers/config.js";

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
  model?: string;
  systemPrompt?: string;
}

export interface AgentRunner {
  run(
    prompt: string,
    serverConfig: ServerConfig,
    options?: AgentRunnerOptions,
  ): Promise<AgentResult>;
}

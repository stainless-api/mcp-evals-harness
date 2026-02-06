export type {
  AgentRunner,
  AgentResult,
  AgentRunnerOptions,
  ToolCallRecord,
} from "./types.js";
export { AnthropicRunner } from "./anthropic-runner.js";

import type { AgentRunner } from "./types.js";
import { AnthropicRunner } from "./anthropic-runner.js";

export type RunnerType = "anthropic" | "openai";

export function createRunner(type: RunnerType = "anthropic"): AgentRunner {
  switch (type) {
    case "anthropic":
      return new AnthropicRunner();
    case "openai":
      throw new Error(
        "OpenAI runner not yet implemented. Install @openai/agents and create openai-runner.ts.",
      );
    default:
      throw new Error(`Unknown runner type: ${type}`);
  }
}

export type {
  AgentRunner,
  AgentResult,
  AgentRunnerOptions,
  ToolCallRecord,
  ModelConfig,
  Provider,
} from "./types.js";
export type { ModelAlias } from "./models.js";
export { MODEL_ALIASES } from "./models.js";
export { AnthropicRunner } from "./anthropic-runner.js";
export { AnthropicCodeRunner } from "./anthropic-code-runner.js";
export { OpenAIRunner } from "./openai-runner.js";
export { resolveModel } from "./models.js";

import type { AgentRunner, ModelConfig } from "./types.js";
import { AnthropicRunner } from "./anthropic-runner.js";
import { AnthropicCodeRunner } from "./anthropic-code-runner.js";
import { OpenAIRunner } from "./openai-runner.js";

export function createRunner(model: ModelConfig): AgentRunner {
  switch (model.provider) {
    case "anthropic":
      return model.codeMode ? new AnthropicCodeRunner() : new AnthropicRunner();
    case "openai":
      return new OpenAIRunner();
  }
}

import type { ModelConfig } from "./types.js";

const ADVANCED_TOOL_USE_BETA = "advanced-tool-use-2025-11-20";

export const MODEL_ALIASES = [
  "opus",
  "sonnet",
  "haiku",
  "sonnet-code",
  "opus-code",
  "gpt-4o",
  "gpt-4o-mini",
  "o3",
  "o4-mini",
] as const;

export type ModelAlias = (typeof MODEL_ALIASES)[number];

const MODEL_REGISTRY: Record<ModelAlias, ModelConfig> = {
  opus: {
    alias: "opus",
    modelId: "claude-opus-4-6",
    provider: "anthropic",
    displayName: "Claude Opus 4.6",
  },
  sonnet: {
    alias: "sonnet",
    modelId: "claude-sonnet-4-5-20250929",
    provider: "anthropic",
    displayName: "Claude Sonnet 4.5",
  },
  haiku: {
    alias: "haiku",
    modelId: "claude-haiku-4-5-20251001",
    provider: "anthropic",
    displayName: "Claude Haiku 4.5",
  },
  "sonnet-code": {
    alias: "sonnet-code",
    modelId: "claude-sonnet-4-5-20250929",
    provider: "anthropic",
    displayName: "Claude Sonnet 4.5 (Code)",
    betas: [ADVANCED_TOOL_USE_BETA],
    codeMode: true,
  },
  "opus-code": {
    alias: "opus-code",
    modelId: "claude-opus-4-6",
    provider: "anthropic",
    displayName: "Claude Opus 4.6 (Code)",
    betas: [ADVANCED_TOOL_USE_BETA],
    codeMode: true,
  },
  "gpt-4o": {
    alias: "gpt-4o",
    modelId: "gpt-4o",
    provider: "openai",
    displayName: "GPT-4o",
  },
  "gpt-4o-mini": {
    alias: "gpt-4o-mini",
    modelId: "gpt-4o-mini",
    provider: "openai",
    displayName: "GPT-4o Mini",
  },
  o3: {
    alias: "o3",
    modelId: "o3",
    provider: "openai",
    displayName: "o3",
  },
  "o4-mini": {
    alias: "o4-mini",
    modelId: "o4-mini",
    provider: "openai",
    displayName: "o4-mini",
  },
};

export function resolveModel(alias: ModelAlias): ModelConfig {
  return MODEL_REGISTRY[alias];
}

import { describe, it, expect } from "vitest";
import { resolveModel, MODEL_ALIASES } from "./models.js";

describe("resolveModel", () => {
  it("every alias resolves to a valid ModelConfig", () => {
    for (const alias of MODEL_ALIASES) {
      const config = resolveModel(alias);
      expect(config).toBeDefined();
      expect(config.alias).toBe(alias);
      expect(config.modelId).toBeTruthy();
      expect(config.provider).toMatch(/^(anthropic|openai)$/);
      expect(config.displayName).toBeTruthy();
    }
  });

  it("resolves opus to Anthropic Opus", () => {
    const config = resolveModel("opus");
    expect(config.modelId).toBe("claude-opus-4-6");
    expect(config.provider).toBe("anthropic");
  });

  it("resolves gpt-4o to OpenAI", () => {
    const config = resolveModel("gpt-4o");
    expect(config.modelId).toBe("gpt-4o");
    expect(config.provider).toBe("openai");
  });

  it("code-mode aliases have codeMode and betas", () => {
    for (const alias of ["sonnet-code", "opus-code"] as const) {
      const config = resolveModel(alias);
      expect(config.codeMode).toBe(true);
      expect(config.betas).toBeDefined();
      expect(config.betas!.length).toBeGreaterThan(0);
    }
  });

  it("non-code aliases do not have codeMode", () => {
    for (const alias of ["opus", "sonnet", "haiku", "gpt-4o"] as const) {
      const config = resolveModel(alias);
      expect(config.codeMode).toBeUndefined();
    }
  });
});

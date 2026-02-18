import { z } from "zod";
import { MODEL_ALIASES } from "./agent/models.js";
import type { ModelAlias } from "./agent/models.js";
import suiteModules from "./suites/index.js";

// ── Zod schemas ──

const ModelAliasSchema = z.enum(MODEL_ALIASES);

const SharedServerFields = {
  id: z.string(),
  displayName: z.string(),
  capabilities: z.object({ write: z.boolean() }),
  mode: z.enum(["tools", "code"]),
  models: z.array(ModelAliasSchema).optional(),
  tags: z.array(z.string()).optional(),
};

const StdioServerConfigSchema = z.object({
  ...SharedServerFields,
  transport: z.literal("stdio"),
  command: z.string(),
  args: z.array(z.string()),
  env: z.record(z.string(), z.string()),
});

const HttpServerConfigSchema = z.object({
  ...SharedServerFields,
  transport: z.literal("http"),
  url: z.string().url(),
  headers: z.record(z.string(), z.string()).optional(),
});

// Preprocess adds transport:"stdio" when missing for backward compatibility,
// so existing suites without a transport field continue to work.
export const ServerConfigSchema = z.preprocess(
  (val) => {
    if (val && typeof val === "object" && !("transport" in val)) {
      return { ...val, transport: "stdio" };
    }
    return val;
  },
  z.discriminatedUnion("transport", [
    StdioServerConfigSchema,
    HttpServerConfigSchema,
  ]),
);

export const ExpectedResultSchema = z.object({
  description: z.string(),
  containsText: z.array(z.string()).optional(),
  fieldValues: z.record(z.string(), z.unknown()).optional(),
});

export const TestCaseSchema = z.object({
  id: z.string(),
  prompt: z.string(),
  expected: ExpectedResultSchema,
  tags: z.array(z.string()),
  requiredCapabilities: z.object({ write: z.boolean().optional() }).optional(),
});

export const SuiteConfigSchema = z.object({
  projectName: z.string(),
  systemPrompt: z.string(),
  servers: z.array(ServerConfigSchema),
  testCases: z.array(TestCaseSchema),
  setup: z.string().optional(),
});

// ── TypeScript types ──
// Manually defined so that suite files can omit `transport` (defaults to "stdio")
// while consumers always see a discriminated union after parsing.

interface SharedServerConfig {
  id: string;
  displayName: string;
  capabilities: { write: boolean };
  mode: "tools" | "code";
  models?: ModelAlias[];
  tags?: string[];
}

export interface StdioServerConfig extends SharedServerConfig {
  transport?: "stdio";
  command: string;
  args: string[];
  env: Record<string, string>;
}

export interface HttpServerConfig extends SharedServerConfig {
  transport: "http";
  url: string;
  headers?: Record<string, string>;
}

export type ServerConfig = StdioServerConfig | HttpServerConfig;

export type ExpectedResult = z.infer<typeof ExpectedResultSchema>;
export type TestCase = z.infer<typeof TestCaseSchema>;

export interface SuiteConfig {
  projectName: string;
  systemPrompt: string;
  servers: ServerConfig[];
  testCases: TestCase[];
  setup?: string;
}

// ── Loader ──

export async function loadSuite(name?: string): Promise<SuiteConfig> {
  const suiteName = name ?? process.env.EVAL_SUITE ?? "stripe";
  const raw = suiteModules[suiteName];
  if (!raw) {
    throw new Error(
      `Unknown suite "${suiteName}". Available: ${Object.keys(suiteModules).join(", ")}`,
    );
  }
  return SuiteConfigSchema.parse(raw);
}

// ── Helpers ──

export function getTestCasesForServer(
  testCases: TestCase[],
  capabilities: { write: boolean },
): TestCase[] {
  return testCases.filter((tc) => {
    if (tc.requiredCapabilities?.write && !capabilities.write) return false;
    return true;
  });
}

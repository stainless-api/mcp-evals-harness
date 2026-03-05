import path from "path";
import { pathToFileURL } from "url";
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
  /** When true, MCP tools are deferred so only code execution can invoke them. */
  deferLoading: z.boolean().optional(),
  /** Restricts which callers can invoke MCP tools (e.g. ["code_execution_20250825"]). */
  allowedCallers: z
    .array(z.enum(["direct", "code_execution_20250825"]))
    .optional(),
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
  /** When true, MCP tools are deferred so only code execution can invoke them. */
  deferLoading?: boolean;
  /** Restricts which callers can invoke MCP tools (e.g. ["code_execution_20250825"]). */
  allowedCallers?: Array<"direct" | "code_execution_20250825">;
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

// ── Dynamic expected values ──

/**
 * Optional named export from suite modules. Called before eval runs to
 * query live API state and return ground-truth expected values.
 * Returns a map from test case ID to partial ExpectedResult overrides.
 */
export type ResolveExpected = () => Promise<
  Record<string, Partial<ExpectedResult>>
>;

export interface LoadedSuite {
  config: SuiteConfig;
  resolveExpected?: ResolveExpected;
}

/**
 * Merge dynamically resolved expected values into test cases.
 * Mutates in place — safe because loadSuite() returns freshly parsed objects.
 */
export function applyResolved(
  testCases: TestCase[],
  resolved: Record<string, Partial<ExpectedResult>>,
): void {
  for (const tc of testCases) {
    const patch = resolved[tc.id];
    if (!patch) continue;
    if (patch.description !== undefined) {
      tc.expected.description = patch.description;
    }
    if (patch.containsText !== undefined) {
      tc.expected.containsText = patch.containsText;
    }
    if (patch.fieldValues !== undefined) {
      tc.expected.fieldValues = patch.fieldValues;
    }
  }
}

// ── Loader ──

export async function loadSuite(name?: string): Promise<LoadedSuite> {
  const suiteName = name ?? process.env.EVAL_SUITE ?? "stripe";

  let mod: Record<string, unknown>;

  // If the name contains path separators, treat it as a file path
  if (path.basename(suiteName) !== suiteName) {
    const resolved = path.resolve(suiteName);
    mod = await import(pathToFileURL(resolved).href);
  } else {
    const raw = suiteModules[suiteName];
    if (!raw) {
      throw new Error(
        `Unknown suite "${suiteName}". Available: ${Object.keys(suiteModules).join(", ")}`,
      );
    }
    mod = raw as Record<string, unknown>;
  }

  // Barrel now uses namespace imports, so .default holds the config.
  // For path-based dynamic imports, .default is also the default export.
  const configRaw = mod.default ?? mod;
  const config = SuiteConfigSchema.parse(configRaw);

  return {
    config,
    resolveExpected:
      typeof mod.resolveExpected === "function"
        ? (mod.resolveExpected as ResolveExpected)
        : undefined,
  };
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

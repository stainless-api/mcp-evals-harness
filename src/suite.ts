import { z } from "zod";

// ── Zod schemas ──

export const ServerConfigSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  command: z.string(),
  args: z.array(z.string()),
  env: z.record(z.string(), z.string()),
  capabilities: z.object({ write: z.boolean() }),
  mode: z.enum(["tools", "code"]),
  transport: z.enum(["stdio", "sse", "http"]).optional(),
});

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

export type ServerConfig = z.infer<typeof ServerConfigSchema>;
export type ExpectedResult = z.infer<typeof ExpectedResultSchema>;
export type TestCase = z.infer<typeof TestCaseSchema>;
export type SuiteConfig = z.infer<typeof SuiteConfigSchema>;

// ── Loader ──

export async function loadSuite(name?: string): Promise<SuiteConfig> {
  const suiteName = name ?? process.env.EVAL_SUITE ?? "stripe";
  const mod = await import(`./suites/${suiteName}.js`);
  const raw = mod.default ?? mod;
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

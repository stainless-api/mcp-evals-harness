import { Eval, currentSpan } from "braintrust";
import { Factuality } from "autoevals";

import { getTestCasesForServer, applyResolved } from "./suite.js";
import { createRunner, resolveModel } from "./agent/index.js";
import { scoreCompleteness } from "./scorers/completeness.js";
import { scoreEfficiency } from "./scorers/efficiency.js";
import { scoreToolUsage } from "./scorers/tool-usage.js";
import type { SuiteConfig, TestCase, ResolveExpected } from "./suite.js";

export interface RunEvalsOptions {
  tags?: string[];
  resolveExpected?: ResolveExpected;
}

// Collect tagging promises so we can ensure they complete before process exit
const tagPromises: Promise<void>[] = [];

async function tagExperiment(experimentId: string, tags: string[]) {
  const apiUrl = process.env.BRAINTRUST_API_URL ?? "https://api.braintrust.dev";
  const res = await fetch(`${apiUrl}/v1/experiment/${experimentId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.BRAINTRUST_API_KEY}`,
    },
    body: JSON.stringify({ tags }),
  });
  if (!res.ok) {
    console.error(
      `Failed to tag experiment ${experimentId}: ${res.status} ${await res.text()}`,
    );
  }
}

process.on("beforeExit", async () => {
  await Promise.allSettled(tagPromises);
});

export function runEvals(suite: SuiteConfig, options?: RunEvalsOptions): void {
  const cliTags: string[] = options?.tags ?? [];

  // ── Read/write barrier ──
  // Write tests mutate shared sandbox state (e.g. creating cards/transactions).
  // To prevent contamination of read test scoring, we ensure ALL read tests
  // across ALL experiments complete before any write test begins.
  let pendingReadTasks = 0;
  let readBarrierResolve: () => void;
  const readBarrier = new Promise<void>((r) => {
    readBarrierResolve = r;
  });

  for (const server of suite.servers) {
    const cases = getTestCasesForServer(suite.testCases, server.capabilities);
    const readCount = cases.filter(
      (tc) => !tc.requiredCapabilities?.write,
    ).length;
    const aliasCount = (server.models ?? ["opus"]).length;
    pendingReadTasks += readCount * aliasCount;
  }

  if (pendingReadTasks === 0) readBarrierResolve!();

  // Start resolver eagerly, await lazily in data() so Eval() calls register immediately
  let resolvePromise: Promise<void> | undefined;
  if (options?.resolveExpected) {
    resolvePromise = (async () => {
      try {
        const t0 = performance.now();
        console.log("Resolving dynamic expected values...");
        const resolved = await options.resolveExpected!();
        applyResolved(suite.testCases, resolved);
        const elapsed = ((performance.now() - t0) / 1000).toFixed(1);
        console.log(
          `Resolved expected values for ${Object.keys(resolved).length} test cases (${elapsed}s)`,
        );
      } catch (err) {
        console.error(
          "Failed to resolve expected values, using static defaults:",
          err,
        );
      }
    })();
  }

  for (const server of suite.servers) {
    const modelAliases = server.models ?? ["opus"];
    const testCases = getTestCasesForServer(
      suite.testCases,
      server.capabilities,
    );
    const serverTags: string[] = server.tags ?? [];

    for (const alias of modelAliases) {
      const modelConfig = resolveModel(alias);
      const runner = createRunner(modelConfig);
      const experimentName = `${server.id}-${modelConfig.alias}`;
      const experimentTags = [...new Set([...serverTags, ...cliTags])];
      let taggedExperiment = false;

      Eval(suite.projectName, {
        experimentName,
        maxConcurrency: 4,
        metadata: {
          name: experimentName,
          server: server.id,
          model: modelConfig.alias,
          provider: modelConfig.provider,
          modelId: modelConfig.modelId,
          approach: "e2e",
          mode: server.mode,
          serverTags,
          cliTags,
        },
        data: async () => {
          if (resolvePromise) await resolvePromise;
          return testCases.map((tc) => ({
            input: {
              prompt: tc.prompt,
              testCaseId: tc.id,
              tags: tc.tags,
            },
            tags: tc.tags,
            expected: tc.expected.description,
            metadata: {
              testCaseId: tc.id,
              serverId: server.id,
              model: modelConfig.alias,
              tags: tc.tags,
            },
          }));
        },
        task: async (input, { span }) => {
          const isWriteTest = !!testCases.find(
            (tc) => tc.id === input.testCaseId,
          )?.requiredCapabilities?.write;

          // Write tests wait for ALL read tests across ALL experiments
          if (isWriteTest) {
            await readBarrier;
          }

          // Tag the experiment once via REST API on the first task invocation
          if (!taggedExperiment && experimentTags.length > 0) {
            taggedExperiment = true;
            const parentId = await (span as any).parentObjectId?.get?.();
            if (parentId) {
              tagPromises.push(tagExperiment(parentId, experimentTags));
            }
          }

          try {
            const result = await runner.run(input.prompt, server, {
              systemPrompt: suite.systemPrompt,
              model: modelConfig,
            });

            // Log raw metrics to Braintrust
            currentSpan().log({
              metrics: {
                inputTokens: result.inputTokens,
                outputTokens: result.outputTokens,
                totalTokens: result.inputTokens + result.outputTokens,
                tool_calls: result.toolCalls.length,
                turnCount: result.turnCount,
                wallClockMs: result.wallClockMs,
                costUsd: result.costUsd,
              },
              metadata: {
                model: modelConfig.alias,
                modelId: result.model,
                provider: modelConfig.provider,
              },
            });

            // Return structured output for scorers
            return JSON.stringify({
              finalText: result.finalText,
              toolCalls: result.toolCalls,
              turnCount: result.turnCount,
              totalTokens: result.inputTokens + result.outputTokens,
            });
          } finally {
            // Always decrement, even on throw — otherwise write tests hang forever
            if (!isWriteTest) {
              pendingReadTasks--;
              if (pendingReadTasks === 0) readBarrierResolve!();
            }
          }
        },
        scores: [
          // Factuality (LLM-as-judge)
          async (args: { input: any; output: string; expected?: string }) => {
            let outputText: string;
            try {
              const parsed = JSON.parse(args.output);
              outputText = parsed.finalText ?? args.output;
            } catch {
              outputText = args.output;
            }
            // Agent errors are not factual answers
            if (outputText.startsWith("[Agent error:")) {
              return { name: "Factuality", score: 0, metadata: { reason: "agent_error" } };
            }
            return Factuality({
              input: args.input.prompt,
              output: outputText,
              expected: args.expected,
            });
          },
          // Completeness scorer
          (args: { input: any; output: string; expected?: string }) => {
            const tc = testCases.find(
              (t) => t.id === args.input.testCaseId,
            ) as TestCase;
            const expected = tc.expected;
            let outputText: string;
            try {
              const parsed = JSON.parse(args.output);
              outputText = parsed.finalText ?? args.output;
            } catch {
              outputText = args.output;
            }
            // Agent errors contain no useful content
            if (outputText.startsWith("[Agent error:")) {
              return { name: "Completeness", score: 0, metadata: { reason: "agent_error" } };
            }
            return {
              name: "Completeness",
              score: scoreCompleteness(outputText, expected),
            };
          },
          // Efficiency scorer
          (args: { input: any; output: string; expected?: string }) => {
            let turnCount = 50;
            let totalTokens = 500_000;
            try {
              const parsed = JSON.parse(args.output);
              turnCount = parsed.turnCount ?? 50;
              totalTokens = parsed.totalTokens ?? 500_000;
            } catch {
              // Use worst-case defaults
            }
            return {
              name: "Efficiency",
              score: scoreEfficiency({ turnCount, totalTokens }),
            };
          },
          // Tool usage scorer
          (args: { input: any; output: string }) => {
            let toolCalls: any[] = [];
            try {
              const parsed = JSON.parse(args.output);
              toolCalls = parsed.toolCalls ?? [];
            } catch {}
            return scoreToolUsage(toolCalls);
          },
        ],
      });
    }
  }
}

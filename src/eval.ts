import { Eval, currentSpan } from "braintrust";

import { getTestCasesForServer, applyResolved } from "./suite.js";
import { createRunner, resolveModel } from "./agent/index.js";
import { scoreTaskSuccess } from "./scorers/task-success.js";
import { scoreCorrectness } from "./scorers/correctness.js";
import { scoreErrorRate } from "./scorers/error-rate.js";
import { scoreEfficiency } from "./scorers/efficiency.js";
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
      const t0 = performance.now();
      console.log("Resolving dynamic expected values...");
      const resolved = await options.resolveExpected!();
      applyResolved(suite.testCases, resolved);
      const elapsed = ((performance.now() - t0) / 1000).toFixed(1);
      console.log(
        `Resolved expected values for ${Object.keys(resolved).length} test cases (${elapsed}s)`,
      );
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
        maxConcurrency: 1,
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

            // Run post-execution verification for write tests
            const tc = testCases.find((t) => t.id === input.testCaseId);
            let verifyResult: { success: boolean; details: string } | undefined;
            if (tc?.verify) {
              try {
                verifyResult = await tc.verify();
              } catch (err) {
                verifyResult = {
                  success: false,
                  details: `verify threw: ${err}`,
                };
              }
            }

            // Return structured output for scorers
            return JSON.stringify({
              finalText: result.finalText,
              toolCalls: result.toolCalls,
              turnCount: result.turnCount,
              totalTokens: result.inputTokens + result.outputTokens,
              verifyResult,
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
          // TaskSuccess (headline metric, deterministic)
          (args: { input: any; output: string }) => {
            const tc = testCases.find(
              (t) => t.id === args.input.testCaseId,
            ) as TestCase;
            let outputText: string;
            let verifyResult: { success: boolean; details: string } | undefined;
            try {
              const parsed = JSON.parse(args.output);
              outputText = parsed.finalText ?? args.output;
              verifyResult = parsed.verifyResult;
            } catch {
              outputText = args.output;
            }
            return scoreTaskSuccess(outputText, tc.expected, verifyResult);
          },
          // Correctness (LLM-as-judge, secondary diagnostic)
          async (args: {
            input: any;
            output: string;
            expected?: string;
          }) => {
            let outputText: string;
            try {
              const parsed = JSON.parse(args.output);
              outputText = parsed.finalText ?? args.output;
            } catch {
              outputText = args.output;
            }
            return scoreCorrectness(
              args.input.prompt,
              outputText,
              args.expected ?? "",
            );
          },
          // ErrorRate (diagnostic, lower is better)
          (args: { input: any; output: string }) => {
            let toolCalls: any[] = [];
            try {
              const parsed = JSON.parse(args.output);
              toolCalls = parsed.toolCalls ?? [];
            } catch {}
            return scoreErrorRate(toolCalls);
          },
          // Efficiency (turn count normalized, higher is better)
          (args: { input: any; output: string }) => {
            let turnCount = 50;
            let totalTokens = 500_000;
            try {
              const parsed = JSON.parse(args.output);
              turnCount = parsed.turnCount ?? 50;
              totalTokens = parsed.totalTokens ?? 500_000;
            } catch {}
            return scoreEfficiency({ turnCount, totalTokens });
          },
        ],
      });
    }
  }
}

import { Eval, currentSpan } from "braintrust";
import { Factuality } from "autoevals";
import { config } from "dotenv";
config({ path: "./.env" });

import { loadSuite, getTestCasesForServer } from "../suite.js";
import { createRunner, resolveModel } from "../agent/index.js";
import { scoreCompleteness } from "../scorers/completeness.js";
import { scoreEfficiency } from "../scorers/efficiency.js";
import type { TestCase } from "../suite.js";

(async () => {
  const suite = await loadSuite();

  const cliTags: string[] = (process.env.EVAL_TAGS ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  for (const server of suite.servers) {
    const modelAliases = server.models ?? ["opus"];
    const testCases = getTestCasesForServer(suite.testCases, server.capabilities);
    const serverTags: string[] = server.tags ?? [];

    for (const alias of modelAliases) {
      const modelConfig = resolveModel(alias);
      const runner = createRunner(modelConfig);

      Eval(suite.projectName, {
        experimentName: `${server.id}-${modelConfig.alias}`,
        maxConcurrency: 2,
        metadata: {
          name: `${server.id}-${modelConfig.alias}`,
          server: server.id,
          model: modelConfig.alias,
          provider: modelConfig.provider,
          modelId: modelConfig.modelId,
          approach: "e2e",
          mode: server.mode,
          serverTags,
          cliTags,
        },
        data: () =>
          testCases.map((tc) => {
            const mergedTags = [...new Set([...tc.tags, ...serverTags, ...cliTags])];
            return {
              input: {
                prompt: tc.prompt,
                testCaseId: tc.id,
                tags: mergedTags,
              },
              tags: mergedTags,
              expected: tc.expected.description,
              metadata: {
                testCaseId: tc.id,
                serverId: server.id,
                model: modelConfig.alias,
                tags: mergedTags,
              },
            };
          }),
        task: async (input) => {
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
              toolCallCount: result.toolCalls.length,
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
              outputText =
                parsed.finalText + "\n" + JSON.stringify(parsed.toolCalls);
            } catch {
              outputText = args.output;
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
        ],
      });
    }
  }
})();

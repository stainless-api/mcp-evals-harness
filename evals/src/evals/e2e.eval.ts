import { Eval, currentSpan } from "braintrust";
import { Factuality } from "autoevals";
import { config } from "dotenv";
config();

import { SERVERS } from "../servers/config.js";
import { getTestCasesForServer } from "../dataset/test-cases.js";
import { createRunner } from "../agent/index.js";
import { scoreCompleteness } from "../scorers/completeness.js";
import { scoreEfficiency } from "../scorers/efficiency.js";
import type { TestCase } from "../dataset/test-cases.js";
import type { RunnerType } from "../agent/index.js";

const runnerType = (process.env.AGENT_SDK ?? "anthropic") as RunnerType;
const runner = createRunner(runnerType);

for (const server of SERVERS) {
  const testCases = getTestCasesForServer(server.capabilities);

  Eval("cjs-stripe-test", {
    experimentName: `e2e-${server.id}`,
    maxConcurrency: 2,
    metadata: {
      server: server.id,
      approach: "e2e",
      mode: server.mode,
      runnerType,
    },
    data: () =>
      testCases.map((tc) => ({
        input: {
          prompt: tc.prompt,
          testCaseId: tc.id,
          tags: tc.tags,
        },
        expected: tc.expected.description,
        metadata: {
          testCaseId: tc.id,
          serverId: server.id,
          tags: tc.tags,
        },
      })),
    task: async (input) => {
      const result = await runner.run(input.prompt, server);

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
          model: result.model,
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

import { Eval } from "braintrust";
import { Factuality } from "autoevals";
import { config } from "dotenv";
config();

import { SERVERS } from "../servers/config.js";
import { getTestCasesForServer } from "../dataset/test-cases.js";
import { runAgentLoop } from "../agent/loop.js";
import { scoreCompleteness } from "../scorers/completeness.js";
import { scoreToolSelection } from "../scorers/tool-selection.js";
import { scoreLatency } from "../scorers/latency.js";
import { scoreTokenEfficiency } from "../scorers/token-efficiency.js";
import type { TestCase } from "../dataset/test-cases.js";

for (const server of SERVERS) {
  const testCases = getTestCasesForServer(server.id, server.capabilities);

  Eval("cjs-stripe-test", {
    experimentName: `e2e-${server.id}`,
    maxConcurrency: 2,
    metadata: {
      server: server.id,
      approach: "e2e",
      account: server.account,
      mode: server.mode,
    },
    data: () =>
      testCases.map((tc) => ({
        input: {
          prompt: tc.prompt,
          testCaseId: tc.id,
          serverId: server.id,
          tags: tc.tags,
          expectedToolName:
            tc.directInvocations[server.id]?.toolName ?? "",
        },
        expected: tc.expected[server.account].description,
        metadata: {
          testCaseId: tc.id,
          tags: tc.tags,
          account: server.account,
        },
      })),
    task: async (input) => {
      const result = await runAgentLoop(input.prompt, server);
      // Return structured output for scorers
      return JSON.stringify({
        finalText: result.finalText,
        toolCalls: result.toolCalls,
        wallClockMs: result.wallClockMs,
        inputTokens: result.inputTokens,
        outputTokens: result.outputTokens,
        turnCount: result.turnCount,
      });
    },
    scores: [
      // Factuality (LLM-as-judge) — wrap to extract prompt string from input object
      async (args: { input: any; output: string; expected?: string }) => {
        let outputText: string;
        try {
          const parsed = JSON.parse(args.output);
          outputText = parsed.finalText ?? args.output;
        } catch {
          outputText = args.output;
        }
        const result = await Factuality({
          input: args.input.prompt,
          output: outputText,
          expected: args.expected,
        });
        return result;
      },
      // Completeness scorer
      (args: { input: any; output: string; expected?: string }) => {
        const tc = testCases.find(
          (t) => t.id === args.input.testCaseId,
        ) as TestCase;
        const expected = tc.expected[server.account];
        let outputText: string;
        try {
          const parsed = JSON.parse(args.output);
          outputText = parsed.finalText + "\n" + JSON.stringify(parsed.toolCalls);
        } catch {
          outputText = args.output;
        }
        return {
          name: "Completeness",
          score: scoreCompleteness(outputText, expected),
        };
      },
      // Tool selection scorer
      (args: { input: any; output: string }) => {
        let toolCalls: Array<{ name: string }> = [];
        try {
          const parsed = JSON.parse(args.output);
          toolCalls = parsed.toolCalls ?? [];
        } catch {
          // no tool calls parseable
        }
        return {
          name: "ToolSelection",
          score: scoreToolSelection(
            toolCalls as any,
            args.input.expectedToolName,
          ),
        };
      },
      // Latency scorer
      (args: { output: string }) => {
        let wallClockMs = 15000; // default mid-range
        try {
          const parsed = JSON.parse(args.output);
          wallClockMs = parsed.wallClockMs ?? wallClockMs;
        } catch {
          // use default
        }
        return {
          name: "Latency",
          score: scoreLatency(wallClockMs),
        };
      },
      // Token efficiency scorer
      (args: { output: string }) => {
        let totalTokens = 10000; // default mid-range
        try {
          const parsed = JSON.parse(args.output);
          totalTokens =
            (parsed.inputTokens ?? 0) + (parsed.outputTokens ?? 0);
        } catch {
          // use default
        }
        return {
          name: "TokenEfficiency",
          score: scoreTokenEfficiency(totalTokens),
        };
      },
    ],
  });
}

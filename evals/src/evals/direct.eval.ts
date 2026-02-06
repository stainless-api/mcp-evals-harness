import { Eval } from "braintrust";
import { config } from "dotenv";
config();

import { SERVERS } from "../servers/config.js";
import { getTestCasesForServer } from "../dataset/test-cases.js";
import { McpConnection } from "../mcp-client/connect.js";
import { scoreCompleteness } from "../scorers/completeness.js";
import { scoreStructuredMatch } from "../scorers/structured-match.js";
import { scoreLatency } from "../scorers/latency.js";
import type { TestCase } from "../dataset/test-cases.js";

for (const server of SERVERS) {
  const testCases = getTestCasesForServer(server.id, server.capabilities);

  // Skip multi-step for direct invocation (it's a single tool call approach)
  const directCases = testCases.filter(
    (tc) => !tc.tags.includes("multi-step"),
  );

  Eval("cjs-stripe-test", {
    experimentName: `direct-${server.id}`,
    maxConcurrency: 2,
    metadata: {
      server: server.id,
      approach: "direct",
      account: server.account,
      mode: server.mode,
    },
    data: () =>
      directCases.map((tc) => ({
        input: {
          testCaseId: tc.id,
          serverId: server.id,
          toolName: tc.directInvocations[server.id].toolName,
          args: tc.directInvocations[server.id].args,
          tags: tc.tags,
        },
        expected: tc.expected[server.account].description,
        metadata: {
          testCaseId: tc.id,
          tags: tc.tags,
          account: server.account,
        },
      })),
    task: async (input) => {
      const connection = new McpConnection(server);
      const startTime = Date.now();
      try {
        await connection.connect();
        const result = await connection.callTool(input.toolName, input.args);
        const wallClockMs = Date.now() - startTime;
        const outputText = result.content
          .map((c) => c.text ?? JSON.stringify(c))
          .join("\n");
        return JSON.stringify({
          output: outputText,
          wallClockMs,
          isError: result.isError ?? false,
        });
      } finally {
        await connection.disconnect();
      }
    },
    scores: [
      // Structured match scorer
      (args: { input: any; output: string; expected?: string }) => {
        const tc = directCases.find(
          (t) => t.id === args.input.testCaseId,
        ) as TestCase;
        const expected = tc.expected[server.account];
        let outputText: string;
        try {
          const parsed = JSON.parse(args.output);
          outputText = parsed.output ?? args.output;
        } catch {
          outputText = args.output;
        }
        return {
          name: "StructuredMatch",
          score: scoreStructuredMatch(outputText, expected),
        };
      },
      // Completeness scorer
      (args: { input: any; output: string }) => {
        const tc = directCases.find(
          (t) => t.id === args.input.testCaseId,
        ) as TestCase;
        const expected = tc.expected[server.account];
        let outputText: string;
        try {
          const parsed = JSON.parse(args.output);
          outputText = parsed.output ?? args.output;
        } catch {
          outputText = args.output;
        }
        return {
          name: "Completeness",
          score: scoreCompleteness(outputText, expected),
        };
      },
      // Latency scorer
      (args: { output: string }) => {
        let wallClockMs = 15000;
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
    ],
  });
}

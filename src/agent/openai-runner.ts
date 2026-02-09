import OpenAI from "openai";
import type {
  ChatCompletionMessageParam,
  ChatCompletionTool,
  ChatCompletionMessageToolCall,
} from "openai/resources/chat/completions.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { currentSpan } from "braintrust";
import type { ServerConfig } from "../suite.js";
import type { ModelConfig } from "./types.js";
import type {
  AgentResult,
  AgentRunner,
  AgentRunnerOptions,
  ToolCallRecord,
} from "./types.js";

const DEFAULT_MODEL: ModelConfig = {
  alias: "gpt-4o",
  modelId: "gpt-4o",
  provider: "openai",
  displayName: "GPT-4o",
};

const DEFAULT_MAX_TURNS = 10;
const DEFAULT_SYSTEM_PROMPT =
  "You are a helpful assistant with access to API tools via MCP. " +
  "Use the available tools to answer questions accurately based on actual data.";

// Approximate cost per token (USD) by model prefix — rough estimates
const COST_PER_INPUT_TOKEN: Record<string, number> = {
  "gpt-4o": 2.5 / 1_000_000,
  "gpt-4o-mini": 0.15 / 1_000_000,
  o3: 10 / 1_000_000,
  "o4-mini": 1.1 / 1_000_000,
};
const COST_PER_OUTPUT_TOKEN: Record<string, number> = {
  "gpt-4o": 10 / 1_000_000,
  "gpt-4o-mini": 0.6 / 1_000_000,
  o3: 40 / 1_000_000,
  "o4-mini": 4.4 / 1_000_000,
};

function estimateCost(
  modelId: string,
  inputTokens: number,
  outputTokens: number,
): number {
  const inputRate = COST_PER_INPUT_TOKEN[modelId] ?? 5 / 1_000_000;
  const outputRate = COST_PER_OUTPUT_TOKEN[modelId] ?? 15 / 1_000_000;
  return inputTokens * inputRate + outputTokens * outputRate;
}

/**
 * Convert MCP tool schemas to OpenAI function-calling format.
 */
function mcpToolsToOpenAI(
  tools: Array<{
    name: string;
    description?: string;
    inputSchema: Record<string, unknown>;
  }>,
): ChatCompletionTool[] {
  return tools.map((tool) => ({
    type: "function" as const,
    function: {
      name: tool.name,
      description: tool.description ?? "",
      parameters: tool.inputSchema as Record<string, unknown>,
    },
  }));
}

export class OpenAIRunner implements AgentRunner {
  async run(
    prompt: string,
    serverConfig: ServerConfig,
    options?: AgentRunnerOptions,
  ): Promise<AgentResult> {
    const modelConfig = options?.model ?? DEFAULT_MODEL;
    const maxTurns = options?.maxTurns ?? DEFAULT_MAX_TURNS;
    const systemPrompt = options?.systemPrompt ?? DEFAULT_SYSTEM_PROMPT;
    const startTime = Date.now();

    const toolCalls: ToolCallRecord[] = [];
    let totalInputTokens = 0;
    let totalOutputTokens = 0;
    let turnCount = 0;

    // 1. Spawn MCP server via StdioClientTransport
    const transport = new StdioClientTransport({
      command: serverConfig.command,
      args: serverConfig.args,
      env: { ...process.env, ...serverConfig.env } as Record<string, string>,
      stderr: "pipe",
    });

    const mcpClient = new Client(
      { name: "openai-runner", version: "1.0.0" },
    );

    const openai = new OpenAI();

    try {
      // 2. Connect and discover tools
      await mcpClient.connect(transport);
      const { tools: mcpTools } = await mcpClient.listTools();
      const openaiTools = mcpToolsToOpenAI(mcpTools);

      // 3. Multi-turn conversation loop
      const messages: ChatCompletionMessageParam[] = [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ];

      for (let turn = 0; turn < maxTurns; turn++) {
        turnCount++;

        const response = await openai.chat.completions.create({
          model: modelConfig.modelId,
          messages,
          tools: openaiTools.length > 0 ? openaiTools : undefined,
        });

        const choice = response.choices[0];
        const assistantMessage = choice.message;

        // Track tokens
        if (response.usage) {
          totalInputTokens += response.usage.prompt_tokens;
          totalOutputTokens += response.usage.completion_tokens;
        }

        // Add assistant message to conversation
        messages.push(assistantMessage);

        // If no tool calls, we're done
        if (
          choice.finish_reason !== "tool_calls" ||
          !assistantMessage.tool_calls?.length
        ) {
          const finalText = assistantMessage.content ?? "";
          return {
            finalText,
            toolCalls,
            wallClockMs: Date.now() - startTime,
            inputTokens: totalInputTokens,
            outputTokens: totalOutputTokens,
            turnCount,
            costUsd: estimateCost(
              modelConfig.modelId,
              totalInputTokens,
              totalOutputTokens,
            ),
            model: modelConfig.modelId,
          };
        }

        // 4. Execute tool calls via MCP client
        for (const tc of assistantMessage.tool_calls) {
          const toolStart = Date.now();
          let resultText: string;

          try {
            const args = JSON.parse(tc.function.arguments);
            const mcpResult = await mcpClient.callTool({
              name: tc.function.name,
              arguments: args,
            });

            // Extract text from MCP result content
            const content = mcpResult.content;
            if (Array.isArray(content)) {
              resultText = content
                .map((c: any) =>
                  c.type === "text" ? c.text : JSON.stringify(c),
                )
                .join("\n");
            } else {
              resultText = JSON.stringify(content);
            }

            const record: ToolCallRecord = {
              name: tc.function.name,
              args,
              result: resultText,
              durationMs: Date.now() - toolStart,
            };
            toolCalls.push(record);

            // Log as Braintrust child span
            try {
              const span = currentSpan();
              span.traced(
                (childSpan) => {
                  childSpan.log({
                    input: args,
                    output: resultText,
                    metadata: { toolName: tc.function.name },
                    metrics: { durationMs: record.durationMs },
                  });
                },
                { name: `tool:${tc.function.name}` },
              );
            } catch {
              // No active span context
            }
          } catch (err) {
            resultText = `Error: ${err instanceof Error ? err.message : String(err)}`;
            toolCalls.push({
              name: tc.function.name,
              args: {},
              result: resultText,
              durationMs: Date.now() - toolStart,
            });
          }

          // Inject tool result back into conversation
          messages.push({
            role: "tool",
            tool_call_id: tc.id,
            content: resultText,
          });
        }
      }

      // Max turns reached — return last assistant content
      const lastAssistant = messages
        .filter((m) => m.role === "assistant")
        .pop();
      const finalText =
        (lastAssistant && "content" in lastAssistant
          ? (lastAssistant.content as string)
          : null) ?? "[Max turns reached]";

      return {
        finalText,
        toolCalls,
        wallClockMs: Date.now() - startTime,
        inputTokens: totalInputTokens,
        outputTokens: totalOutputTokens,
        turnCount,
        costUsd: estimateCost(
          modelConfig.modelId,
          totalInputTokens,
          totalOutputTokens,
        ),
        model: modelConfig.modelId,
      };
    } finally {
      // 5. Cleanup
      try {
        await mcpClient.close();
      } catch {
        // Best-effort cleanup
      }
    }
  }
}

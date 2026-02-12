import Anthropic from "@anthropic-ai/sdk";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { currentSpan } from "braintrust";
import type { ServerConfig } from "../suite.js";
import type {
  ModelConfig,
  AgentResult,
  AgentRunner,
  AgentRunnerOptions,
  ToolCallRecord,
} from "./types.js";

const DEFAULT_MODEL: ModelConfig = {
  alias: "sonnet-code",
  modelId: "claude-sonnet-4-5-20250929",
  provider: "anthropic",
  displayName: "Claude Sonnet 4.5 (Code)",
  betas: ["advanced-tool-use-2025-11-20"],
  codeMode: true,
};

const DEFAULT_MAX_TURNS = 50;
const DEFAULT_SYSTEM_PROMPT =
  "You are a helpful assistant with access to API tools via MCP. " +
  "Use the available tools to answer questions accurately based on actual data.";

// Approximate cost per token (USD)
const COST_PER_INPUT_TOKEN: Record<string, number> = {
  "claude-sonnet-4-5-20250929": 3 / 1_000_000,
  "claude-opus-4-6": 15 / 1_000_000,
};
const COST_PER_OUTPUT_TOKEN: Record<string, number> = {
  "claude-sonnet-4-5-20250929": 15 / 1_000_000,
  "claude-opus-4-6": 75 / 1_000_000,
};

function estimateCost(
  modelId: string,
  inputTokens: number,
  outputTokens: number,
): number {
  const inputRate = COST_PER_INPUT_TOKEN[modelId] ?? 15 / 1_000_000;
  const outputRate = COST_PER_OUTPUT_TOKEN[modelId] ?? 75 / 1_000_000;
  return inputTokens * inputRate + outputTokens * outputRate;
}

type RunnableMcpTool = Anthropic.Beta.Messages.BetaTool & {
  run: (args: unknown) => Promise<string>;
};

export class AnthropicCodeRunner implements AgentRunner {
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

    // 1. Spawn MCP server
    const transport = new StdioClientTransport({
      command: serverConfig.command,
      args: serverConfig.args,
      env: { ...process.env, ...serverConfig.env } as Record<string, string>,
      stderr: "pipe",
    });

    const mcpClient = new Client(
      { name: "anthropic-code-runner", version: "1.0.0" },
    );

    const anthropic = new Anthropic();

    try {
      // 2. Connect and discover tools
      await mcpClient.connect(transport);
      const { tools: discoveredTools } = await mcpClient.listTools();

      // Build MCP tools with defer_loading and allowed_callers for code execution
      const mcpTools: RunnableMcpTool[] = discoveredTools.map((tool) => ({
        type: "custom" as const,
        name: tool.name,
        description: tool.description,
        input_schema: tool.inputSchema as Anthropic.Beta.Messages.BetaTool.InputSchema,
        allowed_callers: ["code_execution_20250825" as const],
        defer_loading: true,
        run: async (args: unknown) => {
          const toolStart = Date.now();
          const mcpResult = await mcpClient.callTool({
            name: tool.name,
            arguments: args as Record<string, unknown>,
          });
          const content = mcpResult.content;
          let resultText: string;
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
            name: tool.name,
            args: args as Record<string, unknown>,
            result: resultText.slice(0, 90_000),
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
                  metadata: { toolName: tool.name },
                  metrics: { durationMs: record.durationMs },
                });
              },
              { name: `tool:${tool.name}` },
            );
          } catch {
            // No active span context
          }

          return resultText.slice(0, 90_000);
        },
      }));

      // Server-side tools (not deferred) + deferred MCP tools
      const toolSearchTool: Anthropic.Beta.Messages.BetaToolSearchToolBm25_20251119 = {
        type: "tool_search_tool_bm25_20251119",
        name: "tool_search_tool_bm25",
      };
      const codeExecutionTool: Anthropic.Beta.Messages.BetaCodeExecutionTool20250825 = {
        type: "code_execution_20250825",
        name: "code_execution",
      };

      const tools: Anthropic.Beta.Messages.BetaToolUnion[] = [
        toolSearchTool,
        codeExecutionTool,
        ...mcpTools,
      ];

      const betas = modelConfig.betas ?? ["advanced-tool-use-2025-11-20"];

      // 3. Multi-turn conversation loop with container_id propagation
      const messages: Anthropic.Beta.Messages.BetaMessageParam[] = [
        { role: "user", content: prompt },
      ];

      let containerId: string | undefined;
      let lastMessage: Anthropic.Beta.Messages.BetaMessage | undefined;

      for (let turn = 0; turn < maxTurns; turn++) {
        turnCount++;

        const response = await anthropic.beta.messages.create({
          messages,
          tools,
          max_tokens: 16384,
          model: modelConfig.modelId,
          system: systemPrompt,
          ...(containerId && { container: containerId }),
          ...(betas.length > 0 && { betas }),
        });

        totalInputTokens += response.usage.input_tokens;
        totalOutputTokens += response.usage.output_tokens;

        // Extract container_id from response for subsequent requests
        if (response.container?.id) {
          containerId = response.container.id;
        }

        // Add assistant response to messages
        messages.push({
          role: "assistant",
          content: response.content,
        });

        lastMessage = response;

        // Extract server-side tool calls (tool_search, code_execution)
        for (const block of response.content) {
          if (block.type === "server_tool_use") {
            const { id, name, input } = block as any;
            const resultBlock = response.content.find(
              (b: any) => b.tool_use_id === id,
            ) as any;
            const result = resultBlock
              ? JSON.stringify(resultBlock.content).slice(0, 90_000)
              : "";

            const record: ToolCallRecord = {
              name,
              args: (input as Record<string, unknown>) ?? {},
              result,
            };
            toolCalls.push(record);

            try {
              currentSpan().traced(
                (childSpan) => {
                  childSpan.log({
                    input: record.args,
                    output: record.result,
                    metadata: { toolName: name },
                  });
                },
                { name: `tool:${name}` },
              );
            } catch {
              // No active span context
            }
          }
        }

        // Check stop reason
        if (response.stop_reason === "end_turn") {
          break;
        }

        // Handle pause_turn — continue loop with same messages
        if (response.stop_reason === "pause_turn") {
          continue;
        }

        // Handle tool_use — execute MCP tools and add results
        if (response.stop_reason === "tool_use") {
          const toolUseBlocks = response.content.filter(
            (block): block is Anthropic.Beta.Messages.BetaToolUseBlock =>
              block.type === "tool_use",
          );

          if (toolUseBlocks.length === 0) {
            break;
          }

          const toolResults = await Promise.all(
            toolUseBlocks.map(async (toolUse) => {
              const tool = mcpTools.find((t) => t.name === toolUse.name);
              if (!tool) {
                return {
                  type: "tool_result" as const,
                  tool_use_id: toolUse.id,
                  content: `Error: Tool '${toolUse.name}' not found`,
                  is_error: true,
                };
              }

              try {
                const result = await tool.run(toolUse.input);
                return {
                  type: "tool_result" as const,
                  tool_use_id: toolUse.id,
                  content: result,
                };
              } catch (error) {
                return {
                  type: "tool_result" as const,
                  tool_use_id: toolUse.id,
                  content: `Error: ${error instanceof Error ? error.message : String(error)}`,
                  is_error: true,
                };
              }
            }),
          );

          messages.push({
            role: "user",
            content: toolResults,
          });

          continue;
        }

        // Unknown stop reason
        break;
      }

      // Extract final text from last message
      const finalText =
        lastMessage?.content.find(
          (block): block is Anthropic.Beta.Messages.BetaTextBlock =>
            block.type === "text",
        )?.text ?? "[No text in final response]";

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
      try {
        await mcpClient.close();
      } catch {
        // Best-effort cleanup
      }
    }
  }
}

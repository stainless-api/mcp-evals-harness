import Anthropic from "@anthropic-ai/sdk";
import { McpConnection } from "../mcp-client/connect.js";
import { mcpToolsToAnthropic } from "../mcp-client/anthropic-bridge.js";
import type { ServerConfig } from "../servers/config.js";

const MAX_TURNS = 10;
const MODEL = "claude-sonnet-4-5-20250929";

export interface ToolCallRecord {
  name: string;
  args: Record<string, unknown>;
  result: string;
}

export interface AgentResult {
  finalText: string;
  toolCalls: ToolCallRecord[];
  wallClockMs: number;
  inputTokens: number;
  outputTokens: number;
  turnCount: number;
}

export async function runAgentLoop(
  prompt: string,
  serverConfig: ServerConfig,
): Promise<AgentResult> {
  const connection = new McpConnection(serverConfig);
  const anthropic = new Anthropic();
  const startTime = Date.now();
  const toolCalls: ToolCallRecord[] = [];
  let inputTokens = 0;
  let outputTokens = 0;
  let turnCount = 0;

  try {
    await connection.connect();
    const mcpTools = await connection.listTools();
    const anthropicTools = mcpToolsToAnthropic(mcpTools);

    const messages: Anthropic.MessageParam[] = [
      { role: "user", content: prompt },
    ];

    while (turnCount < MAX_TURNS) {
      turnCount++;

      const response = await anthropic.messages.create({
        model: MODEL,
        max_tokens: 4096,
        tools: anthropicTools,
        messages,
      });

      inputTokens += response.usage.input_tokens;
      outputTokens += response.usage.output_tokens;

      // Collect text and tool_use blocks
      const textParts: string[] = [];
      const toolUseBlocks: Anthropic.ToolUseBlock[] = [];

      for (const block of response.content) {
        if (block.type === "text") {
          textParts.push(block.text);
        } else if (block.type === "tool_use") {
          toolUseBlocks.push(block);
        }
      }

      // If no tool calls, we're done
      if (toolUseBlocks.length === 0 || response.stop_reason === "end_turn") {
        if (toolUseBlocks.length === 0) {
          return {
            finalText: textParts.join("\n"),
            toolCalls,
            wallClockMs: Date.now() - startTime,
            inputTokens,
            outputTokens,
            turnCount,
          };
        }
      }

      // Add assistant message with all content blocks
      messages.push({ role: "assistant", content: response.content });

      // Execute each tool call and collect results
      const toolResults: Anthropic.ToolResultBlockParam[] = [];

      for (const toolUse of toolUseBlocks) {
        let resultText: string;
        try {
          const mcpResult = await connection.callTool(
            toolUse.name,
            toolUse.input as Record<string, unknown>,
          );
          resultText = mcpResult.content
            .map((c) => c.text ?? JSON.stringify(c))
            .join("\n");
        } catch (err) {
          resultText = `Error: ${err instanceof Error ? err.message : String(err)}`;
        }

        toolCalls.push({
          name: toolUse.name,
          args: toolUse.input as Record<string, unknown>,
          result: resultText,
        });

        toolResults.push({
          type: "tool_result",
          tool_use_id: toolUse.id,
          content: resultText,
        });
      }

      messages.push({ role: "user", content: toolResults });

      // If the stop reason was end_turn (with tool calls), do one more pass to get final text
      if (response.stop_reason === "end_turn") {
        continue;
      }
    }

    // If we exhausted turns, return what we have
    return {
      finalText: "[Max turns reached without final response]",
      toolCalls,
      wallClockMs: Date.now() - startTime,
      inputTokens,
      outputTokens,
      turnCount,
    };
  } finally {
    await connection.disconnect();
  }
}

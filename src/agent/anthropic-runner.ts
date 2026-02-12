import os from "os";
import path from "path";
import { query } from "@anthropic-ai/claude-agent-sdk";
import type {
  SDKMessage,
  SDKAssistantMessage,
  SDKResultSuccess,
  SDKResultError,
  SDKSystemMessage,
} from "@anthropic-ai/claude-agent-sdk";
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
  alias: "opus",
  modelId: "claude-opus-4-6",
  provider: "anthropic",
  displayName: "Claude Opus 4.6",
};

const DEFAULT_MAX_TURNS = 30;
const DEFAULT_SYSTEM_PROMPT =
  "You are a helpful assistant with access to API tools via MCP. " +
  "Use the available tools to answer questions accurately based on actual data.";

export class AnthropicRunner implements AgentRunner {
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

    // Track pending tool_use blocks by ID, awaiting their results
    const pendingToolUses = new Map<
      string,
      { name: string; args: Record<string, unknown>; startTime: number }
    >();

    // Build query options
    const queryOptions: Record<string, unknown> = {
      model: modelConfig.modelId,
      maxTurns,
      systemPrompt,
      permissionMode: "bypassPermissions",
      allowDangerouslySkipPermissions: true,
      persistSession: false,
      pathToClaudeCodeExecutable: process.env.CLAUDE_CODE_PATH ?? path.join(os.homedir(), ".local", "bin", "claude"),
      tools: ["Read", "Grep"] as string[],
      mcpServers: {
        [serverConfig.id]: {
          type: "stdio",
          command: serverConfig.command,
          args: serverConfig.args,
          env: serverConfig.env,
        },
      },
      allowedTools: [`mcp__${serverConfig.id}__*`, "Read", "Grep"],
      disallowedTools: [
        "Write", "Edit", "NotebookEdit",
        "Glob", 
        "Bash",
        "WebFetch", "WebSearch",
        "Task", "TodoRead", "TodoWrite",
      ],
      extraArgs: { "strict-mcp-config": null },
    };

    // Pass betas if the model config specifies them (cast through as any
    // since SdkBeta is narrowly typed to 'context-1m-2025-08-07')
    if (modelConfig.betas?.length) {
      queryOptions.betas = modelConfig.betas;
    }

    const result = query({
      prompt,
      options: queryOptions as any,
    });

    for await (const message of result) {
      // Extract tool calls from assistant messages
      if (message.type === "assistant") {
        const assistantMsg = message as SDKAssistantMessage;
        const content = assistantMsg.message?.content;
        if (Array.isArray(content)) {
          for (const block of content) {
            if (
              typeof block === "object" &&
              block !== null &&
              "type" in block &&
              block.type === "tool_use" &&
              "id" in block &&
              "name" in block
            ) {
              const toolUseBlock = block as {
                type: "tool_use";
                id: string;
                name: string;
                input: unknown;
              };
              pendingToolUses.set(toolUseBlock.id, {
                name: toolUseBlock.name,
                args: (toolUseBlock.input as Record<string, unknown>) ?? {},
                startTime: Date.now(),
              });
            }
          }
        }
      }

      // Extract tool results from user messages
      if (message.type === "user" && !("isReplay" in message)) {
        const content = (message as any).message?.content;
        if (Array.isArray(content)) {
          for (const block of content) {
            if (
              typeof block === "object" &&
              block !== null &&
              "type" in block &&
              block.type === "tool_result" &&
              "tool_use_id" in block
            ) {
              const toolResultBlock = block as {
                type: "tool_result";
                tool_use_id: string;
                content?: unknown;
              };
              const pending = pendingToolUses.get(
                toolResultBlock.tool_use_id,
              );
              if (pending) {
                const resultText =
                  typeof toolResultBlock.content === "string"
                    ? toolResultBlock.content
                    : JSON.stringify(toolResultBlock.content ?? "");
                const durationMs = Date.now() - pending.startTime;

                const record: ToolCallRecord = {
                  name: pending.name,
                  args: pending.args,
                  result: resultText,
                  durationMs,
                };
                toolCalls.push(record);

                // Log as Braintrust child span
                try {
                  const span = currentSpan();
                  span.traced(
                    (childSpan) => {
                      childSpan.log({
                        input: pending.args,
                        output: resultText,
                        metadata: { toolName: pending.name },
                        metrics: { durationMs },
                      });
                    },
                    { name: `tool:${pending.name}` },
                  );
                } catch {
                  // No active span context (e.g., running outside Braintrust eval)
                }

                pendingToolUses.delete(toolResultBlock.tool_use_id);
              }
            }
          }
        }
      }

      // Capture the final result
      if (message.type === "result") {
        if (message.subtype === "success") {
          const success = message as SDKResultSuccess;
          return {
            finalText: success.result,
            toolCalls,
            wallClockMs: success.duration_ms,
            inputTokens: success.usage.input_tokens,
            outputTokens: success.usage.output_tokens,
            turnCount: success.num_turns,
            costUsd: success.total_cost_usd,
            model: modelConfig.modelId,
          };
        } else {
          // Error result (max turns, budget exceeded, execution error)
          const error = message as SDKResultError;
          return {
            finalText: `[Agent error: ${error.subtype}] ${error.errors?.join("; ") ?? ""}`,
            toolCalls,
            wallClockMs: error.duration_ms,
            inputTokens: error.usage.input_tokens,
            outputTokens: error.usage.output_tokens,
            turnCount: error.num_turns,
            costUsd: error.total_cost_usd,
            model: modelConfig.modelId,
          };
        }
      }
    }

    // Fallback if generator ends without a result message
    return {
      finalText: "[No result received from agent]",
      toolCalls,
      wallClockMs: Date.now() - startTime,
      inputTokens: 0,
      outputTokens: 0,
      turnCount: 0,
      costUsd: 0,
      model: modelConfig.modelId,
    };
  }
}

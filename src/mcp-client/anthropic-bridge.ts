import type { Tool } from "@anthropic-ai/sdk/resources/messages.js";
import type { ToolSchema } from "./connect.js";

/**
 * Convert MCP tool schemas to Anthropic API tool format.
 * Both use JSON Schema for input definitions, so this is mostly reshaping.
 */
export function mcpToolsToAnthropic(mcpTools: ToolSchema[]): Tool[] {
  return mcpTools.map((tool) => ({
    name: tool.name,
    description: tool.description ?? "",
    input_schema: tool.inputSchema as Tool["input_schema"],
  }));
}

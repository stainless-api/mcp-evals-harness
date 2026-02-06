import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import type { ServerConfig } from "../servers/config.js";

export interface ToolSchema {
  name: string;
  description?: string;
  inputSchema: Record<string, unknown>;
}

export interface ToolCallResult {
  content: Array<{ type: string; text?: string }>;
  isError?: boolean;
}

export class McpConnection {
  private client: Client | null = null;
  private transport: StdioClientTransport | null = null;

  constructor(private serverConfig: ServerConfig) {}

  async connect(): Promise<void> {
    this.transport = new StdioClientTransport({
      command: this.serverConfig.command,
      args: this.serverConfig.args,
      env: {
        ...Object.fromEntries(
          Object.entries(process.env).filter(
            (entry): entry is [string, string] => entry[1] !== undefined,
          ),
        ),
        ...this.serverConfig.env,
      },
    });

    this.client = new Client(
      { name: "eval-client", version: "1.0.0" },
      { capabilities: {} },
    );

    await this.client.connect(this.transport);
  }

  async listTools(): Promise<ToolSchema[]> {
    if (!this.client) throw new Error("Not connected");
    const result = await this.client.listTools();
    return result.tools.map((t) => ({
      name: t.name,
      description: t.description,
      inputSchema: t.inputSchema as Record<string, unknown>,
    }));
  }

  async callTool(name: string, args: Record<string, unknown>): Promise<ToolCallResult> {
    if (!this.client) throw new Error("Not connected");
    const result = await this.client.callTool({ name, arguments: args });
    return {
      content: (result.content as Array<{ type: string; text?: string }>) ?? [],
      isError: result.isError as boolean | undefined,
    };
  }

  async disconnect(): Promise<void> {
    try {
      await this.client?.close();
    } catch {
      // ignore cleanup errors
    }
    try {
      await this.transport?.close();
    } catch {
      // ignore cleanup errors
    }
    this.client = null;
    this.transport = null;
  }
}

import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import type { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import type { ServerConfig } from "../suite.js";

export function createTransport(serverConfig: ServerConfig): Transport {
  if (serverConfig.transport === "http") {
    return new StreamableHTTPClientTransport(new URL(serverConfig.url), {
      requestInit: serverConfig.headers
        ? { headers: serverConfig.headers }
        : undefined,
    });
  }
  return new StdioClientTransport({
    command: serverConfig.command,
    args: serverConfig.args,
    env: { ...process.env, ...serverConfig.env } as Record<string, string>,
    stderr: "pipe",
  });
}

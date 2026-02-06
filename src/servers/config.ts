import { config } from "dotenv";
config();

export interface ServerConfig {
  id: string;
  displayName: string;
  command: string;
  args: string[];
  env: Record<string, string>;
  capabilities: { write: boolean };
  mode: "tools" | "code";
}

export const SERVERS: ServerConfig[] = [
  {
    id: "stripe-official",
    displayName: "Official Stripe MCP",
    command: "npx",
    args: ["-y", "@stripe/mcp", "--tools=all"],
    env: {
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY!,
    },
    capabilities: { write: true },
    mode: "tools",
  },
  {
    id: "stainless-stripe",
    displayName: "Stainless Code Mode",
    command: "node",
    args: [
      "/Users/cjav_dev/repos/mcp-code-mode-eval/stripe-minimal-typescript/packages/mcp-server/dist/index.js",
    ],
    env: {
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY!,
      STAINLESS_API_KEY: process.env.STAINLESS_API_KEY!,
    },
    capabilities: { write: true },
    mode: "code",
  },
  {
    id: "se-stripe",
    displayName: "Speakeasy Generated",
    command: "node",
    args: [
      "/Users/cjav_dev/repos/mcp-code-mode-eval/se-stripe-mcp/stripe-mcp-typescript/bin/mcp-server.js",
      "start",
      "--bearer-auth",
      process.env.STRIPE_SECRET_KEY!,
    ],
    env: {},
    capabilities: { write: false },
    mode: "tools",
  },
  {
    id: "open-mcp-stripe",
    displayName: "OpenAPI Generated",
    command: "node",
    args: [
      "/Users/cjav_dev/repos/mcp-code-mode-eval/openapi-mcp-generator-stripe/server/build/index.js",
    ],
    env: {
      BEARER_TOKEN_BEARERAUTH: process.env.STRIPE_SECRET_KEY!,
    },
    capabilities: { write: true },
    mode: "tools",
  },
];

export function getServer(id: string): ServerConfig {
  const server = SERVERS.find((s) => s.id === id);
  if (!server) throw new Error(`Unknown server: ${id}`);
  return server;
}

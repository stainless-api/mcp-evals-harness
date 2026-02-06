# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Purpose

This repo evaluates four different MCP server implementations for the Stripe API side-by-side. The goal is to benchmark them using Braintrust evals to compare tool quality, accuracy, and developer experience.

## MCP Servers Under Evaluation

| Server | Key in `.mcp.json` | Transport | Approach |
|--------|-------------------|-----------|----------|
| **Official Stripe MCP** | `stripe-official` | stdio (`npx @stripe/mcp`) | First-party, all tools enabled |
| **Stainless-generated** | `stainless-stripe` | stdio (node) | "Code Mode" — exposes 2 tools (docs search + code execution sandbox) instead of one tool per endpoint |
| **Speakeasy-generated** | `se-stripe` | stdio (node) | Full generated SDK with MCP wrapper, one tool per endpoint, CLI-driven |
| **OpenAPI-generated** | `open-mcp-stripe` | stdio (node) | Direct OpenAPI-to-MCP generation, axios-based HTTP calls, one tool per endpoint |

Additional servers in `.mcp.json`: `ted-lasso-api` (Believe API, unrelated), `braintrust` (HTTP MCP for eval framework).

## Architecture

### Key Differences Between Servers

- **Official (`stripe-official`)**: Runs via npx, no local source code. Tools like `create_customer`, `list_products`, etc.
- **Stainless (`stainless-stripe`)**: Source in `stripe-minimal-typescript/`. Uses a fundamentally different pattern — the agent writes TypeScript code against the Stainless SDK, which runs in an isolated sandbox. Two tools: `search_docs` and `execute`.
- **Speakeasy (`se-stripe`)**: Source in `se-stripe-mcp/stripe-mcp-typescript/`. ~650 generated model files. Supports stdio and SSE transports. Individual tool files in `src/mcp-server/tools/`.
- **OpenAPI (`open-mcp-stripe`)**: Source in `openapi-mcp-generator-stripe/server/`. Single `src/index.ts` (~60K bytes) with 22 tool definitions. Uses axios for HTTP.

### Terraform Test Data

`main.tf` provisions 500 Stripe test customers with realistic data (names, addresses, metadata like company/plan/segment). Uses Stripe Terraform provider v0.1.3. This seeds the Stripe accounts with data for evaluation queries.

### Credentials

All Stripe API keys and server configs live in `.mcp.json` (gitignored). Each server may use a different Stripe account. The Stainless server also requires a `STAINLESS_API_KEY`.

## Build & Run

### OpenAPI-generated server
```bash
cd openapi-mcp-generator-stripe/server
npm install
npm run build          # tsc && chmod 755 build/index.js
node build/index.js    # requires BEARER_TOKEN_BEARERAUTH env var
```

### Speakeasy-generated server
```bash
cd se-stripe-mcp/stripe-mcp-typescript
bun install
bun run build
node bin/mcp-server.js start --bearer-auth <STRIPE_KEY>
```

### Stainless-generated server
```bash
cd stripe-minimal-typescript
pnpm install           # uses pnpm workspaces
pnpm run build         # or: ./scripts/build
node packages/mcp-server/dist/index.js  # requires STRIPE_SECRET_KEY env var
```

### Official Stripe MCP
```bash
npx -y @stripe/mcp --tools=all  # requires STRIPE_SECRET_KEY env var
```

### Terraform (seed test data)
```bash
terraform init
terraform apply        # creates 500 test customers
```

## Package Managers

- `stripe-minimal-typescript`: **pnpm** (v10.24.0, workspace monorepo)
- `se-stripe-mcp`: **bun**
- `openapi-mcp-generator-stripe`: **npm**

## Testing

- `stripe-minimal-typescript`: Jest (`pnpm test` or `./scripts/test`)
- `openapi-mcp-generator-stripe`: Jest config present (`jest.config.js`)
- `se-stripe-mcp`: Vitest config present

## Key File Locations

- `.mcp.json` — All MCP server connection configs (gitignored, contains secrets)
- `main.tf` — Terraform config for 500 test customers
- `openapi-mcp-generator-stripe/server/src/index.ts` — Entire OpenAPI MCP server in one file
- `se-stripe-mcp/stripe-mcp-typescript/src/mcp-server/tools/` — Individual Speakeasy tool implementations
- `stripe-minimal-typescript/packages/mcp-server/` — Stainless MCP server package (includes Dockerfile)
- `stripe-minimal-typescript/api.md` — Full Stainless SDK API documentation

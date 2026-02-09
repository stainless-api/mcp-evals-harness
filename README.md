# MCP Evals Harness

A generic framework for evaluating MCP server implementations side-by-side using [Braintrust](https://braintrust.dev). Ships with a Stripe API eval suite, but can be extended to benchmark any MCP server.

## How It Works

The harness runs an agent loop (Claude Code via the Agent SDK) against each MCP server in a suite, then scores responses on **factuality**, **completeness**, and **efficiency** via Braintrust.

All domain-specific content — servers, test cases, system prompt, project name — lives in a **suite config** file. The generic infrastructure (agent runner, scorers, eval loop) is shared across suites.

```
evals/src/
  suite.ts                        # SuiteConfig type + Zod schema, loadSuite(), getTestCasesForServer()
  suites/
    stripe/
      suite.ts                    # Stripe servers, 12 test cases, system prompt
  evals/
    e2e.eval.ts                   # Generic eval loop — loads suite via EVAL_SUITE env var
    run-all.ts                    # Re-exports e2e.eval.ts
  agent/
    anthropic-runner.ts           # Claude Code agent runner
    types.ts                      # AgentRunner interface, AgentResult, ToolCallRecord
    index.ts                      # Runner factory
  scorers/
    completeness.ts               # Heuristic: checks expected text/fields in output
    efficiency.ts                 # Heuristic: penalizes high turn count / token usage
    correctness.ts                # LLM-as-judge factuality (via autoevals)
```

## Prerequisites

* Braintrust account
* Stripe Account (for the Stripe suite — you can sign up for a free account)
    * Stripe Sandbox
    * Stripe Secret API key for your sandbox
    * Stripe CLI (`brew install stripe/stripe-cli/stripe`)

## Setup

Seed data into the account using the Stripe CLI:

```sh
stripe login
stripe fixtures ./fixtures.json
```

Create `./evals/.env` with these environment variables:

```yaml
# Braintrust
BRAINTRUST_API_KEY=

# Anthropic (for E2E agent loop)
ANTHROPIC_API_KEY=

# Stripe Account (stripe-official + stainless-stripe)
STRIPE_SECRET_KEY=

# Stainless (for stainless-stripe server to fetch docs)
STAINLESS_API_KEY=
```

```sh
cp ./evals/.env.example ./evals/.env
```

## Run

```sh
cd evals
npm install

# Run the default suite (stripe)
npm run eval

# Run a specific suite
EVAL_SUITE=stripe npm run eval

# Convenience shortcut for Stripe
npm run eval:stripe
```

## Adding a New Suite

1. Create a suite config at `evals/src/suites/<name>/suite.ts` that default-exports a `SuiteConfig`:

```typescript
import type { SuiteConfig } from "../../suite.js";

const suite: SuiteConfig = {
  projectName: "my-project",          // Braintrust project name
  systemPrompt: "You are a helpful assistant with access to ...",
  servers: [
    {
      id: "my-server",
      displayName: "My MCP Server",
      command: "node",
      args: ["path/to/server.js"],
      env: { API_KEY: process.env.MY_API_KEY! },
      capabilities: { write: true },
      mode: "tools",
    },
  ],
  testCases: [
    {
      id: "test-1",
      prompt: "How many items are there?",
      expected: {
        description: "Returns the count of items",
        containsText: ["42"],
      },
      tags: ["read"],
    },
  ],
};

export default suite;
```

2. Set the required environment variables for your servers.

3. Run:

```sh
EVAL_SUITE=<name> npm run eval
```

No framework code needs to change.

## Stripe Suite

The built-in `stripe` suite evaluates these MCP servers:

| Server | Key | Approach |
|--------|-----|----------|
| **Official Stripe MCP** | `stripe-official` | First-party, all tools enabled via `npx @stripe/mcp` |
| **Stainless Code Mode** | `stainless-stripe` | 2-tool "code mode" — docs search + code execution sandbox |

It includes 12 test cases covering reads (list customers, get balance, find products) and writes (create coupons, invoices, payment links).

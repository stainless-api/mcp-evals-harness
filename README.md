# Stainless MCP Evaluation Harness

A generic framework for evaluating MCP server implementations side-by-side using [Braintrust](https://braintrust.dev).

## How It Works

The harness runs an agent loop against each MCP server in a suite, then scores responses on **factuality**, **completeness**, and **efficiency** via Braintrust.

You can test your MCP servers with three different model sets:
* OpenAI models
* Anthropic models
* Anthropic models, with advanced tool use betas.

Models can be specified per-MCP-server from among the below options: 
* "opus"
* "sonnet"
* "haiku"
* "sonnet-code"
* "opus-code"
* "gpt-4o"
* "gpt-4o-mini"
* "o3"
* "o4-mini"


All domain-specific content — servers, test cases, system prompt, project name — lives in a **suite config** directory. The generic infrastructure (agent runners, scorers, eval loop) is shared across suites.

```
scripts/
  generate-suite-index.ts         # Auto-generates src/suites/index.ts from discovered suite dirs
src/
  suite.ts                        # SuiteConfig type + Zod schema, loadSuite(), getTestCasesForServer()
  suites/
    index.ts                      # Auto-generated barrel (do not edit)
    stripe/
      suite.ts                    # Stripe servers, 12 test cases, system prompt
      fixtures.json               # Stripe CLI fixtures for seeding test data
    increase/
      suite.ts                    # Increase servers, 30 test cases, system prompt
  evals/
    e2e.eval.ts                   # Generic eval loop — loads suite via EVAL_SUITE env var
    run-all.ts                    # Re-exports e2e.eval.ts
  agent/
    anthropic-runner.ts           # Agent SDK runner (standard Anthropic models)
    anthropic-code-runner.ts      # Raw SDK runner (code-mode models — defer_loading, tool_search, code_execution)
    openai-runner.ts              # OpenAI runner (GPT / o-series)
    models.ts                     # Model registry + resolveModel()
    types.ts                      # AgentRunner, AgentResult, ToolCallRecord, ModelConfig, Provider
    index.ts                      # Runner factory + re-exports
  scorers/
    completeness.ts               # Heuristic: checks expected text/fields in output
    efficiency.ts                 # Heuristic: penalizes high turn count / token usage
    correctness.ts                # LLM-as-judge factuality (via autoevals)
```

## Prerequisites

* Braintrust account
* Stripe Account (optional, for the Stripe suite)
    * Stripe Secret API key for your sandbox
    * Stripe CLI (`brew install stripe/stripe-cli/stripe`)
* Increase Account (optional, for Increase suite)
   

## Setup

create a `.env` file with the required environment variables. You can use a template file at `.env.example`:

```sh
cp .env.example .env
```

## Run

```sh
npm install

# Run a specific suite
EVAL_SUITE=stripe npm run eval

# Convenience shortcuts
npm run eval:stripe
npm run eval:increase
```

## Adding a New Suite

1. Create a suite directory at `src/suites/<name>/` with a `suite.ts` that default-exports a `SuiteConfig`:

```typescript
import type { SuiteConfig } from "../../suite.js";

const suite: SuiteConfig = {
  projectName: "my-project",          // Braintrust project name
  systemPrompt: "You are a helpful assistant with access to ...",
  setup: "my-cli setup-command",      // Optional: command to be run before evals to seed test data
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

2. Optionally add supporting files (e.g. `fixtures.json`) in the same directory. You can provide a start-up command to help seed data in your sandbox account if you would like.

3. Set the required environment variables for your servers. 

4. Run:

```sh
EVAL_SUITE=<name> npm run eval
```
## Tags

Tags let you label and filter experiment records in Braintrust. There are three sources:

- **Test case tags** — defined in `tags` on each test case
- **Server tags** — add `tags` to a server config to apply them to all records from that server
- **CLI tags** — set `EVAL_TAGS` (comma-separated) to apply tags to all records in a run

```typescript
// Test case tags in suite config
testCases: [
  {
    id: "test-1",
    prompt: "How many items are there?",
    expected: { description: "Returns the count of items" },
    tags: ["read", "basic"],
  },
],
```

```typescript
// Server tags in suite config
servers: [
  {
    id: "my-server",
    // ...
    tags: ["official", "production"],
  },
],
```

```sh
# CLI tags
EVAL_TAGS=nightly,regression npm run eval:stripe

# All sources are merged — records get test case + server + CLI tags
```

## Support

For help/bug reports, please reach out to support@stainless.com

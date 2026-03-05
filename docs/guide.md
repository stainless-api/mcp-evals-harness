# MCP Eval Harness: User Guide

A framework for evaluating MCP (Model Context Protocol) server implementations side-by-side using [Braintrust](https://braintrust.dev). The harness runs an AI agent loop against each MCP server defined in a suite configuration, then scores responses on correctness, completeness, and efficiency.

## Table of Contents

- [Quick Start](#quick-start)
- [Creating a Suite](#creating-a-suite)
- [Writing Effective Prompts](#writing-effective-prompts)
- [Scoring System](#scoring-system)
- [Server Configuration Deep Dive](#server-configuration-deep-dive)
- [Model Registry](#model-registry)
- [Running Evals](#running-evals)
- [Reference](#reference)

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env` and fill in the required keys:

```bash
cp .env.example .env
```

At minimum you need:

| Variable | Purpose |
|----------|---------|
| `BRAINTRUST_API_KEY` | Braintrust account for storing results |
| `ANTHROPIC_API_KEY` | Running evals and the LLM-as-judge scorer |
| `OPENAI_API_KEY` | Only needed if evaluating OpenAI models |

You also need API keys for whichever service your MCP server connects to (e.g. `STRIPE_SECRET_KEY`, `INCREASE_API_KEY`).

### 3. Run an existing suite

```bash
# Run the default suite (stripe)
npm run eval

# Run a specific built-in suite
npm run eval:stripe
npm run eval:increase

# Or use the EVAL_SUITE env var
EVAL_SUITE=increase npm run eval
```

Results are logged to your Braintrust project dashboard automatically.

---

## Creating a Suite

Each suite lives in its own directory under `src/suites/<name>/` and must contain a `suite.ts` file that default-exports a `SuiteConfig` object.

### Step 1: Create the directory

```bash
mkdir -p src/suites/my-api
```

### Step 2: Write the suite config

Create `src/suites/my-api/suite.ts`:

```typescript
import { config } from "dotenv";
import type { SuiteConfig } from "../../suite.js";
config();

const suite: SuiteConfig = {
  // Name of the Braintrust project where results are logged
  projectName: "my-api-evals",

  // System prompt given to the agent for every test case
  systemPrompt:
    "You are a helpful assistant with access to My API tools. " +
    "Use the available MCP tools to answer questions accurately. " +
    "Always provide complete answers based on actual API data.",

  // MCP servers to evaluate (see Server Configuration below)
  servers: [
    {
      id: "my-server",
      displayName: "My MCP Server",
      command: "npx",
      args: ["-y", "@my-org/mcp-server"],
      env: {
        MY_API_KEY: process.env.MY_API_KEY!,
      },
      capabilities: { write: false },
      mode: "tools",
      models: ["opus", "sonnet"],
    },
  ],

  // Test cases with prompts and expected results
  testCases: [
    {
      id: "list-items",
      prompt: "How many items are in my account? Return just the count.",
      expected: {
        description: "Returns the total count of items in the account",
        containsText: ["42"],
      },
      tags: ["read"],
    },
    {
      id: "create-item",
      prompt: "Create a new item called 'Test Item' with price $10.",
      expected: {
        description: "Creates a new item and returns its details",
        containsText: ["Test Item", "10"],
      },
      tags: ["write", "create"],
      requiredCapabilities: { write: true },
    },
  ],

  // Optional: shell command to seed test data before running
  setup: "my-cli seed-data src/suites/my-api/fixtures.json",
};

export default suite;
```

### Step 3: Register the suite

The barrel file at `src/suites/index.ts` is auto-generated. Run:

```bash
npm run generate:suites
```

This scans `src/suites/*/suite.ts` and regenerates the barrel file. It runs automatically before every eval, so you can skip this step if you go straight to `npm run eval`.

### Step 4: Add a convenience script (optional)

In `package.json`:

```json
{
  "scripts": {
    "eval:my-api": "EVAL_SUITE=my-api npm run eval"
  }
}
```

---

### SuiteConfig Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `projectName` | `string` | Yes | Braintrust project name for logging results |
| `systemPrompt` | `string` | Yes | System prompt given to the agent |
| `servers` | `ServerConfig[]` | Yes | MCP servers to evaluate |
| `testCases` | `TestCase[]` | Yes | Prompts with expected results |
| `setup` | `string` | No | Shell command to run before evals (e.g. seed data) |

### TestCase Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier for the test case |
| `prompt` | `string` | Yes | The user prompt sent to the agent |
| `expected` | `ExpectedResult` | Yes | What the agent should return |
| `tags` | `string[]` | Yes | Tags for filtering and grouping in Braintrust |
| `requiredCapabilities` | `{ write?: boolean }` | No | Skip this test for servers without matching capabilities |

### ExpectedResult Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `description` | `string` | Yes | Human-readable description of the expected answer (used by the LLM-as-judge scorer) |
| `containsText` | `string[]` | No | Strings that must appear in the output (case-insensitive) |
| `fieldValues` | `Record<string, unknown>` | No | Key-value pairs whose string values must appear in the output |

### Tagging

Tags are applied at three levels:

1. **Test case tags** - The `tags` array on each test case. Applied per-record in Braintrust.
2. **Server tags** - Optional `tags` array on each server config. Applied at the experiment level.
3. **CLI tags** - The `EVAL_TAGS` env var (comma-separated). Applied at the experiment level.

```bash
# Add CLI tags when running
EVAL_TAGS=baseline,v2 npm run eval:my-api
```

---

## Writing Effective Prompts

Good eval prompts are specific, constrained, and produce verifiable output. Here are patterns from the built-in suites:

### Be explicit about output format

```typescript
// Good: tells the agent exactly what to return
prompt: "How many customers are in my Stripe Account? Only return the total count."

// Good: specifies the fields you want
prompt: "List exactly 3 customers. Just return their customer IDs and email addresses."
```

### Use multi-step prompts to test complex workflows

```typescript
prompt: `
  First, count how many coupons exist in my Stripe account.
  Then create a 25.5% off coupon named "EVAL25" that applies to all products.
  Finally count the coupons again and confirm the count increased by 1.
  Report the before count, the new coupon's full JSON data, and the after count.
`
```

### Test lookup and filtering

```typescript
prompt: "Who works on the CI pipeline at Sable Tech and what's their email?"
```

This forces the agent to search by metadata, not just list resources.

### Write descriptions that give the LLM judge full context

The `description` in `expected` is what the Factuality scorer compares against. Include specific values:

```typescript
expected: {
  description:
    "Returns Fang Nguyen and their email because they are the only " +
    "customer with employer Sable Tech",
  containsText: ["Fang Nguyen", "fang.nguyen@sable.cloud"],
}
```

---

## Scoring System

Every test case is evaluated by three scorers. Each returns a score between 0 and 1.

### Correctness (LLM-as-judge)

Uses the [Factuality](https://github.com/braintrustdata/autoevals) scorer from the `autoevals` library. An LLM compares the agent's final text output against the `expected.description` you wrote.

- **1.0** - Output is factually consistent with the expected description
- **0.0** - Output contradicts or is irrelevant to expectations

This is the most important scorer for catching semantic errors that heuristic checks would miss.

### Completeness (heuristic)

Checks whether the output contains all expected text strings and field values.

- Performs case-insensitive matching for `containsText` entries
- Performs exact string matching for `fieldValues` entries
- Score = (number of checks passed) / (total checks)
- If no `containsText` or `fieldValues` are specified, defaults to 1.0

**Example:** If `containsText: ["Fang Nguyen", "fang.nguyen@sable.cloud"]` and the output contains both, the score is 1.0. If it contains only one, the score is 0.5.

### Efficiency (heuristic)

Scores how efficiently the agent completed the task based on turn count and token usage. Weighted 50/50.

**Turn efficiency:**
- 1.0 at 3 or fewer turns
- Linear decay to 0.0 at 50 turns

**Token efficiency:**
- 1.0 at 5,000 or fewer total tokens
- Linear decay to 0.0 at 500,000 tokens

Formula: `0.5 * turnScore + 0.5 * tokenScore`

---

## Server Configuration Deep Dive

### Transport types

The harness supports two transport types for connecting to MCP servers.

#### stdio (default)

The most common option. Launches the server as a child process:

```typescript
{
  id: "my-server",
  displayName: "My Server",
  transport: "stdio",  // optional, this is the default
  command: "npx",
  args: ["-y", "@my-org/mcp-server", "--tools=all"],
  env: {
    API_KEY: process.env.API_KEY!,
  },
  capabilities: { write: true },
  mode: "tools",
}
```

The `transport` field defaults to `"stdio"` when omitted, so existing configs work without changes.

#### HTTP

Connects to a remote MCP server over HTTP:

```typescript
{
  id: "my-remote-server",
  displayName: "My Remote Server",
  transport: "http",
  url: "https://mcp.example.com/v1",
  headers: {
    "Authorization": "Bearer " + process.env.API_KEY!,
  },
  capabilities: { write: false },
  mode: "tools",
}
```

### Mode: tools vs. code

The `mode` field controls how the agent interacts with MCP tools.

| Mode | Runner | Description |
|------|--------|-------------|
| `"tools"` | AnthropicRunner or OpenAIRunner | Standard tool calling. The agent calls MCP tools directly. |
| `"code"` | AnthropicCodeRunner | Code execution mode. The agent writes code that invokes MCP tools, using the `advanced-tool-use` beta. Enables `tool_search` and `code_execution`. |

### Capabilities

The `capabilities` object controls which test cases run against this server:

```typescript
capabilities: { write: true }   // Runs all test cases including writes
capabilities: { write: false }  // Skips test cases with requiredCapabilities.write
```

### Models

The `models` array specifies which model aliases to evaluate for this server. Each alias creates a separate Braintrust experiment:

```typescript
models: ["opus", "sonnet"]  // Runs two experiments: my-server-opus, my-server-sonnet
```

If omitted, defaults to `["opus"]`.

### deferLoading

When `true`, MCP tools are deferred so only code execution can invoke them. Used with code-mode servers:

```typescript
deferLoading: true
```

### allowedCallers

Restricts which callers can invoke MCP tools. Accepted values: `"direct"` and `"code_execution_20250825"`.

```typescript
allowedCallers: ["code_execution_20250825"]
```

---

## Model Registry

The harness includes a model registry with aliases for convenience. Use these aliases in your server's `models` array.

### Anthropic Models

| Alias | Model ID | Notes |
|-------|----------|-------|
| `opus` | `claude-opus-4-6` | Claude Opus 4.6, standard tool calling |
| `sonnet` | `claude-sonnet-4-5-20250929` | Claude Sonnet 4.5, standard tool calling |
| `haiku` | `claude-haiku-4-5-20251001` | Claude Haiku 4.5, standard tool calling |
| `sonnet-code` | `claude-sonnet-4-5-20250929` | Sonnet 4.5 with advanced-tool-use beta, code execution |
| `opus-code` | `claude-opus-4-6` | Opus 4.6 with advanced-tool-use beta, code execution |

### OpenAI Models

| Alias | Model ID |
|-------|----------|
| `gpt-4o` | `gpt-4o` |
| `gpt-4o-mini` | `gpt-4o-mini` |
| `o3` | `o3` |
| `o4-mini` | `o4-mini` |

The `-code` variants automatically enable the `advanced-tool-use-2025-11-20` beta and set `codeMode: true`, which routes them through the `AnthropicCodeRunner` with `tool_search` and `code_execution` capabilities.

---

## Running Evals

### Commands

```bash
# Run the default suite (stripe)
npm run eval

# Run a specific suite by name
EVAL_SUITE=increase npm run eval

# Use convenience scripts
npm run eval:stripe
npm run eval:increase

# Run all suites at once
npm run eval:all

# Add CLI tags to the experiment
EVAL_TAGS=baseline,v2 npm run eval:my-api
```

### External suite files

You can also point to a suite file outside the repo by passing a file path:

```bash
EVAL_SUITE=/path/to/my-project/suite.ts npm run eval
```

The loader detects path separators and imports the file directly instead of looking it up in the built-in registry.

### What happens when you run an eval

1. The suite config is loaded and validated against the Zod schema
2. If a `setup` command is defined, it runs first (e.g. seeding test data)
3. For each server, and for each model alias on that server:
   - A Braintrust experiment is created (named `{server.id}-{model.alias}`)
   - Each test case is run through the agent runner (max concurrency: 2)
   - The agent connects to the MCP server, sends the prompt, and loops until it produces a final answer
   - Three scorers evaluate the output
   - Metrics (tokens, turns, tool calls, cost, wall clock time) are logged to the experiment
4. Results appear in your [Braintrust dashboard](https://braintrust.dev)

### Environment variables

| Variable | Purpose |
|----------|---------|
| `EVAL_SUITE` | Suite to run (default: `"stripe"`) |
| `EVAL_TAGS` | Comma-separated tags applied at the experiment level |
| `BRAINTRUST_API_KEY` | Braintrust authentication |
| `BRAINTRUST_API_URL` | Braintrust API URL (default: `https://api.braintrust.dev`) |
| `ANTHROPIC_API_KEY` | Anthropic API for agent runners and scoring |
| `OPENAI_API_KEY` | OpenAI API for OpenAI model runners |
| `CLAUDE_CODE_PATH` | Override path to Claude Code binary (auto-detected if omitted) |

---

## Reference

### Key file locations

| File | Purpose |
|------|---------|
| `src/suite.ts` | SuiteConfig type, Zod schema, `loadSuite()`, `getTestCasesForServer()` |
| `src/eval.ts` | Generic eval loop with `runEvals()` |
| `src/evals/e2e.eval.ts` | Entry point that loads a suite and kicks off evals |
| `src/agent/index.ts` | Runner factory (`createRunner()`) and re-exports |
| `src/agent/types.ts` | `AgentRunner` interface, `AgentResult`, `ModelConfig`, `Provider` |
| `src/agent/models.ts` | Model registry and `resolveModel()` |
| `src/agent/anthropic-runner.ts` | Agent SDK runner for standard Anthropic models |
| `src/agent/anthropic-code-runner.ts` | Raw SDK runner for code-mode models with `defer_loading` |
| `src/agent/openai-runner.ts` | OpenAI runner |
| `src/scorers/completeness.ts` | Heuristic completeness scorer |
| `src/scorers/efficiency.ts` | Heuristic efficiency scorer |
| `src/scorers/correctness.ts` | LLM-as-judge factuality scorer |
| `src/suites/index.ts` | Auto-generated barrel file (do not edit manually) |
| `src/suites/stripe/suite.ts` | Stripe eval suite |
| `src/suites/increase/suite.ts` | Increase eval suite |
| `scripts/generate-suite-index.ts` | Script that regenerates the barrel file |
| `.env.example` | Template for required environment variables |

### Using the harness as a library

The package exports its core modules so you can integrate them into your own tooling:

```typescript
import { loadSuite } from "mcp-evals-harness";
import { runEvals } from "mcp-evals-harness/eval";
import { createRunner, resolveModel } from "mcp-evals-harness/agent";
```

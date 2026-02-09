# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Purpose

This repo is a generic framework for evaluating MCP server implementations side-by-side using Braintrust evals. It ships with Stripe and Increase eval suites but can be extended to benchmark any MCP server.

## Architecture

The harness runs an agent loop (Claude Code via the Agent SDK) against each MCP server defined in a suite config, then scores responses on factuality, completeness, and efficiency.

### Suite System

Each suite lives in `src/suites/<name>/` as a directory containing:
- `suite.ts` — default-exports a `SuiteConfig` with servers, test cases, system prompt, and project name
- Optional supporting files (e.g. `fixtures.json` for test data seeding)

The `SuiteConfig` schema (`src/suite.ts`) includes:
- `projectName` — Braintrust project name
- `systemPrompt` — prompt given to the agent
- `servers[]` — MCP server configs (command, args, env, capabilities, mode)
- `testCases[]` — prompts with expected results (description, containsText, fieldValues)
- `setup` — optional shell command to seed test data (e.g. `stripe fixtures ...`)

### Agent Runner

`src/agent/anthropic-runner.ts` uses the Claude Agent SDK (`@anthropic-ai/claude-agent-sdk`) to run an agent loop with MCP servers attached. It streams messages, tracks tool calls, and returns structured `AgentResult` objects.

### Scorers

- **Completeness** (`src/scorers/completeness.ts`): Heuristic — checks expected text strings and field values in output
- **Efficiency** (`src/scorers/efficiency.ts`): Heuristic — penalizes high turn count and token usage
- **Correctness** (`src/scorers/correctness.ts`): LLM-as-judge factuality via autoevals

### Eval Loop

`src/evals/e2e.eval.ts` loads a suite via `EVAL_SUITE` env var, iterates over servers, and runs each test case through the agent runner. Results are scored and logged to Braintrust.

## Build & Run

```bash
npm install

# Run the default suite (stripe)
npm run eval

# Run a specific suite
EVAL_SUITE=stripe npm run eval
EVAL_SUITE=increase npm run eval

# Convenience shortcuts
npm run eval:stripe
npm run eval:increase
```

## Credentials

All API keys are configured via `.env` (gitignored). See `.env.example` for the full list.

## Key File Locations

- `src/suite.ts` — SuiteConfig type, Zod schema, loadSuite(), getTestCasesForServer()
- `src/suites/stripe/suite.ts` — Stripe eval suite (12 test cases, 2 servers)
- `src/suites/stripe/fixtures.json` — Stripe CLI fixtures for seeding 500 test customers
- `src/suites/increase/suite.ts` — Increase eval suite (30 test cases)
- `src/evals/e2e.eval.ts` — Generic eval loop
- `src/agent/anthropic-runner.ts` — Claude Code agent runner
- `src/agent/types.ts` — AgentRunner interface, AgentResult, ToolCallRecord
- `.env.example` — Required environment variables

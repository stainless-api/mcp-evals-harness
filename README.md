# MCP implementation eval for Stripe API

This project is used to evaluate several different implementations for MCP servers against the Stripe API. It tests the official Stripe MCP server, Stainless generated MCP server, the an off-the-shelf OSS generated MCP server, and a Speakeasy generated MCP server. 

## Prerequisites

* Braintrust account
* Stripe Account (you can sign up for a free account)
    * Stripe Sandbox
    * Stripe Secret API key for your sandbox
    * Stripe CLI (`brew install stripe/stripe-cli/stripe`)

## Setup

Seed data into the account using the Stripe CLI:

```sh
stripe login
stripe fixtures ./fixtures.json
```


`./evals/.env` needs these environment variables:


```yaml
# Braintrust
BRAINTRUST_API_KEY=

# Anthropic (for E2E agent loop)
ANTHROPIC_API_KEY=

# Stripe Account A (stripe-official + stainless-stripe)
STRIPE_SECRET_KEY=

# Stainless (for stainless-stripe server to fetch docs)
STAINLESS_API_KEY=
```


```sh
cp ./evals/.env.example ./evals
```

## Run

```sh
cd evals
npm install
npm run eval
```
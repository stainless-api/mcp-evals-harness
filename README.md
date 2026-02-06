# MCP implementation eval for Stripe API

This project is used to evaluate several different implementations for MCP servers against the Stripe API. It tests a Stainless generated MCP server, the Stripe Official and off-the-shelf OSS MCP server, and a Speakeasy generated MCP server. 

## Prerequisites

* Stripe Account (you can sign up for a free account)
    * Stripe Sandbox
    * Stripe Secret API key for your sandbox
* Terraform (to populate the Stripe account with test data)

How to install Terraform:

```sh
brew tap hashicorp/tap
brew install hashicorp/tap/terraform
```

* Braintrust account


## Setup

Seed data into the account

```sh
STRIPE_SECRET_KEY=sk_test_abc123
terraform plan
terraform apply
```


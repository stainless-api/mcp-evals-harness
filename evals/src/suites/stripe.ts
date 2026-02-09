import { config } from "dotenv";
import type { SuiteConfig } from "../suite.js";
config();

const randomId = Math.random().toString(36).substring(2, 8);

const suite: SuiteConfig = {
  projectName: "cjs-stripe-test",

  systemPrompt:
    "You are a helpful assistant with access to Stripe API tools. " +
    "Use the available MCP tools to answer questions about the Stripe account. " +
    "Always provide complete, accurate answers based on the actual API data.",

  servers: [
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
    // {
    //   id: "se-stripe",
    //   displayName: "Speakeasy Generated",
    //   command: "node",
    //   args: [
    //     "/Users/cjav_dev/repos/mcp-code-mode-eval/se-stripe-mcp/stripe-mcp-typescript/bin/mcp-server.js",
    //     "start",
    //     "--bearer-auth",
    //     process.env.STRIPE_SECRET_KEY!,
    //   ],
    //   env: {},
    //   capabilities: { write: false },
    //   mode: "tools",
    // },
    // {
    //   id: "open-mcp-stripe",
    //   displayName: "OpenAPI Generated",
    //   command: "node",
    //   args: [
    //     "/Users/cjav_dev/repos/mcp-code-mode-eval/openapi-mcp-generator-stripe/server/build/index.js",
    //   ],
    //   env: {
    //     BEARER_TOKEN_BEARERAUTH: process.env.STRIPE_SECRET_KEY!,
    //   },
    //   capabilities: { write: true },
    //   mode: "tools",
    // },
  ],

  testCases: [
    {
      id: "list-customers",
      prompt: "How many customers are in my Stripe Account? Only return the total count.",
      expected: {
        description: "Returns a count of customers in the Stripe Account which is 500 in this test account",
        containsText: ["500"],
      },
      tags: ["read"],
    },
    {
      id: "list-customers-limit-3",
      prompt: "List exactly 3 customers from this Stripe account. Just return their customer IDs and email addresses.",
      expected: {
        description: "Returns exactly 3 customers with their IDs and email addresses",
        containsText: ["cus_", "@"],
      },
      tags: ["read", "filter"],
    },
    {
      id: "get-balance",
      prompt: "What is the current balance on this Stripe account? Be concise but include both available and pending amounts.",
      expected: {
        description: "Returns Stripe Account balance information with available and pending amounts which are both 0 in this test account",
        containsText: ["available", "pending"],
      },
      tags: ["read"],
    },
    {
      id: "find-expensive-product",
      prompt: "What's the most expensive product in my Stripe account? Give me the name and amount for the product.",
      expected: {
        description: "Returns the Team Training Weekend product because its the most expensive product at GBP 999,999.99",
        containsText: ["Team Training Weekend"],
      },
      tags: ["read"],
    },
    {
      id: "find-customer-by-employer",
      prompt: "Who works on the CI pipeline at Sable Tech and what's their email? Just return the customer's name and email address.",
      expected: {
        description: "Returns Fang Nguyen and their email because they are the only customer with employer Sable Tech",
        containsText: ["Fang Nguyen", "fang.nguyen@sable.cloud"],
      },
      tags: ["read"],
    },
    {
      id: "create-coupon",
      prompt: `
      First, count how many coupons exist in my Stripe account.
      Then create a one time use 25.5% off coupon with the name "EVAL25" that applies to all products.
      Finally count the coupons again and confirm the count increased by 1.
      Report the before count, the new coupon's full json data, and the after count.
    `,
      expected: {
        description: "Reports the before count, creates a 25.5% off one-time-use coupon named EVAL25 with full JSON data, reports the after count, and confirms the count increased by 1.",
        containsText: ["EVAL25", "once", "25.5%"],
      },
      tags: ["write", "create"],
      requiredCapabilities: { write: true },
    },
    {
      id: "create-invoice",
      prompt: `
      Create an invoice for Charlotte Souza at SynapseIO to charge them
      for a data migration service and white glove onboarding.

      Return the invoice including the total and the line items.
    `,
      expected: {
        description: `
        Creates a draft invoice for the customer with email charlotte.souza@synapseio.com
        which includes the data migration product, and returns the invoice details including the line items.

        The data migration service is $5000 USD and
        The white glove onboarding is $2500 USD

        The total should be $7500 USD.

        The output should include detail about the line items and the total amount.
      `,
        containsText: ["invoice", "7500"],
      },
      tags: ["write", "create"],
      requiredCapabilities: { write: true },
    },
    {
      id: "find-subscribers",
      prompt: `
      Which users are subscribed to the starter plan in my Stripe account? Just return the name of the user and the subscription status.
    `,
      expected: {
        description: `
        Returns Noah Patel who is the only user subscribed to the starter plan in this Stripe account, along with their subscription status which is active.
      `,
        containsText: ["Noah Patel", "active"],
      },
      tags: ["read"],
    },
    {
      id: "count-disputes",
      prompt: `
      Count the number of disputes in my Stripe account and just return the number of disputes and the sum of the amounts of their related payments.
    `,
      expected: {
        description: `
        Returns the number of disputes and the sum of their related payment amounts.
      `,
        containsText: ["disputes", "amount"],
      },
      tags: ["read"],
    },
    {
      id: "breakdown-of-revenue-by-product",
      prompt: `
      What is the breakdown of revenue by product in my Stripe account? Just return the product names and their total revenue.
    `,
      expected: {
        description: `
        Returns the product names and their total revenue.
      `,
        containsText: ["revenue", "product"],
      },
      tags: ["read"],
    },
    {
      id: "customers-with-disputes",
      prompt: `
      Which customers have had disputes in my Stripe account? Just return the customer's name, email, and the number of disputes they've had.
    `,
      expected: {
        description: `
        Returns the customers who have had disputes along with their name, email, and the number of disputes they've had.
      `,
        containsText: ["disputes", "customer", "email"],
      },
      tags: ["read"],
    },
    {
      id: "create-payment-link",
      prompt: `
      Create a payment link for the Team Training Workshop product that charges $1500 USD. The payment link should be reusable and should collect the customer's email address. Return the URL of the payment link.
    `,
      expected: {
        description: `
        Creates a reusable payment link for the Team Training Workshop product that charges $1500 USD and collects the customer's email address. Returns the URL of the payment link.
      `,
        containsText: ["buy.stripe.com/test_", "Team Training Workshop", "1500"],
      },
      tags: ["write", "create"],
      requiredCapabilities: { write: true },
    },
  ],
};

export default suite;

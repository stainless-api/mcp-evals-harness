/**
 * Test case definitions for Stripe MCP server evaluation.
 *
 * Each test case has:
 * - prompt: Natural language for E2E experiments
 * - directInvocations: Per-server tool call specs for direct experiments
 * - expected: Per-account expected results for scoring
 * - tags: Categorization
 * - requiredCapabilities: Filter out servers that can't handle this case
 */

export interface DirectInvocation {
  toolName: string;
  args: Record<string, unknown>;
}

export interface ExpectedResult {
  description: string;
  containsText?: string[];
  objectType?: string;
  minItems?: number;
  jsonFields?: string[];
  fieldValues?: Record<string, unknown>;
}

export interface TestCase {
  id: string;
  prompt: string;
  directInvocations: Record<string, DirectInvocation>;
  expected: Record<"A" | "B", ExpectedResult>;
  tags: string[];
  requiredCapabilities?: { write?: boolean };
}

export const TEST_CASES: TestCase[] = [
  {
    id: "list-customers",
    prompt: "How many customers are in my Stripe Account?",
    directInvocations: {
      "stripe-official": { toolName: "list_customers", args: {} },
      "stainless-stripe": {
        toolName: "execute",
        args: {
          code: `async function run(client) {\n  const page = await client.customers.list({ limit: 10 });\n  return page.data;\n}`,
        },
      },
      "se-stripe": { toolName: "get-customers", args: {} },
      "open-mcp-stripe": { toolName: "GetCustomers", args: {} },
    },
    expected: {
      A: {
        description: "Returns a count of customers in the Stripe Account",
        objectType: "list",
        minItems: 1,
        containsText: ["500"]
      },
      B: {
        description: "Returns a count of customers in the Stripe Account",
        objectType: "list",
        minItems: 1,
        containsText: ["500"]
      },
    },
    tags: ["read"],
  },
  {
    id: "list-customers-limit-3",
    prompt: "List exactly 3 customers from this Stripe account.",
    directInvocations: {
      "stripe-official": { toolName: "list_customers", args: { limit: 3 } },
      "stainless-stripe": {
        toolName: "execute",
        args: {
          code: `async function run(client) {\n  const page = await client.customers.list({ limit: 3 });\n  return page.data;\n}`,
        },
      },
      "se-stripe": {
        toolName: "get-customers",
        args: { request: { limit: 3 } },
      },
      "open-mcp-stripe": { toolName: "GetCustomers", args: { limit: 3 } },
    },
    expected: {
      A: {
        description: "Returns exactly 3 customers",
        objectType: "list",
        minItems: 3,
        jsonFields: ["id", "email"],
      },
      B: {
        description: "Returns exactly 3 customers",
        objectType: "list",
        minItems: 3,
        jsonFields: ["id", "email"],
      },
    },
    tags: ["read", "filter"],
  },
  {
    id: "get-balance",
    prompt: "What is the current balance on this Stripe account?",
    directInvocations: {
      "stripe-official": { toolName: "retrieve_balance", args: {} },
      "stainless-stripe": {
        toolName: "execute",
        args: {
          code: `async function run(client) {\n  const balance = await client.balance.retrieve();\n  return balance;\n}`,
        },
      },
      "se-stripe": { toolName: "get-balance", args: {} },
      "open-mcp-stripe": { toolName: "GetBalance", args: {} },
    },
    expected: {
      A: {
        description: "Returns balance object with available and pending arrays",
        jsonFields: ["available", "pending"],
        containsText: ["available"],
      },
      B: {
        description: "Returns balance object",
        jsonFields: ["available", "pending"],
        containsText: ["available"],
      },
    },
    tags: ["read"],
  },
  {
    id: "list-products",
    prompt: "List the products on this Stripe account.",
    directInvocations: {
      "stripe-official": { toolName: "list_products", args: {} },
      "stainless-stripe": {
        toolName: "execute",
        args: {
          code: `async function run(client) {\n  const page = await client.products.list({ limit: 10 });\n  return page.data;\n}`,
        },
      },
      "se-stripe": { toolName: "get-products", args: {} },
      "open-mcp-stripe": { toolName: "GetProducts", args: {} },
    },
    expected: {
      A: {
        description: "Returns product list",
        objectType: "list",
        jsonFields: ["id", "name"],
      },
      B: {
        description: "Returns product list",
        objectType: "list",
        jsonFields: ["id", "name"],
      },
    },
    tags: ["read"],
  },
  // {
  //   id: "list-invoices",
  //   prompt: "List the invoices on this Stripe account.",
  //   directInvocations: {
  //     "stripe-official": { toolName: "list_invoices", args: {} },
  //     "stainless-stripe": {
  //       toolName: "execute",
  //       args: {
  //         code: `async function run(client) {\n  const page = await client.invoices.list({ limit: 10 });\n  return page.data;\n}`,
  //       },
  //     },
  //     "se-stripe": { toolName: "get-invoices", args: {} },
  //     "open-mcp-stripe": { toolName: "GetInvoices", args: {} },
  //   },
  //   expected: {
  //     A: {
  //       description: "Returns invoice list",
  //       objectType: "list",
  //       jsonFields: ["id"],
  //     },
  //     B: {
  //       description: "Returns invoice list",
  //       objectType: "list",
  //       jsonFields: ["id"],
  //     },
  //   },
  //   tags: ["read"],
  // },
  // {
  //   id: "list-subscriptions",
  //   prompt: "List all active subscriptions on this Stripe account.",
  //   directInvocations: {
  //     "stripe-official": {
  //       toolName: "list_subscriptions",
  //       args: { status: "active" },
  //     },
  //     "stainless-stripe": {
  //       toolName: "execute",
  //       args: {
  //         code: `async function run(client) {\n  const page = await client.subscriptions.list({ status: "active", limit: 10 });\n  return page.data;\n}`,
  //       },
  //     },
  //     "se-stripe": {
  //       toolName: "get-subscriptions",
  //       args: { request: { status: "active" } },
  //     },
  //     "open-mcp-stripe": {
  //       toolName: "GetSubscriptions",
  //       args: { status: "active" },
  //     },
  //   },
  //   expected: {
  //     A: {
  //       description: "Returns active subscriptions",
  //       objectType: "list",
  //       jsonFields: ["id", "status"],
  //     },
  //     B: {
  //       description: "Returns active subscriptions",
  //       objectType: "list",
  //       jsonFields: ["id", "status"],
  //     },
  //   },
  //   tags: ["read", "filter"],
  // },
  // {
  //   id: "list-prices",
  //   prompt: "List the prices on this Stripe account.",
  //   directInvocations: {
  //     "stripe-official": { toolName: "list_prices", args: {} },
  //     "stainless-stripe": {
  //       toolName: "execute",
  //       args: {
  //         code: `async function run(client) {\n  const page = await client.prices.list({ limit: 10 });\n  return page.data;\n}`,
  //       },
  //     },
  //     "se-stripe": { toolName: "get-prices", args: {} },
  //     "open-mcp-stripe": { toolName: "GetPrices", args: {} },
  //   },
  //   expected: {
  //     A: {
  //       description: "Returns price list",
  //       objectType: "list",
  //       jsonFields: ["id", "currency"],
  //     },
  //     B: {
  //       description: "Returns price list",
  //       objectType: "list",
  //       jsonFields: ["id", "currency"],
  //     },
  //   },
  //   tags: ["read"],
  // },
  // {
  //   id: "list-disputes",
  //   prompt: "List the disputes on this Stripe account.",
  //   directInvocations: {
  //     "stripe-official": { toolName: "list_disputes", args: {} },
  //     "stainless-stripe": {
  //       toolName: "execute",
  //       args: {
  //         code: `async function run(client) {\n  const page = await client.disputes.list({ limit: 10 });\n  return page.data;\n}`,
  //       },
  //     },
  //     "se-stripe": { toolName: "get-disputes", args: {} },
  //     "open-mcp-stripe": { toolName: "GetDisputes", args: {} },
  //   },
  //   expected: {
  //     A: {
  //       description: "Returns dispute list (may be empty)",
  //       objectType: "list",
  //     },
  //     B: {
  //       description: "Returns dispute list (may be empty)",
  //       objectType: "list",
  //     },
  //   },
  //   tags: ["read"],
  // },
  // {
  //   id: "list-payment-intents",
  //   prompt: "List recent payment intents on this Stripe account.",
  //   directInvocations: {
  //     "stripe-official": { toolName: "list_payment_intents", args: {} },
  //     "stainless-stripe": {
  //       toolName: "execute",
  //       args: {
  //         code: `async function run(client) {\n  const page = await client.paymentIntents.list({ limit: 10 });\n  return page.data;\n}`,
  //       },
  //     },
  //     "se-stripe": { toolName: "get-payment-intents", args: {} },
  //     "open-mcp-stripe": { toolName: "GetPaymentIntents", args: {} },
  //   },
  //   expected: {
  //     A: {
  //       description: "Returns payment intent list",
  //       objectType: "list",
  //       jsonFields: ["id"],
  //     },
  //     B: {
  //       description: "Returns payment intent list",
  //       objectType: "list",
  //       jsonFields: ["id"],
  //     },
  //   },
  //   tags: ["read"],
  // },
  // {
  //   id: "list-coupons",
  //   prompt: "List the coupons on this Stripe account.",
  //   directInvocations: {
  //     "stripe-official": { toolName: "list_coupons", args: {} },
  //     "stainless-stripe": {
  //       toolName: "execute",
  //       args: {
  //         code: `async function run(client) {\n  const page = await client.coupons.list({ limit: 10 });\n  return page.data;\n}`,
  //       },
  //     },
  //     "se-stripe": { toolName: "get-coupons", args: {} },
  //     "open-mcp-stripe": { toolName: "GetCoupons", args: {} },
  //   },
  //   expected: {
  //     A: {
  //       description: "Returns coupon list (may be empty)",
  //       objectType: "list",
  //     },
  //     B: {
  //       description: "Returns coupon list (may be empty)",
  //       objectType: "list",
  //     },
  //   },
  //   tags: ["read"],
  // },
  // {
  //   id: "create-customer",
  //   prompt:
  //     'Create a new customer named "Eval Test User" with email "eval-test@example.com".',
  //   directInvocations: {
  //     "stripe-official": {
  //       toolName: "create_customer",
  //       args: { name: "Eval Test User", email: "eval-test@example.com" },
  //     },
  //     "stainless-stripe": {
  //       toolName: "execute",
  //       args: {
  //         code: `async function run(client) {\n  const customer = await client.customers.create({\n    name: "Eval Test User",\n    email: "eval-test@example.com"\n  });\n  return customer;\n}`,
  //       },
  //     },
  //     "se-stripe": {
  //       toolName: "create-customer",
  //       args: { name: "Eval Test User", email: "eval-test@example.com" },
  //     },
  //     "open-mcp-stripe": {
  //       toolName: "PostCustomers",
  //       args: { name: "Eval Test User", email: "eval-test@example.com" },
  //     },
  //   },
  //   expected: {
  //     A: {
  //       description: "Returns created customer with matching name/email",
  //       containsText: ["Eval Test User", "eval-test@example.com"],
  //       jsonFields: ["id", "name", "email"],
  //     },
  //     B: {
  //       description: "Returns created customer with matching name/email",
  //       containsText: ["Eval Test User", "eval-test@example.com"],
  //       jsonFields: ["id", "name", "email"],
  //     },
  //   },
  //   tags: ["write"],
  //   requiredCapabilities: { write: true },
  // },
  // {
  //   id: "create-product",
  //   prompt: 'Create a new product called "Eval Test Product".',
  //   directInvocations: {
  //     "stripe-official": {
  //       toolName: "create_product",
  //       args: { name: "Eval Test Product" },
  //     },
  //     "stainless-stripe": {
  //       toolName: "execute",
  //       args: {
  //         code: `async function run(client) {\n  const product = await client.products.create({ name: "Eval Test Product" });\n  return product;\n}`,
  //       },
  //     },
  //     "se-stripe": {
  //       toolName: "create-product",
  //       args: { name: "Eval Test Product" },
  //     },
  //     "open-mcp-stripe": {
  //       toolName: "PostProducts",
  //       args: { name: "Eval Test Product" },
  //     },
  //   },
  //   expected: {
  //     A: {
  //       description: "Returns created product",
  //       containsText: ["Eval Test Product"],
  //       jsonFields: ["id", "name"],
  //     },
  //     B: {
  //       description: "Returns created product",
  //       containsText: ["Eval Test Product"],
  //       jsonFields: ["id", "name"],
  //     },
  //   },
  //   tags: ["write"],
  //   requiredCapabilities: { write: true },
  // },
  // {
  //   id: "filter-customer-email",
  //   prompt:
  //     "Find the customer with email olivia.martinez@heliosphere.io on this Stripe account.",
  //   directInvocations: {
  //     "stripe-official": {
  //       toolName: "list_customers",
  //       args: { email: "olivia.martinez@heliosphere.io" },
  //     },
  //     "stainless-stripe": {
  //       toolName: "execute",
  //       args: {
  //         code: `async function run(client) {\n  const page = await client.customers.list({ email: "olivia.martinez@heliosphere.io" });\n  return page.data;\n}`,
  //       },
  //     },
  //     "se-stripe": {
  //       toolName: "get-customers",
  //       args: { request: { email: "olivia.martinez@heliosphere.io" } },
  //     },
  //     "open-mcp-stripe": {
  //       toolName: "GetCustomers",
  //       args: { email: "olivia.martinez@heliosphere.io" },
  //     },
  //   },
  //   expected: {
  //     A: {
  //       description:
  //         "Returns customer(s) matching the email (Account A has this customer from Terraform seed)",
  //       containsText: ["olivia.martinez@heliosphere.io"],
  //       jsonFields: ["id", "email"],
  //     },
  //     B: {
  //       description:
  //         "Returns empty list or no match (Account B doesn't have seeded customers)",
  //       objectType: "list",
  //     },
  //   },
  //   tags: ["read", "filter"],
  // },
  // {
  //   id: "multi-step-invoice",
  //   prompt:
  //     'Create a new customer named "Invoice Test", then create a product called "Consulting Hour", create a price of $150.00 for that product, create an invoice for the customer, add the price as an invoice item, and finalize the invoice. Return the finalized invoice.',
  //   directInvocations: {
  //     "stripe-official": {
  //       toolName: "create_customer",
  //       args: { name: "Invoice Test" },
  //     },
  //     "stainless-stripe": {
  //       toolName: "execute",
  //       args: {
  //         code: [
  //           `async function run(client) {`,
  //           `  const customer = await client.customers.create({ name: "Invoice Test" });`,
  //           `  const product = await client.products.create({ name: "Consulting Hour" });`,
  //           `  const price = await client.prices.create({`,
  //           `    product: product.id,`,
  //           `    unit_amount: 15000,`,
  //           `    currency: "usd",`,
  //           `  });`,
  //           `  const invoice = await client.invoices.create({ customer: customer.id });`,
  //           `  await client.invoiceItems.create({`,
  //           `    customer: customer.id,`,
  //           `    price: price.id,`,
  //           `    invoice: invoice.id,`,
  //           `  });`,
  //           `  const finalized = await client.invoices.finalizeInvoice(invoice.id);`,
  //           `  return finalized;`,
  //           `}`,
  //         ].join("\n"),
  //       },
  //     },
  //     // se-stripe can't write, skip via requiredCapabilities
  //     "se-stripe": { toolName: "noop", args: {} },
  //     "open-mcp-stripe": {
  //       toolName: "PostCustomers",
  //       args: { name: "Invoice Test" },
  //     },
  //   },
  //   expected: {
  //     A: {
  //       description: "Returns a finalized invoice",
  //       containsText: ["Invoice Test"],
  //       jsonFields: ["id", "status"],
  //     },
  //     B: {
  //       description: "Returns a finalized invoice",
  //       containsText: ["Invoice Test"],
  //       jsonFields: ["id", "status"],
  //     },
  //   },
  //   tags: ["write", "multi-step"],
  //   requiredCapabilities: { write: true },
  // },
  // {
  //   id: "get-account",
  //   prompt: "Get the account details for this Stripe account.",
  //   directInvocations: {
  //     "stripe-official": {
  //       toolName: "retrieve_balance",
  //       args: {},
  //     },
  //     "stainless-stripe": {
  //       toolName: "execute",
  //       args: {
  //         code: `async function run(client) {\n  const account = await client.accounts.retrieve();\n  return account;\n}`,
  //       },
  //     },
  //     "se-stripe": { toolName: "get-account", args: {} },
  //     "open-mcp-stripe": { toolName: "GetAccount", args: {} },
  //   },
  //   expected: {
  //     A: {
  //       description: "Returns account information",
  //       jsonFields: ["id"],
  //       containsText: ["acct_"],
  //     },
  //     B: {
  //       description: "Returns account information",
  //       jsonFields: ["id"],
  //       containsText: ["acct_"],
  //     },
  //   },
  //   tags: ["read"],
  // },
];

/**
 * Filter test cases by server capabilities.
 */
export function getTestCasesForServer(
  serverId: string,
  capabilities: { write: boolean },
): TestCase[] {
  return TEST_CASES.filter((tc) => {
    if (tc.requiredCapabilities?.write && !capabilities.write) return false;
    // Ensure this server has a direct invocation defined (and it's not "noop")
    const invocation = tc.directInvocations[serverId];
    if (!invocation || invocation.toolName === "noop") return false;
    return true;
  });
}

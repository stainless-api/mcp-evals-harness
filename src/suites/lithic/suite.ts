import { config } from "dotenv";
import type { SuiteConfig } from "../../suite.js";
config();

const suite: SuiteConfig = {
  projectName: "stainless-lithic-evals",

  systemPrompt:
    "You are a helpful assistant with access to Lithic banking API tools. " +
    "Use the available MCP tools to answer questions about accounts, payments, cards, and transactions. " +
    "Always provide complete, accurate answers based on the actual API data.",

  servers: [
    {
      id: "lithic-stainless",
      displayName: "Lithic, Stainless-generated",
      command: "node",
      args: [
        "/Users/pierceclark/lithic-mcp-demo-typescript/packages/mcp-server/dist/index.js",
      ],
      env: {
        LITHIC_MCP_DEMO_API_KEY: process.env.LITHIC_MCP_DEMO_API_KEY!,
        LITHIC_API_KEY: process.env.LITHIC_MCP_DEMO_API_KEY!,
        STAINLESS_API_KEY: process.env.STAINLESS_API_KEY_REFERENCES!,
        REFERENCES_ENVIRONMENT: "sandbox",
      },
      capabilities: { write: false },
      mode: "code",
    },
    {
      id: "lithic-readme",
      displayName: "Lithic, Readme-generated",
      transport: "http",
      url: "https://stainless.readme.io/mcp",
      headers: {
        Authorization: process.env.LITHIC_MCP_DEMO_API_KEY!,
      },
      capabilities: { write: false },
      mode: "code",
    },
  ],

  testCases: [
    // ============================================
    // CARD INVENTORY (20 cards, all one account)
    // ============================================
    {
      id: "cards-inventory-by-account",
      prompt:
        "How many cards exist in the system? Are they all on the same account, or spread across multiple accounts? List every card description.",
      expected: {
        description:
          "Returns 20 cards, all active and all associated with the same account (sandbox_account_d2vjanwqek34xx5khtq8 / 'Test Account'). Descriptions include: Marketing Team Expenses, Engineering Subscriptions, Executive Travel Card, Office Supplies Procurement, Client Entertainment, Sales Team Travel, IT Hardware Purchases, HR Employee Benefits, Operations Fuel Card, Research Materials, Legal Services Payment, Consulting Fees Card, Event Planning Budget, Software Licensing, Training & Development, Facilities Maintenance, Security Services, Advertising Spend, Partnership Development, Emergency Expenses.",
        containsText: ["20", "Marketing Team Expenses", "Engineering Subscriptions"],
      },
      tags: ["read", "cards", "aggregation"],
    },

    // ============================================
    // DECLINED TRANSACTIONS (692 records)
    // ============================================
    {
      id: "declined-transactions-by-category",
      prompt:
        "How many declined transactions are there total? Break them down by decline category (e.g. check declines vs card declines) and give counts for each category.",
      expected: {
        description:
          "Returns 692 total declined transactions, broken down into 501 check declines and 191 card declines.",
        containsText: ["692", "501", "191"],
      },
      tags: ["read", "declined-transactions", "aggregation"],
    },
    {
      id: "largest-declined-transaction",
      prompt:
        "What was the single largest declined transaction by dollar amount? Include the amount, description, and what type of decline it was.",
      expected: {
        description:
          "Returns the largest declined transaction at $99,270.70 which was a check decline described as 'Declined inbound check deposit #40031'.",
        containsText: ["99,270", "check"],
      },
      tags: ["read", "declined-transactions", "search"],
    },

    // ============================================
    // PENDING TRANSACTIONS (226 records)
    // ============================================
    {
      id: "pending-transactions-by-source-category",
      prompt:
        "Categorize all pending transactions by their source category. How many are there total and how many in each category?",
      expected: {
        description:
          "Returns 226 total pending transactions broken down by source category: 200 account transfer instructions, 13 ACH transfer instructions, and 13 wire transfer instructions.",
        containsText: ["226", "200", "13"],
      },
      tags: ["read", "pending-transactions", "aggregation"],
    },

    // ============================================
    // EXTERNAL ACCOUNTS (69 records)
    // ============================================
    {
      id: "external-accounts-holder-analysis",
      prompt:
        'How many external accounts are there? Break them down by account holder type (business, individual, unknown). For accounts with "unknown" holder type, what are their descriptions?',
      expected: {
        description:
          "Returns 69 total external accounts: 48 business, 9 individual, 12 unknown. All 12 unknown-holder accounts are described as 'Landlord'.",
        containsText: ["69", "48", "9", "12", "Landlord"],
      },
      tags: ["read", "external-accounts", "aggregation"],
    },
    {
      id: "external-accounts-routing-number-distribution",
      prompt:
        "Which routing number is used by the most external accounts? How many external accounts use each routing number?",
      expected: {
        description:
          "Returns routing number 101050001 as the most used with 19 external accounts. Other routing numbers each have 10 accounts: 121000358, 322271627, 091000019, 026009593, and 021000021.",
        containsText: ["101050001", "19"],
      },
      tags: ["read", "external-accounts", "aggregation"],
    },

    // ============================================
    // CROSS-RESOURCE: TRANSACTIONS × ACCOUNTS
    // ============================================
    {
      id: "account-with-most-transactions",
      prompt:
        "Which account has the highest number of transactions? How many transactions does it have, and what is the account name?",
      expected: {
        description:
          "Returns 'Test Account' (sandbox_account_d2vjanwqek34xx5khtq8) with 407 transactions, far more than any other account.",
        containsText: ["407", "Test Account"],
      },
      tags: ["read", "transactions", "accounts", "multi-step"],
    },
    {
      id: "held-funds-across-accounts",
      prompt:
        "What is the total amount of funds being held (the difference between current balance and available balance) across all open accounts?",
      expected: {
        description:
          "Returns approximately $2,834,605.75 in held funds across all open accounts (total current balance of ~$604.6M minus total available balance of ~$601.8M).",
        containsText: ["2,834,605"],
      },
      tags: ["read", "accounts", "balance", "multi-step"],
    },

    // ============================================
    // ACH TRANSFERS (23 records, two statuses)
    // ============================================
    {
      id: "ach-transfers-status-breakdown",
      prompt:
        "How many ACH transfers are in each status? For each status, what is the total dollar amount?",
      expected: {
        description:
          "Returns 23 total ACH transfers: 13 pending_approval totaling $21,150.00 and 10 submitted totaling $13,600.00.",
        containsText: ["13", "21,150", "10", "13,600"],
      },
      tags: ["read", "ach", "aggregation"],
    },

    // ============================================
    // EVENTS (8000+ records)
    // ============================================
    {
      id: "total-events-count",
      prompt: "How many total events are in the system?",
      expected: {
        description:
          "Returns 8,252 total events after paginating through all pages.",
        containsText: ["8,252"],
      },
      tags: ["read", "events", "aggregation"],
    },

    // ============================================
    // NEEDLE-IN-HAYSTACK: SPECIFIC CARD
    // ============================================
    {
      id: "find-card-last4-by-description",
      prompt:
        'What are the last 4 digits of the card used for "Engineering Subscriptions"?',
      expected: {
        description:
          "Returns 9666 as the last 4 digits of the card described as 'Engineering Subscriptions'.",
        containsText: ["9666"],
      },
      tags: ["read", "cards", "search"],
    },

    // ============================================
    // NEEDLE-IN-HAYSTACK: SPECIFIC SENDER
    // ============================================
    {
      id: "find-charter-service-payments",
      prompt:
        'Find all inbound payments related to charter services. Who sent them, how many payments were there, and what is the total amount?',
      expected: {
        description:
          "Returns Thunderbird Aviation as the sender of charter service settlement payments, with 5 payments totaling approximately $53,548.09.",
        containsText: ["Thunderbird", "5"],
      },
      tags: ["read", "transactions", "search"],
    },

    // ============================================
    // FULL TRANSACTION CATEGORIZATION
    // ============================================
    {
      id: "transaction-source-category-breakdown",
      prompt:
        "Break down all transactions by their source category. How many transactions are in each category?",
      expected: {
        description:
          "Returns 964 total transactions broken down by source category: approximately 350 inbound real-time payments transfer confirmations and 10 ACH transfer intentions, plus other categories for the remainder.",
        containsText: ["964", "350"],
      },
      tags: ["read", "transactions", "aggregation"],
    },
  ],
};

export default suite;

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
        "/Users/sam/development/stainless-sdks/lithic-mcp-demo-typescript/packages/mcp-server/dist/index.js",
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
      id: "lithic-stainless-prose",
      displayName: "Lithic, Stainless-generated, with prose docs",
      command: "node",
      args: [
        "/Users/sam/development/stainless-sdks/lithic-typescript/packages/mcp-server/dist/index.js",
      ],
      env: {
        LITHIC_API_KEY: process.env.LITHIC_MCP_DEMO_API_KEY!,
        STAINLESS_API_KEY: process.env.STAINLESS_API_KEY_LITHIC!,
        LITHIC_ENVIRONMENT: "sandbox",
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
    // CARD INVENTORY (102 cards, all one account)
    // ============================================
    {
      id: "cards-inventory-by-account",
      prompt:
        "How many cards exist in the system? Are they all on the same account, or spread across multiple accounts? List every card description.",
      expected: {
        description:
          "Returns 102 cards, all associated with the same account (02fe0410-c36d-4f57-b488-d6bc190e99b7). Cards include employee cards (e.g., Sarah Johnson - Marketing, Michael Chen - Engineering, Diana Patel - CFO), department cards (e.g., Engineering - Cloud Infra, DevOps - Tooling, Marketing - Ad Spend), project cards (e.g., Project Titan - Frontend, Project Nova - Backend), and SaaS subscription cards (e.g., AWS Monthly Billing, Slack Business Plus, GitHub Enterprise). By state: 96 OPEN, 5 PAUSED, 1 CLOSED. By type: 91 VIRTUAL, 10 UNLOCKED, 1 SINGLE_USE.",
        containsText: ["102", "Sarah Johnson", "AWS Monthly Billing"],
      },
      tags: ["read", "cards", "aggregation"],
    },

    // ============================================
    // DECLINED TRANSACTIONS (2,287 records)
    // ============================================
    {
      id: "declined-transactions-by-category",
      prompt:
        "How many declined transactions are there total? Break them down by decline reason and give counts for each category.",
      expected: {
        description:
          "Returns 2,287 total declined transactions, broken down by result type: 1,715 DECLINED, 484 USER_TRANSACTION_LIMIT, and 88 CARD_PAUSED.",
        containsText: ["2,287", "1,715", "484", "88"],
      },
      tags: ["read", "declined-transactions", "aggregation"],
    },
    {
      id: "largest-declined-transaction",
      prompt:
        "What was the single largest declined transaction by dollar amount? Include the amount, merchant, and what type of decline it was.",
      expected: {
        description:
          "Returns the largest declined transaction at $5,000.00 from merchant 'BIG PURCHASE' with a DECLINED result.",
        containsText: ["5,000", "BIG PURCHASE"],
      },
      tags: ["read", "declined-transactions", "search"],
    },

    // ============================================
    // CARD STATE & TYPE BREAKDOWN
    // ============================================
    {
      id: "card-state-and-type-breakdown",
      prompt:
        "How many cards are in each state (open, paused, closed)? And how many of each card type (virtual, unlocked, single_use)?",
      expected: {
        description:
          "Returns 96 OPEN, 5 PAUSED, and 1 CLOSED card. By type: 91 VIRTUAL, 10 UNLOCKED, and 1 SINGLE_USE.",
        containsText: ["96", "91", "UNLOCKED"],
      },
      tags: ["read", "cards", "aggregation"],
    },

    // ============================================
    // PAUSED CARDS (5 records)
    // ============================================
    {
      id: "paused-cards-details",
      prompt:
        "Which cards are currently paused? List their descriptions and last 4 digits.",
      expected: {
        description:
          "Returns 5 paused cards: Alex Romano - Partnerships (7951), Victor Chang - Data Engineer (0488), Patrick Dunn - Fleet Mgmt (8225), Karen Mitchell - Analyst (1875), and Frank O'Brien - COO (2325). All are VIRTUAL type cards.",
        containsText: ["Alex Romano", "Victor Chang", "Karen Mitchell"],
      },
      tags: ["read", "cards", "search"],
    },

    // ============================================
    // VOIDED TRANSACTIONS (25 records)
    // ============================================
    {
      id: "voided-transactions-analysis",
      prompt:
        "How many voided transactions are there? Which merchant has the most voided transactions, and how many?",
      expected: {
        description:
          "Returns 25 voided transactions. UBER *TRIP HELP.UBER.C has the most with 5 voided transactions, followed by SUBWAY #890 MIAMI FL with 4 and GOOGLE *GSUITE with 4.",
        containsText: ["25", "UBER"],
      },
      tags: ["read", "transactions", "aggregation"],
    },

    // ============================================
    // TOP APPROVED MERCHANT
    // ============================================
    {
      id: "top-approved-merchant",
      prompt:
        "Which merchant has the most approved, settled transactions? How many transactions and what is the total dollar amount?",
      expected: {
        description:
          "Returns LYFT *RIDE as the top merchant by approved settled transaction count with 15 transactions totaling $168.08. Followed by APPLE.COM/BILL with 11 transactions ($57.44) and BLUE BOTTLE COFFEE SF with 9 transactions ($61.90).",
        containsText: ["LYFT", "15"],
      },
      tags: ["read", "transactions", "aggregation"],
    },

    // ============================================
    // PENDING TRANSACTIONS TOTAL
    // ============================================
    {
      id: "pending-transactions-total-amount",
      prompt:
        "How many pending transactions are there and what is their total dollar amount?",
      expected: {
        description:
          "Returns 95 pending transactions with a total dollar amount of approximately $1,521.53.",
        containsText: ["95", "1,521"],
      },
      tags: ["read", "pending-transactions", "aggregation"],
    },

    // ============================================
    // CROSS-RESOURCE: TRANSACTIONS × ACCOUNTS
    // ============================================
    {
      id: "account-with-most-transactions",
      prompt:
        "Which account has the highest number of transactions? How many transactions does it have?",
      expected: {
        description:
          "There is only one account (02fe0410-c36d-4f57-b488-d6bc190e99b7) with 2,637 total transactions. 101 of the 102 cards on this account have transactions; only 'Pierce Test Card' has zero.",
        containsText: ["2,637"],
      },
      tags: ["read", "transactions", "accounts", "multi-step"],
    },

    // ============================================
    // EVENTS (5,224 records)
    // ============================================
    {
      id: "total-events-count",
      prompt: "How many total events are in the system?",
      expected: {
        description:
          "Returns 5,224 total events after paginating through all pages.",
        containsText: ["5,224"],
      },
      tags: ["read", "events", "aggregation"],
    },

    // ============================================
    // NEEDLE-IN-HAYSTACK: SPECIFIC CARD
    // ============================================
    {
      id: "find-card-last4-by-description",
      prompt:
        'What are the last 4 digits of the card described as "Diana Patel - CFO"?',
      expected: {
        description:
          "Returns 8235 as the last 4 digits of the card described as 'Diana Patel - CFO'.",
        containsText: ["8235"],
      },
      tags: ["read", "cards", "search"],
    },

    // ============================================
    // NEEDLE-IN-HAYSTACK: SPECIFIC MERCHANT
    // ============================================
    {
      id: "find-merchant-transactions",
      prompt:
        "Find all transactions at SOUTHWEST AIR. How many transactions were there and what is the total dollar amount?",
      expected: {
        description:
          "Returns 22 SOUTHWEST AIR transactions totaling approximately $731.88.",
        containsText: ["SOUTHWEST", "22"],
      },
      tags: ["read", "transactions", "search"],
    },

    // ============================================
    // FULL TRANSACTION STATUS BREAKDOWN
    // ============================================
    {
      id: "transaction-status-breakdown",
      prompt:
        "Break down all transactions by their status. How many transactions are in each status?",
      expected: {
        description:
          "Returns 2,637 total transactions broken down by status: 2,473 settled, 95 pending, 44 declined, and 25 voided.",
        containsText: ["2,637", "2,473"],
      },
      tags: ["read", "transactions", "aggregation"],
    },
    // ============================================
    // LITHIC SPECIFIC EXAMPLES
    // ============================================
    {
      id: "tokenization-rules",
      prompt:
        "We recently added tokenization rules to the API and want to test how they show up in dashboard. Create 10-20 tokenization rules to test potential UI edge cases. Then simulate a tokenization and review results are as expected.",
      expected: {
        description:
          "Should create 10-20 tokenzation rules, and run a successful simulation. The reviewed results should indicate that everything worked correctly.",
        containsText: [],
      },
      tags: ["write", "tokenzation", "lithic-provided", "simulation"],
    },
    {
      id: "add-simulated-data",
      prompt:
        "I want to populate sandbox with test data. Create 5 account holders with realistic PII that matches the San Francisco area. Issue each of those cardholders 2 cards. On each card, simulate 3 transactions which are representative of typical consumer spend for the area.",
      expected: {
        description:
          "Should create 5 account holders with realistic PII from SF. Should also generate two cards per user, with 3 realistic transactions each.",
        containsText: [],
      },
      tags: ["write", "cards", "transactions", "simulation", "lithic-provided"],
    },
    {
      id: "velocity-based-auth-rule",
      prompt:
        "Create a velocity based auth rule, simulate enough transactions to trigger it, fetch rule feature state afterwards and verify it's as expected. Then, regardless of the simulation result, remove the auth rule.",
      expected: {
        description:
          "Should create a velocity based auth rule. Should also create a successful simulation to trigger it, and verify that the feature state is as expected. The feature state that it fetches should also be correct and without error. The auth rule must then also be removed following the simulation.",
        containsText: [],
      },
      tags: ["write", "auth-rules", "simulation", "lithic-provided"],
    },
  ],
};

export default suite;

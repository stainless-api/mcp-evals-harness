import { config } from "dotenv";
import type { SuiteConfig } from "../../suite.js";
config();

const suite: SuiteConfig = {
  projectName: "stainless-increase-evals",

  systemPrompt:
    "You are a helpful assistant with access to Increase banking API tools. " +
    "Use the available MCP tools to answer questions about accounts, payments, and transactions. " +
    "Always provide complete, accurate answers based on the actual API data.",

  servers: [
    {
      id: "increase-stainless",
      displayName: "Increase, Stainless-generated",
      command: "node",
      args: ["/Path/to/increase-mcp-demo-typescript/packages/mcp-server/dist/index.js"],
      env: {
        INCREASE_MCP_DEMO_API_KEY: process.env.INCREASE_API_KEY!,
      },
      capabilities: { write : false },
      mode: "code", 
      tags: ["Stainless"]
    },
    {
      id: "increase-dynamic",
      displayName: "Increase, Dynamic tools",
      command: "node",
      args: ["/Path/to/increase-mcp-demo-typescript/packages/mcp-server/dist/index.js", "--tools=dynamic"],
      env: {
        INCREASE_MCP_DEMO_API_KEY: process.env.INCREASE_API_KEY!,
      },
      capabilities: { write : false },
      mode: "tools", 
      tags: ["Dynamic"]
    },
    {
      id: "increase-anthropic-code-mode",
      displayName: "Increase, Anthropic Code Mode",
      command: "node",
      args: ["/Path/to/increase-mcp-demo-typescript/packages/mcp-server/dist/index.js"],
      env: {
        INCREASE_MCP_DEMO_API_KEY: process.env.INCREASE_API_KEY!,
      },
      capabilities: { write : false },
      mode: "tools", 
      models: ["opus-code"],
      tags: ["Anthropic-Code"]
    },
  ],

  // ============================================
  //  TEST CASES
  //
  //  WARNING! These cases are based on our 
  //  sandbox data, and are included for posterity 
  //  with our published evaluation results.
  //
  //  TO GET ACCURATE RESULTS YOURSELF:
  //  You will need to create your own sandbox
  //  dataset and update these test cases with 
  //  the correct answers.
  // ============================================
  //
  //
  //
  testCases: [
    // ============================================
    // BALANCE AND ACCOUNT QUERIES
    // ============================================
    {
      id: "total-balance-across-accounts",
      prompt: "What is the total current balance across all my open accounts?",
      expected: {
        description:
          "Returns the total balance across all open accounts, which is approximately $604.6 million across 12 open accounts.",
        containsText: ["604"],
      },
      tags: ["read", "accounts", "balance"],
    },
    {
      id: "count-open-accounts",
      prompt: "How many accounts do I have that are currently open?",
      expected: {
        description: "Returns 12 open accounts.",
        containsText: ["12"],
      },
      tags: ["read", "accounts"],
    },
    {
      id: "find-account-by-name",
      prompt: 'What is the account ID for the account named "Test Account"?',
      expected: {
        description:
          'Returns the account ID sandbox_account_d2vjanwqek34xx5khtq8 for the account named "Test Account".',
        containsText: ["sandbox_account_d2vjanwqek34xx5khtq8"],
      },
      tags: ["read", "accounts"],
    },

    // ============================================
    // NEEDLE-IN-HAYSTACK TRANSACTION SEARCHES
    // ============================================
    {
      id: "find-trust-distribution-sender",
      prompt:
        "Which company sends us trust distributions? How much have they sent in total?",
      expected: {
        description:
          "Returns Northern Trust Admin as the sender of trust distributions, with a total of approximately $175,540.26.",
        containsText: ["Northern Trust", "175"],
      },
      tags: ["read", "transactions", "search"],
    },
    {
      id: "find-largest-single-payment",
      prompt:
        "What was the largest single inbound payment we received? Who sent it and what was it for?",
      expected: {
        description:
          'Returns $29,240.06 from Redwood Financial for "Investment returns Q4" as the largest single inbound payment.',
        containsText: ["Redwood", "29,240"],
      },
      tags: ["read", "transactions", "search"],
    },
    {
      id: "find-smallest-payment",
      prompt:
        "What was the smallest inbound real-time payment we received? Include the sender and amount.",
      expected: {
        description:
          'Returns $178.70 from Premier Services for "Subscription renewal" as the smallest inbound real-time payment.',
        containsText: ["Premier", "178"],
      },
      tags: ["read", "transactions", "search"],
    },
    {
      id: "find-invoice-payments-from-acme",
      prompt:
        "How many payments have we received from Acme Corporation and what is the total amount?",
      expected: {
        description:
          "Returns 16 payments from Acme Corporation totaling $42,601.08.",
        containsText: ["16", "42,601"],
      },
      tags: ["read", "transactions", "aggregation"],
    },
    {
      id: "search-by-remittance-info",
      prompt:
        'Find all payments with remittance information mentioning "Grant disbursement". Who sent these and what is the total?',
      expected: {
        description:
          "Returns Quantum Research Inc as the sender of grant disbursements, with a total of approximately $140,580.12.",
        containsText: ["Quantum Research", "140"],
      },
      tags: ["read", "transactions", "search"],
    },

    // ============================================
    // AGGREGATION AND ANALYSIS QUERIES
    // ============================================
    {
      id: "count-unique-payment-senders",
      prompt:
        "How many unique companies/entities have sent us inbound real-time payments?",
      expected: {
        description: "Returns 47 unique senders of inbound real-time payments.",
        containsText: ["47"],
      },
      tags: ["read", "transactions", "aggregation"],
    },
    {
      id: "total-inbound-rtp-payments",
      prompt:
        "What is the total amount of all inbound real-time payments we have received?",
      expected: {
        description:
          "Returns $1,933,037.08 as the total amount of all inbound real-time payments.",
        containsText: ["1,933"],
      },
      tags: ["read", "transactions", "aggregation"],
    },
    {
      id: "aggregate-tech-company-payments",
      prompt:
        'How much total money have we received from companies with "Tech" in their name?',
      expected: {
        description:
          'Returns approximately $101,694.36 from 21 payments from companies with "Tech" in their name, mainly Valley Tech Partners.',
        containsText: ["101"],
      },
      tags: ["read", "transactions", "aggregation"],
    },
    {
      id: "aggregate-financial-company-payments",
      prompt:
        'Calculate the total amount received from companies that appear to be financial institutions (including "Financial", "Capital", or "Investment" in their names).',
      expected: {
        description:
          "Returns approximately $301,648.10 from 27 payments from financial institutions including companies with Financial, Capital, or Investment in their names.",
        containsText: ["301"],
      },
      tags: ["read", "transactions", "aggregation"],
    },
    {
      id: "top-sender-by-volume",
      prompt:
        "Which sender has sent us the most money in total via real-time payments?",
      expected: {
        description:
          "Returns Redwood Financial as the top sender by total amount with $179,791.84 in real-time payments.",
        containsText: ["Redwood"],
      },
      tags: ["read", "transactions", "aggregation"],
    },
    {
      id: "average-transaction-amount",
      prompt: "What is the average amount of an inbound real-time payment?",
      expected: {
        description:
          "Returns $5,522.96 as the average amount of an inbound real-time payment.",
        containsText: ["5,522"],
      },
      tags: ["read", "transactions", "aggregation"],
    },

    // ============================================
    // CASH RECONCILIATION SCENARIOS
    // ============================================
    {
      id: "reconcile-investment-returns",
      prompt:
        'We are reconciling investment returns. List all payments mentioning "Investment returns" in the remittance info, including the sender and amounts.',
      expected: {
        description:
          'Returns Redwood Financial as the sender of multiple "Investment returns Q4" payments, listing individual amounts such as $29,240.06, $24,240.23, $23,651.15, etc.',
        containsText: ["Redwood", "investment return"],
      },
      tags: ["read", "transactions", "reconciliation"],
    },
    {
      id: "reconcile-monthly-retainer",
      prompt:
        'We need to verify retainer payments. Find all payments with "retainer" in the memo and calculate the total.',
      expected: {
        description:
          "Returns Westside Consulting as the sender of retainer payments with a total of approximately $49,453.35.",
        containsText: ["Westside", "retainer"],
      },
      tags: ["read", "transactions", "reconciliation"],
    },
    {
      id: "identify-unknown-payment-source",
      prompt:
        'We received a payment for "Contract payment milestone 3" but are unsure who sent it. Can you identify the sender?',
      expected: {
        description:
          'Returns Riverdale Manufacturing as the sender of the "Contract payment milestone 3" payment.',
        containsText: ["Riverdale"],
      },
      tags: ["read", "transactions", "search"],
    },
    {
      id: "find-dividend-payments",
      prompt:
        "List all dividend payments we have received, including the senders and total amount.",
      expected: {
        description:
          "Returns Vertex Capital and Vertex Holdings as the senders of dividend payments, with a total of approximately $112,743.63.",
        containsText: ["Vertex", "dividend"],
      },
      tags: ["read", "transactions", "reconciliation"],
    },

    // ============================================
    // OUTBOUND PAYMENT QUERIES (ACH)
    // ============================================
    {
      id: "total-outbound-ach",
      prompt:
        "What is the total amount of outbound ACH transfers we have made?",
      expected: {
        description:
          "Returns $13,600.00 as the total amount of outbound ACH transfers.",
        containsText: ["13,600"],
      },
      tags: ["read", "ach", "aggregation"],
    },
    {
      id: "find-contractor-payments",
      prompt:
        "How much have we paid to individual contractors (not businesses) via ACH? List the recipients.",
      expected: {
        description:
          "Returns individual contractors paid via ACH: Alice Johnson ($150), Bob Smith ($750), and Freelancer John Doe ($7,500), totaling $8,400.",
        containsText: ["Alice Johnson", "Bob Smith"],
      },
      tags: ["read", "ach", "search"],
    },
    {
      id: "find-expense-reimbursements",
      prompt: "Who did we send expense reimbursements to and for how much?",
      expected: {
        description:
          "Returns Bob Smith as the recipient of a $750 expense reimbursement.",
        containsText: ["Bob", "750"],
      },
      tags: ["read", "ach", "search"],
    },

    // ============================================
    // EXTERNAL ACCOUNT QUERIES
    // ============================================
    {
      id: "count-external-accounts",
      prompt: "How many external accounts do we have set up for payments?",
      expected: {
        description: "Returns 69 external accounts set up for payments.",
        containsText: ["69"],
      },
      tags: ["read", "external-accounts"],
    },
    {
      id: "find-payroll-external-accounts",
      prompt:
        "Which payroll service providers do we have external accounts set up for?",
      expected: {
        description:
          "Returns ADP, Gusto, and Paychex as payroll service providers with external accounts.",
        containsText: ["ADP", "Gusto", "Paychex"],
      },
      tags: ["read", "external-accounts", "search"],
    },
    {
      id: "find-law-firm-accounts",
      prompt: "List all law firms we have as external accounts.",
      expected: {
        description:
          "Returns Cooley LLP, Fenwick & West LLP, and Wilson Sonsini as law firms with external accounts.",
        containsText: ["Cooley", "Fenwick", "Wilson Sonsini"],
      },
      tags: ["read", "external-accounts", "search"],
    },

    // ============================================
    // COMPLEX MULTI-STEP ANALYSIS
    // ============================================
    {
      id: "cash-flow-summary",
      prompt:
        "Provide a cash flow summary: total inbound real-time payments minus total outbound ACH transfers.",
      expected: {
        description:
          "Returns a cash flow summary showing inbound RTP of $1,933,037.08 minus outbound ACH of $13,600.00, for a net of approximately $1,919,437.08.",
        containsText: ["1,933", "13,600"],
      },
      tags: ["read", "analysis", "multi-step"],
    },
    {
      id: "receiving-account-distribution",
      prompt:
        "How many different accounts are receiving inbound real-time payments? Which accounts are they?",
      expected: {
        description:
          "Returns 6 unique accounts receiving inbound real-time payments, listing the account IDs.",
        containsText: ["6"],
      },
      tags: ["read", "analysis"],
    },
    {
      id: "payment-type-breakdown",
      prompt:
        'Break down inbound payments by type based on remittance info (e.g., invoice payments, milestone payments, distributions, dividends, royalties). Show counts and totals for each.',
      expected: {
        description:
          "Returns a breakdown of inbound payments by type including invoice payments, milestone payments, distributions, dividends, and royalties with counts and dollar totals for each category.",
        containsText: ["invoice", "dividend", "royalt"],
      },
      tags: ["read", "analysis", "multi-step"],
    },
    {
      id: "find-bonus-payments",
      prompt:
        "Which companies have sent us bonus payments? Calculate the total.",
      expected: {
        description:
          "Returns Titan Corp and Atlas Group as senders of bonus payments, with a total of approximately $42,395.67.",
        containsText: ["Titan", "bonus"],
      },
      tags: ["read", "transactions", "search"],
    },
    {
      id: "sender-routing-number-lookup",
      prompt:
        "Which routing number is most commonly used by senders of inbound real-time payments?",
      expected: {
        description:
          "Returns 021000021 as the most commonly used routing number for inbound real-time payments.",
        containsText: ["021000021"],
      },
      tags: ["read", "transactions", "analysis"],
    },
    {
      id: "settlement-payments-total",
      prompt:
        'Calculate the total amount of payments that mention "settlement" in the remittance info.',
      expected: {
        description:
          'Returns approximately $137,669.00 as the total amount of payments mentioning "settlement" in the remittance info.',
        containsText: ["137", "settlement"],
      },
      tags: ["read", "transactions", "aggregation"],
    },
    {
      id: "royalty-payments-analysis",
      prompt:
        "Analyze our royalty payments: who sends them and what is the total amount received?",
      expected: {
        description:
          "Returns Silver Creek Mining as the sender of royalty payments, with a total of approximately $63,030.84.",
        containsText: ["Silver Creek", "63"],
      },
      tags: ["read", "transactions", "analysis"],
    },
  ],
};

export default suite;

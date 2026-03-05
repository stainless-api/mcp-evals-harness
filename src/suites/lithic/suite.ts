import { config } from "dotenv";
import type { SuiteConfig, ResolveExpected, ExpectedResult } from "../../suite.js";
config();

const suite: SuiteConfig = {
  projectName: "stainless-lithic-evals",

  systemPrompt:
    "You are a helpful assistant with access to Lithic banking API tools. " +
    "Use the available MCP tools to answer questions about accounts, payments, cards, and transactions. " +
    "Always provide complete, accurate answers based on the actual API data. " +
    "When paginating through large datasets, use page_size=100 (the maximum) to minimize API calls.",

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
      capabilities: { write: true },
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
      capabilities: { write: true },
      mode: "code",
    },
    {
      id: "lithic-stainless-better-instructions",
      displayName: "Lithic, Stainless-generated, better instructions",
      command: "node",
      args: [
        "/Users/sam/Development/stainless/dist/lithic-typescript/packages/mcp-server/dist/index.js",
      ],
      env: {
        LITHIC_API_KEY: process.env.LITHIC_MCP_DEMO_API_KEY!,
        STAINLESS_API_KEY: process.env.STAINLESS_API_KEY_LITHIC!,
        LITHIC_ENVIRONMENT: "sandbox",
      },
      capabilities: { write: true },
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
      capabilities: { write: true },
      mode: "code",
    },
  ],

  testCases: [
    // ============================================
    // CARD INVENTORY
    // ============================================
    {
      id: "cards-inventory-by-account",
      prompt:
        "How many cards exist in the system? Are they all on the same account, or spread across multiple accounts? List every card description.",
      expected: {
        description:
          "Returns all cards in the system. Cards include employee cards (e.g., Sarah Johnson - Marketing, Michael Chen - Engineering, Diana Patel - CFO), department cards (e.g., Engineering - Cloud Infra, Marketing - Ad Spend), project cards (e.g., Project Titan - Frontend), and SaaS subscription cards (e.g., AWS Monthly Billing, Slack Business Plus, GitHub Enterprise). The response should list all card descriptions.",
        containsText: ["Sarah Johnson", "AWS Monthly Billing", "Diana Patel"],
      },
      tags: ["read", "cards", "aggregation"],
    },

    // ============================================
    // DECLINED TRANSACTIONS
    // ============================================
    {
      id: "declined-transactions-by-category",
      prompt:
        "How many transactions have a status of DECLINED? Break them down by their result field (e.g. DECLINED, USER_TRANSACTION_LIMIT, CARD_PAUSED) and give counts for each category.",
      expected: {
        description:
          "Returns transactions with status=DECLINED broken down by result type. The three categories are DECLINED (the largest category), USER_TRANSACTION_LIMIT, and CARD_PAUSED. Each category should have a count.",
        containsText: ["DECLINED", "USER_TRANSACTION_LIMIT", "CARD_PAUSED"],
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
          "Returns cards broken down by state and type. States include OPEN (the majority), PAUSED, and CLOSED. Types include VIRTUAL (the majority), UNLOCKED, and SINGLE_USE. Each category should include a count.",
        containsText: ["OPEN", "PAUSED", "CLOSED", "VIRTUAL", "UNLOCKED", "SINGLE_USE"],
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
    // VOIDED TRANSACTIONS
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
        "Are there any pending transactions? If so, how many and what is their total dollar amount? If there are none, say so.",
      expected: {
        description:
          "Queries pending transactions and reports the count and total amount. The result may be zero pending transactions if all have settled, or some number of pending transactions with a dollar total.",
        containsText: ["pending"],
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
          "There is one primary account (02fe0410-c36d-4f57-b488-d6bc190e99b7) that holds the vast majority of transactions. The agent should identify this account and report the total transaction count.",
        containsText: ["02fe0410-c36d-4f57-b488-d6bc190e99b7"],
      },
      tags: ["read", "transactions", "accounts", "multi-step"],
    },

    // ============================================
    // EVENTS
    // ============================================
    {
      id: "total-events-count",
      prompt:
        "How many total events are in the system? Paginate through all pages to get the complete count.",
      expected: {
        description:
          "Returns the total event count after paginating through all available pages. The count should be in the thousands.",
        containsText: ["events"],
      },
      tags: ["read", "events", "pagination"],
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
          "Returns all transactions broken down by status. Statuses include settled (the vast majority), pending, declined, and voided. Each status should include a count. Settled transactions are the largest category.",
        containsText: ["settled", "declined", "voided"],
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
          "Creates 10-20 tokenization rules with varying configurations to test UI edge cases. Then runs a tokenization simulation and reviews the results, confirming the simulation completed successfully.",
        containsText: ["tokenization", "rule", "simulation"],
      },
      tags: ["write", "tokenization", "lithic-provided", "simulation"],
      requiredCapabilities: { write: true },
    },
    {
      id: "add-simulated-data",
      prompt:
        "I want to populate sandbox with test data. Create 5 account holders with realistic PII that matches the San Francisco area. Issue each of those cardholders 2 cards. On each card, simulate 3 transactions which are representative of typical consumer spend for the area.",
      expected: {
        description:
          "Creates 5 account holders with San Francisco area PII (addresses, phone numbers, etc). Issues 2 cards to each account holder (10 cards total). Simulates 3 transactions on each card (30 transactions total) with realistic SF-area consumer spending patterns.",
        containsText: ["account holder", "card", "transaction", "San Francisco"],
      },
      tags: ["write", "cards", "transactions", "simulation", "lithic-provided"],
      requiredCapabilities: { write: true },
    },
    {
      id: "velocity-based-auth-rule",
      prompt:
        "Create a velocity based auth rule, simulate enough transactions to trigger it, fetch rule feature state afterwards and verify it's as expected. Then, regardless of the simulation result, remove the auth rule.",
      expected: {
        description:
          "Creates a velocity-based auth rule. Simulates transactions to trigger the velocity limit. Fetches the auth rule feature state and verifies it reflects the triggered state. Removes the auth rule as cleanup, regardless of simulation outcome.",
        containsText: ["auth rule", "velocity", "removed"],
      },
      tags: ["write", "auth-rules", "simulation", "lithic-provided"],
      requiredCapabilities: { write: true },
    },
  ],
};

// ── Dynamic expected value resolver ──

interface LithicRecord {
  token: string;
  [key: string]: unknown;
}

interface LithicListResponse {
  data: LithicRecord[];
  has_more: boolean;
}

async function fetchAll(
  endpoint: string,
  apiKey: string,
  params?: Record<string, string>,
  maxRecords?: number,
): Promise<LithicRecord[]> {
  const base = "https://sandbox.lithic.com/v1";
  const headers = {
    Authorization: `api-key ${apiKey}`,
    Accept: "application/json",
  };
  const results: LithicRecord[] = [];
  let startingAfter: string | undefined;
  let page = 0;

  while (true) {
    const query = new URLSearchParams({ page_size: "100", ...params });
    if (startingAfter) query.set("starting_after", startingAfter);

    const res = await fetch(`${base}${endpoint}?${query}`, { headers });
    if (!res.ok) {
      throw new Error(`Lithic API ${endpoint}: ${res.status} ${res.statusText}`);
    }
    const body = (await res.json()) as LithicListResponse;
    results.push(...body.data);
    page++;

    if (page % 5 === 0 || !body.has_more) {
      process.stderr.write(`\r  ${endpoint}: ${results.length} records (${page} pages)...`);
    }

    if (!body.has_more || body.data.length === 0 || (maxRecords && results.length >= maxRecords)) break;
    startingAfter = body.data[body.data.length - 1].token;
  }

  process.stderr.write(`\r  ${endpoint}: ${results.length} records (${page} pages)    \n`);
  return results;
}

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

export const resolveExpected: ResolveExpected = async () => {
  const apiKey = process.env.LITHIC_MCP_DEMO_API_KEY;
  if (!apiKey) {
    throw new Error("LITHIC_MCP_DEMO_API_KEY required for dynamic expected values");
  }

  // Fetch cards and filtered transaction slices in parallel.
  // Using status filters avoids fetching all 3000+ transactions (30+ pages).
  // Settled is capped at 1000 since we only need merchant aggregations from seed data.
  const [allCards, txDeclined, txVoided, txPending, txExpired, txSettled] = await Promise.all([
    fetchAll("/cards", apiKey),
    fetchAll("/transactions", apiKey, { status: "DECLINED" }),
    fetchAll("/transactions", apiKey, { status: "VOIDED" }),
    fetchAll("/transactions", apiKey, { status: "PENDING" }),
    fetchAll("/transactions", apiKey, { status: "EXPIRED" }),
    fetchAll("/transactions", apiKey, { status: "SETTLED" }, 1000),
  ]);
  const allTransactions = [...txDeclined, ...txVoided, ...txPending, ...txExpired, ...txSettled];

  console.log(
    `  Fetched ${allCards.length} cards and ${allTransactions.length} transactions ` +
    `(${txDeclined.length} declined, ${txVoided.length} voided, ${txPending.length} pending, ` +
    `${txExpired.length} expired, ${txSettled.length} settled${txSettled.length >= 1000 ? "+" : ""}) from Lithic sandbox`,
  );

  const result: Record<string, Partial<ExpectedResult>> = {};

  // cards-inventory-by-account
  const accountsForCards = new Map<string, number>();
  for (const c of allCards) {
    const acct = c.account_token as string;
    accountsForCards.set(acct, (accountsForCards.get(acct) ?? 0) + 1);
  }
  result["cards-inventory-by-account"] = {
    description:
      `Returns all ${formatNumber(allCards.length)} cards in the system across ` +
      `${accountsForCards.size} account(s). Cards include employee cards ` +
      `(e.g., Sarah Johnson - Marketing, Diana Patel - CFO), department cards, ` +
      `project cards, and SaaS subscription cards. The response should list all card descriptions.`,
    containsText: [
      formatNumber(allCards.length),
      "Sarah Johnson",
      "AWS Monthly Billing",
      "Diana Patel",
    ],
  };

  // declined-transactions-by-category
  const declined = allTransactions.filter(
    (t) => (t.status as string).toUpperCase() === "DECLINED",
  );
  const declinedByResult = new Map<string, number>();
  for (const t of declined) {
    const r = t.result as string;
    declinedByResult.set(r, (declinedByResult.get(r) ?? 0) + 1);
  }
  const declinedBreakdown = [...declinedByResult.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([r, c]) => `${formatNumber(c)} ${r}`)
    .join(", ");
  result["declined-transactions-by-category"] = {
    description:
      `Returns ${formatNumber(declined.length)} total declined transactions, broken down ` +
      `by result type: ${declinedBreakdown}.`,
    containsText: [
      formatNumber(declined.length),
      ...declinedByResult.keys(),
    ],
  };

  // card-state-and-type-breakdown
  const byState = new Map<string, number>();
  const byType = new Map<string, number>();
  for (const c of allCards) {
    const state = c.state as string;
    const type = c.type as string;
    byState.set(state, (byState.get(state) ?? 0) + 1);
    byType.set(type, (byType.get(type) ?? 0) + 1);
  }
  const stateBreakdown = [...byState.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([s, c]) => `${formatNumber(c)} ${s}`)
    .join(", ");
  const typeBreakdown = [...byType.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([t, c]) => `${formatNumber(c)} ${t}`)
    .join(", ");
  result["card-state-and-type-breakdown"] = {
    description:
      `Returns ${formatNumber(allCards.length)} cards. By state: ${stateBreakdown}. ` +
      `By type: ${typeBreakdown}. Each category should include a count.`,
    containsText: [
      ...Array.from(byState.entries()).map(([s, c]) => formatNumber(c)),
      ...byState.keys(),
      ...byType.keys(),
    ],
  };

  // account-with-most-transactions
  const byAccount = new Map<string, number>();
  for (const t of allTransactions) {
    const acct = t.account_token as string;
    if (acct) byAccount.set(acct, (byAccount.get(acct) ?? 0) + 1);
  }
  const topAccount = [...byAccount.entries()].sort((a, b) => b[1] - a[1])[0];
  if (topAccount) {
    result["account-with-most-transactions"] = {
      description:
        `The account with the most transactions is ${topAccount[0]}. ` +
        `It holds the vast majority of transactions.`,
      containsText: [topAccount[0]],
    };
  }

  // transaction-status-breakdown — use pre-filtered slices for exact counts
  const statusCounts: [string, number][] = ([
    ["settled", txSettled.length],
    ["pending", txPending.length],
    ["expired", txExpired.length],
    ["declined", txDeclined.length],
    ["voided", txVoided.length],
  ] as [string, number][]).filter(([, c]) => c > 0);
  // Note: settled is capped at 1000 in the resolver, so we only include
  // non-settled counts in containsText (those are exact).
  const statusBreakdown = statusCounts
    .sort((a, b) => b[1] - a[1])
    .map(([s, c]) => `${s}: ${formatNumber(c)}${s === "settled" ? "+" : ""}`)
    .join(", ");
  result["transaction-status-breakdown"] = {
    description:
      `Returns transactions broken down by status: ${statusBreakdown}. ` +
      `Settled is the largest category.`,
    containsText: ["settled", "declined", "voided"],
  };

  // pending-transactions-total-amount
  const pending = allTransactions.filter(
    (t) => (t.status as string).toLowerCase() === "pending",
  );
  const pendingAmountCents = pending.reduce(
    (sum, t) => sum + ((t.amount as number) ?? 0),
    0,
  );
  const pendingDollars = (pendingAmountCents / 100).toFixed(2);
  if (pending.length === 0) {
    result["pending-transactions-total-amount"] = {
      description:
        "There are currently zero pending transactions. All transactions have settled.",
      containsText: ["0", "pending"],
    };
  } else {
    result["pending-transactions-total-amount"] = {
      description:
        `Returns ${formatNumber(pending.length)} pending transactions with a total ` +
        `dollar amount of $${pendingDollars}.`,
      containsText: [formatNumber(pending.length), "pending"],
    };
  }

  // voided-transactions-analysis
  const voided = allTransactions.filter(
    (t) => (t.status as string).toLowerCase() === "voided",
  );
  const voidedByMerchant = new Map<string, number>();
  for (const t of voided) {
    const merchant = (t.merchant as any)?.descriptor as string | undefined;
    if (merchant) {
      voidedByMerchant.set(merchant, (voidedByMerchant.get(merchant) ?? 0) + 1);
    }
  }
  const topVoidedMerchant = [...voidedByMerchant.entries()].sort(
    (a, b) => b[1] - a[1],
  )[0];
  if (topVoidedMerchant) {
    // Use first word of merchant descriptor for flexible matching
    const voidedMerchantKey = topVoidedMerchant[0].split(/\s/)[0];
    result["voided-transactions-analysis"] = {
      description:
        `Returns ${formatNumber(voided.length)} voided transactions. ` +
        `${topVoidedMerchant[0]} has the most with ${topVoidedMerchant[1]} voided transactions.`,
      containsText: [formatNumber(voided.length), voidedMerchantKey],
    };
  }

  // top-approved-merchant
  const settledApproved = allTransactions.filter(
    (t) =>
      (t.status as string).toUpperCase() === "SETTLED" &&
      (t.result as string).toUpperCase() === "APPROVED",
  );
  const approvedByMerchant = new Map<string, { count: number; totalCents: number }>();
  for (const t of settledApproved) {
    const merchant = (t.merchant as any)?.descriptor as string | undefined;
    if (!merchant) continue;
    const entry = approvedByMerchant.get(merchant) ?? { count: 0, totalCents: 0 };
    entry.count++;
    entry.totalCents += (t.settled_amount as number) ?? (t.amount as number) ?? 0;
    approvedByMerchant.set(merchant, entry);
  }
  const topApproved = [...approvedByMerchant.entries()].sort(
    (a, b) => b[1].count - a[1].count,
  )[0];
  if (topApproved) {
    const dollars = (Math.abs(topApproved[1].totalCents) / 100).toFixed(2);
    // Use first word of merchant descriptor for flexible matching
    const approvedMerchantKey = topApproved[0].split(/\s/)[0];
    result["top-approved-merchant"] = {
      description:
        `Returns ${topApproved[0]} as the top merchant by approved settled transaction count ` +
        `with ${formatNumber(topApproved[1].count)} transactions totaling $${dollars}.`,
      containsText: [approvedMerchantKey, formatNumber(topApproved[1].count)],
    };
  }

  // find-merchant-transactions (SOUTHWEST AIR)
  const southwestTxns = allTransactions.filter((t) => {
    const merchant = (t.merchant as any)?.descriptor as string | undefined;
    return merchant?.includes("SOUTHWEST AIR");
  });
  const southwestTotalCents = southwestTxns.reduce(
    (sum, t) => sum + Math.abs((t.settled_amount as number) ?? (t.amount as number) ?? 0),
    0,
  );
  const southwestDollars = (southwestTotalCents / 100).toFixed(2);
  result["find-merchant-transactions"] = {
    description:
      `Returns ${formatNumber(southwestTxns.length)} SOUTHWEST AIR transactions ` +
      `totaling approximately $${southwestDollars}.`,
    containsText: ["SOUTHWEST", formatNumber(southwestTxns.length)],
  };

  return result;
};

export default suite;

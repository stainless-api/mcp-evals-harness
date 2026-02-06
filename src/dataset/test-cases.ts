/**
 * Test case definitions for Stripe MCP server evaluation.
 *
 * Each test case has:
 * - prompt: Natural language prompt sent to the agent
 * - expected: Expected results for scoring
 * - tags: Categorization
 * - requiredCapabilities: Filter out servers that can't handle this case
 */

export interface ExpectedResult {
  description: string;
  containsText?: string[];
  fieldValues?: Record<string, unknown>;
}

export interface TestCase {
  id: string;
  prompt: string;
  expected: ExpectedResult;
  tags: string[];
  requiredCapabilities?: { write?: boolean };
}

export const TEST_CASES: TestCase[] = [
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
    prompt: "Who works at Sable Tech and what's their email? Just return the customer's name and email address.",
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
  }
];

/**
 * Filter test cases by server capabilities.
 */
export function getTestCasesForServer(
  capabilities: { write: boolean },
): TestCase[] {
  return TEST_CASES.filter((tc) => {
    if (tc.requiredCapabilities?.write && !capabilities.write) return false;
    return true;
  });
}

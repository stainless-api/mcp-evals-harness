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
  objectType?: string;
  minItems?: number;
  jsonFields?: string[];
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
    prompt: "How many customers are in my Stripe Account?",
    expected: {
      description: "Returns a count of customers in the Stripe Account",
      objectType: "list",
      minItems: 1,
      containsText: ["500"],
    },
    tags: ["read"],
  },
  {
    id: "list-customers-limit-3",
    prompt: "List exactly 3 customers from this Stripe account.",
    expected: {
      description: "Returns exactly 3 customers",
      objectType: "list",
      minItems: 3,
      jsonFields: ["id", "email"],
    },
    tags: ["read", "filter"],
  },
  {
    id: "get-balance",
    prompt: "What is the current balance on this Stripe account?",
    expected: {
      description: "Returns balance object with available and pending arrays",
      jsonFields: ["available", "pending"],
      containsText: ["available"],
    },
    tags: ["read"],
  },
  {
    id: "find-expensive-product",
    prompt: "What's the most expensive product in my Stripe account?",
    expected: {
      description: "Returns the Team Training Weekend product",
      objectType: "list",
      containsText: ["Team Training Weekend"],
    },
    tags: ["read"],
  },
  {
    id: "find-customer-by-employer",
    prompt: "Who works at Sable Tech and what's their email?",
    expected: {
      description: "Returns the right customer and email",
      objectType: "list",
      containsText: ["Fang Nguyen", "fang.nguyen@sable.cloud"],
    },
    tags: ["read"],
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

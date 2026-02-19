import { config } from "dotenv";
import type { SuiteConfig } from "../../suite.js";
config();

const suite: SuiteConfig = {
  projectName: "stainless-increase-search-docs-evals",

  systemPrompt:
    "You are a helpful assistant with access to Increase banking API documentation tools. " +
    "Use the search_docs tool to find information about the Increase API. " +
    "Answer questions accurately based on the official API documentation.",

  servers: [
    {
      id: "increase-stainless",
      displayName: "Increase, Stainless-generated",
      command: "node",
      args: [
        "/Path/to/increase-mcp-demo-typescript/packages/mcp-server/dist/index.js",
      ],
      env: {
        INCREASE_MCP_DEMO_API_KEY: process.env.INCREASE_API_KEY!,
      },
      capabilities: { write: false },
      mode: "code",
      tags: ["Stainless"],
    },
  ],

  testCases: [
    // ============================================
    // RESOURCE DISCOVERY
    // ============================================
    {
      id: "list-account-fields",
      prompt:
        "What fields are returned when retrieving an Account from the Increase API? List the key fields and their types.",
      expected: {
        description:
          "Returns Account fields including id, balance, status, name, entity_id, currency, and type from the API docs.",
        containsText: ["balance", "status", "currency"],
      },
      tags: ["search", "accounts", "schema"],
    },
    {
      id: "find-transaction-resource",
      prompt:
        "How do I list transactions for a specific account using the Increase API? What parameters does the endpoint accept?",
      expected: {
        description:
          "Describes the list transactions endpoint with filtering parameters including account_id, cursor, and limit.",
        containsText: ["account_id", "cursor"],
      },
      tags: ["search", "transactions", "endpoints"],
    },
    {
      id: "ach-transfer-creation-params",
      prompt:
        "What are the required parameters to create an ACH Transfer in the Increase API?",
      expected: {
        description:
          "Returns required parameters for creating an ACH Transfer including account_id, amount, and statement_descriptor.",
        containsText: ["account_id", "amount", "statement_descriptor"],
      },
      tags: ["search", "ach", "params"],
    },

    // ============================================
    // ENDPOINT LOOKUP
    // ============================================
    {
      id: "wire-transfer-endpoints",
      prompt:
        "What operations are available for Wire Transfers in the Increase API? List the endpoints.",
      expected: {
        description:
          "Returns available Wire Transfer operations: create, retrieve, list, and possibly approve/cancel.",
        containsText: ["create", "list"],
      },
      tags: ["search", "wire", "endpoints"],
    },
    {
      id: "check-deposit-flow",
      prompt:
        "How do I create a Check Deposit using the Increase API? What files or images are required?",
      expected: {
        description:
          "Describes check deposit creation requiring front_image_file_id and back_image_file_id parameters pointing to uploaded File resources.",
        containsText: ["front_image", "back_image"],
      },
      tags: ["search", "checks", "endpoints"],
    },
    {
      id: "real-time-payments-transfer",
      prompt:
        "What parameters does the Increase API require to send a Real-Time Payment? Include both required and optional fields.",
      expected: {
        description:
          "Returns Real-Time Payments Transfer creation parameters including account_id, amount, creditor_name, remittance_information, and destination fields.",
        containsText: ["amount", "creditor_name", "remittance_information"],
      },
      tags: ["search", "rtp", "params"],
    },

    // ============================================
    // FILTERING AND PAGINATION
    // ============================================
    {
      id: "transaction-date-filtering",
      prompt:
        "How do I filter transactions by date range in the Increase API? What date filter parameters are available?",
      expected: {
        description:
          "Describes created_at filtering with after, before, on_or_after, and on_or_before parameters for date-based queries.",
        containsText: ["created_at"],
      },
      tags: ["search", "transactions", "filtering"],
    },
    {
      id: "pagination-mechanism",
      prompt:
        "How does pagination work in the Increase API? What parameters control page size and navigation?",
      expected: {
        description:
          "Describes cursor-based pagination with cursor and limit parameters, and next_cursor in responses.",
        containsText: ["cursor", "limit"],
      },
      tags: ["search", "pagination"],
    },

    // ============================================
    // STATUS AND LIFECYCLE
    // ============================================
    {
      id: "ach-transfer-statuses",
      prompt:
        "What are the possible statuses for an ACH Transfer in Increase? Describe the lifecycle.",
      expected: {
        description:
          "Lists ACH Transfer statuses including pending_approval, pending_reviewing, pending_submission, submitted, and returned among others.",
        containsText: ["pending", "submitted"],
      },
      tags: ["search", "ach", "lifecycle"],
    },
    {
      id: "account-status-values",
      prompt: "What statuses can an Account have in the Increase API?",
      expected: {
        description: "Returns account statuses including open and closed.",
        containsText: ["open", "closed"],
      },
      tags: ["search", "accounts", "lifecycle"],
    },

    // ============================================
    // ENTITY AND IDENTITY
    // ============================================
    {
      id: "entity-types",
      prompt:
        "What types of entities can be created in the Increase API? What's the difference between them?",
      expected: {
        description:
          "Describes entity structures including corporation, natural_person, joint, and trust.",
        containsText: ["corporation", "natural_person"],
      },
      tags: ["search", "entities", "schema"],
    },
    {
      id: "beneficial-owner-requirements",
      prompt:
        "What information is required for beneficial owners when creating a corporate entity in the Increase API?",
      expected: {
        description:
          "Lists beneficial owner requirements including name, date_of_birth, address, and identification (SSN or passport).",
        containsText: ["name", "date_of_birth"],
      },
      tags: ["search", "entities", "params"],
    },

    // ============================================
    // CARD AND DIGITAL WALLET
    // ============================================
    {
      id: "card-creation-params",
      prompt:
        "What parameters are needed to create a Card in the Increase API?",
      expected: {
        description:
          "Returns Card creation parameters including account_id and optional description, billing_address, and digital_wallet fields.",
        containsText: ["account_id"],
      },
      tags: ["search", "cards", "params"],
    },
    {
      id: "card-payment-fields",
      prompt:
        "What information is available on a Card Payment object in Increase? What are the key fields?",
      expected: {
        description:
          "Describes Card Payment fields including id, state, account_id, card_id, and elements containing authorizations, settlements, and declines.",
        containsText: ["card_id", "account_id"],
      },
      tags: ["search", "cards", "schema"],
    },

    // ============================================
    // WEBHOOKS AND EVENTS
    // ============================================
    {
      id: "event-subscription-setup",
      prompt:
        "How do I set up webhooks in the Increase API? What parameters are needed to create an Event Subscription?",
      expected: {
        description:
          "Describes Event Subscription creation with url parameter and optional selected_event_category for filtering specific event types.",
        containsText: ["url"],
      },
      tags: ["search", "events", "params"],
    },
    {
      id: "event-categories",
      prompt:
        "What categories of events can I subscribe to in the Increase API? List some examples.",
      expected: {
        description:
          "Lists event categories such as account.created, transaction.created, ach_transfer.created, and similar resource-based event types.",
        containsText: ["account.", "transaction."],
      },
      tags: ["search", "events", "schema"],
    },

    // ============================================
    // CROSS-RESOURCE QUESTIONS
    // ============================================
    {
      id: "external-account-verification",
      prompt:
        "How do I verify an External Account in the Increase API? What verification methods are available?",
      expected: {
        description:
          "Describes external account verification methods, potentially including micro-deposits or other verification flows.",
        containsText: ["verif"],
      },
      tags: ["search", "external-accounts", "endpoints"],
    },
    {
      id: "file-upload-usage",
      prompt:
        "What is the File resource used for in the Increase API? How do I upload a file and what purposes are supported?",
      expected: {
        description:
          "Describes File resource used for check images, identity documents, and other uploads with purpose field and create endpoint.",
        containsText: ["purpose"],
      },
      tags: ["search", "files", "schema"],
    },
    {
      id: "inbound-vs-outbound-ach",
      prompt:
        "What is the difference between an Inbound ACH Transfer and an ACH Transfer in the Increase API? How are they represented differently?",
      expected: {
        description:
          "Explains that ACH Transfer is an outbound transfer you initiate, while Inbound ACH Transfer represents incoming transfers received from external parties, with different fields and endpoints.",
        containsText: ["inbound", "ACH Transfer"],
      },
      tags: ["search", "ach", "concepts"],
    },
    {
      id: "declined-transaction-reasons",
      prompt:
        "What causes a Declined Transaction in the Increase API? What source types can lead to declines?",
      expected: {
        description:
          "Describes Declined Transaction sources including ACH declines, card declines, check declines, and other decline reasons.",
        containsText: ["decline"],
      },
      tags: ["search", "transactions", "concepts"],
    },
  ],
};

export default suite;

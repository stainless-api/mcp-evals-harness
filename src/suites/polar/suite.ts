import { config } from "dotenv";
import type { SuiteConfig } from "../../suite.js";
config();

const suite: SuiteConfig = {
  projectName: "stainless-polar-evals",

  systemPrompt:
    "You are a helpful assistant with access to Polar API tools. " +
    "Polar is a platform for selling digital products, subscriptions, and managing customers. " +
    "Use the available MCP tools to answer questions about products, customers, discounts, and benefits. " +
    "Always provide complete, accurate answers based on the actual API data.",

  servers: [
    {
      id: "polar-stainless",
      displayName: "Polar, Stainless-generated",
      command: "node",
      args: [
        "/Users/pierceclark/polar-demo-typescript/packages/mcp-server/dist/index.js",
      ],
      env: {
        POLAR_DEMO_API_KEY: process.env.POLAR_DEMO_API_KEY!,
        STAINLESS_API_KEY: process.env.STAINLESS_API_KEY_REFERENCES!,
      },
      capabilities: { write: true },
      mode: "code",
    },
    {
      id: "polar-bespoke",
      displayName: "Polar, Bespoke MCP",
      command: "npx",
      args: [
        "mcp-remote",
        "https://mcp.polar.sh/mcp/polar-mcp",
        "--header",
        `Authorization:Bearer ${process.env.POLAR_DEMO_API_KEY ?? ""}`,
      ],
      env: {
        POLAR_ACCESS_TOKEN: process.env.POLAR_DEMO_API_KEY!,
      },
      capabilities: { write: true },
      mode: "tools",
    },
  ],

  testCases: [
    // ============================================
    // BASIC QUERIES WITH AMBIGUOUS LANGUAGE
    // ============================================
    {
      id: "get-cheap-products",
      prompt: "what are my cheapest products?",
      expected: {
        description:
          "Returns the cheapest products including Starter Plan ($9.99), E-book Collection ($24.99), and Pro Plan ($29.99).",
        containsText: ["starter", "9.99"],
      },
      tags: ["read", "products"],
    },
    {
      id: "get-expensive-subscriptions",
      prompt: "show me the premium subscription options",
      expected: {
        description:
          "Returns premium subscriptions: Enterprise ($999/year) and Pro Plan ($29.99/month).",
        containsText: ["enterprise", "pro"],
      },
      tags: ["read", "products"],
    },
    {
      id: "find-european-customers",
      prompt: "which of my customers are in europe?",
      expected: {
        description:
          "Returns European customers: Hans Mueller (Germany), Marie Dubois (France), Sarah Chen (UK).",
        containsText: ["hans", "marie", "sarah"],
      },
      tags: ["read", "customers"],
    },

    // ============================================
    // QUERIES REQUIRING DATA CORRELATION
    // ============================================
    {
      id: "products-with-support",
      prompt: "which products include support?",
      expected: {
        description:
          'Returns products with "Priority email support" benefit: Enterprise Plan and Lifetime Pro Access.',
        containsText: ["enterprise", "support"],
      },
      tags: ["read", "products", "benefits"],
    },
    {
      id: "best-value-product",
      prompt:
        "what product gives customers the most benefits for their money?",
      expected: {
        description:
          "Returns Lifetime Pro Access ($299, 4 benefits) or Enterprise ($999/year, 4 benefits) as the best value products.",
        containsText: ["lifetime"],
      },
      tags: ["read", "products", "benefits"],
    },
    {
      id: "customer-acquisition-channels",
      prompt:
        "where are my customers coming from? what acquisition channels work best?",
      expected: {
        description:
          "Returns acquisition channels from customer metadata: website, referral, conference, blog, twitter, partner, google, youtube.",
        containsText: ["website", "referral", "conference"],
      },
      tags: ["read", "customers", "analysis"],
    },

    // ============================================
    // AGGREGATION AND CALCULATION QUERIES
    // ============================================
    {
      id: "total-revenue-potential",
      prompt: "if all my customers bought the pro plan, what would my MRR be?",
      expected: {
        description:
          "Returns $239.92 MRR (8 customers * $29.99 Pro Plan price).",
        containsText: ["29.99"],
      },
      tags: ["read", "products", "customers", "aggregation"],
    },
    {
      id: "discount-impact",
      prompt:
        "how much revenue would I lose if everyone used my best discount code?",
      expected: {
        description:
          "Returns FLASH50 as the best discount (50% off) and calculates the revenue impact.",
        containsText: ["flash50", "50%"],
      },
      tags: ["read", "discounts", "analysis"],
    },
    {
      id: "geographic-breakdown",
      prompt: "give me a breakdown of my customer base by region",
      expected: {
        description:
          "Returns customer distribution by region: North America (US, Canada), Europe (UK, Germany, France), Asia-Pacific (Australia, Japan), South America (Brazil).",
        containsText: ["germany", "france", "australia", "japan"],
      },
      tags: ["read", "customers", "analysis"],
    },

    // ============================================
    // COMPLEX FILTERING WITH NATURAL LANGUAGE
    // ============================================
    {
      id: "find-active-discounts",
      prompt: "what discount codes can customers actually use right now?",
      expected: {
        description:
          "Returns all 5 active discount codes: WELCOME20, LOYAL10, FLASH50, STUDENT15, BUNDLE25.",
        containsText: ["welcome20", "flash50", "student15", "bundle25"],
      },
      tags: ["read", "discounts"],
    },
    {
      id: "find-limited-offers",
      prompt:
        "do I have any promotions that are running out soon or have limited availability?",
      expected: {
        description:
          "Returns FLASH50 which has a max_redemptions limit of 100.",
        containsText: ["flash50"],
      },
      tags: ["read", "discounts"],
    },
    {
      id: "one-time-vs-recurring",
      prompt: "compare my one-time purchase options versus subscriptions",
      expected: {
        description:
          "Compares one-time products (Workshop Bundle, E-book Collection, Lifetime Pro Access) against subscriptions (Starter Plan, Pro Plan, Enterprise Plan).",
        containsText: ["workshop", "lifetime", "starter"],
      },
      tags: ["read", "products", "analysis"],
    },

    // ============================================
    // BUSINESS INTELLIGENCE QUERIES
    // ============================================
    {
      id: "pricing-strategy-analysis",
      prompt:
        "analyze my pricing structure and suggest if there are any gaps in my product tiers",
      expected: {
        description:
          "Identifies all three subscription tiers (Starter $9.99, Pro $29.99, Enterprise $999) and notes the pricing gap between Pro and Enterprise.",
        containsText: ["starter", "pro", "enterprise"],
      },
      tags: ["read", "products", "analysis"],
    },
    {
      id: "benefit-coverage",
      prompt:
        "are there any benefits that no product currently offers? which benefits are most common?",
      expected: {
        description:
          "Returns that all 4 benefits are used, with Community/Discord access being the most common (attached to 5 products).",
        containsText: ["community"],
      },
      tags: ["read", "benefits", "analysis"],
    },
    {
      id: "enterprise-readiness",
      prompt:
        "what do I offer for enterprise customers and how does it compare to my other tiers?",
      expected: {
        description:
          "Returns Enterprise Plan details ($999/year, all 4 benefits including support, early access, community, tutorials) compared to Starter and Pro tiers.",
        containsText: ["enterprise", "999"],
      },
      tags: ["read", "products", "benefits"],
    },

    // ============================================
    // AMBIGUOUS ACTION-ORIENTED QUERIES
    // ============================================
    {
      id: "create-holiday-sale",
      prompt:
        "set up a holiday promotion - 30% off everything for the next month",
      expected: {
        description:
          "Creates a discount with 30% off (3000 basis points) for a holiday promotion.",
        containsText: ["30%"],
      },
      tags: ["write", "discounts"],
      requiredCapabilities: { write: true },
    },
    {
      id: "add-trial-period",
      prompt: "I want to let people try before they buy. can you help?",
      expected: {
        description:
          "Suggests or creates a trial period, free tier, or sample product to allow customers to try before buying.",
        containsText: ["trial"],
      },
      tags: ["write", "products"],
      requiredCapabilities: { write: true },
    },
    {
      id: "bulk-customer-import",
      prompt:
        "I have a list of emails: test1@gmail.com, test2@outlook.com, test3@yahoo.com - add them as customers",
      expected: {
        description: "Creates 3 new customers from the provided email list.",
        containsText: ["created"],
      },
      tags: ["write", "customers"],
      requiredCapabilities: { write: true },
    },

    // ============================================
    // EDGE CASE AND ERROR HANDLING
    // ============================================
    {
      id: "find-nonexistent",
      prompt: "show me all customers who have an active subscription",
      expected: {
        description:
          "Returns that no customers have active subscriptions (no orders/subscriptions exist in the account).",
        containsText: ["subscription"],
      },
      tags: ["read", "customers"],
    },
    {
      id: "ambiguous-product-reference",
      prompt: "update the pro product to cost more",
      expected: {
        description:
          "Identifies the Pro Plan and either updates its price or asks for clarification on the new price.",
        containsText: ["pro"],
      },
      tags: ["write", "products"],
      requiredCapabilities: { write: true },
    },
    {
      id: "vague-discount-request",
      prompt: "make a discount for students",
      expected: {
        description:
          "Mentions the existing STUDENT15 discount or creates a new student discount.",
        containsText: ["student"],
      },
      tags: ["write", "discounts"],
      requiredCapabilities: { write: true },
    },

    // ============================================
    // MULTI-STEP REASONING QUERIES
    // ============================================
    {
      id: "churn-risk-analysis",
      prompt:
        "looking at my customer data and product structure, which customers might be at risk of churning and why?",
      expected: {
        description:
          "Analyzes customer metadata and product tiers to identify churn risk, mentioning specific customers and reasoning.",
        containsText: ["churn", "customer"],
      },
      tags: ["read", "customers", "analysis"],
    },
    {
      id: "upsell-opportunities",
      prompt:
        "which customers on starter plans might be good candidates to upgrade? what should I offer them?",
      expected: {
        description:
          'Returns starter plan customers (Sarah Chen, James Smith, Lucas Silva from metadata) as upgrade candidates with suggestions for Pro plan upgrade offers.',
        containsText: ["upgrade", "starter"],
      },
      tags: ["read", "customers", "products", "analysis"],
    },
    {
      id: "competitive-positioning",
      prompt:
        "based on my current product and pricing, what market segment am I targeting and are there any obvious gaps?",
      expected: {
        description:
          "Analyzes market segments (individual/SMB, professional, enterprise) and identifies gaps in the product/pricing structure.",
        containsText: ["segment"],
      },
      tags: ["read", "products", "analysis"],
    },

    // ============================================
    // DATA EXPORT AND REPORTING
    // ============================================
    {
      id: "customer-report",
      prompt:
        "generate a report of all my customers with their contact info and location",
      expected: {
        description:
          "Lists all 8 customers with emails and locations: Alex (San Francisco), Sarah (London), Hans (Berlin), Emma (Toronto), James (Sydney), Yuki (Tokyo), Marie (Paris), Lucas (Sao Paulo).",
        containsText: ["alex", "sarah", "hans", "emma", "james", "yuki"],
      },
      tags: ["read", "customers"],
    },
    {
      id: "product-catalog-summary",
      prompt:
        "give me a complete overview of everything I sell, including what benefits come with each",
      expected: {
        description:
          "Lists all 6 products (Starter, Pro Plan, Enterprise, Workshop Bundle, E-book Collection, Lifetime Pro Access) with their associated benefits.",
        containsText: ["starter", "pro", "enterprise", "workshop"],
      },
      tags: ["read", "products", "benefits"],
    },
    {
      id: "discount-usage-report",
      prompt: "how are my discount codes performing? which ones are being used?",
      expected: {
        description:
          "Lists discount codes (WELCOME20, LOYAL10, FLASH50, STUDENT15, BUNDLE25) and notes that all have 0 redemptions.",
        containsText: ["welcome20", "flash50"],
      },
      tags: ["read", "discounts"],
    },

    // ============================================
    // QUERIES WITH IMPLICIT REQUIREMENTS
    // ============================================
    {
      id: "gdpr-customer-lookup",
      prompt:
        "a customer from Germany wants to know what data I have on them",
      expected: {
        description:
          "Returns Hans Mueller as the German customer and lists the data stored about them (email, address, billing info).",
        containsText: ["hans", "mueller"],
      },
      tags: ["read", "customers"],
    },
    {
      id: "pricing-localization",
      prompt:
        "should I adjust pricing for different regions based on my customer distribution?",
      expected: {
        description:
          "Analyzes geographic customer distribution and makes pricing recommendations for different regions.",
        containsText: ["region", "pric"],
      },
      tags: ["read", "customers", "products", "analysis"],
    },
    {
      id: "revenue-forecast",
      prompt:
        "what could my revenue look like if I converted 10% more visitors?",
      expected: {
        description:
          "Notes insufficient conversion data to forecast accurately, or makes assumptions and estimates revenue impact.",
        containsText: ["revenue"],
      },
      tags: ["read", "analysis"],
    },

    // ============================================
    // COMPLEX MULTI-ENTITY QUERIES
    // ============================================
    {
      id: "full-account-audit",
      prompt:
        "give me a complete audit of my polar account - products, customers, discounts, benefits - everything",
      expected: {
        description:
          "Returns a complete account audit with counts: 6 products, 8 customers, 5 discounts, 4 benefits.",
        containsText: ["product", "customer", "discount", "benefit"],
      },
      tags: ["read", "products", "customers", "discounts", "benefits"],
    },
    {
      id: "subscriber-value-analysis",
      prompt:
        "if my starter customers upgraded to pro, and my pro customers upgraded to enterprise, what would my new revenue potential be?",
      expected: {
        description:
          "Calculates revenue from upgrading starter customers (Sarah, James, Lucas) to Pro at $29.99 and pro customers (Alex, Emma, Marie) to Enterprise at $999/year.",
        containsText: ["starter", "pro", "enterprise"],
      },
      tags: ["read", "customers", "products", "aggregation"],
    },
    {
      id: "discount-product-matrix",
      prompt:
        "which discounts can be applied to which products? are there any restrictions?",
      expected: {
        description:
          "Returns that all discounts have no product restrictions (products: []) and can be applied to any product.",
        containsText: ["discount", "product"],
      },
      tags: ["read", "discounts", "products"],
    },
  ],
};

export default suite;

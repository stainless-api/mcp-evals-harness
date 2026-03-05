import { config } from "dotenv";
config({ path: "./.env" });

import { loadSuite } from "../suite.js";
import { runEvals } from "../eval.js";
import { cleanupRegistry } from "../agent/index.js";

const SIGNAL_CODES: Record<string, number> = { SIGINT: 2, SIGTERM: 15 };
let signalReceived = false;

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, async () => {
    if (signalReceived) {
      process.exit(128 + SIGNAL_CODES[signal]);
    }
    signalReceived = true;
    console.error(`\nReceived ${signal}, cleaning up MCP servers...`);
    await cleanupRegistry.cleanupAll(5_000);
    process.exit(128 + SIGNAL_CODES[signal]);
  });
}

(async () => {
  const { config: suite, resolveExpected } = await loadSuite();
  const tags = (process.env.EVAL_TAGS ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  runEvals(suite, { tags, resolveExpected });
})();

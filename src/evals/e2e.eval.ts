import { config } from "dotenv";
config({ path: "./.env" });

import { loadSuite } from "../suite.js";
import { runEvals } from "../eval.js";

(async () => {
  const suite = await loadSuite();
  const tags = (process.env.EVAL_TAGS ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  runEvals(suite, { tags });
})();

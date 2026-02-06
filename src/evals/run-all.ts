/**
 * Orchestrator: runs all 8 experiments (4 servers x 2 approaches).
 *
 * Usage: npx braintrust eval src/evals/run-all.ts
 */

// Import both eval files — each registers Eval() calls on import
import "./e2e.eval.js";
import "./direct.eval.js";

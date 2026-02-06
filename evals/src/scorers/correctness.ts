import { Factuality } from "autoevals";

/**
 * LLM-as-judge scorer using Factuality from autoevals.
 * Compares agent's final text answer against expected description.
 * Used in E2E experiments only.
 */
export const CorrectnessScorer = Factuality;

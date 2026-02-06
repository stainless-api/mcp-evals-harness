/**
 * Heuristic scorer: normalizes total token usage to a 0-1 score.
 * <1000 tokens = 1.0, >20000 tokens = 0.0, linear interpolation.
 * Used in E2E experiments only.
 */
export function scoreTokenEfficiency(totalTokens: number): number {
  const MIN_TOKENS = 1000;
  const MAX_TOKENS = 20000;

  if (totalTokens <= MIN_TOKENS) return 1.0;
  if (totalTokens >= MAX_TOKENS) return 0.0;
  return 1.0 - (totalTokens - MIN_TOKENS) / (MAX_TOKENS - MIN_TOKENS);
}

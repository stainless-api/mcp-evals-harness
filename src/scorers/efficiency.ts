/**
 * Efficiency scorer — normalizes turn count to a 0–1 score.
 *
 * Score = 1 - (turns / maxTurns). Higher is better.
 * A 2-turn completion scores 0.96 (at maxTurns=50), while hitting
 * the turn limit scores 0.
 *
 * Metadata includes raw turnCount and totalTokens for comparison.
 */
export function scoreEfficiency(args: {
  turnCount: number;
  totalTokens: number;
  maxTurns?: number;
}): { name: string; score: number; metadata: Record<string, unknown> } {
  const maxTurns = args.maxTurns ?? 50;
  const score = Math.max(0, 1 - args.turnCount / maxTurns);

  return {
    name: "Efficiency",
    score,
    metadata: {
      turnCount: args.turnCount,
      totalTokens: args.totalTokens,
      maxTurns,
    },
  };
}

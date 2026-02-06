/**
 * Heuristic scorer: normalizes wall clock time to a 0-1 score.
 * <2s = 1.0, >30s = 0.0, linear interpolation in between.
 */
export function scoreLatency(wallClockMs: number): number {
  const MIN_MS = 2000;
  const MAX_MS = 30000;

  if (wallClockMs <= MIN_MS) return 1.0;
  if (wallClockMs >= MAX_MS) return 0.0;
  return 1.0 - (wallClockMs - MIN_MS) / (MAX_MS - MIN_MS);
}

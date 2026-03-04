type CleanupFn = () => Promise<void>;

export class CleanupRegistry {
  private resources = new Map<symbol, CleanupFn>();
  private shuttingDown = false;

  /** Register a cleanup function. Returns a handle for deregistration. */
  register(cleanup: CleanupFn): symbol {
    const handle = Symbol();
    if (!this.shuttingDown) {
      this.resources.set(handle, cleanup);
    }
    return handle;
  }

  /** Remove a resource after normal cleanup. No-op if already removed. */
  deregister(handle: symbol): void {
    this.resources.delete(handle);
  }

  /** True if a shutdown signal has been received. */
  get isShuttingDown(): boolean {
    return this.shuttingDown;
  }

  /**
   * Run all registered cleanup functions in parallel with a timeout.
   * Safe to call multiple times (clears the map atomically).
   */
  async cleanupAll(timeoutMs = 5_000): Promise<void> {
    this.shuttingDown = true;
    const entries = [...this.resources.values()];
    this.resources.clear();

    if (entries.length === 0) return;

    const promises = entries.map(async (cleanup) => {
      try {
        await cleanup();
      } catch {
        // Best-effort
      }
    });

    await Promise.race([
      Promise.allSettled(promises),
      new Promise<void>((resolve) => setTimeout(resolve, timeoutMs).unref()),
    ]);
  }
}

export const cleanupRegistry = new CleanupRegistry();

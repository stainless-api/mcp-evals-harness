import { describe, it, expect, vi } from "vitest";
import { CleanupRegistry } from "./cleanup-registry.js";

describe("CleanupRegistry", () => {
  it("register returns a symbol", () => {
    const registry = new CleanupRegistry();
    const handle = registry.register(async () => {});
    expect(typeof handle).toBe("symbol");
  });

  it("cleanupAll calls all registered functions", async () => {
    const registry = new CleanupRegistry();
    const fn1 = vi.fn(async () => {});
    const fn2 = vi.fn(async () => {});
    registry.register(fn1);
    registry.register(fn2);

    await registry.cleanupAll();

    expect(fn1).toHaveBeenCalledOnce();
    expect(fn2).toHaveBeenCalledOnce();
  });

  it("cleanupAll is idempotent — second call is a no-op", async () => {
    const registry = new CleanupRegistry();
    const fn = vi.fn(async () => {});
    registry.register(fn);

    await registry.cleanupAll();
    await registry.cleanupAll();

    expect(fn).toHaveBeenCalledOnce();
  });

  it("deregister prevents cleanup fn from running", async () => {
    const registry = new CleanupRegistry();
    const fn = vi.fn(async () => {});
    const handle = registry.register(fn);
    registry.deregister(handle);

    await registry.cleanupAll();

    expect(fn).not.toHaveBeenCalled();
  });

  it("isShuttingDown starts false and becomes true after cleanupAll", async () => {
    const registry = new CleanupRegistry();
    expect(registry.isShuttingDown).toBe(false);

    await registry.cleanupAll();

    expect(registry.isShuttingDown).toBe(true);
  });

  it("register during shutdown is a no-op", async () => {
    const registry = new CleanupRegistry();
    await registry.cleanupAll();

    const fn = vi.fn(async () => {});
    registry.register(fn);

    await registry.cleanupAll();

    expect(fn).not.toHaveBeenCalled();
  });

  it("swallows throwing cleanup functions", async () => {
    const registry = new CleanupRegistry();
    const throwing = vi.fn(async () => {
      throw new Error("boom");
    });
    const normal = vi.fn(async () => {});
    registry.register(throwing);
    registry.register(normal);

    await expect(registry.cleanupAll()).resolves.toBeUndefined();
    expect(throwing).toHaveBeenCalled();
    expect(normal).toHaveBeenCalled();
  });

  it("respects timeout for hanging cleanup functions", async () => {
    const registry = new CleanupRegistry();
    registry.register(
      () => new Promise<void>(() => {}), // never resolves
    );

    const start = Date.now();
    await registry.cleanupAll(50);
    const elapsed = Date.now() - start;

    expect(elapsed).toBeLessThan(500);
  });
});

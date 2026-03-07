import { describe, it, expect, beforeEach, afterEach, mock } from "bun:test";
import { recipesCtrl } from "./recipes.ctrl";
import { recipesStore } from "./recipes.stores";
import { LOAD_ERROR_KEY } from "./recipes.const";

describe("recipes.ctrl", () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    recipesStore.setLoadError(null);
    recipesStore.setRecipes([]);
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("sets loadError and does not set recipes when fetch fails", async () => {
    globalThis.fetch = mock(() => Promise.reject(new Error("network")));
    await recipesCtrl.init();
    expect(recipesStore.loadError).toBe(LOAD_ERROR_KEY);
    expect(recipesStore.recipes).toEqual([]);
  });

  it("sets loadError when response is not ok", async () => {
    globalThis.fetch = mock(() =>
      Promise.resolve({ ok: false, json: () => Promise.resolve([]) } as Response)
    );
    await recipesCtrl.init();
    expect(recipesStore.loadError).toBe(LOAD_ERROR_KEY);
  });

  it("clears loadError and sets recipes when fetch succeeds", async () => {
    const data = [{ slug: "r1", identity: { name: "R1", description: "", servings: 1 }, ingredients: [], steps: [], notes: [], tags: [] }];
    globalThis.fetch = mock((url: string) => {
      expect(url).toContain("/recipes");
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(data),
      } as Response);
    });
    await recipesCtrl.init();
    expect(recipesStore.loadError).toBe(null);
    expect(recipesStore.recipes).toEqual(data);
  });

  it("clears loadError and sets empty recipes when response body is not an array", async () => {
    globalThis.fetch = mock(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ not: "array" }),
      } as Response)
    );
    await recipesCtrl.init();
    expect(recipesStore.loadError).toBe(null);
    expect(recipesStore.recipes).toEqual([]);
  });
});

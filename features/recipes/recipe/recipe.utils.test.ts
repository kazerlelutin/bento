import { describe, it, expect } from "bun:test";
import { pickRandom } from "./recipe.utils";

describe("recipe.utils", () => {
  describe("pickRandom", () => {
    it("returns undefined for empty array", () => {
      expect(pickRandom([])).toBeUndefined();
    });

    it("returns the only element for single-element array", () => {
      expect(pickRandom([42])).toBe(42);
      expect(pickRandom(["a"])).toBe("a");
    });

    it("returns one of the elements for multiple elements", () => {
      const arr = [1, 2, 3];
      const results = new Set<number>();
      for (let i = 0; i < 50; i++) {
        const v = pickRandom(arr);
        expect(arr).toContain(v);
        results.add(v!);
      }
      expect(results.size).toBeGreaterThan(1);
    });

    it("works with generic types", () => {
      const items = [{ id: "a" }, { id: "b" }];
      const result = pickRandom(items);
      expect(result).toBeDefined();
      expect(items).toContain(result);
    });
  });
});

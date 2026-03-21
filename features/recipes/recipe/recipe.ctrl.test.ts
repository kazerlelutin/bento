import { describe, it, expect, beforeEach, mock } from "bun:test";
import { recipesStore } from "@features/recipes/recipes.stores";
import { currentRecipeStore } from "@features/recipes/recipe/recipe.store";

mock.module("@features/recipes/recipes.ctrl", () => ({
  recipesCtrl: { init: async () => {} },
}));

const { recipeCtrl } = await import("./recipe.ctrl");

const makeRecipe = (slug: string, name: string, ingredientIds: string[] = ["1"]) => ({
  slug,
  identity: { name, description: `${name} desc`, servings: 2 },
  ingredients: ingredientIds.map((id) => ({ id, name: `Ing ${id}`, quantity: 1, unit: "unit" })),
  steps: ["Step 1"],
  notes: [],
  tags: [],
});

describe("recipe.ctrl", () => {
  beforeEach(() => {
    recipesStore.setRecipes([]);
    currentRecipeStore.recipe = null;
  });

  describe("getRecipeBySlug", () => {
    it("returns the recipe when slug exists", () => {
      const r1 = makeRecipe("a", "Recipe A");
      recipesStore.setRecipes([r1]);
      expect(recipeCtrl.getRecipeBySlug("a")).toEqual(r1);
    });

    it("returns null when slug does not exist", () => {
      recipesStore.setRecipes([makeRecipe("a", "A")]);
      expect(recipeCtrl.getRecipeBySlug("b")).toBeNull();
    });

    it("returns null when recipes store is empty", () => {
      expect(recipeCtrl.getRecipeBySlug("any")).toBeNull();
    });
  });

  describe("pickRandomRecipe", () => {
    it("returns null when no recipes", () => {
      expect(recipeCtrl.pickRandomRecipe()).toBeNull();
    });

    it("returns the only recipe when store has one", () => {
      const r1 = makeRecipe("one", "One");
      recipesStore.setRecipes([r1]);
      expect(recipeCtrl.pickRandomRecipe()?.slug).toBe("one");
    });

    it("excludes current slug when multiple recipes exist", () => {
      const r1 = makeRecipe("a", "A");
      const r2 = makeRecipe("b", "B");
      recipesStore.setRecipes([r1, r2]);
      currentRecipeStore.recipe = r1;
      for (let i = 0; i < 20; i++) {
        const next = recipeCtrl.pickRandomRecipe();
        expect(next).not.toBeNull();
        expect(next!.slug).toBe("b");
      }
    });

    it("draws uniformly among remaining recipes (statistical)", () => {
      const recipes = [
        makeRecipe("a", "A"),
        makeRecipe("b", "B"),
        makeRecipe("c", "C"),
      ];
      recipesStore.setRecipes(recipes);
      currentRecipeStore.recipe = recipes[0]!;
      const counts: Record<string, number> = { b: 0, c: 0 };
      const trials = 600;
      for (let i = 0; i < trials; i++) {
        const next = recipeCtrl.pickRandomRecipe();
        if (next && next.slug !== "a") {
          counts[next.slug] = (counts[next.slug] ?? 0) + 1;
        }
      }
      expect(counts["b"]).toBeGreaterThan(trials * 0.25);
      expect(counts["c"]).toBeGreaterThan(trials * 0.25);
    });
  });
});

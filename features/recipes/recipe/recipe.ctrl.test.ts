import { describe, it, expect, beforeEach, afterEach, mock } from "bun:test";
import { recipesStore } from "@features/recipes/recipes.stores";
import { currentRecipeStore } from "@features/recipes/recipe/recipe.store";
import { LS_KEY, LS_KEY_BOOKMARKS } from "@features/recipes/recipe/recipe.const";

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
    recipeCtrl.resetPreferences();
    recipesStore.setRecipes([]);
    currentRecipeStore.recipe = null;
    localStorage.removeItem(LS_KEY);
    localStorage.removeItem(LS_KEY_BOOKMARKS);
  });

  afterEach(() => {
    recipeCtrl.resetPreferences();
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

  describe("getBookmarks / toggleBookmark / isBookmarked", () => {
    it("getBookmarks returns empty array initially", () => {
      expect(recipeCtrl.getBookmarks()).toEqual([]);
    });

    it("toggleBookmark adds slug and persists to localStorage", () => {
      expect(recipeCtrl.toggleBookmark("r1")).toBe(true);
      expect(recipeCtrl.getBookmarks()).toContain("r1");
      expect(JSON.parse(localStorage.getItem(LS_KEY_BOOKMARKS) ?? "[]")).toEqual(["r1"]);
    });

    it("toggleBookmark removes slug when already bookmarked", () => {
      recipeCtrl.toggleBookmark("r1");
      expect(recipeCtrl.toggleBookmark("r1")).toBe(false);
      expect(recipeCtrl.getBookmarks()).not.toContain("r1");
    });

    it("isBookmarked returns true when slug is bookmarked", () => {
      recipeCtrl.toggleBookmark("r1");
      expect(recipeCtrl.isBookmarked("r1")).toBe(true);
    });

    it("isBookmarked returns false when slug is not bookmarked", () => {
      expect(recipeCtrl.isBookmarked("r1")).toBe(false);
    });
  });

  describe("loadPreferences", () => {
    it("loads preferences and bookmarks from localStorage", () => {
      localStorage.setItem(LS_KEY, JSON.stringify({ 1: 2, 2: 1 }));
      localStorage.setItem(LS_KEY_BOOKMARKS, JSON.stringify(["s1", "s2"]));
      recipeCtrl.loadPreferences();
      expect(recipeCtrl.getPreferences()).toEqual({ 1: 2, 2: 1 });
      expect(recipeCtrl.getBookmarks()).toEqual(["s1", "s2"]);
    });

    it("handles invalid JSON in preferences", () => {
      localStorage.setItem(LS_KEY, "invalid");
      recipeCtrl.loadPreferences();
      expect(recipeCtrl.getPreferences()).toEqual({});
      expect(recipeCtrl.getBookmarks()).toEqual([]);
    });

    it("handles non-array bookmarks in localStorage", () => {
      localStorage.setItem(LS_KEY_BOOKMARKS, "{}");
      recipeCtrl.loadPreferences();
      expect(recipeCtrl.getBookmarks()).toEqual([]);
    });
  });

  describe("getRandomRecipe", () => {
    it("returns null when no recipes", () => {
      expect(recipeCtrl.getRandomRecipe("load")).toBeNull();
    });

    it("returns a recipe on load when recipes exist", () => {
      const r1 = makeRecipe("one", "One");
      recipesStore.setRecipes([r1]);
      const got = recipeCtrl.getRandomRecipe("load");
      expect(got).not.toBeNull();
      expect(got?.slug).toBe("one");
    });

    it("returns another recipe on like and updates preferences", () => {
      const r1 = makeRecipe("a", "A", ["1"]);
      const r2 = makeRecipe("b", "B", ["2"]);
      recipesStore.setRecipes([r1, r2]);
      currentRecipeStore.recipe = r1;
      const next = recipeCtrl.getRandomRecipe("like");
      expect(next).not.toBeNull();
      expect(recipeCtrl.getPreferences()).toEqual({ 1: 1 });
    });

    it("returns another recipe on reject and decreases preference", () => {
      const r1 = makeRecipe("a", "A", ["1"]);
      const r2 = makeRecipe("b", "B", ["2"]);
      recipesStore.setRecipes([r1, r2]);
      currentRecipeStore.recipe = r1;
      recipeCtrl.getRandomRecipe("reject");
      expect(recipeCtrl.getPreferences()).toEqual({ 1: 0 });
    });
  });

  describe("resetPreferences", () => {
    it("clears preferences and bookmarks and localStorage", () => {
      recipeCtrl.toggleBookmark("x");
      localStorage.setItem(LS_KEY, JSON.stringify({ 1: 1 }));
      recipeCtrl.resetPreferences();
      expect(recipeCtrl.getBookmarks()).toEqual([]);
      expect(recipeCtrl.getPreferences()).toEqual({});
      expect(localStorage.getItem(LS_KEY)).toBeNull();
      expect(localStorage.getItem(LS_KEY_BOOKMARKS)).toBeNull();
    });
  });
});

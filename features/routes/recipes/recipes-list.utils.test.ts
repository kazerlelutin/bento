import { describe, it, expect } from "bun:test";
import { recipeListBentoChips, resolveRecipeListImageSrc } from "./recipes-list.utils";
import type { Recipe } from "@features/recipes/recipe.type";

const baseRecipe = (over: Partial<Recipe> = {}): Recipe => ({
  slug: "x",
  identity: { name: "N", description: "", servings: 1 },
  ingredients: [],
  steps: [],
  notes: [],
  tags: [],
  ...over,
});

describe("recipes-list.utils", () => {
  it("resolveRecipeListImageSrc returns null without image", () => {
    expect(resolveRecipeListImageSrc(baseRecipe())).toBeNull();
  });

  it("resolveRecipeListImageSrc keeps absolute URLs", () => {
    expect(
      resolveRecipeListImageSrc(
        baseRecipe({ image: { url: "https://cdn.example.com/a.webp", width: 100, height: 100 } })
      )
    ).toBe("https://cdn.example.com/a.webp");
  });

  it("resolveRecipeListImageSrc prefixes API base for relative paths", () => {
    const u = resolveRecipeListImageSrc(
      baseRecipe({ image: { url: "/media/foo.webp", width: 1, height: 1 } })
    );
    expect(u).toContain("/media/foo.webp");
    expect(u).toMatch(/^https?:\/\//);
  });

  it("recipeListBentoChips collects transport, eating, reheat when present", () => {
    const r = baseRecipe({
      bento: {
        transport: "Facile",
        eating: "À la main",
        reheat: "Non",
      },
    });
    const chips = recipeListBentoChips(r);
    expect(chips.map((c) => c.field)).toEqual(["transport", "eating", "reheat"]);
    expect(chips[0]?.display).toContain("Facile");
  });
});

import { recipesCtrl } from "@features/recipes/recipes.ctrl";
import { RecipeCtrl } from "@features/recipes/recipe/recipe.type";
import { currentRecipeStore } from "@features/recipes/recipe/recipe.store";
import { Recipe } from "@features/recipes/recipe.type";
import { recipesStore } from "@features/recipes/recipes.stores";

export const recipeCtrl: RecipeCtrl = {
  async init() {
    await recipesCtrl.init?.();
    const recipe = this.pickRandomRecipe();
    if (recipe) currentRecipeStore.recipe = recipe;
  },

  getRecipeBySlug(slug: string): Recipe | null {
    return recipesStore.recipes.find((r) => r.slug === slug) ?? null;
  },

  /** Tirage uniforme parmi les recettes (hors recette courante si possible). */
  pickRandomRecipe(): Recipe | null {
    const recipes = recipesStore.recipes;
    if (!recipes?.length) return null;

    const currentSlug = currentRecipeStore.recipe?.slug;
    let pool =
      recipes.length > 1 && currentSlug
        ? recipes.filter((r) => r.slug !== currentSlug)
        : [...recipes];
    if (pool.length === 0) pool = [...recipes];

    const i = Math.floor(Math.random() * pool.length);
    return pool[i] ?? null;
  },
};

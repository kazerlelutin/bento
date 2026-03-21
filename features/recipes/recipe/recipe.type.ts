import { Ctrl } from "@features/routes/routes.type";
import type { Recipe } from "@features/recipes/recipe.type";

export type RecipeCtrl = Ctrl & {
  pickRandomRecipe: () => Recipe | null;
  getRecipeBySlug: (slug: string) => Recipe | null;
};

export type CurrentRecipeStore = {
  recipe: Recipe | null;
};

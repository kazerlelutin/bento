import { createStore } from "@/utils/proxy-sub";
import { Recipe, RecipesStore } from "@features/recipes/recipe.type";

export const recipesStore = createStore<RecipesStore>({
  recipes: [],
  loadError: null,
  setRecipes(recipes: Recipe[]) {
    recipesStore.recipes = recipes;
  },
  setLoadError(error: string | null) {
    recipesStore.loadError = error;
  },
});
import { Ctrl } from "@features/routes/routes.type";
import { Recipe } from "@features/recipes/recipe.type";

export type RecipePreferenceAction = 'reject' | 'like' | 'load';

export type RecipeCtrl = Ctrl & {
  savePreferences: () => void;
  loadPreferences: () => void;
  resetPreferences: () => void;
  getPreferences: () => Record<string, number>;
  getRandomRecipe: (action: RecipePreferenceAction) => Recipe | null;
  getRecipeBySlug: (slug: string) => Recipe | null;
  getBookmarks: () => string[];
  toggleBookmark: (recipeSlug: string) => boolean;
  isBookmarked: (recipeSlug: string) => boolean;
}

export type CurrentRecipeStore = {
  recipe: Recipe | null;
}
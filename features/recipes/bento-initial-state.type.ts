import type { Recipe } from "./recipe.type";

/** Payload JSON dans `#bento-initial-state` (SSG). */
export type BentoInitialState = {
  recipes: Recipe[];
  loadError: string | null;
  lang: string;
  /** Accueil SSG : même recette que le HTML prérendu (tri par slug). */
  homeRecipeSlug?: string;
};

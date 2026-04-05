import type { Recipe } from "@features/recipes/recipe.type";
import { getBentoFieldValue } from "@features/card/card.bento.utils";
import { formatBentoAlternativesForDisplay } from "@features/recipes/bento-vocab";
import { getApiBaseUrl } from "@features/recipes/recipes.utils";

/** Troisième puce : réchauffage plutôt que couvert (moins redondant avec « À table »). */
export const RECIPE_LIST_BENTO_FIELDS = ["transport", "eating", "reheat"] as const;
export type RecipeListBentoField = (typeof RECIPE_LIST_BENTO_FIELDS)[number];

export function resolveRecipeListImageSrc(recipe: Recipe): string | null {
  const u = recipe.image?.url?.trim();
  if (!u) return null;
  if (/^https?:\/\//i.test(u)) return u;
  const base = getApiBaseUrl().replace(/\/$/, "");
  const path = u.startsWith("/") ? u : `/${u}`;
  return `${base}${path}`;
}

export function recipeListBentoChips(recipe: Recipe): { field: RecipeListBentoField; display: string }[] {
  if (!recipe.bento) return [];
  const out: { field: RecipeListBentoField; display: string }[] = [];
  for (const field of RECIPE_LIST_BENTO_FIELDS) {
    const raw = getBentoFieldValue(recipe.bento, field);
    if (!raw?.trim()) continue;
    out.push({ field, display: formatBentoAlternativesForDisplay(raw) });
  }
  return out;
}

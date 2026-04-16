import { recipesStore } from "@features/recipes/recipes.stores";
import { getRouteContext } from "@features/router/route-context";
import { LOAD_ERROR_KEY } from "./recipes.const";
import { getApiBaseUrl } from "./recipes.utils";
import { fetchRecipesForLang } from "./recipes.fetch";
import type { BentoInitialState } from "./bento-initial-state.type";

const INITIAL_STATE_ID = "bento-initial-state";

export function readInitialStateFromDom(): BentoInitialState | null {
  const el = document.getElementById(INITIAL_STATE_ID);
  const raw = el?.textContent?.trim();
  if (!raw) return null;
  try {
    return JSON.parse(raw) as BentoInitialState;
  } catch {
    return null;
  }
}

export const recipesCtrl = {
  async init() {
    const initial = readInitialStateFromDom();
    if (initial) {
      recipesStore.setLoadError(initial.loadError);
      recipesStore.setRecipes(initial.recipes);
      return;
    }

    const base = getApiBaseUrl();
    if (!base) {
      recipesStore.setLoadError(LOAD_ERROR_KEY);
      return;
    }

    const lang = getRouteContext().lang;
    const result = await fetchRecipesForLang(lang);
    if (!result.ok) {
      recipesStore.setLoadError(result.errorKey);
      return;
    }
    recipesStore.setLoadError(null);
    recipesStore.setRecipes(result.recipes);
  },
};

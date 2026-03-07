import { recipesStore } from "@features/recipes/recipes.stores";
import { LOAD_ERROR_KEY } from "./recipes.const";
import { getApiBaseUrl, getApiLang } from "./recipes.utils";

export const recipesCtrl = {
  async init() {
    const base = getApiBaseUrl();
    if (!base) {
      recipesStore.setLoadError(LOAD_ERROR_KEY);
      return;
    }
    const url = `${base}/recipes?lang=${getApiLang()}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        recipesStore.setLoadError(LOAD_ERROR_KEY);
        return;
      }
      const data = await response.json();
      recipesStore.setLoadError(null);
      recipesStore.setRecipes(Array.isArray(data) ? data : []);
    } catch {
      recipesStore.setLoadError(LOAD_ERROR_KEY);
    }
  },
};

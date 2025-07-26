import { baseStore } from "../base/base.store";
import { getBaseById } from "../base/base.utils";
import { composerStore } from "../composer/composer.store";
import { getRandomVariant } from "../composer/composer.utils";
import { variants } from "../recipe/variant.const";
import { RECIPE_URL_KEY } from "./recipe-url.const";
import type { RecipeUrlCtrl } from "./recipe-url.types";

export const recipeUrlCtrl: RecipeUrlCtrl = {
  init() {

    // Before any other init for no trigger updateUrl
    this.injectUrl();

    this.unsubscribeBase = baseStore.subscribe(() => {
      this.updateUrl();
    });

    this.unsubscribeComposer = composerStore.subscribe(() => {
      this.updateUrl();
    });


  },
  injectUrl() {
    const url = new URL(window.location.href);

    const base64 = url.searchParams.get(RECIPE_URL_KEY);
    if (!base64) {
      return this.updateUrl();
    };
    const recipe = JSON.parse(atob(base64));

    if (!recipe) return;

    const { baseId, variantId, selectedIngredients } = recipe;

    const base = getBaseById(baseId);
    baseStore.setCurrentBase(base);

    const variant = variants.get(baseId)?.get(variantId) ?? getRandomVariant(baseId);
    composerStore.setCurrentVariant(variant)

    selectedIngredients.forEach(([ingredient, value]: [string, string]) => {
      composerStore.setSelectedIngredients(ingredient, value);
    });


  },
  updateUrl() {
    const url = new URL(window.location.href);
    const baseId = baseStore.currentBase?.id;
    const variantId = composerStore.currentVariant?.id;
    const selectedIngredients = Array.from(composerStore.selectedIngredients.entries()).map(([key, value]) => ([key, value]));

    const recipe = {
      baseId,
      variantId,
      selectedIngredients
    }
    const base64 = btoa(JSON.stringify(recipe));
    url.searchParams.set(RECIPE_URL_KEY, base64);
    window.history.pushState({}, '', url.toString());
  },
  cleanUp() {
    this.unsubscribeBase?.();
    this.unsubscribeComposer?.();
  }
}
import { createStore } from "@/utils/proxy-sub";
import { getRandomVariant } from "./composer.utils";
import { baseStore } from "../base/base.store";
import type { ComposerStore } from "./composer.types";
import type { Base } from "../recipe/recipe.types";
import { variants } from "../recipe/variant.const";
import { t } from "../translate/translate";
import { ingredients } from "../recipe/ingredient.const";

export const composerStore = createStore<ComposerStore>({
  currentVariant: getRandomVariant(baseStore.currentBase.id),
  selectedIngredients: new Map(),
  ingredientsHasChanged: '',
  getRecipeName: () => {
    const name: string[] = []
    const ingredientsForName = composerStore.currentVariant.ingredients.sort((a, b) => (b.score ?? 0) - (a.score ?? 0)).filter((ingredient) => {
      const ingredientChanged = composerStore.selectedIngredients.get(ingredient.id)
      if (ingredientChanged === 'true') {
        return true;
      }
      return ingredient.role !== 'optional';
    }).slice(0, 2);

    ingredientsForName.forEach((ingredient) => {
      if (ingredient.role === 'optional') {
        name.push(ingredients.get(ingredient.id)?.nameComponent ?? '');
      } else {
        const ingredientChanged = composerStore.selectedIngredients.get(ingredient.id)

        if (ingredientChanged !== 'true' && ingredientChanged) {
          name.push(ingredients.get(ingredientChanged)?.nameComponent ?? '');
        } else {
          name.push(ingredients.get(ingredient.id)?.nameComponent ?? '');
        }
      }
    });
    return t(baseStore.currentBase.name) + " " + name.join('').toLocaleLowerCase();
  },
  setCurrentVariant: (variant: Base) => {

    if (composerStore.currentVariant.id === variant.id) return;
    composerStore.currentVariant = variant;
    composerStore.selectedIngredients.clear();

    const baseVariants = variants.get(baseStore.currentBase.id);
    if (!baseVariants) {
      throw new Error(`Base ${baseStore.currentBase.id} not found`);
    }

    // RESET SELECTED INGREDIENTS
    [variant, baseStore.currentBase].forEach((variant) => {
      variant.ingredients.forEach((ingredient) => {
        let selected = ingredient.role === 'core' || ingredient.role === 'base' ? "true" : "false";

        if (ingredient.substitutes?.length) {
          selected = ingredient.id;
        }

        composerStore.selectedIngredients.set(ingredient.id, selected);
      });
    });
  },
  setSelectedIngredients: (ingredientId: string, value: string) => {
    composerStore.selectedIngredients.set(ingredientId, value);
    composerStore.ingredientsHasChanged = new Date().toISOString();
  },
  getSelectedIngredient: (ingredientId: string): string => composerStore.selectedIngredients.get(ingredientId) ?? "false",
}, {
  notifyOnProps: ['selectedIngredients', 'currentVariant', 'ingredientsHasChanged'],
  transformData: (_prop, value) => value
});
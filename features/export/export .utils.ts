import { composerStore } from '../composer/composer.store';
import { ingredients } from '../recipe/ingredient.const';
import { Ingredient } from '../recipe/recipe.types';
import type { BaseIngredient, Ingredient as IngredientType } from '../recipe/recipe.types';
import { t } from '../translate/translate';

export function transformTextWithIngredients(description: string, recipeIngredients: {
  stepId: string
  id: string
}[], availableIngredients: string[] = []) {
  let txt = description
  if (txt.includes('{ingredients}')) {
    const ingredientsToDisplay = recipeIngredients.filter(i => availableIngredients.includes(i.stepId)).map(i => {
      const inInfos = ingredients.get(i.id)
      if (!inInfos) return
      return t(inInfos?.name).toLocaleLowerCase()
    })
    txt = txt.replace('{ingredients}', ingredientsToDisplay.join(', '))
  }

  recipeIngredients.forEach(ingredient => {

    const inInfos = ingredients.get(ingredient.id)
    if (!inInfos) return
    txt = txt.replace(ingredient.stepId, t(inInfos?.name).toLocaleLowerCase())
  })
  return txt
}

export function mergeIngredients(allIngredients: BaseIngredient[]) {
  return allIngredients.map((ingredient) => {
    const ingredientChanged = composerStore.selectedIngredients.get(ingredient.id)


    const infos = ingredients.get(ingredientChanged !== 'true' && ingredientChanged ? ingredientChanged : ingredient.id)
    if (!infos) return null;



    return {
      id: infos.id,
      stepId: ingredient.id,
      name: t(infos.name),
      quantity: ingredient.quantity || 0,
      unit: ingredient.unit || '',
      allergens: infos?.allergens || [],
      nutrition: infos?.nutrition,
      description: t(infos.description)
    }
  }).filter((ingredient) => ingredient !== null);
} 
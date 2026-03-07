import type { Recipe } from "@features/recipes/recipe.type";
import { t } from "@features/translate/translate";
import { UI } from "@features/translate/translate.const";
import {
  CARD_INGREDIENTS_ID,
  CARD_INGREDIENTS_HEADING_ID,
  CARD_SERVING_VALUE_ID,
  CARD_SERVING_DECREASE_ID,
  CARD_SERVING_INCREASE_ID,
} from "@features/card/card.const";

export function formatQuantity(quantity: number): string {
  const rounded = Math.round(quantity * 10) / 10;
  return rounded % 1 === 0 ? String(rounded) : rounded.toFixed(1).replace(".", ",");
}

export function refreshIngredientsAndServing(recipe: Recipe | null, serving: number): void {

  const ingredientsElement = document.getElementById(CARD_INGREDIENTS_ID);
  const headingEl = document.getElementById(CARD_INGREDIENTS_HEADING_ID);
  const valueEl = document.getElementById(CARD_SERVING_VALUE_ID);
  const decreaseBtn = document.getElementById(CARD_SERVING_DECREASE_ID);
  const increaseBtn = document.getElementById(CARD_SERVING_INCREASE_ID);

  if (!recipe || !ingredientsElement) return;

  const base = recipe.identity.servings || 1;
  const scale = serving / base;

  if (headingEl) headingEl.textContent = t(UI["ingredients-for"]).replace("{quantity}", String(serving));
  if (valueEl) {
    valueEl.textContent = String(serving);
    valueEl.setAttribute("aria-label", t(UI.serving_portions).replace("{quantity}", String(serving)));
  }

  if (decreaseBtn) {
    const dec = decreaseBtn as HTMLButtonElement;
    dec.disabled = serving <= 1;
    dec.setAttribute("aria-label", t(UI.serving_decrease));
  }

  if (increaseBtn) (increaseBtn as HTMLButtonElement).setAttribute("aria-label", t(UI.serving_increase));

  ingredientsElement.innerHTML = "";
  (recipe.ingredients ?? []).forEach((ingredient) => {
    const li = document.createElement("li");
    const quantity = ingredient.quantity * scale;
    li.innerHTML = `<strong>${formatQuantity(quantity)} ${ingredient.unit}</strong> ${ingredient.name}`;
    ingredientsElement.appendChild(li);
  });
}

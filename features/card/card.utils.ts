import type { Recipe } from "@features/recipes/recipe.type";
import type { Language } from "@features/translate/translate.types";
import { t } from "@features/translate/translate";
import { UI } from "@features/translate/translate.const";
import { getTranslation } from "@features/translate/translate.utils";
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

export function refreshIngredientsAndServing(
  recipe: Recipe | null,
  serving: number,
  options?: { doc?: Document; lang?: Language }
): void {
  const doc = options?.doc ?? (typeof document !== "undefined" ? document : null);
  if (!doc) return;

  const tr = (key: keyof typeof UI) =>
    options?.lang !== undefined ? getTranslation(UI[key], options.lang) : t(UI[key]);

  const ingredientsElement = doc.getElementById(CARD_INGREDIENTS_ID);
  const headingEl = doc.getElementById(CARD_INGREDIENTS_HEADING_ID);
  const valueEl = doc.getElementById(CARD_SERVING_VALUE_ID);
  const decreaseBtn = doc.getElementById(CARD_SERVING_DECREASE_ID);
  const increaseBtn = doc.getElementById(CARD_SERVING_INCREASE_ID);

  if (!recipe || !ingredientsElement) return;

  const base = recipe.identity.servings || 1;
  const scale = serving / base;

  if (headingEl) headingEl.textContent = tr("ingredients-for").replace("{quantity}", String(serving));
  if (valueEl) {
    valueEl.textContent = String(serving);
    valueEl.setAttribute("aria-label", tr("serving_portions").replace("{quantity}", String(serving)));
  }

  if (decreaseBtn) {
    const dec = decreaseBtn as HTMLButtonElement;
    dec.disabled = serving <= 1;
    dec.setAttribute("aria-label", tr("serving_decrease"));
  }

  if (increaseBtn) (increaseBtn as HTMLButtonElement).setAttribute("aria-label", tr("serving_increase"));

  ingredientsElement.innerHTML = "";
  (recipe.ingredients ?? []).forEach((ingredient) => {
    const li = doc.createElement("li");
    const quantity = ingredient.quantity * scale;
    li.innerHTML = `<strong>${formatQuantity(quantity)} ${ingredient.unit}</strong> ${ingredient.name}`;
    ingredientsElement.appendChild(li);
  });
}

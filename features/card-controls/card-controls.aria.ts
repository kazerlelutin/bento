import { t } from "@features/translate/translate";
import { UI } from "@features/translate/translate.const";

/** Met à jour les aria-label des boutons `#card-controls` (accueil ou catalogue). */
export function setCardControlsAriaLabels(): void {
  const root = document.getElementById("card-controls");
  if (!root) return;
  root.querySelector('[data-action="random"]')?.setAttribute("aria-label", t(UI.randomRecipe));
  root.querySelector('[data-action="catalog"]')?.setAttribute("aria-label", t(UI.openRecipeCatalog));
}

import { t } from "@features/translate/translate";
import { UI } from "@features/translate/translate.const";

/** Libellé du bouton aléatoire sous la carte (texte + accessibilité). */
export function setCardControlsAriaLabels(): void {
  const root = document.getElementById("card-controls");
  if (!root) return;
  const btn = root.querySelector('[data-action="random"]') as HTMLButtonElement | null;
  if (!btn) return;
  const label = t(UI.randomRecipe);
  btn.textContent = label;
  btn.setAttribute("aria-label", label);
}

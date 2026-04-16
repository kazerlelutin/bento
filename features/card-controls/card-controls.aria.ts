import type { Language } from "@features/translate/translate.types";
import { t } from "@features/translate/translate";
import { UI } from "@features/translate/translate.const";
import { getTranslation } from "@features/translate/translate.utils";

/** Libellé du bouton aléatoire sous la carte (texte + accessibilité). */
export function setCardControlsAriaLabels(doc?: Document, lang?: Language): void {
  const d = doc ?? (typeof document !== "undefined" ? document : null);
  if (!d) return;
  const root = d.getElementById("card-controls");
  if (!root) return;
  const btn = root.querySelector('[data-action="random"]') as HTMLButtonElement | null;
  if (!btn) return;
  const label =
    lang !== undefined ? getTranslation(UI.randomRecipe, lang) : t(UI.randomRecipe);
  btn.textContent = label;
  btn.setAttribute("aria-label", label);
}

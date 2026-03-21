import type { Recipe, RecipeBento } from "@features/recipes/recipe.type";
import { t } from "@features/translate/translate";
import { UI } from "@features/translate/translate.const";

/** Ordre d’affichage des champs bento (aligné sur l’API bentext). */
export const BENTO_FIELD_KEYS = [
  "transport",
  "reheat",
  "cold",
  "eating",
  "leaks",
  "smell",
  "prep_ahead",
  "holding",
  "extra_notes",
] as const;

export type BentoFieldKey = (typeof BENTO_FIELD_KEYS)[number];

const BENTO_UI_KEY: Record<BentoFieldKey, keyof typeof UI> = {
  transport: "bento-transport",
  reheat: "bento-reheat",
  cold: "bento-cold",
  eating: "bento-eating",
  leaks: "bento-leaks",
  smell: "bento-smell",
  prep_ahead: "bento-prep_ahead",
  holding: "bento-holding",
  extra_notes: "bento-extra_notes",
};

export function hasBentoContent(bento: Recipe["bento"]): boolean {
  if (!bento) return false;
  return BENTO_FIELD_KEYS.some((k) => {
    const v = bento[k];
    return typeof v === "string" && v.trim().length > 0;
  });
}

export function renderCardBentoDl(dl: HTMLDListElement, bento: RecipeBento): void {
  dl.innerHTML = "";
  for (const key of BENTO_FIELD_KEYS) {
    const val = bento[key];
    if (typeof val !== "string" || !val.trim()) continue;
    const dt = document.createElement("dt");
    dt.className = "card-bento-dl__term";
    dt.textContent = t(UI[BENTO_UI_KEY[key]]);
    const dd = document.createElement("dd");
    dd.className = "card-bento-dl__def";
    dd.textContent = val;
    dl.appendChild(dt);
    dl.appendChild(dd);
  }
}

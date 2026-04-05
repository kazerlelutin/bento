import type { Recipe, RecipeBento } from "@features/recipes/recipe.type";
import type { Language } from "@features/translate/translate.types";
import { t } from "@features/translate/translate";
import { UI } from "@features/translate/translate.const";
import {
  type BentoFilterField,
  BENTO_FILTER_FIELDS,
  bentoValueToCanonicalId,
  buildRecipesFilteredHref,
  formatBentoAlternativesForDisplay,
} from "@features/recipes/bento-vocab";

/** Ordre d’affichage des champs bento (aligné sur l’API bentext v2). */
export const BENTO_FIELD_KEYS = [
  "transport",
  "reheat",
  "cold",
  "cover",
  "eating",
  "stains",
  "smell",
  "prep_time",
  "holding",
  "extra_notes",
] as const;

export type BentoFieldKey = (typeof BENTO_FIELD_KEYS)[number];

const FILTER_SET = new Set<string>(BENTO_FILTER_FIELDS);

const BENTO_UI_KEY: Record<BentoFieldKey, keyof typeof UI> = {
  transport: "bento-transport",
  reheat: "bento-reheat",
  cold: "bento-cold",
  cover: "bento-cover",
  eating: "bento-eating",
  stains: "bento-stains",
  smell: "bento-smell",
  prep_time: "bento-prep_time",
  holding: "bento-holding",
  extra_notes: "bento-extra_notes",
};

/** Libellé UI (clé `UI`) pour un champ filtrable — titres meta / barre catalogue. */
export function bentoFilterFieldLabelKey(field: BentoFilterField): keyof typeof UI {
  return BENTO_UI_KEY[field];
}

export function getBentoFieldValue(bento: RecipeBento, key: BentoFieldKey): string | undefined {
  switch (key) {
    case "stains": {
      const s = bento.stains?.trim();
      if (s) return bento.stains;
      const l = bento.leaks?.trim();
      return l ? bento.leaks : undefined;
    }
    case "prep_time": {
      const p = bento.prep_time?.trim();
      if (p) return bento.prep_time;
      const a = bento.prep_ahead?.trim();
      return a ? bento.prep_ahead : undefined;
    }
    default: {
      const v = bento[key as keyof RecipeBento];
      return typeof v === "string" && v.trim() ? v : undefined;
    }
  }
}

export function hasBentoContent(bento: Recipe["bento"]): boolean {
  if (!bento) return false;
  return BENTO_FIELD_KEYS.some((k) => {
    const v = getBentoFieldValue(bento, k);
    return typeof v === "string" && v.trim().length > 0;
  });
}

export function renderCardBentoDl(dl: HTMLDListElement, bento: RecipeBento, lang: Language): void {
  dl.innerHTML = "";
  for (const key of BENTO_FIELD_KEYS) {
    const rawVal = getBentoFieldValue(bento, key);
    if (typeof rawVal !== "string" || !rawVal.trim()) continue;
    const val = formatBentoAlternativesForDisplay(rawVal);
    const dt = document.createElement("dt");
    dt.className = "card-bento-dl__term";
    dt.textContent = t(UI[BENTO_UI_KEY[key]]);
    const dd = document.createElement("dd");
    dd.className = "card-bento-dl__def";

    if (FILTER_SET.has(key)) {
      const fid = bentoValueToCanonicalId(key as BentoFilterField, rawVal, lang);
      if (fid) {
        const a = document.createElement("a");
        a.href = buildRecipesFilteredHref(lang, key as BentoFilterField, fid);
        a.setAttribute("data-internal", "true");
        a.className = "card-bento-dl__link";
        a.textContent = val;
        dd.appendChild(a);
      } else {
        dd.textContent = val;
      }
    } else {
      dd.textContent = val;
    }

    dl.appendChild(dt);
    dl.appendChild(dd);
  }
}

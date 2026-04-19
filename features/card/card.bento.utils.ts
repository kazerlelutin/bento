import type { Recipe, RecipeBento } from "@features/recipes/recipe.type";
import type { Language } from "@features/translate/translate.types";
import { UI } from "@features/translate/translate.const";
import { getTranslation } from "@features/translate/translate.utils";
import {
  type BentoFilterField,
  BENTO_FILTER_FIELDS,
  bentoValueToCanonicalId,
  buildRecipesFilteredHref,
  formatBentoAlternativesForDisplay,
} from "@features/recipes/bento-vocab";

/** Quatre critères « signature » (alignés API bentext : transport, reheat, cold, utensils). */
export const BENTO_PRIMARY_KEYS = ["transport", "reheat", "cold", "utensils"] as const;

/** Champs optionnels affichés dans le bloc secondaire. */
export const BENTO_SECONDARY_KEYS = [
  "cover",
  "stains",
  "smell",
  "prep_time",
  "holding",
  "extra_notes",
] as const;

/** Ordre complet pour export bentext et présence de contenu. */
export const BENTO_FIELD_KEYS = [
  ...BENTO_PRIMARY_KEYS,
  ...BENTO_SECONDARY_KEYS,
] as const;

export type BentoFieldKey = (typeof BENTO_FIELD_KEYS)[number];

const FILTER_SET = new Set<string>(BENTO_FILTER_FIELDS);

const BENTO_UI_KEY: Record<BentoFieldKey, keyof typeof UI> = {
  transport: "bento-transport",
  reheat: "bento-reheat",
  cold: "bento-cold",
  utensils: "bento-utensils",
  cover: "bento-cover",
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
    case "utensils": {
      const u = bento.utensils?.trim();
      if (u) return u;
      const e = bento.eating?.trim();
      return e ? e : undefined;
    }
    case "stains": {
      const s = bento.stains?.trim();
      if (s) return s;
      const l = bento.leaks?.trim();
      return l ? bento.leaks : undefined;
    }
    case "prep_time": {
      const p = bento.prep_time?.trim();
      if (p) return p;
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

function hasAnyPrimary(bento: RecipeBento): boolean {
  return BENTO_PRIMARY_KEYS.some((k) => {
    const v = getBentoFieldValue(bento, k);
    return typeof v === "string" && v.trim().length > 0;
  });
}

function hasAnySecondary(bento: RecipeBento): boolean {
  return BENTO_SECONDARY_KEYS.some((k) => {
    const v = getBentoFieldValue(bento, k);
    return typeof v === "string" && v.trim().length > 0;
  });
}

function appendBentoDdWithOptionalLink(
  owner: Document,
  dd: HTMLElement,
  key: BentoFieldKey,
  rawVal: string,
  lang: Language
): void {
  const val = formatBentoAlternativesForDisplay(rawVal);
  if (FILTER_SET.has(key)) {
    const fid = bentoValueToCanonicalId(key as BentoFilterField, rawVal, lang);
    if (fid) {
      const a = owner.createElement("a");
      a.href = buildRecipesFilteredHref(lang, key as BentoFilterField, fid);
      a.setAttribute("data-internal", "true");
      a.className = "card-bento-dl__link";
      a.textContent = val;
      dd.appendChild(a);
      return;
    }
  }
  dd.textContent = val;
}

/** Remplit la grille des 4 critères principaux. */
export function renderCardBentoPrimary(container: HTMLElement, bento: RecipeBento, lang: Language): void {
  const owner = container.ownerDocument;
  container.innerHTML = "";
  for (const key of BENTO_PRIMARY_KEYS) {
    const rawVal = getBentoFieldValue(bento, key);
    if (typeof rawVal !== "string" || !rawVal.trim()) continue;
    const article = owner.createElement("article");
    article.className = "card-bento-pillar";
    article.setAttribute("data-bento-key", key);
    const h3 = owner.createElement("h3");
    h3.className = "card-bento-pillar__label";
    h3.textContent = getTranslation(UI[BENTO_UI_KEY[key]], lang);
    const p = owner.createElement("p");
    p.className = "card-bento-pillar__value";
    appendBentoDdWithOptionalLink(owner, p, key, rawVal, lang);
    article.appendChild(h3);
    article.appendChild(p);
    container.appendChild(article);
  }
}

/** Liste `<dl>` des champs optionnels (hors 4 piliers). */
export function renderCardBentoSecondary(dl: HTMLDListElement, bento: RecipeBento, lang: Language): void {
  const owner = dl.ownerDocument;
  dl.innerHTML = "";
  for (const key of BENTO_SECONDARY_KEYS) {
    const rawVal = getBentoFieldValue(bento, key);
    if (typeof rawVal !== "string" || !rawVal.trim()) continue;
    const dt = owner.createElement("dt");
    dt.className = "card-bento-dl__term";
    dt.textContent = getTranslation(UI[BENTO_UI_KEY[key]], lang);
    const dd = owner.createElement("dd");
    dd.className = "card-bento-dl__def";
    appendBentoDdWithOptionalLink(owner, dd, key, rawVal, lang);
    dl.appendChild(dt);
    dl.appendChild(dd);
  }
}

export type CardBentoRecapElements = {
  primaryHeading: HTMLElement | null;
  primaryGrid: HTMLElement | null;
  secondaryWrap: HTMLDetailsElement | null;
  secondaryDl: HTMLDListElement | null;
};

/** Remplit le bloc récap Bento (héros + optionnel) et gère la visibilité. */
export function renderCardBentoRecap(
  els: CardBentoRecapElements,
  bento: RecipeBento,
  lang: Language
): void {
  const { primaryHeading, primaryGrid, secondaryWrap, secondaryDl } = els;
  const primary = hasAnyPrimary(bento);
  const secondary = hasAnySecondary(bento);

  if (primaryHeading) {
    primaryHeading.hidden = !primary;
  }
  if (primaryGrid) {
    renderCardBentoPrimary(primaryGrid, bento, lang);
    primaryGrid.hidden = !primary;
  }
  if (secondaryDl && secondaryWrap) {
    renderCardBentoSecondary(secondaryDl, bento, lang);
    const hasRows = secondaryDl.querySelector("dt") !== null;
    secondaryWrap.hidden = !hasRows;
    if (hasRows) {
      secondaryWrap.open = !primary;
    }
  }
}

/** @deprecated Utiliser `renderCardBentoRecap` — conservé pour tests ciblant l’ancienne API. */
export function renderCardBentoDl(dl: HTMLDListElement, bento: RecipeBento, lang: Language): void {
  renderCardBentoSecondary(dl, bento, lang);
}

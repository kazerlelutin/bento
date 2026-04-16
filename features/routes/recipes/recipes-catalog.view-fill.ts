import type { Recipe } from "@features/recipes/recipe.type";
import type { Language } from "@features/translate/translate.types";
import { getTranslation } from "@features/translate/translate.utils";
import { UI } from "@features/translate/translate.const";
import { pathWithLang } from "@features/i18n/route-path";
import { resolveRecipeListImageSrc, recipeListBentoChips } from "@features/routes/recipes/recipes-list.utils";
import { bentoFilterFieldLabelKey } from "@features/card/card.bento.utils";
import {
  RECIPES_LIST_ID,
  RECIPES_SEARCH_ID,
  RECIPES_LIST_LOADING_ID,
  RECIPES_FILTER_CHIPS_ID,
  RECIPES_FILTER_ADD_ID,
} from "@features/routes/recipes/recipes-list.const";

/**
 * Remplit le catalogue (template `recipes-template` cloné dans le document).
 * Aligné sur `recipes-list.ctrl` (liste triée, pas de filtres actifs).
 */
export function applyRecipesCatalogToDom(doc: Document, recipes: Recipe[], lang: Language): void {
  const container = doc.getElementById("recipes-container");
  const titleEl = container?.querySelector("h1");
  if (titleEl) {
    titleEl.textContent = getTranslation(UI["recipes-catalog-title-short"], lang);
  }

  const toolbar = doc.getElementById("recipes-search-toolbar");
  const chips = doc.getElementById(RECIPES_FILTER_CHIPS_ID);
  const addBtn = doc.getElementById(RECIPES_FILTER_ADD_ID);
  const searchEl = doc.getElementById(RECIPES_SEARCH_ID) as HTMLInputElement | null;
  const listLoading = doc.getElementById(RECIPES_LIST_LOADING_ID);
  const listEl = doc.getElementById(RECIPES_LIST_ID);

  if (toolbar) toolbar.hidden = false;
  if (chips) {
    chips.innerHTML = "";
    chips.hidden = true;
  }
  if (listLoading) {
    listLoading.hidden = true;
    listLoading.setAttribute("aria-busy", "false");
  }

  const searchPlaceholder = getTranslation(UI["all-recipes-search-placeholder"], lang);
  if (searchEl) {
    searchEl.placeholder = searchPlaceholder;
    searchEl.setAttribute("aria-label", searchPlaceholder);
  }
  if (addBtn) {
    addBtn.setAttribute("aria-label", getTranslation(UI["recipes-filter-add-aria"], lang));
  }

  const sorted = [...recipes].sort((a, b) =>
    a.identity.name.localeCompare(b.identity.name, undefined, { sensitivity: "base" })
  );

  if (addBtn) addBtn.hidden = sorted.length === 0;
  if (searchEl) searchEl.hidden = sorted.length === 0;

  if (!listEl) return;
  listEl.innerHTML = "";

  for (const recipe of sorted) {
    const a = doc.createElement("a");
    a.href = pathWithLang(lang, "recipes", recipe.slug);
    a.setAttribute("data-internal", "true");
    a.className = "recipes-list-item";

    const thumb = doc.createElement("div");
    const imgSrc = resolveRecipeListImageSrc(recipe);
    if (imgSrc) {
      thumb.className = "recipes-list-item__thumb";
      const img = doc.createElement("img");
      img.className = "recipes-list-item__img";
      img.src = imgSrc;
      img.alt = recipe.identity.name;
      img.loading = "lazy";
      img.decoding = "async";
      thumb.appendChild(img);
    } else {
      thumb.className = "recipes-list-item__thumb recipes-list-item__thumb--empty";
      thumb.setAttribute("aria-hidden", "true");
    }

    const body = doc.createElement("div");
    body.className = "recipes-list-item__body";

    const title = doc.createElement("span");
    title.className = "recipes-list-item__title";
    title.textContent = recipe.identity.name;
    body.appendChild(title);

    const chipsData = recipeListBentoChips(recipe);
    if (chipsData.length > 0) {
      const meta = doc.createElement("div");
      meta.className = "recipes-list-item__meta";
      for (const { field, display } of chipsData) {
        const label = getTranslation(UI[bentoFilterFieldLabelKey(field)], lang);
        const chip = doc.createElement("span");
        chip.className = `recipes-list-chip recipes-list-chip--${field}`;
        chip.textContent = `${label}: ${display}`;
        chip.title = chip.textContent;
        meta.appendChild(chip);
      }
      body.appendChild(meta);
    }

    a.appendChild(thumb);
    a.appendChild(body);
    listEl.appendChild(a);
  }
}

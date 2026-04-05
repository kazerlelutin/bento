import { activeFooterLink } from "@/utils/active-footer-link";
import type { Ctrl } from "@features/routes/routes.type";
import type { Recipe } from "@features/recipes/recipe.type";
import { recipesCtrl } from "@features/recipes/recipes.ctrl";
import { recipesStore } from "@features/recipes/recipes.stores";
import { t } from "@features/translate/translate";
import { UI } from "@features/translate/translate.const";
import { cardControlsCtrl } from "@features/card-controls/card-controls";
import { getRouteContext } from "@features/router/route-context";
import { pathWithLang } from "@features/i18n/route-path";
import { setCardControlsAriaLabels } from "@features/card-controls/card-controls.aria";
import {
  canonicalIdLabel,
  parseBentoRecipesQuery,
  recipeBentoMatchesFilter,
} from "@features/recipes/bento-vocab";
import { getBentoFieldValue, bentoFilterFieldLabelKey } from "@features/card/card.bento.utils";
import {
  applyRecipesCatalogDefaultMeta,
  applyRecipesCatalogFilterMeta,
} from "@features/meta/meta.ctrl";
import {
  RECIPES_CONTAINER_ID,
  RECIPES_FILTER_BAR_ID,
  RECIPES_LIST_ID,
  RECIPES_EMPTY_ID,
  RECIPES_SEARCH_ID,
  RECIPES_LOAD_ERROR_ID,
  RECIPES_LOAD_ERROR_MESSAGE_ID,
  RECIPES_LOAD_ERROR_RETRY_ID,
} from "./recipes-list.const";

function metaFilteredLine(fieldLabel: string, valueLabel: string): string {
  return t(UI["recipes-meta-filtered-desc"])
    .replace("{{field}}", fieldLabel)
    .replace("{{value}}", valueLabel);
}

const recipesListCtrl: Ctrl = {
  async init() {
    const { lang } = getRouteContext();
    activeFooterLink(pathWithLang(lang, "recipes"));

    await recipesCtrl.init?.();

    const container = document.getElementById(RECIPES_CONTAINER_ID);
    if (!container) return;

    const titleEl = container.querySelector("h1");
    if (titleEl) {
      titleEl.textContent = t(UI["recipes-catalog-title-short"]);
      titleEl.setAttribute("data-translate", "recipes-catalog-title-short");
    }

    const filterBarEl = document.getElementById(RECIPES_FILTER_BAR_ID);
    const searchEl = document.getElementById(RECIPES_SEARCH_ID) as HTMLInputElement | null;
    const listEl = document.getElementById(RECIPES_LIST_ID);
    const emptyEl = document.getElementById(RECIPES_EMPTY_ID);
    const errorEl = document.getElementById(RECIPES_LOAD_ERROR_ID);
    const errorMsgEl = document.getElementById(RECIPES_LOAD_ERROR_MESSAGE_ID);
    const errorRetryBtn = document.getElementById(RECIPES_LOAD_ERROR_RETRY_ID) as HTMLButtonElement | null;

    if (!listEl) return;

    if (recipesStore.loadError) {
      if (errorEl) {
        errorEl.hidden = false;
        errorEl.removeAttribute("hidden");
      }
      if (errorMsgEl) errorMsgEl.textContent = t(UI["recipes-load-error"]);
      if (errorRetryBtn) {
        errorRetryBtn.textContent = t(UI.retry);
        errorRetryBtn.setAttribute("aria-label", t(UI.retry));
        errorRetryBtn.onclick = async () => {
          await recipesCtrl.init();
          if (!recipesStore.loadError) recipesListCtrl.init?.();
        };
      }
      if (searchEl) searchEl.hidden = true;
      if (filterBarEl) filterBarEl.hidden = true;
      listEl.hidden = true;
      if (emptyEl) emptyEl.hidden = true;
      cardControlsCtrl.init?.();
      setCardControlsAriaLabels();
      return;
    }

    if (errorEl) {
      errorEl.setAttribute("hidden", "");
      errorEl.hidden = true;
    }
    listEl.hidden = false;

    const sortedRecipes = [...recipesStore.recipes].sort((a, b) =>
      a.identity.name.localeCompare(b.identity.name, undefined, { sensitivity: "base" })
    );

    const bentoFilter = parseBentoRecipesQuery(window.location.search);

    function applyCatalogMeta(): void {
      const short = t(UI["recipes-catalog-title-short"]);
      if (bentoFilter) {
        const fieldLabel = t(UI[bentoFilterFieldLabelKey(bentoFilter.field)]);
        const valueLabel = canonicalIdLabel(bentoFilter.field, bentoFilter.id, lang) ?? bentoFilter.id;
        const pageTitle = `${fieldLabel}: ${valueLabel} — ${short} | BENTO`;
        applyRecipesCatalogFilterMeta(pageTitle, metaFilteredLine(fieldLabel, valueLabel));
      } else {
        applyRecipesCatalogDefaultMeta(`${short} | BENTO`);
      }
    }

    function renderFilterBar(): void {
      if (!filterBarEl) return;
      filterBarEl.innerHTML = "";
      if (!bentoFilter) {
        filterBarEl.hidden = true;
        filterBarEl.removeAttribute("aria-label");
        return;
      }
      filterBarEl.hidden = false;
      filterBarEl.setAttribute("aria-label", t(UI["recipes-filter-bar-aria"]));
      const fieldLabel = t(UI[bentoFilterFieldLabelKey(bentoFilter.field)]);
      const valueLabel = canonicalIdLabel(bentoFilter.field, bentoFilter.id, lang) ?? bentoFilter.id;

      const wrap = document.createElement("div");
      wrap.className = "recipes-filter-bar__inner";

      const span = document.createElement("span");
      span.className = "recipes-filter-bar__label";
      span.textContent = `${fieldLabel}: ${valueLabel}`;

      const clear = document.createElement("a");
      clear.href = pathWithLang(lang, "recipes");
      clear.setAttribute("data-internal", "true");
      clear.className = "recipes-filter-bar__clear";
      clear.textContent = t(UI["recipes-filter-clear"]);

      wrap.appendChild(span);
      wrap.appendChild(clear);
      filterBarEl.appendChild(wrap);
    }

    function recipesAfterBentoFilter(recipes: Recipe[]): Recipe[] {
      if (!bentoFilter) return recipes;
      return recipes.filter((r) => {
        const raw = r.bento ? getBentoFieldValue(r.bento, bentoFilter.field) : undefined;
        return recipeBentoMatchesFilter(raw, bentoFilter.field, bentoFilter.id, lang);
      });
    }

    function renderList(recipes: Recipe[]) {
      if (!listEl) return;
      listEl.innerHTML = "";
      if (emptyEl) emptyEl.hidden = true;

      if (sortedRecipes.length === 0) {
        if (emptyEl) {
          emptyEl.hidden = false;
          emptyEl.textContent = t(UI["all-recipes-empty"]);
        }
        return;
      }

      if (recipes.length === 0) {
        if (emptyEl) {
          emptyEl.hidden = false;
          emptyEl.textContent = t(UI["all-recipes-no-results"]);
        }
        return;
      }

      const fragment = document.createDocumentFragment();
      for (const recipe of recipes) {
        const a = document.createElement("a");
        a.href = pathWithLang(lang, "recipes", recipe.slug);
        a.setAttribute("data-internal", "true");
        a.className = "favorites-item";
        a.textContent = recipe.identity.name;
        fragment.appendChild(a);
      }
      listEl.appendChild(fragment);
    }

    function applySearchAndRender(): void {
      const afterBento = recipesAfterBentoFilter(sortedRecipes);
      const q = searchEl?.value.trim().toLowerCase() ?? "";
      const filtered = q ? afterBento.filter((r) => r.identity.name.toLowerCase().includes(q)) : afterBento;
      renderList(filtered);
    }

    applyCatalogMeta();
    renderFilterBar();

    if (searchEl) {
      const searchPlaceholder = t(UI["all-recipes-search-placeholder"]);
      searchEl.placeholder = searchPlaceholder;
      searchEl.setAttribute("aria-label", searchPlaceholder);
      if (sortedRecipes.length === 0) {
        searchEl.hidden = true;
      } else {
        searchEl.hidden = false;
        searchEl.addEventListener("input", applySearchAndRender);
      }
    }

    applySearchAndRender();

    cardControlsCtrl.init?.();
    setCardControlsAriaLabels();
  },

  cleanUp() {
    cardControlsCtrl.cleanUp?.();
  },
};

export default recipesListCtrl;

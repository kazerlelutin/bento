import { activeFooterLink } from "@/utils/active-footer-link";
import type { Ctrl } from "@features/routes/routes.type";
import type { Recipe } from "@features/recipes/recipe.type";
import { recipesCtrl } from "@features/recipes/recipes.ctrl";
import { recipesStore } from "@features/recipes/recipes.stores";
import { t } from "@features/translate/translate";
import { UI } from "@features/translate/translate.const";
import { getRouteContext } from "@features/router/route-context";
import { pathWithLang } from "@features/i18n/route-path";
import { navigateInternal } from "@features/router/router.handlers";
import {
  BENTO_FILTER_FIELDS,
  type BentoFilterEntry,
  type BentoFilterField,
  buildRecipesFilteredHrefMany,
  canonicalIdLabel,
  parseBentoRecipesQuery,
  recipeBentoMatchesFilter,
  listBentoFilterValues,
} from "@features/recipes/bento-vocab";
import { getBentoFieldValue, bentoFilterFieldLabelKey } from "@features/card/card.bento.utils";
import {
  applyRecipesCatalogDefaultMeta,
  applyRecipesCatalogFilterMeta,
} from "@features/meta/meta.ctrl";
import { bentoFilterFieldLabelKey } from "@features/card/card.bento.utils";
import { recipeListBentoChips, resolveRecipeListImageSrc } from "./recipes-list.utils";
import {
  RECIPES_CONTAINER_ID,
  RECIPES_SEARCH_TOOLBAR_ID,
  RECIPES_FILTER_CHIPS_ID,
  RECIPES_FILTER_ADD_ID,
  RECIPES_FILTER_POPOVER_ID,
  RECIPES_FILTER_FIELD_ID,
  RECIPES_FILTER_VALUE_ID,
  RECIPES_FILTER_APPLY_ID,
  RECIPES_LIST_WRAP_ID,
  RECIPES_LIST_LOADING_ID,
  RECIPES_LIST_ID,
  RECIPES_EMPTY_ID,
  RECIPES_SEARCH_ID,
  RECIPES_LOAD_ERROR_ID,
  RECIPES_LOAD_ERROR_MESSAGE_ID,
  RECIPES_LOAD_ERROR_RETRY_ID,
} from "./recipes-list.const";

function upsertBentoFilter(current: BentoFilterEntry[], field: BentoFilterField, id: string): BentoFilterEntry[] {
  const rest = current.filter((x) => x.field !== field);
  return [...rest, { field, id }];
}

let toolbarDocClick: ((e: MouseEvent) => void) | null = null;
let toolbarKeydown: ((e: KeyboardEvent) => void) | null = null;
let filterPopoverLayoutSync: (() => void) | null = null;

function detachFilterPopoverLayoutListeners(): void {
  if (filterPopoverLayoutSync) {
    window.removeEventListener("scroll", filterPopoverLayoutSync, true);
    window.removeEventListener("resize", filterPopoverLayoutSync);
    filterPopoverLayoutSync = null;
  }
}

function syncFilterPopoverPosition(): void {
  const popoverEl = document.getElementById(RECIPES_FILTER_POPOVER_ID);
  const toolbarEl = document.getElementById(RECIPES_SEARCH_TOOLBAR_ID);
  if (!popoverEl || popoverEl.hidden || !toolbarEl) return;
  const row = toolbarEl.querySelector(".recipes-search-row");
  const anchor = row ?? toolbarEl;
  const r = anchor.getBoundingClientRect();
  const gap = 4;
  popoverEl.style.setProperty("position", "fixed");
  popoverEl.style.setProperty("top", `${Math.round(r.bottom + gap)}px`);
  popoverEl.style.setProperty("left", `${Math.round(r.left)}px`);
  popoverEl.style.setProperty("width", `${Math.round(r.width)}px`);
  popoverEl.style.setProperty("right", "auto");
  popoverEl.style.setProperty("bottom", "auto");
}

function clearFilterPopoverLayout(): void {
  const popoverEl = document.getElementById(RECIPES_FILTER_POPOVER_ID);
  if (!popoverEl) return;
  for (const p of ["position", "top", "left", "width", "right", "bottom"] as const) {
    popoverEl.style.removeProperty(p);
  }
}

const recipesListCtrl: Ctrl = {
  async init() {
    const { lang } = getRouteContext();
    activeFooterLink(pathWithLang(lang, "recipes"));

    if (toolbarDocClick) {
      document.removeEventListener("click", toolbarDocClick);
      toolbarDocClick = null;
    }
    if (toolbarKeydown) {
      document.removeEventListener("keydown", toolbarKeydown);
      toolbarKeydown = null;
    }
    detachFilterPopoverLayoutListeners();
    clearFilterPopoverLayout();

    const listLoadingEl = document.getElementById(RECIPES_LIST_LOADING_ID);
    let listLoadingTimer: ReturnType<typeof setTimeout> | null = null;
    if (listLoadingEl) {
      listLoadingTimer = setTimeout(() => {
        listLoadingEl.hidden = false;
        listLoadingEl.setAttribute("aria-busy", "true");
        const span = listLoadingEl.querySelector(".recipes-list-loading__text");
        if (span) span.textContent = t(UI["recipes-loading"]);
      }, 100);
    }

    await recipesCtrl.init?.();

    if (listLoadingTimer) clearTimeout(listLoadingTimer);
    if (listLoadingEl) {
      listLoadingEl.hidden = true;
      listLoadingEl.setAttribute("aria-busy", "false");
    }

    const container = document.getElementById(RECIPES_CONTAINER_ID);
    if (!container) return;

    const titleEl = container.querySelector("h1");
    if (titleEl) {
      titleEl.textContent = t(UI["recipes-catalog-title-short"]);
      titleEl.setAttribute("data-translate", "recipes-catalog-title-short");
    }

    const toolbarEl = document.getElementById(RECIPES_SEARCH_TOOLBAR_ID);
    const chipsEl = document.getElementById(RECIPES_FILTER_CHIPS_ID);
    const addBtn = document.getElementById(RECIPES_FILTER_ADD_ID) as HTMLButtonElement | null;
    const popoverEl = document.getElementById(RECIPES_FILTER_POPOVER_ID);
    const fieldSelect = document.getElementById(RECIPES_FILTER_FIELD_ID) as HTMLSelectElement | null;
    const valueSelect = document.getElementById(RECIPES_FILTER_VALUE_ID) as HTMLSelectElement | null;
    const applyBtn = document.getElementById(RECIPES_FILTER_APPLY_ID) as HTMLButtonElement | null;
    const fieldLabelEl = document.getElementById("recipes-filter-field-label");
    const valueLabelEl = document.getElementById("recipes-filter-value-label");

    const searchEl = document.getElementById(RECIPES_SEARCH_ID) as HTMLInputElement | null;
    const listEl = document.getElementById(RECIPES_LIST_ID);
    const emptyEl = document.getElementById(RECIPES_EMPTY_ID);
    const errorEl = document.getElementById(RECIPES_LOAD_ERROR_ID);
    const errorMsgEl = document.getElementById(RECIPES_LOAD_ERROR_MESSAGE_ID);
    const errorRetryBtn = document.getElementById(RECIPES_LOAD_ERROR_RETRY_ID) as HTMLButtonElement | null;

    if (!listEl) return;

    if (recipesStore.loadError) {
      if (toolbarEl) toolbarEl.hidden = true;
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
      listEl.hidden = true;
      if (emptyEl) emptyEl.hidden = true;
      return;
    }

    if (toolbarEl) toolbarEl.hidden = false;
    if (errorEl) {
      errorEl.setAttribute("hidden", "");
      errorEl.hidden = true;
    }
    listEl.hidden = false;

    const sortedRecipes = [...recipesStore.recipes].sort((a, b) =>
      a.identity.name.localeCompare(b.identity.name, undefined, { sensitivity: "base" })
    );

    const bentoFilters = parseBentoRecipesQuery(window.location.search);

    function metaFilteredDescLine(parts: string[]): string {
      return parts.join(". ") + ".";
    }

    function applyCatalogMeta(filters: BentoFilterEntry[]): void {
      const short = t(UI["recipes-catalog-title-short"]);
      if (filters.length === 0) {
        applyRecipesCatalogDefaultMeta(`${short} | BENTO`);
        return;
      }
      const parts = filters.map((bf) => {
        const fieldLabel = t(UI[bentoFilterFieldLabelKey(bf.field)]);
        const valueLabel = canonicalIdLabel(bf.field, bf.id, lang) ?? bf.id;
        return `${fieldLabel}: ${valueLabel}`;
      });
      const pageTitle = `${parts.join(" · ")} — ${short} | BENTO`;
      applyRecipesCatalogFilterMeta(pageTitle, metaFilteredDescLine(parts));
    }

    function closeFilterPopover(): void {
      detachFilterPopoverLayoutListeners();
      clearFilterPopoverLayout();
      if (popoverEl) popoverEl.hidden = true;
      if (addBtn) {
        addBtn.setAttribute("aria-expanded", "false");
      }
    }

    function openFilterPopover(): void {
      if (popoverEl) popoverEl.hidden = false;
      if (addBtn) addBtn.setAttribute("aria-expanded", "true");
      requestAnimationFrame(() => {
        syncFilterPopoverPosition();
        detachFilterPopoverLayoutListeners();
        filterPopoverLayoutSync = () => {
          syncFilterPopoverPosition();
        };
        window.addEventListener("scroll", filterPopoverLayoutSync, true);
        window.addEventListener("resize", filterPopoverLayoutSync);
      });
    }

    function populateValueOptions(field: BentoFilterField): void {
      if (!valueSelect) return;
      valueSelect.innerHTML = "";
      for (const { id, label } of listBentoFilterValues(field, lang)) {
        const opt = document.createElement("option");
        opt.value = id;
        opt.textContent = label;
        valueSelect.appendChild(opt);
      }
    }

    if (fieldSelect && fieldSelect.options.length === 0) {
      for (const f of BENTO_FILTER_FIELDS) {
        const opt = document.createElement("option");
        opt.value = f;
        opt.textContent = t(UI[bentoFilterFieldLabelKey(f)]);
        fieldSelect.appendChild(opt);
      }
      fieldSelect.onchange = () => {
        populateValueOptions(fieldSelect.value as BentoFilterField);
      };
      populateValueOptions(fieldSelect.value as BentoFilterField);
    }

    if (fieldLabelEl) fieldLabelEl.textContent = t(UI["recipes-filter-field-label"]);
    if (valueLabelEl) valueLabelEl.textContent = t(UI["recipes-filter-value-label"]);
    if (applyBtn) applyBtn.textContent = t(UI["recipes-filter-apply"]);
    if (addBtn) {
      addBtn.setAttribute("aria-label", t(UI["recipes-filter-add-aria"]));
      addBtn.onclick = (e) => {
        e.stopPropagation();
        if (popoverEl?.hidden) {
          openFilterPopover();
          if (fieldSelect) populateValueOptions(fieldSelect.value as BentoFilterField);
        } else {
          closeFilterPopover();
        }
      };
    }

    if (applyBtn) {
      applyBtn.onclick = (e) => {
        e.stopPropagation();
        if (!fieldSelect || !valueSelect) return;
        const field = fieldSelect.value as BentoFilterField;
        const id = valueSelect.value;
        if (!id) return;
        const current = parseBentoRecipesQuery(window.location.search);
        const next = upsertBentoFilter(current, field, id);
        navigateInternal(buildRecipesFilteredHrefMany(lang, next));
        closeFilterPopover();
      };
    }

    toolbarDocClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (popoverEl && !popoverEl.hidden) {
        if (popoverEl.contains(t) || addBtn?.contains(t)) return;
        closeFilterPopover();
      }
    };
    document.addEventListener("click", toolbarDocClick);

    toolbarKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeFilterPopover();
    };
    document.addEventListener("keydown", toolbarKeydown);

    if (popoverEl) {
      popoverEl.onclick = (e) => e.stopPropagation();
    }

    function renderFilterChips(): void {
      if (!chipsEl) return;
      chipsEl.innerHTML = "";
      const filters = parseBentoRecipesQuery(window.location.search);
      chipsEl.hidden = filters.length === 0;
      if (filters.length === 0) return;

      chipsEl.setAttribute("aria-label", t(UI["recipes-filter-bar-aria"]));
      for (const bf of filters) {
        const chip = document.createElement("span");
        chip.className = "recipes-filter-chip";
        const fieldLabel = t(UI[bentoFilterFieldLabelKey(bf.field)]);
        const valueLabel = canonicalIdLabel(bf.field, bf.id, lang) ?? bf.id;
        const text = document.createElement("span");
        text.className = "recipes-filter-chip__text";
        text.textContent = `${fieldLabel}: ${valueLabel}`;

        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "recipes-filter-chip__remove";
        removeBtn.setAttribute("aria-label", t(UI["recipes-filter-chip-remove-aria"]));
        removeBtn.dataset.field = bf.field;
        removeBtn.textContent = "×";

        removeBtn.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          const field = removeBtn.dataset.field as BentoFilterField;
          const current = parseBentoRecipesQuery(window.location.search);
          const next = current.filter((x) => x.field !== field);
          navigateInternal(buildRecipesFilteredHrefMany(lang, next));
        };

        chip.appendChild(text);
        chip.appendChild(removeBtn);
        chipsEl.appendChild(chip);
      }
    }

    function recipesAfterBentoFilters(recipes: Recipe[]): Recipe[] {
      if (bentoFilters.length === 0) return recipes;
      return recipes.filter((r) =>
        bentoFilters.every((bf) => {
          const raw = r.bento ? getBentoFieldValue(r.bento, bf.field) : undefined;
          return recipeBentoMatchesFilter(raw, bf.field, bf.id, lang);
        })
      );
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
        a.className = "recipes-list-item";

        const thumb = document.createElement("div");
        thumb.className = "recipes-list-item__thumb";

        const imgSrc = resolveRecipeListImageSrc(recipe);
        if (imgSrc) {
          const img = document.createElement("img");
          img.className = "recipes-list-item__img";
          img.src = imgSrc;
          img.alt = recipe.identity.name;
          img.loading = "lazy";
          img.decoding = "async";
          if (recipe.image?.width) img.width = recipe.image.width;
          if (recipe.image?.height) img.height = recipe.image.height;
          thumb.appendChild(img);
        } else {
          thumb.classList.add("recipes-list-item__thumb--empty");
          thumb.setAttribute("aria-hidden", "true");
        }

        const body = document.createElement("div");
        body.className = "recipes-list-item__body";

        const title = document.createElement("span");
        title.className = "recipes-list-item__title";
        title.textContent = recipe.identity.name;

        body.appendChild(title);

        const chips = recipeListBentoChips(recipe);
        if (chips.length > 0) {
          const meta = document.createElement("div");
          meta.className = "recipes-list-item__meta";
          for (const { field, display } of chips) {
            const chip = document.createElement("span");
            chip.className = `recipes-list-chip recipes-list-chip--${field}`;
            chip.textContent = display;
            chip.title = `${t(UI[bentoFilterFieldLabelKey(field)])}: ${display}`;
            meta.appendChild(chip);
          }
          body.appendChild(meta);
        }

        a.appendChild(thumb);
        a.appendChild(body);
        fragment.appendChild(a);
      }
      listEl.appendChild(fragment);
    }

    function applySearchAndRender(): void {
      const afterBento = recipesAfterBentoFilters(sortedRecipes);
      const q = searchEl?.value.trim().toLowerCase() ?? "";
      const filtered = q ? afterBento.filter((r) => r.identity.name.toLowerCase().includes(q)) : afterBento;
      renderList(filtered);
    }

    applyCatalogMeta(bentoFilters);
    renderFilterChips();

    if (searchEl) {
      const searchPlaceholder = t(UI["all-recipes-search-placeholder"]);
      searchEl.placeholder = searchPlaceholder;
      searchEl.setAttribute("aria-label", searchPlaceholder);
      if (sortedRecipes.length === 0) {
        searchEl.hidden = true;
      } else {
        searchEl.hidden = false;
        searchEl.oninput = applySearchAndRender;
      }
    }

    if (addBtn) {
      addBtn.hidden = sortedRecipes.length === 0;
    }

    applySearchAndRender();
  },

  cleanUp() {
    detachFilterPopoverLayoutListeners();
    clearFilterPopoverLayout();
    if (toolbarDocClick) {
      document.removeEventListener("click", toolbarDocClick);
      toolbarDocClick = null;
    }
    if (toolbarKeydown) {
      document.removeEventListener("keydown", toolbarKeydown);
      toolbarKeydown = null;
    }
  },
};

export default recipesListCtrl;

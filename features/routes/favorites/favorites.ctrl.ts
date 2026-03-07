import { activeFooterLink } from "@/utils/active-footer-link";
import type { Ctrl } from "@features/routes/routes.type";
import type { Recipe } from "@features/recipes/recipe.type";
import { recipesCtrl } from "@features/recipes/recipes.ctrl";
import { recipeCtrl } from "@features/recipes/recipe/recipe.ctrl";
import { recipesStore } from "@features/recipes/recipes.stores";
import { t } from "@features/translate/translate";
import { UI } from "@features/translate/translate.const";
import { handleLinkClick } from "@/features/router/router.handlers";
import {
  FAVORITES_CONTAINER_ID,
  FAVORITES_LIST_ID,
  FAVORITES_EMPTY_ID,
  FAVORITES_SEARCH_ID,
  FAVORITES_LOAD_ERROR_ID,
  FAVORITES_LOAD_ERROR_MESSAGE_ID,
  FAVORITES_LOAD_ERROR_RETRY_ID,
} from "./favorites.const";

const favoritesCtrl: Ctrl = {
  async init() {
    activeFooterLink("/favorites");

    await recipesCtrl.init?.();
    recipeCtrl.loadPreferences();

    const container = document.getElementById(FAVORITES_CONTAINER_ID);
    if (!container) return;

    const titleEl = container.querySelector("h1");
    if (titleEl) titleEl.textContent = t(UI["my-favorites"]);

    const searchEl = document.getElementById(FAVORITES_SEARCH_ID) as HTMLInputElement | null;
    const listEl = document.getElementById(FAVORITES_LIST_ID);
    const emptyEl = document.getElementById(FAVORITES_EMPTY_ID);
    const errorEl = document.getElementById(FAVORITES_LOAD_ERROR_ID);
    const errorMsgEl = document.getElementById(FAVORITES_LOAD_ERROR_MESSAGE_ID);
    const errorRetryBtn = document.getElementById(FAVORITES_LOAD_ERROR_RETRY_ID) as HTMLButtonElement | null;

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
          if (!recipesStore.loadError) favoritesCtrl.init?.();
        };
      }
      if (searchEl) searchEl.hidden = true;
      listEl.hidden = true;
      if (emptyEl) emptyEl.hidden = true;
      return;
    }

    if (errorEl) {
      errorEl.setAttribute("hidden", "");
      errorEl.hidden = true;
    }
    listEl.hidden = false;

    const bookmarkedSlugs = recipeCtrl.getBookmarks();
    const bookmarkedRecipes = recipesStore.recipes.filter((r) =>
      bookmarkedSlugs.includes(r.slug)
    );

    const sortedRecipes = [...bookmarkedRecipes].sort((a, b) =>
      a.identity.name.localeCompare(b.identity.name, undefined, { sensitivity: "base" })
    );

    function renderList(recipes: Recipe[]) {
      if (!listEl) return;
      listEl.innerHTML = "";
      if (emptyEl) emptyEl.hidden = true;

      if (bookmarkedRecipes.length === 0) {
        if (emptyEl) {
          emptyEl.hidden = false;
          emptyEl.textContent = t(UI["favorites-empty"]);
        }
        return;
      }

      if (recipes.length === 0) {
        if (emptyEl) {
          emptyEl.hidden = false;
          emptyEl.textContent = t(UI["favorites-no-results"]);
        }
        return;
      }

      const fragment = document.createDocumentFragment();
      for (const recipe of recipes) {
        const a = document.createElement("a");
        a.href = `/?slug=${encodeURIComponent(recipe.slug)}`;
        a.setAttribute("data-internal", "true");
        a.className = "favorites-item";
        a.textContent = recipe.identity.name;
        fragment.appendChild(a);
        a.addEventListener("click", handleLinkClick);
      }
      listEl.appendChild(fragment);
    }

    if (searchEl) {
      const searchPlaceholder = t(UI["favorites-search-placeholder"]);
      searchEl.placeholder = searchPlaceholder;
      searchEl.setAttribute("aria-label", searchPlaceholder);
      if (bookmarkedRecipes.length === 0) {
        searchEl.hidden = true;
      } else {
        searchEl.hidden = false;
        searchEl.addEventListener("input", () => {
          const query = searchEl.value.trim().toLowerCase();
          const filtered = query
            ? sortedRecipes.filter((r) =>
              r.identity.name.toLowerCase().includes(query)
            )
            : sortedRecipes;
          renderList(filtered);
        });
      }
    }

    renderList(sortedRecipes);
  },
};

export default favoritesCtrl;

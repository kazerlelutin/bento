import { CardControlsCtrl } from "@features/card-controls/card-controls.type";
import { ACTIONS } from "@features/card-controls/card-controls.const";
import { navigateInternal } from "@features/router/router.handlers";
import { cardCtrl } from "@features/card/card.ctrl";
import { recipeCtrl } from "@features/recipes/recipe/recipe.ctrl";
import { currentRecipeStore } from "@features/recipes/recipe/recipe.store";
import { routerState } from "@features/router/router.state";
import { RECIPES_SEARCH_ID } from "@features/routes/recipes/recipes-list.const";

let boundClick: ((e: Event) => void) | null = null;
let controlsRoot: HTMLElement | null = null;

function isRecipesCatalogPage(): boolean {
  return routerState.currentPage === "/recipes";
}

export const cardControlsCtrl: CardControlsCtrl = {
  init() {
    boundClick = (e: Event) => cardControlsCtrl.handleClick(e);
    controlsRoot = document.getElementById("card-controls");
    if (controlsRoot && boundClick) controlsRoot.addEventListener("click", boundClick);
  },
  handleClick(e: Event) {
    const target = e.target as HTMLElement;
    const button = target.closest("[data-action]");
    const action = button?.getAttribute("data-action") as keyof typeof ACTIONS | null;
    if (!action) return;

    if (action === ACTIONS.random) {
      const nextRecipe = recipeCtrl.pickRandomRecipe();
      currentRecipeStore.recipe = nextRecipe;
      if (!nextRecipe) return;
      if (isRecipesCatalogPage()) {
        navigateInternal(`/?slug=${encodeURIComponent(nextRecipe.slug)}`);
      } else {
        cardCtrl.updateUI?.();
      }
      return;
    }

    if (action === ACTIONS.catalog) {
      if (isRecipesCatalogPage()) {
        const searchEl = document.getElementById(RECIPES_SEARCH_ID) as HTMLInputElement | null;
        if (searchEl && !searchEl.hidden) {
          searchEl.focus();
          searchEl.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } else {
        navigateInternal("/recipes");
      }
    }
  },
  cleanUp() {
    if (controlsRoot && boundClick) {
      controlsRoot.removeEventListener("click", boundClick);
    }
    boundClick = null;
    controlsRoot = null;
  },
};

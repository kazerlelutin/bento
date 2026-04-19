import { CardControlsCtrl } from "@features/card-controls/card-controls.type";
import { ACTIONS } from "@features/card-controls/card-controls.const";
import { navigateInternal } from "@features/router/router.handlers";
import { recipeCtrl } from "@features/recipes/recipe/recipe.ctrl";
import { currentRecipeStore } from "@features/recipes/recipe/recipe.store";
import { pathWithLang } from "@features/i18n/route-path";
import { getRouteContext } from "@features/router/route-context";

let boundClick: ((e: Event) => void) | null = null;
let controlsRoot: HTMLElement | null = null;

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
      const { lang } = getRouteContext();
      navigateInternal(pathWithLang(lang, "recipes", nextRecipe.slug));
      return;
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

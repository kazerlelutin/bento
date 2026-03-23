import { Ctrl } from "@features/routes/routes.type";
import { cardCtrl } from "@/features/card/card.ctrl";
import { cardControlsCtrl } from "@features/card-controls/card-controls";
import { recipeCtrl } from "@features/recipes/recipe/recipe.ctrl";
import { currentRecipeStore } from "@features/recipes/recipe/recipe.store";
import { recipesStore } from "@features/recipes/recipes.stores";
import { activeFooterLink } from "@/utils/active-footer-link";
import { showOverlayLoading, showOverlayError, hideOverlay } from "./card.utils";

function showCardAndControls(): void {
  const slug = new URL(window.location.href).searchParams.get("slug");
  if (slug) {
    const recipe = recipeCtrl.getRecipeBySlug(slug);
    if (recipe) currentRecipeStore.recipe = recipe;
  }
  cardCtrl.init?.();
  cardControlsCtrl.init?.();
}

export const cardPageCtrl: Ctrl = {
  async init() {
    activeFooterLink("/");
    showOverlayLoading();
    await recipeCtrl.init?.();
    if (recipesStore.loadError) {
      const onRetry = async () => {
        await recipeCtrl.init?.();
        if (!recipesStore.loadError) {
          hideOverlay();
          showCardAndControls();
        } else {
          showOverlayError(onRetry);
        }
      };
      showOverlayError(onRetry);
      return;
    }
    hideOverlay();
    showCardAndControls();
  },
  cleanUp() {
    cardCtrl.cleanUp?.();
    cardControlsCtrl.cleanUp?.();
  },
};

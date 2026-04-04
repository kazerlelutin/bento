import { Ctrl } from "@features/routes/routes.type";
import { cardCtrl } from "@/features/card/card.ctrl";
import { cardControlsCtrl } from "@features/card-controls/card-controls";
import { recipeCtrl } from "@features/recipes/recipe/recipe.ctrl";
import { recipesStore } from "@features/recipes/recipes.stores";
import { activeFooterLink } from "@/utils/active-footer-link";
import { getRouteContext } from "@features/router/route-context";
import { pathWithLang } from "@features/i18n/route-path";
import { showOverlayLoading, showOverlayError, hideOverlay } from "./card.utils";

function showCardAndControls(): void {
  cardCtrl.init?.();
  cardControlsCtrl.init?.();
}

export const cardPageCtrl: Ctrl = {
  async init() {
    const { lang } = getRouteContext();
    activeFooterLink(pathWithLang(lang));
    const hasInitialData =
      typeof document !== "undefined" &&
      document.getElementById("bento-initial-state")?.textContent?.trim();
    if (!hasInitialData) {
      showOverlayLoading();
    }
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
    if (!hasInitialData) {
      hideOverlay();
    }
    showCardAndControls();
  },
  cleanUp() {
    cardCtrl.cleanUp?.();
    cardControlsCtrl.cleanUp?.();
  },
};

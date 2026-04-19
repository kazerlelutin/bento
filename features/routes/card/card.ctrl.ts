import { Ctrl } from "@features/routes/routes.type";
import { cardCtrl } from "@/features/card/card.ctrl";
import { cardControlsCtrl } from "@features/card-controls/card-controls";
import { recipeCtrl } from "@features/recipes/recipe/recipe.ctrl";
import { recipesStore } from "@features/recipes/recipes.stores";
import { activeFooterLink } from "@/utils/active-footer-link";
import { getRouteContext } from "@features/router/route-context";
import { pathWithLang } from "@features/i18n/route-path";
import { replacePathSilently } from "@features/router/router.handlers";
import { currentRecipeStore } from "@features/recipes/recipe/recipe.store";
import { showOverlayLoading, showOverlayError, hideOverlay } from "./card.utils";

/** Sur l’accueil (`/{lang}`), aligne l’URL sur la recette affichée pour le partage (sans recharger la vue). */
function syncShareableRecipeUrlOnHome(): void {
  const { lang, recipeSlug } = getRouteContext();
  const recipe = currentRecipeStore.recipe;
  if (recipeSlug || !recipe) return;
  replacePathSilently(pathWithLang(lang, "recipes", recipe.slug));
}

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
    // Toujours masquer l’overlay au succès : avec SSG, hasInitialData évite showOverlayLoading
    // mais le template HTML affiche « Chargement… » tant que hidden n’est pas posé.
    hideOverlay();
    syncShareableRecipeUrlOnHome();
    showCardAndControls();
  },
  cleanUp() {
    cardCtrl.cleanUp?.();
    cardControlsCtrl.cleanUp?.();
  },
};

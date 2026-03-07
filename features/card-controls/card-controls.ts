import { CardControlsCtrl } from "@features/card-controls/card-controls.type";
import { ACTIONS } from "@features/card-controls/card-controls.const";
import { microGamesCtrl } from "@features/micro-games/micro-games.ctrl";
import { cardCtrl } from "@features/card/card.ctrl";
import { recipeCtrl } from "@features/recipes/recipe/recipe.ctrl";
import { currentRecipeStore } from "@features/recipes/recipe/recipe.store";

export const cardControlsCtrl: CardControlsCtrl = {
  init() {
    const container = document.getElementById("card-controls");
    if (container) container.addEventListener("click", this.handleClick);
  },
  handleClick(e: Event) {
    const target = e.target as HTMLElement;
    const button = target.closest("[data-action]");
    const action = button?.getAttribute("data-action") as keyof typeof ACTIONS | null;
    if (!action) return;

    if (action === ACTIONS.reject) {
      if (microGamesCtrl.spinTheWheel()) {
        microGamesCtrl.runGame();
        return;
      }
    }

    if (action === ACTIONS.reject || action === ACTIONS.like) {
      const nextRecipe = recipeCtrl.getRandomRecipe(action);
      currentRecipeStore.recipe = nextRecipe;
      cardCtrl.updateUI?.();
      return;
    }

    if (action === ACTIONS.favorite) {
      const current = currentRecipeStore.recipe;
      if (current?.slug) {
        recipeCtrl.toggleBookmark(current.slug);
        cardCtrl.updateUI?.();
      }
    }
  },
  cleanUp() {
    const container = document.getElementById('card-controls');
    if (container) container.removeEventListener('click', this.handleClick);
  }
}
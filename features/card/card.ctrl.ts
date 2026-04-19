import { CardCtrl } from "@features/card/card.type";
import type { Recipe } from "@features/recipes/recipe.type";
import { currentRecipeStore } from "@features/recipes/recipe/recipe.store";
import { recipesStore } from "@features/recipes/recipes.stores";
import {
  CARD_SERVING_DECREASE_ID,
  CARD_SERVING_INCREASE_ID,
  CARD_BENTO_COPY_ID,
  CARD_BENTO_PRINT_ID,
  CARD_BENTO_COPY_BOTTOM_ID,
  CARD_BENTO_PRINT_BOTTOM_ID,
  CARD_BENTO_MESSAGE_ID,
} from "@features/card/card.const";
import { refreshIngredientsAndServing } from "@features/card/card.utils";
import { applyRecipeToCardDom } from "@features/card/card.view-fill";
import { getRouteContext } from "@features/router/route-context";
import { copyTextToClipboard, fetchBentext, printBentextInWindow } from "@features/recipes/bentext.utils";
import { applyServingToBentext, buildBentextExportFromRecipe } from "@features/recipes/bentext.serving";
import { t } from "@features/translate/translate";
import { UI } from "@features/translate/translate.const";

let displayedRecipe: Recipe | null = null;
let displayedServing = 1;
let boundDocumentClick: ((e: Event) => void) | null = null;

function handleDocumentClick(e: Event): void {
  const target = e.target as HTMLElement;
  if (target.id === CARD_SERVING_DECREASE_ID || target.id === CARD_SERVING_INCREASE_ID) {
    if (!displayedRecipe) return;
    if (target.id === CARD_SERVING_DECREASE_ID) displayedServing = Math.max(1, displayedServing - 1);
    else displayedServing += 1;

    refreshIngredientsAndServing(displayedRecipe, displayedServing);
    return;
  }

  const isCopy =
    target.id === CARD_BENTO_COPY_ID || target.id === CARD_BENTO_COPY_BOTTOM_ID;
  const isPrint =
    target.id === CARD_BENTO_PRINT_ID || target.id === CARD_BENTO_PRINT_BOTTOM_ID;
  if (!isCopy && !isPrint) return;
  if (!displayedRecipe?.slug) return;

  const msgEl = document.getElementById(CARD_BENTO_MESSAGE_ID);
  const showMsg = (text: string, isError: boolean) => {
    if (!msgEl) return;
    msgEl.hidden = false;
    msgEl.textContent = text;
    msgEl.classList.toggle("card-bento-message--error", isError);
  };
  const hideMsg = () => {
    if (!msgEl) return;
    msgEl.hidden = true;
    msgEl.textContent = "";
    msgEl.classList.remove("card-bento-message--error");
  };

  void (async () => {
    try {
      const { lang } = getRouteContext();
      let raw: string;
      try {
        raw = await fetchBentext(displayedRecipe!.slug, lang);
      } catch {
        raw = buildBentextExportFromRecipe(displayedRecipe!);
      }
      const text = applyServingToBentext(raw, displayedRecipe!, displayedServing);
      if (isCopy) {
        await copyTextToClipboard(text);
        showMsg(t(UI["bentext-copied"]), false);
      } else {
        hideMsg();
        printBentextInWindow(text, displayedRecipe!.identity.name ?? displayedRecipe!.slug);
      }
    } catch {
      showMsg(t(UI["bentext-error"]), true);
    }
  })();
}

export const cardCtrl: CardCtrl = {
  init() {
    // Protect against duplicate listeners on route/language refreshes.
    this.cleanUp?.();
    boundDocumentClick = handleDocumentClick;
    document.addEventListener("click", boundDocumentClick);

    this.updateUI();
  },
  cleanUp() {
    if (boundDocumentClick) {
      document.removeEventListener("click", boundDocumentClick);
      boundDocumentClick = null;
    }
  },

  updateUI() {
    const recipe =
      currentRecipeStore.recipe ??
      recipesStore.recipes[Math.floor(Math.random() * Math.max(1, recipesStore.recipes.length))];

    if (!recipe) return;

    displayedRecipe = recipe;
    displayedServing = recipe.identity.servings || 1;

    applyRecipeToCardDom(document, recipe, getRouteContext().lang);
  },
};

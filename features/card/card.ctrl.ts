import { CardCtrl } from "@features/card/card.type";
import type { Recipe } from "@features/recipes/recipe.type";
import { currentRecipeStore } from "@features/recipes/recipe/recipe.store";
import { recipesStore } from "@features/recipes/recipes.stores";
import { cloneTemplate, getTemplate } from "@features/router/router.template";
import { setCardControlsAriaLabels } from "@features/card-controls/card-controls.aria";
import {
  CARD_SERVING_DECREASE_ID,
  CARD_SERVING_INCREASE_ID,
  CARD_STEPS_ID,
  CARD_NOTES_ID,
  CARD_BENTO_RECAP_ID,
  CARD_BENTO_DL_ID,
  CARD_BENTO_COPY_ID,
  CARD_BENTO_PRINT_ID,
  CARD_BENTO_MESSAGE_ID,
  CARD_BENTO_EXPORT_ID,
} from "@features/card/card.const";
import { refreshIngredientsAndServing } from "@features/card/card.utils";
import { hasBentoContent, renderCardBentoDl } from "@features/card/card.bento.utils";
import { copyTextToClipboard, fetchBentext, printBentextInWindow } from "@features/recipes/bentext.utils";
import { applyServingToBentext } from "@features/recipes/bentext.serving";
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

  if (target.id !== CARD_BENTO_COPY_ID && target.id !== CARD_BENTO_PRINT_ID) return;
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
      const raw = await fetchBentext(displayedRecipe!.slug);
      const text = applyServingToBentext(raw, displayedRecipe!, displayedServing);
      if (target.id === CARD_BENTO_COPY_ID) {
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

    const titleEl = document.getElementById("card-title");
    const descEl = document.getElementById("card-description");
    const imgEl = document.getElementById("card-img");

    if (titleEl) titleEl.textContent = recipe.identity.name;
    if (descEl) descEl.textContent = recipe.identity.description;

    if (imgEl) {
      imgEl.innerHTML = "";
      const tpl = cloneTemplate(getTemplate("placeholder-template"));

      if (recipe.image && tpl) {
        const img = tpl.querySelector("img") as HTMLImageElement | null;

        if (img) {
          img.setAttribute("src", recipe.image?.url ?? "");
          img.setAttribute("width", recipe.image?.width?.toString() ?? "");
          img.setAttribute("height", recipe.image?.height?.toString() ?? "");
        }

        imgEl.appendChild(tpl);
      }
    }

    const bentoRecap = document.getElementById(CARD_BENTO_RECAP_ID);
    const bentoDl = document.getElementById(CARD_BENTO_DL_ID) as HTMLDListElement | null;
    const bentoExport = document.getElementById(CARD_BENTO_EXPORT_ID);

    if (bentoExport) {
      bentoExport.setAttribute("aria-label", t(UI["bentext-actions-aria"]));
    }

    if (bentoRecap && bentoDl) {
      if (hasBentoContent(recipe.bento)) {
        bentoRecap.hidden = false;
        bentoRecap.setAttribute("aria-label", t(UI["bento-recap-aria"]));
        renderCardBentoDl(bentoDl, recipe.bento!);
      } else {
        bentoRecap.hidden = true;
        bentoRecap.removeAttribute("aria-label");
        bentoDl.innerHTML = "";
      }
    }

    const bentoMsg = document.getElementById(CARD_BENTO_MESSAGE_ID);
    if (bentoMsg) {
      bentoMsg.hidden = true;
      bentoMsg.textContent = "";
      bentoMsg.classList.remove("card-bento-message--error");
    }

    refreshIngredientsAndServing(displayedRecipe, displayedServing);

    const stepsEl = document.getElementById(CARD_STEPS_ID);

    if (stepsEl) {
      stepsEl.innerHTML = "";
      (recipe.steps ?? []).forEach((step) => {
        const li = document.createElement("li");
        li.textContent = step;
        stepsEl.appendChild(li);
      });
    }
    const notesEl = document.getElementById(CARD_NOTES_ID);

    if (notesEl) {
      notesEl.innerHTML = "";
      (recipe.notes ?? []).forEach((note) => {
        const li = document.createElement("li");
        li.textContent = note;
        notesEl.appendChild(li);
      });
    }

    setCardControlsAriaLabels();
  },
};

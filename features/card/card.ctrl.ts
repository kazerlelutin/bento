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
  MAIN_CARD_ID,
} from "@features/card/card.const";
import { refreshIngredientsAndServing } from "@features/card/card.utils";

let displayedRecipe: Recipe | null = null;
let displayedServing = 1;

export const cardCtrl: CardCtrl = {
  init() {
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target.id === CARD_SERVING_DECREASE_ID || target.id === CARD_SERVING_INCREASE_ID) {
        if (!displayedRecipe) return;
        if (target.id === CARD_SERVING_DECREASE_ID) displayedServing = Math.max(1, displayedServing - 1);
        else displayedServing += 1;

        refreshIngredientsAndServing(displayedRecipe, displayedServing);
      }
    });

    this.updateUI();
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

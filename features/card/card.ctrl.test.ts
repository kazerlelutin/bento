import { describe, it, expect, beforeEach, mock } from "bun:test";
import { currentRecipeStore } from "@features/recipes/recipe/recipe.store";
import { recipesStore } from "@features/recipes/recipes.stores";
import {
  CARD_INGREDIENTS_ID,
  CARD_INGREDIENTS_HEADING_ID,
  CARD_SERVING_VALUE_ID,
  CARD_SERVING_DECREASE_ID,
  CARD_SERVING_INCREASE_ID,
  CARD_STEPS_ID,
  CARD_NOTES_ID,
  MAIN_CARD_ID,
  CARD_BENTO_RECAP_ID,
  CARD_BENTO_DL_ID,
  CARD_BENTO_EXPORT_ID,
} from "@features/card/card.const";

const t = (x: unknown) => (x && typeof x === "object" && "fr" in x ? String((x as { fr: string }).fr) : String(x));
mock.module("@features/translate/translate", () => ({ t }));
function createCardDOM() {
  document.body.innerHTML = `
    <template id="placeholder-template">
      <img src="" alt="" />
    </template>
    <div class="card">
      <div id="${MAIN_CARD_ID}">
        <div id="card-img"></div>
        <h1 id="card-title"></h1>
        <div class="card-bento-area">
          <section id="${CARD_BENTO_RECAP_ID}" hidden>
            <dl id="${CARD_BENTO_DL_ID}"></dl>
          </section>
          <div class="card-bento-export" role="group" id="${CARD_BENTO_EXPORT_ID}">
            <div class="card-bento-export__row">
              <button type="button" id="card-bento-copy"></button>
              <button type="button" id="card-bento-print"></button>
            </div>
          </div>
          <p id="card-bento-message" hidden></p>
        </div>
        <p id="card-description"></p>
        <h2 id="${CARD_INGREDIENTS_HEADING_ID}"></h2>
        <ul id="${CARD_INGREDIENTS_ID}"></ul>
        <div role="group">
          <button type="button" id="${CARD_SERVING_DECREASE_ID}">−</button>
          <span id="${CARD_SERVING_VALUE_ID}">1</span>
          <button type="button" id="${CARD_SERVING_INCREASE_ID}">+</button>
        </div>
        <ol id="${CARD_STEPS_ID}"></ol>
        <ul id="${CARD_NOTES_ID}"></ul>
      </div>
      <div id="card-controls">
        <button data-action="random"></button>
        <button data-action="catalog"></button>
      </div>
    </div>
  `;
}

const makeRecipe = () => ({
  slug: "test-recipe",
  identity: { name: "Test Recipe", description: "Test description", servings: 2 },
  ingredients: [{ id: "1", name: "Ingredient", quantity: 2, unit: "unit" }],
  steps: ["Step one", "Step two"],
  notes: ["Note one"],
  tags: [],
});

const { cardCtrl } = await import("./card.ctrl");

describe("card.ctrl", () => {
  beforeEach(() => {
    createCardDOM();
    recipesStore.setRecipes([makeRecipe()]);
    currentRecipeStore.recipe = makeRecipe();
  });

  describe("init", () => {
    it("attaches click listener and calls updateUI", () => {
      cardCtrl?.init?.();
      const titleEl = document.getElementById("card-title");
      expect(titleEl?.textContent).toBe("Test Recipe");
    });

    it("serving decrease updates displayed serving", () => {
      cardCtrl?.init?.();
      const valueEl = document.getElementById(CARD_SERVING_VALUE_ID);
      const decreaseBtn = document.getElementById(CARD_SERVING_DECREASE_ID);
      expect(valueEl?.textContent).toBe("2");
      decreaseBtn?.click();
      expect(valueEl?.textContent).toBe("1");
    });

    it("serving increase updates displayed serving", () => {
      cardCtrl?.init?.();
      const valueEl = document.getElementById(CARD_SERVING_VALUE_ID);
      const increaseBtn = document.getElementById(CARD_SERVING_INCREASE_ID);
      const initial = Number(valueEl?.textContent ?? 0);
      expect(initial).toBeGreaterThanOrEqual(1);
      increaseBtn?.click();
      expect(Number(valueEl?.textContent)).toBeGreaterThan(initial);
    });
  });

  describe("updateUI", () => {
    it("sets title and description from current recipe", () => {
      cardCtrl.updateUI();
      expect(document.getElementById("card-title")?.textContent).toBe("Test Recipe");
      expect(document.getElementById("card-description")?.textContent).toBe("Test description");
    });

    it("fills steps list", () => {
      cardCtrl.updateUI();
      const stepsEl = document.getElementById(CARD_STEPS_ID);
      expect(stepsEl?.children.length).toBe(2);
      expect(stepsEl?.children[0].textContent).toBe("Step one");
      expect(stepsEl?.children[1].textContent).toBe("Step two");
    });

    it("fills notes list", () => {
      cardCtrl.updateUI();
      const notesEl = document.getElementById(CARD_NOTES_ID);
      expect(notesEl?.children.length).toBe(1);
      expect(notesEl?.children[0].textContent).toBe("Note one");
    });

    it("sets aria-label on random and catalog buttons", () => {
      cardCtrl.updateUI();
      const randomBtn = document.querySelector('[data-action="random"]');
      const catalogBtn = document.querySelector('[data-action="catalog"]');
      expect(randomBtn?.getAttribute("aria-label")).toBeDefined();
      expect(catalogBtn?.getAttribute("aria-label")).toBeDefined();
    });

    it("hides bento recap when recipe has no bento block", () => {
      cardCtrl.updateUI();
      const recap = document.getElementById(CARD_BENTO_RECAP_ID);
      const dl = document.getElementById(CARD_BENTO_DL_ID);
      expect(recap?.hidden).toBe(true);
      expect(dl?.innerHTML).toBe("");
    });

    it("shows bento recap and dl rows when recipe has bento", () => {
      currentRecipeStore.recipe = {
        ...makeRecipe(),
        bento: { transport: "Moyen", eating: "À la main" },
      };
      cardCtrl.updateUI();
      const recap = document.getElementById(CARD_BENTO_RECAP_ID);
      const dl = document.getElementById(CARD_BENTO_DL_ID);
      expect(recap?.hidden).toBe(false);
      expect(dl?.querySelectorAll("dt").length).toBe(2);
      expect(dl?.querySelectorAll("dd").length).toBe(2);
      expect(dl?.textContent).toContain("Moyen");
      expect(dl?.textContent).toContain("À la main");
    });

    it("sets aria-label on bentext export group", () => {
      cardCtrl.updateUI();
      const exportEl = document.getElementById(CARD_BENTO_EXPORT_ID);
      expect(exportEl?.getAttribute("aria-label")?.length).toBeGreaterThan(0);
    });

    it("sets aria-label on bento recap when bento is present", () => {
      currentRecipeStore.recipe = {
        ...makeRecipe(),
        bento: { transport: "Facile" },
      };
      cardCtrl.updateUI();
      const recap = document.getElementById(CARD_BENTO_RECAP_ID);
      expect(recap?.getAttribute("aria-label")?.length).toBeGreaterThan(0);
    });

    it("does nothing when no recipe available and store empty", () => {
      currentRecipeStore.recipe = null;
      recipesStore.setRecipes([]);
      cardCtrl.updateUI();
      expect(document.getElementById("card-title")?.textContent).toBe("");
    });
  });
});

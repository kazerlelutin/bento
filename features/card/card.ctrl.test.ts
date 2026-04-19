import { describe, it, expect, beforeEach } from "bun:test";
import { currentRecipeStore } from "@features/recipes/recipe/recipe.store";
import { recipesStore } from "@features/recipes/recipes.stores";
import { setRouteContext } from "@features/router/route-context";
import { translateStore } from "@features/translate/translate.store";
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
  CARD_BENTO_BLOCK_TITLE_ID,
  CARD_BENTO_PRIMARY_ID,
  CARD_BENTO_SECONDARY_WRAP_ID,
  CARD_BENTO_SECONDARY_DL_ID,
  CARD_BENTO_EXPORT_ID,
  CARD_BENTO_EXPORT_BOTTOM_ID,
  CARD_BENTO_SHARE_ID,
  CARD_BENTO_SHARE_BOTTOM_ID,
} from "@features/card/card.const";

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
            <h2 id="${CARD_BENTO_BLOCK_TITLE_ID}" hidden></h2>
            <div id="${CARD_BENTO_PRIMARY_ID}" hidden></div>
            <details id="${CARD_BENTO_SECONDARY_WRAP_ID}" hidden>
              <summary class="card-bento-secondary-summary"><span class="card-bento-secondary-summary__label" data-translate="bento-secondary-summary"></span></summary>
              <dl id="${CARD_BENTO_SECONDARY_DL_ID}"></dl>
            </details>
          </section>
          <div class="card-bento-export" role="group" id="${CARD_BENTO_EXPORT_ID}">
            <div class="card-bento-export__row">
              <button type="button" id="card-bento-share"></button>
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
        <div class="card-bento-export card-bento-export--bottom" role="group" id="${CARD_BENTO_EXPORT_BOTTOM_ID}">
          <div class="card-bento-export__row">
            <button type="button" id="card-bento-share-bottom"></button>
            <button type="button" id="card-bento-print-bottom"></button>
          </div>
        </div>
      </div>
      <div id="card-controls">
        <button data-action="random" type="button"></button>
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
    setRouteContext({ lang: "fr" });
    translateStore.currentLanguage = "fr";
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

    it("does not stack click listeners when init is called multiple times", () => {
      cardCtrl?.init?.();
      cardCtrl?.init?.();
      const valueEl = document.getElementById(CARD_SERVING_VALUE_ID);
      const increaseBtn = document.getElementById(CARD_SERVING_INCREASE_ID);
      expect(valueEl?.textContent).toBe("2");
      increaseBtn?.click();
      expect(valueEl?.textContent).toBe("3");
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

    it("sets visible label on random button", () => {
      cardCtrl.updateUI();
      const randomBtn = document.querySelector('[data-action="random"]') as HTMLButtonElement | null;
      expect(randomBtn?.textContent?.trim()).toBeTruthy();
      expect(randomBtn?.getAttribute("aria-label")).toBe(randomBtn?.textContent?.trim() ?? "");
    });

    it("hides bento recap when recipe has no bento block", () => {
      cardCtrl.updateUI();
      const recap = document.getElementById(CARD_BENTO_RECAP_ID);
      const primary = document.getElementById(CARD_BENTO_PRIMARY_ID);
      const dl = document.getElementById(CARD_BENTO_SECONDARY_DL_ID);
      expect(recap?.hidden).toBe(true);
      expect(primary?.innerHTML).toBe("");
      expect(dl?.innerHTML).toBe("");
    });

    it("shows bento recap with piliers when recipe has bento", () => {
      currentRecipeStore.recipe = {
        ...makeRecipe(),
        bento: { transport: "Moyen", eating: "À la main" },
      };
      cardCtrl.updateUI();
      const recap = document.getElementById(CARD_BENTO_RECAP_ID);
      const primary = document.getElementById(CARD_BENTO_PRIMARY_ID);
      expect(recap?.hidden).toBe(false);
      expect(primary?.querySelectorAll(".card-bento-pillar").length).toBe(2);
      expect(primary?.textContent).toContain("Moyen");
      expect(primary?.textContent).toContain("À la main");
    });

    it("sets aria-label on bentext export groups", () => {
      cardCtrl.updateUI();
      const exportEl = document.getElementById(CARD_BENTO_EXPORT_ID);
      const exportBottom = document.getElementById(CARD_BENTO_EXPORT_BOTTOM_ID);
      expect(exportEl?.getAttribute("aria-label")?.length).toBeGreaterThan(0);
      expect(exportBottom?.getAttribute("aria-label")?.length).toBeGreaterThan(0);
    });

    it("sans Web Share, libellé des boutons bentext : Copier le lien", () => {
      cardCtrl.updateUI();
      expect(document.getElementById(CARD_BENTO_SHARE_ID)?.textContent).toBe("Copier le lien");
      expect(document.getElementById(CARD_BENTO_SHARE_BOTTOM_ID)?.textContent).toBe("Copier le lien");
      expect(document.getElementById(CARD_BENTO_SHARE_ID)?.getAttribute("data-translate")).toBe(
        "bentext-copy-link-short"
      );
    });

    it("avec Web Share, libellé des boutons bentext : Partager", () => {
      const prev = Object.getOwnPropertyDescriptor(Navigator.prototype, "share");
      Object.defineProperty(Navigator.prototype, "share", {
        configurable: true,
        value: async () => {},
      });
      try {
        cardCtrl.updateUI();
        expect(document.getElementById(CARD_BENTO_SHARE_ID)?.textContent).toBe("Partager");
        expect(document.getElementById(CARD_BENTO_SHARE_ID)?.getAttribute("data-translate")).toBe(
          "bentext-share-short"
        );
      } finally {
        if (prev) {
          Object.defineProperty(Navigator.prototype, "share", prev);
        } else {
          delete (Navigator.prototype as { share?: unknown }).share;
        }
      }
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

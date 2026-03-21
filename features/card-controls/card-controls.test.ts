import { describe, it, expect, beforeEach, afterEach, afterAll, mock } from "bun:test";
import { currentRecipeStore } from "@features/recipes/recipe/recipe.store";
import { recipesStore } from "@features/recipes/recipes.stores";
import { routerState } from "@features/router/router.state";

const updateUI = mock(() => {});
const navigateInternal = mock((_path: string) => {});

mock.module("@features/card/card.ctrl", () => ({ cardCtrl: { updateUI } }));
mock.module("@features/router/router.handlers", () => ({
  navigateInternal,
  handleLinkClick: () => {},
}));

const { cardControlsCtrl } = await import("./card-controls");
const { recipeCtrl } = await import("@features/recipes/recipe/recipe.ctrl");
const { ACTIONS } = await import("./card-controls.const");

const makeRecipe = (slug: string) => ({
  slug,
  identity: { name: slug, description: "", servings: 1 },
  ingredients: [],
  steps: [],
  notes: [],
  tags: [],
});

afterAll(() => {
  mock.restore();
});

describe("card-controls", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="card-controls">
        <button data-action="${ACTIONS.random}">Random</button>
        <button data-action="${ACTIONS.catalog}">Catalog</button>
      </div>
    `;
    navigateInternal.mockClear();
    updateUI.mockClear();
    recipesStore.setRecipes([makeRecipe("a"), makeRecipe("b"), makeRecipe("c")]);
    currentRecipeStore.recipe = makeRecipe("a");
    history.replaceState({}, "", "/");
    routerState.currentPage = "/";
  });

  afterEach(() => {
    cardControlsCtrl.cleanUp?.();
    document.body.innerHTML = "";
    history.replaceState({}, "", "/");
    routerState.currentPage = "/";
  });

  describe("init", () => {
    it("attaches listener so random updates recipe and UI on home", () => {
      cardControlsCtrl.init?.();
      const btn = document.querySelector(`[data-action="${ACTIONS.random}"]`);
      (btn as HTMLElement)?.click();
      expect(updateUI).toHaveBeenCalled();
      expect(currentRecipeStore.recipe).not.toBeNull();
    });
  });

  describe("handleClick", () => {
    beforeEach(() => cardControlsCtrl.init?.());

    it("on home: random calls pickRandomRecipe and updateUI", () => {
      const btn = document.querySelector(`[data-action="${ACTIONS.random}"]`);
      (btn as HTMLElement)?.click();
      expect(currentRecipeStore.recipe).not.toBeNull();
      expect(updateUI).toHaveBeenCalled();
    });

    it("on /recipes: random navigates to /?slug=...", () => {
      navigateInternal.mockClear();
      routerState.currentPage = "/recipes";
      const btn = document.querySelector(`[data-action="${ACTIONS.random}"]`);
      (btn as HTMLElement)?.click();
      expect(navigateInternal).toHaveBeenCalled();
      const call = navigateInternal.mock.calls[0]?.[0] as string;
      expect(call).toContain("slug=");
    });

    it("on home: catalog navigates to /recipes", () => {
      const btn = document.querySelector(`[data-action="${ACTIONS.catalog}"]`);
      (btn as HTMLElement)?.click();
      expect(navigateInternal).toHaveBeenCalledWith("/recipes");
    });

    it("on /recipes: catalog focuses search input", () => {
      document.body.innerHTML = `
        <input type="search" id="recipes-search" />
        <div id="card-controls">
          <button data-action="${ACTIONS.random}">R</button>
          <button data-action="${ACTIONS.catalog}">C</button>
        </div>
      `;
      cardControlsCtrl.cleanUp?.();
      cardControlsCtrl.init?.();
      routerState.currentPage = "/recipes";
      const search = document.getElementById("recipes-search") as HTMLInputElement;
      const focusSpy = mock(() => {});
      search.focus = focusSpy as typeof search.focus;
      const btn = document.querySelector(`[data-action="${ACTIONS.catalog}"]`);
      (btn as HTMLElement)?.click();
      expect(focusSpy).toHaveBeenCalled();
    });

    it("ignores click when target has no data-action", () => {
      const container = document.getElementById("card-controls");
      updateUI.mockClear();
      container?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      expect(updateUI).not.toHaveBeenCalled();
    });
  });

  describe("cleanUp", () => {
    it("removes click listener", () => {
      cardControlsCtrl.init?.();
      cardControlsCtrl.cleanUp?.();
      updateUI.mockClear();
      const btn = document.querySelector(`[data-action="${ACTIONS.random}"]`);
      (btn as HTMLElement)?.click();
      expect(updateUI).not.toHaveBeenCalled();
    });
  });
});

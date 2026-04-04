import { describe, it, expect, beforeEach, afterEach, afterAll, mock } from "bun:test";
import { currentRecipeStore } from "@features/recipes/recipe/recipe.store";
import { recipesStore } from "@features/recipes/recipes.stores";
import { routerState } from "@features/router/router.state";
import { setRouteContext } from "@features/router/route-context";

const updateUI = mock(() => {});
const navigateInternal = mock((_path: string) => {});

const realRouterHandlers = await import("@features/router/router.handlers");

mock.module("@features/card/card.ctrl", () => ({ cardCtrl: { updateUI } }));
mock.module("@features/router/router.handlers", () => ({
  handleRouteChange: realRouterHandlers.handleRouteChange,
  handleLinkClick: realRouterHandlers.handleLinkClick,
  navigateInternal,
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
    setRouteContext({ lang: "fr" });
    document.body.innerHTML = `
      <div id="card-controls">
        <button data-action="${ACTIONS.random}">Random</button>
      </div>
    `;
    navigateInternal.mockClear();
    updateUI.mockClear();
    recipesStore.setRecipes([makeRecipe("a"), makeRecipe("b"), makeRecipe("c")]);
    currentRecipeStore.recipe = makeRecipe("a");
    history.replaceState({}, "", "/fr");
    routerState.currentPage = "/fr";
  });

  afterEach(() => {
    cardControlsCtrl.cleanUp?.();
    document.body.innerHTML = "";
    history.replaceState({}, "", "/fr");
    routerState.currentPage = "/fr";
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

    it("on /fr/recipes: random navigates to /fr/recipes/:slug", () => {
      navigateInternal.mockClear();
      routerState.currentPage = "/fr/recipes";
      setRouteContext({ lang: "fr" });
      const btn = document.querySelector(`[data-action="${ACTIONS.random}"]`);
      (btn as HTMLElement)?.click();
      expect(navigateInternal).toHaveBeenCalled();
      const call = navigateInternal.mock.calls[0]?.[0] as string;
      expect(call).toMatch(/\/fr\/recipes\//);
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

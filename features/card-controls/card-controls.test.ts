import { describe, it, expect, beforeEach, afterEach, mock } from "bun:test";
import { currentRecipeStore } from "@features/recipes/recipe/recipe.store";
import { recipesStore } from "@features/recipes/recipes.stores";

const runGame = mock(() => { });
const spinTheWheel = mock(() => false);
const updateUI = mock(() => { });

mock.module("@features/micro-games/micro-games.ctrl", () => ({
  microGamesCtrl: { spinTheWheel, runGame },
}));
mock.module("@features/card/card.ctrl", () => ({ cardCtrl: { updateUI } }));

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

describe("card-controls", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="card-controls">
        <button data-action="${ACTIONS.reject}">Reject</button>
        <button data-action="${ACTIONS.like}">Like</button>
        <button data-action="${ACTIONS.favorite}">Favorite</button>
      </div>
    `;
    runGame.mockClear();
    spinTheWheel.mockClear();
    updateUI.mockClear();
    recipeCtrl.resetPreferences();
    recipesStore.setRecipes([makeRecipe("a"), makeRecipe("b"), makeRecipe("c")]);
    currentRecipeStore.recipe = makeRecipe("a");
  });

  afterEach(() => {
    cardControlsCtrl.cleanUp?.();
    document.body.innerHTML = "";
  });

  describe("init", () => {
    it("attaches click listener to card-controls container", () => {
      cardControlsCtrl.init?.();
      const rejectBtn = document.querySelector(`[data-action="${ACTIONS.reject}"]`);
      (rejectBtn as HTMLElement)?.click();
      expect(updateUI).toHaveBeenCalled();
    });

    it("does nothing when card-controls element is missing", () => {
      document.body.innerHTML = "";
      expect(() => cardControlsCtrl.init?.()).not.toThrow();
    });
  });

  describe("handleClick", () => {
    beforeEach(() => cardControlsCtrl.init?.());

    it("calls getRandomRecipe and updateUI on reject when wheel does not spin", () => {
      spinTheWheel.mockReturnValueOnce(false);
      const btn = document.querySelector(`[data-action="${ACTIONS.reject}"]`);
      (btn as HTMLElement)?.click();
      expect(spinTheWheel).toHaveBeenCalled();
      expect(currentRecipeStore.recipe).not.toBeNull();
      expect(updateUI).toHaveBeenCalled();
    });

    it("runs micro game on reject when spinTheWheel returns true", () => {
      spinTheWheel.mockReturnValueOnce(true);
      updateUI.mockClear();
      const btn = document.querySelector(`[data-action="${ACTIONS.reject}"]`);
      (btn as HTMLElement)?.click();
      expect(runGame).toHaveBeenCalled();
      expect(updateUI).not.toHaveBeenCalled();
    });

    it("calls getRandomRecipe and updateUI on like", () => {
      const btn = document.querySelector(`[data-action="${ACTIONS.like}"]`);
      (btn as HTMLElement)?.click();
      expect(currentRecipeStore.recipe).not.toBeNull();
      expect(updateUI).toHaveBeenCalled();
    });

    it("calls toggleBookmark and updateUI on favorite when current recipe has slug", () => {
      currentRecipeStore.recipe = makeRecipe("current-recipe");
      const btn = document.querySelector(`[data-action="${ACTIONS.favorite}"]`);
      (btn as HTMLElement)?.click();
      expect(recipeCtrl.isBookmarked("current-recipe")).toBe(true);
      expect(updateUI).toHaveBeenCalled();
    });

    it("does nothing on favorite when current recipe has no slug", () => {
      currentRecipeStore.recipe = null;
      updateUI.mockClear();
      const btn = document.querySelector(`[data-action="${ACTIONS.favorite}"]`);
      (btn as HTMLElement)?.click();
      expect(updateUI).not.toHaveBeenCalled();
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
      const btn = document.querySelector(`[data-action="${ACTIONS.like}"]`);
      (btn as HTMLElement)?.click();
      expect(updateUI).not.toHaveBeenCalled();
    });
  });
});

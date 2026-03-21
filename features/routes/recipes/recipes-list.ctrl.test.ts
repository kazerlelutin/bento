import { describe, it, expect, beforeEach, afterAll, mock } from "bun:test";
import { recipesStore } from "@features/recipes/recipes.stores";
import {
  RECIPES_CONTAINER_ID,
  RECIPES_LIST_ID,
  RECIPES_EMPTY_ID,
  RECIPES_SEARCH_ID,
  RECIPES_LOAD_ERROR_ID,
  RECIPES_LOAD_ERROR_MESSAGE_ID,
  RECIPES_LOAD_ERROR_RETRY_ID,
} from "./recipes-list.const";

const tMock = (x: unknown) => (x && typeof x === "object" && "fr" in x ? String((x as { fr: string }).fr) : String(x));
mock.module("@features/translate/translate", () => ({ t: tMock }));
mock.module("@features/recipes/recipes.ctrl", () => ({
  recipesCtrl: { init: async () => {} },
}));
mock.module("@features/routes/routes", () => ({
  routes: new Map(),
}));
mock.module("@/features/router/router.handlers", () => ({
  handleLinkClick: () => {},
}));
mock.module("@features/card-controls/card-controls", () => ({
  cardControlsCtrl: { init: () => {}, cleanUp: () => {} },
}));
mock.module("@features/card-controls/card-controls.aria", () => ({
  setCardControlsAriaLabels: () => {},
}));

const { default: recipesListCtrl } = await import("./recipes-list.ctrl");

afterAll(() => {
  mock.restore();
});

const makeRecipe = (slug: string, name: string) => ({
  slug,
  identity: { name, description: "D", servings: 1 },
  ingredients: [],
  steps: [],
  notes: [],
  tags: [],
});

function createRecipesDOM() {
  document.body.innerHTML = `
    <div id="${RECIPES_CONTAINER_ID}">
      <h1></h1>
      <div id="${RECIPES_LOAD_ERROR_ID}" hidden>
        <p id="${RECIPES_LOAD_ERROR_MESSAGE_ID}"></p>
        <button type="button" id="${RECIPES_LOAD_ERROR_RETRY_ID}"></button>
      </div>
      <input type="text" id="${RECIPES_SEARCH_ID}" />
      <div id="${RECIPES_LIST_ID}"></div>
      <p id="${RECIPES_EMPTY_ID}"></p>
    </div>
  `;
}

describe("recipes-list.ctrl", () => {
  beforeEach(() => {
    createRecipesDOM();
    recipesStore.setRecipes([]);
    recipesStore.setLoadError(null);
  });

  it("shows error block when recipesStore has loadError", async () => {
    recipesStore.setLoadError("recipes-load-error");
    await recipesListCtrl.init();
    const errorEl = document.getElementById(RECIPES_LOAD_ERROR_ID);
    const listEl = document.getElementById(RECIPES_LIST_ID);
    expect(errorEl?.hidden).toBe(false);
    expect(listEl?.hidden).toBe(true);
  });

  it("hides error block and shows list when no loadError", async () => {
    await recipesListCtrl.init();
    const errorEl = document.getElementById(RECIPES_LOAD_ERROR_ID);
    const listEl = document.getElementById(RECIPES_LIST_ID);
    expect(errorEl?.hidden).toBe(true);
    expect(listEl?.hidden).toBe(false);
  });

  it("shows all-recipes-empty when store has no recipes", async () => {
    await recipesListCtrl.init();
    const emptyEl = document.getElementById(RECIPES_EMPTY_ID);
    expect(emptyEl?.hidden).toBe(false);
    expect(emptyEl?.textContent).toBeDefined();
  });

  it("renders all recipes sorted by name with links", async () => {
    const r1 = makeRecipe("r1", "Bananes");
    const r2 = makeRecipe("r2", "Pommes");
    recipesStore.setRecipes([r1, r2]);
    await recipesListCtrl.init();
    const listEl = document.getElementById(RECIPES_LIST_ID);
    const links = listEl?.querySelectorAll("a.favorites-item");
    expect(links?.length).toBe(2);
    expect(links?.[0].textContent).toBe("Bananes");
    expect(links?.[1].textContent).toBe("Pommes");
    expect(listEl?.innerHTML).toContain("slug=r1");
    expect(listEl?.innerHTML).toContain("slug=r2");
  });

  it("filters list on search input", async () => {
    const r1 = makeRecipe("r1", "Pommes");
    const r2 = makeRecipe("r2", "Bananes");
    recipesStore.setRecipes([r1, r2]);
    await recipesListCtrl.init();
    const searchEl = document.getElementById(RECIPES_SEARCH_ID) as HTMLInputElement;
    const listEl = document.getElementById(RECIPES_LIST_ID);
    expect(listEl?.querySelectorAll("a.favorites-item").length).toBe(2);
    searchEl!.value = "pom";
    searchEl!.dispatchEvent(new Event("input", { bubbles: true }));
    await Promise.resolve();
    const links = listEl?.querySelectorAll("a.favorites-item");
    expect(links?.length).toBe(1);
    expect(links?.[0].textContent).toBe("Pommes");
  });

  it("shows all-recipes-no-results when search has no match", async () => {
    const r1 = makeRecipe("r1", "Pommes");
    recipesStore.setRecipes([r1]);
    await recipesListCtrl.init();
    const searchEl = document.getElementById(RECIPES_SEARCH_ID) as HTMLInputElement;
    const emptyEl = document.getElementById(RECIPES_EMPTY_ID);
    searchEl.value = "xyz";
    searchEl.dispatchEvent(new Event("input", { bubbles: true }));
    expect(emptyEl?.hidden).toBe(false);
    expect(emptyEl?.textContent).toBeDefined();
  });
});

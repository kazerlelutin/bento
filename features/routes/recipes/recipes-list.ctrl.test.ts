import { describe, it, expect, beforeEach, afterAll, mock } from "bun:test";
import { recipesStore } from "@features/recipes/recipes.stores";
import {
  RECIPES_CONTAINER_ID,
  RECIPES_SEARCH_TOOLBAR_ID,
  RECIPES_FILTER_CHIPS_ID,
  RECIPES_FILTER_ADD_ID,
  RECIPES_FILTER_POPOVER_ID,
  RECIPES_FILTER_FIELD_ID,
  RECIPES_FILTER_VALUE_ID,
  RECIPES_FILTER_APPLY_ID,
  RECIPES_LIST_WRAP_ID,
  RECIPES_LIST_LOADING_ID,
  RECIPES_LIST_ID,
  RECIPES_EMPTY_ID,
  RECIPES_SEARCH_ID,
  RECIPES_LOAD_ERROR_ID,
  RECIPES_LOAD_ERROR_MESSAGE_ID,
  RECIPES_LOAD_ERROR_RETRY_ID,
} from "./recipes-list.const";
import { setRouteContext } from "@features/router/route-context";

const tMock = (x: unknown) => (x && typeof x === "object" && "fr" in x ? String((x as { fr: string }).fr) : String(x));
mock.module("@features/translate/translate", () => ({ t: tMock }));
mock.module("@features/recipes/recipes.ctrl", () => ({
  recipesCtrl: { init: async () => {} },
}));
mock.module("@features/routes/routes", () => ({
  routes: new Map(),
}));

const realRouterHandlers = await import("@/features/router/router.handlers");
mock.module("@/features/router/router.handlers", () => ({
  ...realRouterHandlers,
  handleLinkClick: () => {},
  navigateInternal: () => {},
}));
mock.module("@features/meta/meta.ctrl", () => ({
  applyRecipesCatalogDefaultMeta: () => {},
  applyRecipesCatalogFilterMeta: () => {},
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
      <div id="${RECIPES_SEARCH_TOOLBAR_ID}">
        <div id="${RECIPES_FILTER_CHIPS_ID}"></div>
        <div class="recipes-search-row">
          <button type="button" id="${RECIPES_FILTER_ADD_ID}">+</button>
          <input type="search" id="${RECIPES_SEARCH_ID}" />
        </div>
        <div id="${RECIPES_FILTER_POPOVER_ID}" hidden role="dialog">
          <label id="recipes-filter-field-label" for="${RECIPES_FILTER_FIELD_ID}"></label>
          <select id="${RECIPES_FILTER_FIELD_ID}"></select>
          <label id="recipes-filter-value-label" for="${RECIPES_FILTER_VALUE_ID}"></label>
          <select id="${RECIPES_FILTER_VALUE_ID}"></select>
          <button type="button" id="${RECIPES_FILTER_APPLY_ID}"></button>
        </div>
      </div>
      <div id="${RECIPES_LIST_WRAP_ID}">
        <div id="${RECIPES_LIST_LOADING_ID}" hidden></div>
        <div id="${RECIPES_LIST_ID}"></div>
      </div>
      <p id="${RECIPES_EMPTY_ID}"></p>
    </div>
  `;
}

describe("recipes-list.ctrl", () => {
  beforeEach(() => {
    setRouteContext({ lang: "fr" });
    window.history.replaceState({}, "", "/");
    createRecipesDOM();
    recipesStore.setRecipes([]);
    recipesStore.setLoadError(null);
  });

  it("shows error block when recipesStore has loadError", async () => {
    recipesStore.setLoadError("recipes-load-error");
    await recipesListCtrl.init();
    const errorEl = document.getElementById(RECIPES_LOAD_ERROR_ID);
    const listEl = document.getElementById(RECIPES_LIST_ID);
    const toolbarEl = document.getElementById(RECIPES_SEARCH_TOOLBAR_ID);
    expect(errorEl?.hidden).toBe(false);
    expect(listEl?.hidden).toBe(true);
    expect(toolbarEl?.hidden).toBe(true);
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
    expect(listEl?.innerHTML).toContain("/fr/recipes/r1");
    expect(listEl?.innerHTML).toContain("/fr/recipes/r2");
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

  it("filters recipes by bento query param", async () => {
    const prev = window.location;
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { ...prev, search: "?transport=transport_easy", pathname: "/fr/recipes" },
    });
    try {
      const r1 = { ...makeRecipe("r1", "A"), bento: { transport: "Facile" } };
      const r2 = { ...makeRecipe("r2", "B"), bento: { transport: "Moyen" } };
      recipesStore.setRecipes([r1, r2]);
      await recipesListCtrl.init();
      const listEl = document.getElementById(RECIPES_LIST_ID);
      expect(listEl?.querySelectorAll("a.favorites-item").length).toBe(1);
      expect(listEl?.textContent).toContain("A");
    } finally {
      Object.defineProperty(window, "location", { configurable: true, value: prev });
    }
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

import { describe, it, expect, beforeEach, mock } from "bun:test";
import { recipesStore } from "@features/recipes/recipes.stores";
import { recipeCtrl } from "@features/recipes/recipe/recipe.ctrl";
import { recipesCtrl } from "@features/recipes/recipes.ctrl";
import {
  FAVORITES_CONTAINER_ID,
  FAVORITES_LIST_ID,
  FAVORITES_EMPTY_ID,
  FAVORITES_SEARCH_ID,
  FAVORITES_LOAD_ERROR_ID,
  FAVORITES_LOAD_ERROR_MESSAGE_ID,
  FAVORITES_LOAD_ERROR_RETRY_ID,
} from "./favorites.const";

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

const { default: favoritesCtrl } = await import("./favorites.ctrl");

const makeRecipe = (slug: string, name: string) => ({
  slug,
  identity: { name, description: "D", servings: 1 },
  ingredients: [],
  steps: [],
  notes: [],
  tags: [],
});

function createFavoritesDOM() {
  document.body.innerHTML = `
    <div id="${FAVORITES_CONTAINER_ID}">
      <h1></h1>
      <div id="${FAVORITES_LOAD_ERROR_ID}" hidden>
        <p id="${FAVORITES_LOAD_ERROR_MESSAGE_ID}"></p>
        <button type="button" id="${FAVORITES_LOAD_ERROR_RETRY_ID}"></button>
      </div>
      <input type="text" id="${FAVORITES_SEARCH_ID}" />
      <div id="${FAVORITES_LIST_ID}"></div>
      <p id="${FAVORITES_EMPTY_ID}"></p>
    </div>
  `;
}

describe("favorites.ctrl", () => {
  beforeEach(() => {
    createFavoritesDOM();
    recipesStore.setRecipes([]);
    recipesStore.setLoadError(null);
    recipeCtrl.loadPreferences();
  });

  it("shows error block when recipesStore has loadError", async () => {
    recipesStore.setLoadError("recipes-load-error");
    await favoritesCtrl.init();
    const errorEl = document.getElementById(FAVORITES_LOAD_ERROR_ID);
    const listEl = document.getElementById(FAVORITES_LIST_ID);
    expect(errorEl?.hidden).toBe(false);
    expect(listEl?.hidden).toBe(true);
  });

  it("sets error message and retry button when loadError", async () => {
    recipesStore.setLoadError("err");
    await favoritesCtrl.init();
    const msgEl = document.getElementById(FAVORITES_LOAD_ERROR_MESSAGE_ID);
    const retryBtn = document.getElementById(FAVORITES_LOAD_ERROR_RETRY_ID);
    expect(msgEl?.textContent).toBeDefined();
    expect(retryBtn?.textContent).toBeDefined();
    expect(retryBtn?.getAttribute("aria-label")).toBeDefined();
  });

  it("hides error block and shows list when no loadError", async () => {
    await favoritesCtrl.init();
    const errorEl = document.getElementById(FAVORITES_LOAD_ERROR_ID);
    const listEl = document.getElementById(FAVORITES_LIST_ID);
    expect(errorEl?.hidden).toBe(true);
    expect(listEl?.hidden).toBe(false);
  });

  it("shows favorites-empty when no bookmarks", async () => {
    await favoritesCtrl.init();
    const emptyEl = document.getElementById(FAVORITES_EMPTY_ID);
    expect(emptyEl?.hidden).toBe(false);
    expect(emptyEl?.textContent).toBeDefined();
  });

  it("renders list of bookmarked recipes with links", async () => {
    const r1 = makeRecipe("r1", "Pommes");
    const r2 = makeRecipe("r2", "Bananes");
    recipesStore.setRecipes([r1, r2]);
    recipeCtrl.toggleBookmark("r1");
    recipeCtrl.toggleBookmark("r2");
    await favoritesCtrl.init();
    const listEl = document.getElementById(FAVORITES_LIST_ID);
    const links = listEl?.querySelectorAll("a.favorites-item");
    expect(links?.length).toBe(2);
    expect(listEl?.innerHTML).toContain("slug=r1");
    expect(listEl?.innerHTML).toContain("slug=r2");
    const names = [...(links ?? [])].map((a) => a.textContent);
    expect(names).toContain("Pommes");
    expect(names).toContain("Bananes");
  });

  it("filters list on search input", async () => {
    recipeCtrl.resetPreferences();
    const r1 = makeRecipe("r1", "Pommes");
    const r2 = makeRecipe("r2", "Bananes");
    recipesStore.setRecipes([r1, r2]);
    recipeCtrl.toggleBookmark("r1");
    recipeCtrl.toggleBookmark("r2");
    await favoritesCtrl.init();
    const searchEl = document.getElementById(FAVORITES_SEARCH_ID) as HTMLInputElement;
    const listEl = document.getElementById(FAVORITES_LIST_ID);
    expect(listEl?.querySelectorAll("a.favorites-item").length).toBe(2);
    searchEl!.value = "pom";
    searchEl!.dispatchEvent(new Event("input", { bubbles: true }));
    await Promise.resolve();
    const links = listEl?.querySelectorAll("a.favorites-item");
    expect(links?.length).toBe(1);
    expect(links?.[0].textContent).toBe("Pommes");
  });

  it("shows favorites-no-results when search has no match", async () => {
    const r1 = makeRecipe("r1", "Pommes");
    recipesStore.setRecipes([r1]);
    recipeCtrl.toggleBookmark("r1");
    await favoritesCtrl.init();
    const searchEl = document.getElementById(FAVORITES_SEARCH_ID) as HTMLInputElement;
    const emptyEl = document.getElementById(FAVORITES_EMPTY_ID);
    searchEl.value = "xyz";
    searchEl.dispatchEvent(new Event("input", { bubbles: true }));
    expect(emptyEl?.hidden).toBe(false);
    expect(emptyEl?.textContent).toBeDefined();
  });
});

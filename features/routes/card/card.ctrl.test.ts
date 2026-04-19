import { describe, it, expect, beforeEach, afterEach, afterAll, mock } from "bun:test";
import { recipeCtrl } from "@features/recipes/recipe/recipe.ctrl";
import { recipesStore } from "@features/recipes/recipes.stores";
import { currentRecipeStore } from "@features/recipes/recipe/recipe.store";
import { LOAD_ERROR_KEY } from "@features/recipes/recipes.const";
import { setRouteContext } from "@features/router/route-context";

let showOverlayErrorCalls = 0;
let capturedOnRetry: (() => void | Promise<void>) | null = null;
const hideOverlaySpy = mock(() => {});
const cardCtrlInitSpy = mock(() => {});
const cardControlsInitSpy = mock(() => {});
const activeFooterLinkSpy = mock(() => {});

mock.module("./card.utils", () => ({
  showOverlayLoading: () => {},
  hideOverlay: hideOverlaySpy,
  showOverlayError: (onRetry: () => void | Promise<void>) => {
    showOverlayErrorCalls += 1;
    capturedOnRetry = onRetry;
  },
}));
mock.module("@/features/card/card.ctrl", () => ({ cardCtrl: { init: cardCtrlInitSpy, updateUI: () => {} } }));
mock.module("@features/card-controls/card-controls", () => ({ cardControlsCtrl: { init: cardControlsInitSpy, cleanUp: () => {} } }));
mock.module("@/utils/active-footer-link", () => ({ activeFooterLink: activeFooterLinkSpy }));

const { cardPageCtrl } = await import("./card.ctrl");

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

describe("routes/card card.ctrl", () => {
  let originalInit: typeof recipeCtrl.init;
  let originalLocation: string;

  beforeEach(() => {
    setRouteContext({ lang: "fr" });
    showOverlayErrorCalls = 0;
    capturedOnRetry = null;
    hideOverlaySpy.mockClear();
    cardCtrlInitSpy.mockClear();
    cardControlsInitSpy.mockClear();
    activeFooterLinkSpy.mockClear();
    recipesStore.setLoadError(null);
    recipesStore.setRecipes([]);
    originalLocation = window.location.href;
    originalInit = recipeCtrl.init;
    recipeCtrl.init = async () => {
      recipesStore.setLoadError(LOAD_ERROR_KEY);
    };
  });

  afterEach(() => {
    recipeCtrl.init = originalInit;
    Object.defineProperty(window, "location", { value: { href: originalLocation }, writable: true });
  });

  it("calls showOverlayError when recipes fail to load", async () => {
    await cardPageCtrl.init();
    expect(showOverlayErrorCalls).toBe(1);
  });

  it("does not call showOverlayError when recipes load successfully", async () => {
    recipeCtrl.init = async () => {
      recipesStore.setLoadError(null);
      recipesStore.setRecipes([makeRecipe("r1", "R1")]);
    };
    await cardPageCtrl.init();
    expect(showOverlayErrorCalls).toBe(0);
    expect(hideOverlaySpy).toHaveBeenCalled();
    expect(cardCtrlInitSpy).toHaveBeenCalled();
    expect(cardControlsInitSpy).toHaveBeenCalled();
  });

  it("sets current recipe from route slug when load succeeds and slug present", async () => {
    const r = makeRecipe("from-slug", "From Slug");
    setRouteContext({ lang: "fr", recipeSlug: "from-slug" });
    recipesStore.setRecipes([r]);
    recipeCtrl.init = async () => {
      recipesStore.setLoadError(null);
      recipesStore.setRecipes([r]);
      currentRecipeStore.recipe = r;
    };
    await cardPageCtrl.init();
    expect(currentRecipeStore.recipe?.slug).toBe("from-slug");
    expect(cardCtrlInitSpy).toHaveBeenCalled();
  });

  it("remplace l’URL par /:lang/recipes/:slug sur l’accueil pour le partage", async () => {
    setRouteContext({ lang: "fr" });
    const r = makeRecipe("partage", "Partage");
    recipesStore.setRecipes([r]);
    const replaceSpy = mock(() => {});
    const origReplace = window.history.replaceState;
    window.history.replaceState = replaceSpy as typeof window.history.replaceState;
    recipeCtrl.init = async () => {
      recipesStore.setLoadError(null);
      recipesStore.setRecipes([r]);
      currentRecipeStore.recipe = r;
    };
    try {
      await cardPageCtrl.init();
      expect(replaceSpy).toHaveBeenCalled();
      const url = replaceSpy.mock.calls[0]?.[2] as string;
      expect(url).toContain("/fr/recipes/partage");
    } finally {
      window.history.replaceState = origReplace;
    }
  });

  it("ne remplace pas l’URL quand la route contient déjà un slug recette", async () => {
    const replaceSpy = mock(() => {});
    const origReplace = window.history.replaceState;
    window.history.replaceState = replaceSpy as typeof window.history.replaceState;
    const r = makeRecipe("from-slug", "From Slug");
    setRouteContext({ lang: "fr", recipeSlug: "from-slug" });
    recipesStore.setRecipes([r]);
    recipeCtrl.init = async () => {
      recipesStore.setLoadError(null);
      recipesStore.setRecipes([r]);
      currentRecipeStore.recipe = r;
    };
    try {
      await cardPageCtrl.init();
      expect(replaceSpy).not.toHaveBeenCalled();
    } finally {
      window.history.replaceState = origReplace;
    }
  });

  it("on retry success: hides overlay and shows card", async () => {
    recipeCtrl.init = async () => {
      if (showOverlayErrorCalls === 0) {
        recipesStore.setLoadError(LOAD_ERROR_KEY);
      } else {
        recipesStore.setLoadError(null);
        recipesStore.setRecipes([makeRecipe("r1", "R1")]);
      }
    };
    await cardPageCtrl.init();
    expect(capturedOnRetry).not.toBeNull();
    expect(showOverlayErrorCalls).toBe(1);
    hideOverlaySpy.mockClear();
    cardCtrlInitSpy.mockClear();
    await capturedOnRetry!();
    expect(hideOverlaySpy).toHaveBeenCalled();
    expect(cardCtrlInitSpy).toHaveBeenCalled();
  });

  it("on retry failure: shows overlay error again", async () => {
    recipeCtrl.init = async () => {
      recipesStore.setLoadError(LOAD_ERROR_KEY);
    };
    await cardPageCtrl.init();
    expect(capturedOnRetry).not.toBeNull();
    showOverlayErrorCalls = 0;
    await capturedOnRetry!();
    expect(showOverlayErrorCalls).toBe(1);
  });
});

import { recipesCtrl } from "@features/recipes/recipes.ctrl";
import { RecipeCtrl } from "@features/recipes/recipe/recipe.type";
import { currentRecipeStore } from "@features/recipes/recipe/recipe.store";
import { Recipe } from "@features/recipes/recipe.type";
import { recipesStore } from "@features/recipes/recipes.stores";
import { LS_KEY, LS_KEY_BOOKMARKS, MIN_SCORE, PREF_DELTA } from "./recipe.const";
import { pickRandom } from "./recipe.utils";

let preferences: Record<number, number> = {};
let bookmarks: string[] = [];

export const recipeCtrl: RecipeCtrl = {
  async init() {
    await recipesCtrl.init?.();
    this.loadPreferences();
    const recipe = this.getRandomRecipe("load");
    if (recipe) currentRecipeStore.recipe = recipe;
  },

  resetPreferences() {
    preferences = {};
    bookmarks = [];
    localStorage.removeItem(LS_KEY);
    localStorage.removeItem(LS_KEY_BOOKMARKS);
  },

  getPreferences(): Record<number, number> {
    return { ...preferences };
  },

  savePreferences() {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(preferences));
    } catch {
      // quota / private mode
    }
  },

  loadPreferences() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      preferences = raw ? JSON.parse(raw) : {};
      if (typeof preferences !== "object" || preferences === null) {
        preferences = {};
      }
    } catch {
      preferences = {};
    }
    try {
      const raw = localStorage.getItem(LS_KEY_BOOKMARKS);
      const parsed = raw ? JSON.parse(raw) : [];
      bookmarks = Array.isArray(parsed) ? parsed : [];
    } catch {
      bookmarks = [];
    }
  },

  getRecipeBySlug(slug: string): Recipe | null {
    return recipesStore.recipes.find((r) => r.slug === slug) ?? null;
  },

  getBookmarks(): string[] {
    return [...bookmarks];
  },

  isBookmarked(recipeSlug: string): boolean {
    return bookmarks.includes(recipeSlug);
  },

  toggleBookmark(recipeSlug: string): boolean {
    const i = bookmarks.indexOf(recipeSlug);
    if (i === -1) {
      bookmarks.push(recipeSlug);
    } else {
      bookmarks.splice(i, 1);
    }
    try {
      localStorage.setItem(LS_KEY_BOOKMARKS, JSON.stringify(bookmarks));
    } catch {
      // quota / private
    }
    return this.isBookmarked(recipeSlug);
  },

  getRandomRecipe(action: "reject" | "like" | "load"): Recipe | null {
    const currentRecipe = currentRecipeStore.recipe;

    // Mise à jour des préférences selon l'action (sauf sur load pour ne pas compter deux fois)
    if (action !== "load" && currentRecipe?.ingredients) {
      for (const ing of currentRecipe.ingredients) {
        const id = Number(ing.id);
        if (!id) continue;
        const prev = preferences[Number(id)] ?? 0;
        if (action === "reject") {
          preferences[Number(id)] = Math.max(MIN_SCORE, prev - PREF_DELTA);
        } else if (action === "like") {
          preferences[Number(id)] = prev + PREF_DELTA;
        }
      }
      this.savePreferences();
    }

    const recipes = recipesStore.recipes;
    if (!recipes?.length) return null;

    // Score = somme des compteurs des ingrédients de la recette
    const scored = recipes.map((recipe) => {
      let score = 0;
      for (const ing of recipe.ingredients ?? []) {
        score += preferences[Number(ing.id)] ?? 0;
      }
      return { recipe, score };
    });

    scored.sort((a, b) => b.score - a.score);

    const len = scored.length;

    const half = Math.max(1, Math.ceil(len / 2));
    const topHalf = scored.slice(0, half);
    const bottomHalf = scored.slice(half, len);

    const candidateTop = pickRandom(topHalf)?.recipe;
    const candidateBottom = pickRandom(bottomHalf)?.recipe;

    if (!candidateTop && !candidateBottom) return null;
    if (!candidateBottom) return candidateTop ?? null;
    if (!candidateTop) return candidateBottom;

    const candidates = [candidateTop, candidateBottom];
    const next = pickRandom(candidates)!;

    if (next.slug === currentRecipe?.slug && candidates.length > 1) {
      return next.slug === candidateTop!.slug ? candidateBottom! : candidateTop!;
    }
    return next;
  },
};

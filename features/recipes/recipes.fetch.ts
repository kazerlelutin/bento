import { LOAD_ERROR_KEY, resolvePublicBentextApiUrl } from "./recipes.const";
import type { Recipe } from "./recipe.type";

export function getApiBaseUrl(): string {
  return resolvePublicBentextApiUrl();
}

/** Langue pour l’API : le backend peut attendre "zh" pour le chinois. */
export function toApiLang(lang: string): string {
  return lang === "ch" ? "zh" : lang;
}

export type FetchRecipesResult =
  | { ok: true; recipes: Recipe[] }
  | { ok: false; errorKey: typeof LOAD_ERROR_KEY };

/**
 * Récupère les recettes pour une langue UI (fr, en, ko, ch).
 * Utilisable côté client et côté build (Bun).
 */
export async function fetchRecipesForLang(lang: string): Promise<FetchRecipesResult> {
  const base = getApiBaseUrl();
  if (!base) {
    return { ok: false, errorKey: LOAD_ERROR_KEY };
  }
  const apiLang = toApiLang(lang);
  const url = `${base}/recipes?lang=${apiLang}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return { ok: false, errorKey: LOAD_ERROR_KEY };
    }
    const data = await response.json();
    return { ok: true, recipes: Array.isArray(data) ? data : [] };
  } catch {
    return { ok: false, errorKey: LOAD_ERROR_KEY };
  }
}

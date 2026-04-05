import { availableLanguages, LS_KEY } from "@features/translate/translate.const";
import type { Language, Translation } from "@features/translate/translate.types";

/** Logique pure de traduction, testable sans store. */
export function getTranslation(
  translations: Translation | null | undefined,
  language: Language
): string {
  return translations?.[language] || translations?.fr || "Not found";
}

export function getLanguageFromLS(): Language {
  if (typeof globalThis.localStorage === "undefined") {
    return "fr";
  }
  try {
    const language = globalThis.localStorage.getItem(LS_KEY);
    if (language && availableLanguages.has(language as Language)) {
      return language as Language;
    }
    if (!language && typeof navigator !== "undefined" && navigator.language) {
      const browserLanguage = navigator.language.split("-")[0];
      if (availableLanguages.has(browserLanguage as Language)) {
        globalThis.localStorage.setItem(LS_KEY, browserLanguage as Language);
        return browserLanguage as Language;
      }
    }
  } catch {
    /* accès localStorage refusé ou indisponible (SSR / build) */
  }
  return "fr";
}
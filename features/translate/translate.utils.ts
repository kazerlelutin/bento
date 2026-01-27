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
  const language = localStorage.getItem(LS_KEY);
  if (language && availableLanguages.has(language as Language)) {
    return language as Language;
  }
  if (!language) {
    const browserLanguage = navigator.language.split('-')[0];
    if (availableLanguages.has(browserLanguage as Language)) {
      localStorage.setItem(LS_KEY, browserLanguage as Language);
      return browserLanguage as Language;
    }
  }
  return 'fr';
}
import {
  LANG_COOKIE,
  getCookie,
  normalizePathname,
  parseLocalizedPath,
  setCookie,
} from "@features/i18n/route-path";
import { availableLanguages, LS_KEY } from "@features/translate/translate.const";
import type { Language } from "@features/translate/translate.types";
import { getLanguageFromLS } from "@features/translate/translate.utils";
import { applyTranslationsToDom, translateStore } from "@features/translate/translate.store";

function defaultLangFromCookieOrLs(): Language {
  const c = getCookie(LANG_COOKIE);
  if (c && availableLanguages.has(c as Language)) {
    return c as Language;
  }
  return getLanguageFromLS();
}

/**
 * Si l’URL n’a pas de segment de langue en tête, redirige vers `/{lang}/…` (cookie, LS, ou fr).
 * À appeler avant `router.init()`.
 */
export function ensureLocalizedPathOrRedirect(): void {
  const pathname = normalizePathname(window.location.pathname);
  if (parseLocalizedPath(pathname)) {
    return;
  }
  const lang = defaultLangFromCookieOrLs();
  const suffix = pathname === "/" ? "" : pathname;
  const target = suffix ? `/${lang}${suffix}` : `/${lang}`;
  window.location.replace(target);
}

/** Garde le cookie aligné avec la langue courante de l’URL. */
export function syncLangCookieFromPath(pathname: string): void {
  const parsed = parseLocalizedPath(normalizePathname(pathname));
  if (parsed) {
    setCookie(LANG_COOKIE, parsed.lang);
  }
}

/** Aligne le store de langue sur le segment d’URL (après redirection canonique). */
export function syncTranslateStoreFromUrl(): void {
  const parsed = parseLocalizedPath(normalizePathname(window.location.pathname));
  if (parsed) {
    translateStore.currentLanguage = parsed.lang;
    localStorage.setItem(LS_KEY, parsed.lang);
  }
  applyTranslationsToDom();
}

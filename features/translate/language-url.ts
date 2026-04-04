import { normalizePathname, parseLocalizedPath, pathWithLang, setCookie, LANG_COOKIE } from "@features/i18n/route-path";
import { LS_KEY } from "./translate.const";
import type { Language } from "./translate.types";

/** Construit le pathname équivalent en changeant uniquement la langue. */
export function pathForNewLanguage(pathname: string, newLang: Language): string | null {
  const parsed = parseLocalizedPath(normalizePathname(pathname));
  if (!parsed) return null;
  return pathWithLang(newLang, ...parsed.segments);
}

export function persistLanguageAndNavigate(newLang: Language): void {
  const next = pathForNewLanguage(window.location.pathname, newLang);
  if (!next) return;
  localStorage.setItem(LS_KEY, newLang);
  setCookie(LANG_COOKIE, newLang);
  window.location.href = next;
}

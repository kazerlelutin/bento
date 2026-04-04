import { availableLanguages } from "@features/translate/translate.const";
import type { Language } from "@features/translate/translate.types";

export const LANG_COOKIE = "bento_language";

/** Segments d’URL pour les langues (segment unique, ex. fr, en). */
export function isUrlLang(segment: string): segment is Language {
  return availableLanguages.has(segment as Language);
}

/** Normalise le pathname : sans slash final sauf racine « vide » traitée comme /. */
export function normalizePathname(pathname: string): string {
  if (pathname === "/" || pathname === "") return "/";
  return pathname.replace(/\/$/, "") || "/";
}

export type ParsedPath = {
  lang: Language;
  /** Segments après la langue, ex. ["recipes", "slug"] ou []. */
  segments: string[];
};

/** Ex. /fr/recipes/foo -> { lang: fr, segments: ["recipes","foo"] } ; null si pas de préfixe langue. */
export function parseLocalizedPath(pathname: string): ParsedPath | null {
  const p = normalizePathname(pathname);
  const parts = p.split("/").filter(Boolean);
  if (parts.length === 0) return null;
  const first = parts[0];
  if (!isUrlLang(first)) return null;
  return { lang: first, segments: parts.slice(1) };
}

/** Construit un pathname avec préfixe langue. */
export function pathWithLang(lang: Language, ...segments: string[]): string {
  const rest = segments.filter(Boolean).join("/");
  return rest ? `/${lang}/${rest}` : `/${lang}`;
}

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1")}=([^;]*)`));
  return m ? decodeURIComponent(m[1]!) : null;
}

export function setCookie(name: string, value: string, maxAgeSec = 31536000): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;max-age=${maxAgeSec};SameSite=Lax`;
}

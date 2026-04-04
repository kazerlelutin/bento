import { DEFAULT_API_BASE } from "./recipes.const";
import { translateStore } from "@features/translate/translate.store";
import { toApiLang } from "./recipes.fetch";

export const getApiBaseUrl = (): string =>
  process.env.PUBLIC_BENTEXT_API_URL ?? DEFAULT_API_BASE;

/** Langue pour l’API selon la langue UI courante (URL / store). */
export const getApiLang = (): string => toApiLang(translateStore.currentLanguage);

import { resolvePublicBentextApiUrl } from "./recipes.const";
import { translateStore } from "@features/translate/translate.store";
import { toApiLang } from "./recipes.fetch";

export const getApiBaseUrl = (): string => resolvePublicBentextApiUrl();

/** Langue pour l’API selon la langue UI courante (URL / store). */
export const getApiLang = (): string => toApiLang(translateStore.currentLanguage);

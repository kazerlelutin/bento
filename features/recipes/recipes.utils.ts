import { getLanguageFromLS } from "@features/translate/translate.utils";
import { DEFAULT_API_BASE } from "./recipes.const";

export const getApiBaseUrl = (): string =>
  process.env.PUBLIC_BENTEXT_API_URL ?? DEFAULT_API_BASE;

/** Langue pour l'API : le backend peut attendre "zh" pour le chinois. */
export const getApiLang = (): string => {
  const lang = getLanguageFromLS();
  return lang === "ch" ? "zh" : lang;
};

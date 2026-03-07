import { translateStore } from "./translate.store";
import type { Translation } from "./translate.types";
import { getTranslation } from "./translate.utils";

export const t = (translations: Translation): string =>
  getTranslation(translations, translateStore.currentLanguage);


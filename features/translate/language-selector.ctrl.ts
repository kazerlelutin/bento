import { translateStore } from "./translate.store";
import { t } from "./translate";
import { UI, LANGUAGE_SELECTOR_ID } from "./translate.const";
import { persistLanguageAndNavigate } from "./language-url";

function getSelect(): HTMLSelectElement | null {
  return document.getElementById(LANGUAGE_SELECTOR_ID) as HTMLSelectElement | null;
}

export const languageSelectorCtrl = {
  init(): void {
    const select = getSelect();
    if (!select) return;

    select.value = translateStore.currentLanguage;
    select.setAttribute("aria-label", t(UI["language-selector-label"]));

    select.addEventListener("change", () => {
      const lang = select.value as "fr" | "en" | "ko" | "ch";
      persistLanguageAndNavigate(lang);
    });
  },
};

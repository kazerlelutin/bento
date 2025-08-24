import { createStore } from "@utils/proxy-sub";
import type { Language, TranslateStore } from "./translate.types";
import { getLanguageFromLS } from "./translate.utils";
import { UI } from "./translate.const";
import { t } from "./translate";

export const setCurrentLanguage = (language: Language) => {
  translateStore.currentLanguage = language;
  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach((element) => {
    const translate = element.getAttribute('data-translate') ?? '';
    if (translate) {
      (element as HTMLElement).innerText = t(UI[translate as keyof typeof UI]);
    }
  });
}



export const translateStore = createStore<TranslateStore>({
  currentLanguage: getLanguageFromLS(),
  setCurrentLanguage,
}, {
  notifyOnProps: ['currentLanguage'],
  transformData: (_prop, value) => value
});
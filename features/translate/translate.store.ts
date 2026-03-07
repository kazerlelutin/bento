import { createStore } from "@utils/proxy-sub";
import type { Language, TranslateStore } from "./translate.types";
import { getLanguageFromLS } from "./translate.utils";
import { LS_KEY, UI } from "./translate.const";
import { t } from "./translate";
import { metaCtrl } from "@features/meta/meta.ctrl";
import { router } from "@features/router/router";

export const setCurrentLanguage = (language: Language) => {
  const prev = translateStore.currentLanguage;
  translateStore.currentLanguage = language;
  localStorage.setItem(LS_KEY, language);
  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach((element) => {
    const translate = element.getAttribute('data-translate') ?? '';
    if (translate) {
      (element as HTMLElement).innerText = t(UI[translate as keyof typeof UI]);
    }
  });
  metaCtrl.updateMeta();
  if (prev !== language) {
    router.refreshCurrentRoute();
  }
};

export const translateStore = createStore<TranslateStore>({
  currentLanguage: getLanguageFromLS() || 'fr',
  setCurrentLanguage,
}, {
  notifyOnProps: ['currentLanguage'],
  transformData: (_prop, value) => value
});
import { translateState } from './translate.state';
import { TranslateUtils } from './translate.utils';

// Fonctions pures
const translate = (key: string, params?: Record<string, string>): string => {
  const translation = translateState.translations[key]?.[translateState.currentLocale]
    ?? translateState.translations[key]?.[translateState.fallbackLocale]
    ?? key;

  return TranslateUtils.interpolate(translation, params);
};

const translateElement = (element: HTMLElement, key: string, params?: Record<string, string>): void => {
  element.textContent = translate(key, params);
};

// Effets de bord
const setupTranslationElements = (): void => {
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    if (key) {
      translateElement(element as HTMLElement, key);
    }
  });
};

const setupLocaleChangeListener = (): void => {
  translateState.onLocaleChange = () => {
    setupTranslationElements();
  };
};

// API publique
export const translateService = {
  init: () => {
    setupTranslationElements();
    setupLocaleChangeListener();
  },

  translate,
  translateElement,

  setLocale: (locale: string): void => {
    translateState.currentLocale = locale;
  },

  addTranslations: (translations: Record<string, Record<string, string>>): void => {
    translateState.translations = {
      ...translateState.translations,
      ...translations
    };
  }
}; 
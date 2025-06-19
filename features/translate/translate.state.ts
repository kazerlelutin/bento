interface Translations {
  [key: string]: {
    [locale: string]: string;
  };
}

export const translateState = new Proxy<{
  currentLocale: string;
  fallbackLocale: string;
  translations: Translations;
  onLocaleChange?: (locale: string) => void;
}>(
  {
    currentLocale: 'fr',
    fallbackLocale: 'fr',
    translations: {},
    onLocaleChange: undefined
  },
  {
    get(target, prop) {
      return target[prop];
    },
    set(target, prop, value) {
      if (prop === 'currentLocale') {
        document.documentElement.lang = value;
        target.onLocaleChange?.(value);
      }
      target[prop] = value;
      return true;
    }
  }
); 
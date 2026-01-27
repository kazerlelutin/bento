export type Language = 'fr' | 'en' | 'ko' | 'ch';

export type Translation = {
  fr: string;
  en?: string;
  ko?: string;
  ch?: string;
};


export type TranslateStore = {
  currentLanguage: Language;
  setCurrentLanguage: (language: Language) => void;
};


export type UiTranslation = {
  [key: string]: Translation;
};
import type { Language } from "@features/translate/translate.types";

export type AboutLocalized = Record<Language, string>;

export type AboutContentItem = {
  title: AboutLocalized;
  content: AboutLocalized;
  link?: string;
  linkText?: AboutLocalized;
  /** Affiche les sauts de ligne du contenu (un seul <p>). */
  contentPreline?: boolean;
};

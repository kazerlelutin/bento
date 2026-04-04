import type { Language } from "@features/translate/translate.types";

export type RouteContext = {
  lang: Language;
  /** Présent sur /{lang}/recipes/{slug} */
  recipeSlug?: string;
};

let ctx: RouteContext = { lang: "fr" };

export function setRouteContext(next: RouteContext): void {
  ctx = next;
}

export function getRouteContext(): RouteContext {
  return ctx;
}

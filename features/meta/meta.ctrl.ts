import { t } from "@features/translate/translate";
import { META } from "@features/translate/translate.const";
import type { MetaCtrl } from "./meta.type";
import { META_SELECTORS } from "./meta.const";
import { setMetaContent } from "./meta.utils";

/** Meta catalogue recettes avec filtre bento (URL query) — canonical reste sans query côté SSG. */
export function applyRecipesCatalogFilterMeta(pageTitle: string, description: string): void {
  document.title = pageTitle;
  setMetaContent('meta[name="description"]', "content", description);
  setMetaContent('meta[property="og:title"]', "content", pageTitle);
  setMetaContent('meta[property="og:description"]', "content", description);
  setMetaContent('meta[name="twitter:title"]', "content", pageTitle);
  setMetaContent('meta[name="twitter:description"]', "content", description);
}

/** Titre compact du catalogue sans filtre (description / OG description inchangés après `updateMeta`). */
export function applyRecipesCatalogDefaultMeta(pageTitle: string): void {
  document.title = pageTitle;
  setMetaContent('meta[property="og:title"]', "content", pageTitle);
  setMetaContent('meta[name="twitter:title"]', "content", pageTitle);
}

export const metaCtrl: MetaCtrl = {
  updateMeta() {
    const title = t(META["meta-title"]);
    document.title = title;
    document.documentElement.lang = t(META["meta-content-language"]);

    for (const { key, selector, attr } of META_SELECTORS) {
      setMetaContent(selector, attr, t(META[key]));
    }
  },

  init() {
    this.updateMeta();
  },
};

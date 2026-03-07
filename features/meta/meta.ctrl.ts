import { t } from "@features/translate/translate";
import { META } from "@features/translate/translate.const";
import type { MetaCtrl } from "./meta.type";
import { META_SELECTORS } from "./meta.const";
import { setMetaContent } from "./meta.utils";

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

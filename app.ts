import { router } from "@features/router/router";
import { translateStore } from "@features/translate/translate.store";
import { getLanguageFromLS } from "@features/translate/translate.utils";
import { languageSelectorCtrl } from "@features/translate/language-selector.ctrl";
import { displayVersion } from "@features/version/version.utils";
import { cspCtrl } from "@features/csp/csp.ctrl";
import { metaCtrl } from "@features/meta/meta.ctrl";
addEventListener("DOMContentLoaded", () => {
  cspCtrl?.init?.();
  metaCtrl?.init?.();
  router.init();
  translateStore.setCurrentLanguage(getLanguageFromLS());
  languageSelectorCtrl.init();
  displayVersion();
});


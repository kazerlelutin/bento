import { router } from "@features/router/router";
import { translateStore } from "./features/translate/translate.store";
import { getLanguageFromLS } from "./features/translate/translate.utils";
import { displayVersion } from "./features/version/version.utils";
addEventListener("DOMContentLoaded", () => {
  router.init();
  translateStore.setCurrentLanguage(getLanguageFromLS());
  displayVersion();
});


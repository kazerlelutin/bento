import { router } from "@features/router/router";
import { languageSelectorCtrl } from "@features/translate/language-selector.ctrl";
import { displayVersion } from "@features/version/version.utils";
import { cspCtrl } from "@features/csp/csp.ctrl";
import { metaCtrl } from "@features/meta/meta.ctrl";
import {
  ensureLocalizedPathOrRedirect,
  syncLangCookieFromPath,
  syncTranslateStoreFromUrl,
} from "@features/i18n/bootstrap-lang";

addEventListener("DOMContentLoaded", () => {
  ensureLocalizedPathOrRedirect();
  syncTranslateStoreFromUrl();
  syncLangCookieFromPath(window.location.pathname);

  cspCtrl?.init?.();
  metaCtrl?.init?.();
  router.init();
  languageSelectorCtrl.init();
  displayVersion();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/public/sw.js").catch(() => {});
  }
});

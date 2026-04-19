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
import { pwaInstallCtrl } from "@features/pwa/pwa-install.ctrl";
import { cookieConsentCtrl } from "@features/cookie-consent/cookie-consent.ctrl";
import { initMobileNav } from "@features/mobile-nav/mobile-nav.ctrl";

addEventListener("DOMContentLoaded", () => {
  ensureLocalizedPathOrRedirect();
  syncTranslateStoreFromUrl();
  syncLangCookieFromPath(window.location.pathname);

  cspCtrl?.init?.();
  metaCtrl?.init?.();
  router.init();
  languageSelectorCtrl.init();
  displayVersion();
  pwaInstallCtrl.init();
  cookieConsentCtrl.init();
  initMobileNav();

  registerServiceWorkerIfServedAsJs();
});

/** N’enregistre le SW que si `/sw.js` est bien du JS (évite le HTML du fallback SPA en `bun dev`). */
function registerServiceWorkerIfServedAsJs(): void {
  if (!("serviceWorker" in navigator)) return;
  void (async () => {
    try {
      const res = await fetch("/sw.js", { cache: "no-store", credentials: "same-origin" });
      const ct = (res.headers.get("content-type") ?? "").toLowerCase();
      const looksLikeJs = res.ok && (ct.includes("javascript") || ct.includes("ecmascript"));
      if (!looksLikeJs) return;
      await navigator.serviceWorker.register("/sw.js");
    } catch {
      /* réseau ou SW refusé */
    }
  })();
}

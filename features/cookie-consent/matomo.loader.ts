/** Évite un double chargement si `init` est rappelé par erreur. */
let matomoInjected = false;

declare global {
  interface Window {
    _paq?: unknown[][];
  }
}

/** Charge le tracker Matomo (cookies first-party) — à n’appeler qu’après consentement explicite. */
export function loadMatomo(): void {
  if (matomoInjected) return;
  matomoInjected = true;
  const w = window;
  const _paq = (w._paq = w._paq ?? []);
  _paq.push(["trackPageView"]);
  _paq.push(["enableLinkTracking"]);
  const u = "//analytics.ben-to.fr/";
  _paq.push(["setTrackerUrl", `${u}matomo.php`]);
  _paq.push(["setSiteId", "1"]);
  const g = document.createElement("script");
  const s = document.getElementsByTagName("script")[0];
  g.async = true;
  g.src = `${u}matomo.js`;
  s?.parentNode?.insertBefore(g, s);
}

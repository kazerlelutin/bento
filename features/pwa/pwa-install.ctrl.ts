import { applyTranslationsToDom } from "@features/translate/translate.store";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

/** Fin de la période « Plus tard » (timestamp ms). */
const LS_SNOOZE_UNTIL = "bento_pwa_install_snooze_until";
/** Ancienne clé « définitif » — migrée pour passer au snooze 7 jours. */
const LEGACY_DISMISS = "bento_pwa_install_dismissed";

const SNOOZE_MS = 7 * 24 * 60 * 60 * 1000;

function migrateLegacyDismiss(): void {
  if (localStorage.getItem(LEGACY_DISMISS) === "1") {
    localStorage.removeItem(LEGACY_DISMISS);
  }
}

function getSnoozeUntil(): number | null {
  const raw = localStorage.getItem(LS_SNOOZE_UNTIL);
  if (!raw) return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

function isSnoozeActive(): boolean {
  const until = getSnoozeUntil();
  if (until === null) return false;
  return Date.now() < until;
}

/** App ouverte comme PWA installée (fenêtre dédiée / iOS « sur l’écran d’accueil »). */
function isRunningAsInstalledPwa(): boolean {
  if (typeof window.matchMedia === "function") {
    if (window.matchMedia("(display-mode: standalone)").matches) return true;
  }
  const nav = window.navigator as Navigator & { standalone?: boolean };
  return nav.standalone === true;
}

let deferred: BeforeInstallPromptEvent | null = null;

/** Annule l’affichage du message de secours si `beforeinstallprompt` arrive avant la fin du délai. */
let fallbackTimer: number | null = null;

function clearFallbackTimer(): void {
  if (fallbackTimer !== null) {
    clearTimeout(fallbackTimer);
    fallbackTimer = null;
  }
}

function getWrap(): HTMLElement | null {
  return document.getElementById("pwa-install-wrap");
}

function getInstallBtn(): HTMLButtonElement | null {
  return document.getElementById("pwa-install-btn") as HTMLButtonElement | null;
}

function getDismissBtn(): HTMLButtonElement | null {
  return document.getElementById("pwa-install-dismiss") as HTMLButtonElement | null;
}

/** Invite navigateur native (`beforeinstallprompt`). */
function showNativeInstallUi(): void {
  clearFallbackTimer();
  const wrap = getWrap();
  const fb = document.getElementById("pwa-install-fallback");
  const actions = document.getElementById("pwa-install-actions");
  if (!wrap || !actions) return;
  if (fb) fb.hidden = true;
  actions.classList.remove("pwa-install-actions--fallback");
  const installBtn = getInstallBtn();
  if (installBtn) installBtn.hidden = false;
  wrap.hidden = false;
}

/** Aucun `beforeinstallprompt` (souvent en local) : texte d’aide + « Plus tard » uniquement. */
function showFallbackInstallUi(): void {
  clearFallbackTimer();
  const wrap = getWrap();
  const fb = document.getElementById("pwa-install-fallback");
  const actions = document.getElementById("pwa-install-actions");
  if (!wrap || !fb || !actions) return;
  fb.hidden = false;
  actions.classList.add("pwa-install-actions--fallback");
  const installBtn = getInstallBtn();
  if (installBtn) installBtn.hidden = true;
  wrap.hidden = false;
  applyTranslationsToDom();
}

function hideInstallUi(): void {
  clearFallbackTimer();
  const wrap = getWrap();
  if (!wrap) return;
  const fb = document.getElementById("pwa-install-fallback");
  const actions = document.getElementById("pwa-install-actions");
  if (fb) fb.hidden = true;
  if (actions) actions.classList.remove("pwa-install-actions--fallback");
  const installBtn = getInstallBtn();
  if (installBtn) installBtn.hidden = false;
  wrap.hidden = true;
}

function scheduleFallbackProbe(): void {
  clearFallbackTimer();
  fallbackTimer = window.setTimeout(() => {
    fallbackTimer = null;
    if (deferred !== null || isRunningAsInstalledPwa() || isSnoozeActive()) return;
    showFallbackInstallUi();
  }, 2800);
}

function onBeforeInstallPrompt(e: Event): void {
  if (isRunningAsInstalledPwa()) return;
  if (isSnoozeActive()) {
    e.preventDefault();
    hideInstallUi();
    return;
  }
  e.preventDefault();
  deferred = e as BeforeInstallPromptEvent;
  showNativeInstallUi();
}

/** Aligne la classe `html` avec le mode d’affichage (corrige un état coincé après DevTools / install). */
function syncStandaloneClassOnHtml(): void {
  if (isRunningAsInstalledPwa()) {
    document.documentElement.classList.add("is-pwa-standalone");
  } else {
    document.documentElement.classList.remove("is-pwa-standalone");
  }
}

/** Capture : les clics passent même si un calque (carte, etc.) interfère avec le footer. */
function onDocumentClickCapture(e: MouseEvent): void {
  const target = e.target as HTMLElement | null;
  if (!target) return;

  if (target.closest("#pwa-install-dismiss")) {
    e.preventDefault();
    localStorage.setItem(LS_SNOOZE_UNTIL, String(Date.now() + SNOOZE_MS));
    deferred = null;
    hideInstallUi();
    return;
  }

  if (!target.closest("#pwa-install-btn")) return;

  e.preventDefault();
  void (async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    deferred = null;
    hideInstallUi();
  })();
}

export const pwaInstallCtrl = {
  init(): void {
    migrateLegacyDismiss();

    if (isRunningAsInstalledPwa()) {
      syncStandaloneClassOnHtml();
      hideInstallUi();
      return;
    }

    syncStandaloneClassOnHtml();

    document.addEventListener("click", onDocumentClickCapture, true);

    /** Après modification du storage dans DevTools (même onglet), le `focus` resynchronise la classe et la barre si `deferred` existe encore. */
    window.addEventListener("focus", () => {
      syncStandaloneClassOnHtml();
      if (isRunningAsInstalledPwa()) {
        hideInstallUi();
        return;
      }
      if (isSnoozeActive()) {
        hideInstallUi();
        return;
      }
      if (deferred) {
        showNativeInstallUi();
      }
    });

    if (
      !getWrap() ||
      !getInstallBtn() ||
      !getDismissBtn() ||
      !document.getElementById("pwa-install-fallback") ||
      !document.getElementById("pwa-install-actions")
    ) {
      return;
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);

    window.addEventListener("appinstalled", () => {
      deferred = null;
      hideInstallUi();
      /** Ne pas poser `is-pwa-standalone` ici : l’onglet navigateur reste souvent non-standalone, ce qui masquait la barre à tort jusqu’au prochain reload. */
      syncStandaloneClassOnHtml();
    });

    if (isSnoozeActive()) {
      hideInstallUi();
    } else {
      scheduleFallbackProbe();
    }
  },
};

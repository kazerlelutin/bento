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

function getWrap(): HTMLElement | null {
  return document.getElementById("pwa-install-wrap");
}

function getInstallBtn(): HTMLButtonElement | null {
  return document.getElementById("pwa-install-btn") as HTMLButtonElement | null;
}

function getDismissBtn(): HTMLButtonElement | null {
  return document.getElementById("pwa-install-dismiss") as HTMLButtonElement | null;
}

function showInstallUi(): void {
  const wrap = getWrap();
  if (!wrap) return;
  wrap.hidden = false;
}

function hideInstallUi(): void {
  const wrap = getWrap();
  if (!wrap) return;
  wrap.hidden = true;
}

function onBeforeInstallPrompt(e: Event): void {
  e.preventDefault();
  deferred = e as BeforeInstallPromptEvent;
  showInstallUi();
}

/** Capture : les clics passent même si un calque (carte, etc.) interfère avec le footer. */
function onDocumentClickCapture(e: MouseEvent): void {
  const target = e.target as HTMLElement | null;
  if (!target) return;

  if (target.closest("#pwa-install-dismiss")) {
    e.preventDefault();
    localStorage.setItem(LS_SNOOZE_UNTIL, String(Date.now() + SNOOZE_MS));
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
      document.documentElement.classList.add("is-pwa-standalone");
      hideInstallUi();
      return;
    }
    document.documentElement.classList.remove("is-pwa-standalone");

    document.addEventListener("click", onDocumentClickCapture, true);

    if (isSnoozeActive()) {
      hideInstallUi();
      return;
    }

    if (!getWrap() || !getInstallBtn() || !getDismissBtn()) return;

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);

    window.addEventListener("appinstalled", () => {
      deferred = null;
      hideInstallUi();
      document.documentElement.classList.add("is-pwa-standalone");
    });
  },
};

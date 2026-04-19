type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const LS_DISMISS = "bento_pwa_install_dismissed";

function isStandalone(): boolean {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
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
    localStorage.setItem(LS_DISMISS, "1");
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
    if (isStandalone()) return;

    document.addEventListener("click", onDocumentClickCapture, true);

    if (localStorage.getItem(LS_DISMISS) === "1") return;

    if (!getWrap() || !getInstallBtn() || !getDismissBtn()) return;

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);

    window.addEventListener("appinstalled", () => {
      deferred = null;
      hideInstallUi();
    });
  },
};

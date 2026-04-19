import { MOBILE_NAV_SHEET_ID } from "@features/mobile-nav/mobile-nav.const";
import { t } from "@features/translate/translate";
import { UI } from "@features/translate/translate.const";

let lastOpener: HTMLElement | null = null;

function getSheet(): HTMLElement | null {
  return document.getElementById(MOBILE_NAV_SHEET_ID);
}

function setSheetOpen(open: boolean): void {
  const sheet = getSheet();
  if (!sheet) return;

  sheet.classList.toggle("mobile-nav-sheet--open", open);
  sheet.setAttribute("aria-hidden", open ? "false" : "true");
  document.body.classList.toggle("mobile-nav-sheet--open", open);

  document.querySelectorAll<HTMLElement>("[data-open-mobile-nav]").forEach((btn) => {
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  if (open) {
    const closeBtn = sheet.querySelector<HTMLButtonElement>("[data-close-mobile-nav]");
    closeBtn?.focus();
  } else {
    lastOpener?.focus?.();
    lastOpener = null;
  }
}

/** Affiche le burger dans le header ou à côté de « prochaine recette » selon la présence de `#card-controls`. */
export function syncMobileNavPlacement(): void {
  const hasCardControls = Boolean(document.getElementById("card-controls"));
  document.body.classList.toggle("app-mobile-nav--card", hasCardControls);
}

function setSiteNavAriaLabels(): void {
  const label = t(UI["nav-site"]);
  document.querySelectorAll(".app-footer-nav, .mobile-nav-sheet__nav").forEach((el) => {
    el.setAttribute("aria-label", label);
  });
}

export function initMobileNav(): void {
  const sheet = getSheet();
  if (!sheet) return;

  setSiteNavAriaLabels();
  syncMobileNavPlacement();

  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    const opener = target.closest<HTMLElement>("[data-open-mobile-nav]");
    if (opener) {
      e.preventDefault();
      const isOpen = sheet.classList.contains("mobile-nav-sheet--open");
      if (isOpen) {
        setSheetOpen(false);
      } else {
        lastOpener = opener;
        setSheetOpen(true);
      }
      return;
    }

    if (target.closest("[data-close-mobile-nav]") || target.classList.contains("mobile-nav-sheet__backdrop")) {
      setSheetOpen(false);
      return;
    }

    if (target.closest("#mobile-nav-sheet a[data-internal]")) {
      setSheetOpen(false);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!sheet.classList.contains("mobile-nav-sheet--open")) return;
    setSheetOpen(false);
  });
}

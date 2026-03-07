import {
  CLOSE_BTN_ID,
  CONTAINER_ID,
  CONSIGNES_ID,
  CONSIGNES_TEXT_ID,
  FOCUSABLE_SELECTOR,
  OVERLAY_ID,
  PHASE_GAME_ID,
  RESULT_ID,
  START_BTN_ID,
} from "@features/micro-games/micro-games.const";

export function getOverlay(): HTMLElement | null {
  return document.getElementById(OVERLAY_ID);
}

export function getContainer(): HTMLElement | null {
  return document.getElementById(CONTAINER_ID);
}

type Phase = "consignes" | "game" | "result";

export function setPhase(phase: Phase): void {
  const overlay = getOverlay();
  const consignes = document.getElementById(CONSIGNES_ID);
  const phaseGame = document.getElementById(PHASE_GAME_ID);
  const result = document.getElementById(RESULT_ID);
  if (consignes) consignes.hidden = phase !== "consignes";
  if (phaseGame) phaseGame.hidden = phase !== "game";
  if (result) result.hidden = phase !== "result";
  if (overlay) {
    if (phase === "consignes") {
      overlay.setAttribute("aria-describedby", CONSIGNES_TEXT_ID);
    } else {
      overlay.removeAttribute("aria-describedby");
    }
  }
}

export function focusStartBtn(): void {
  const btn = document.getElementById(START_BTN_ID);
  if (btn && btn instanceof HTMLElement) btn.focus();
}

export function focusCloseBtn(): void {
  const btn = document.getElementById(CLOSE_BTN_ID);
  if (btn && btn instanceof HTMLElement) btn.focus();
}

export function getFocusables(root: HTMLElement, selector = FOCUSABLE_SELECTOR): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(selector)).filter(
    (el) => el.offsetParent !== null && !el.hidden
  );
}

/**
 * Gère le focus trap (Tab / Shift+Tab) dans un overlay modal.
 * À appeler depuis un keydown sur l'overlay.
 */
export function handleFocusTrap(overlay: HTMLElement, e: KeyboardEvent): void {
  if (e.key !== "Tab") return;
  const focusables = getFocusables(overlay);
  if (focusables.length === 0) return;
  const current = document.activeElement as HTMLElement | null;
  const idx = current ? focusables.indexOf(current) : -1;
  if (e.shiftKey) {
    if (idx <= 0) {
      e.preventDefault();
      focusables[focusables.length - 1]?.focus();
    }
  } else {
    if (idx === -1 || idx >= focusables.length - 1) {
      e.preventDefault();
      focusables[0]?.focus();
    }
  }
}

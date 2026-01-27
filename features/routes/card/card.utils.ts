import { t } from "@features/translate/translate";
import { UI } from "@features/translate/translate.const";
import {
  OVERLAY_ID,
  OVERLAY_LOADING_ID,
  OVERLAY_ERROR_ID,
  OVERLAY_ERROR_MSG_ID,
  OVERLAY_RETRY_ID,
} from "./card.const";

export function showOverlayLoading(): void {
  const overlay = document.getElementById(OVERLAY_ID);
  const loading = document.getElementById(OVERLAY_LOADING_ID);
  const error = document.getElementById(OVERLAY_ERROR_ID);
  if (overlay) overlay.hidden = false;
  if (loading) {
    loading.hidden = false;
    loading.textContent = t(UI["recipes-loading"]);
  }
  if (error) error.hidden = true;
}

export function hideOverlay(): void {
  const overlay = document.getElementById(OVERLAY_ID);
  if (overlay) overlay.hidden = true;
}

export function showOverlayError(onRetry: () => void | Promise<void>): void {
  const overlay = document.getElementById(OVERLAY_ID);
  const loading = document.getElementById(OVERLAY_LOADING_ID);
  const error = document.getElementById(OVERLAY_ERROR_ID);
  const msg = document.getElementById(OVERLAY_ERROR_MSG_ID);
  const retryBtn = document.getElementById(OVERLAY_RETRY_ID) as HTMLButtonElement | null;
  if (overlay) overlay.hidden = false;
  if (loading) loading.hidden = true;
  if (error) error.hidden = false;
  if (msg) msg.textContent = t(UI["recipes-load-error"]);
  if (retryBtn) {
    retryBtn.textContent = t(UI.retry);
    retryBtn.setAttribute("aria-label", t(UI.retry));
    retryBtn.onclick = async (e) => {
      e.preventDefault();
      retryBtn.disabled = true;
      showOverlayLoading();
      try {
        await onRetry();
      } finally {
        retryBtn.disabled = false;
      }
    };
  }
}

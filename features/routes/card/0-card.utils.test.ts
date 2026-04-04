/** Préfixe `0-` : doit s’exécuter avant `card.ctrl.test.ts` (mock sur `./card.utils`). */
import { describe, it, expect, beforeEach, afterEach, mock } from "bun:test";
import {
  OVERLAY_ID,
  OVERLAY_LOADING_ID,
  OVERLAY_ERROR_ID,
  OVERLAY_ERROR_MSG_ID,
  OVERLAY_RETRY_ID,
} from "./card.const";

const tMock = mock(() => "T");
mock.module("@features/translate/translate", () => ({ t: tMock }));

const {
  showOverlayLoading,
  hideOverlay,
  showOverlayError,
} = await import("./card.utils");

function createOverlayDOM(): { overlay: HTMLElement; loading: HTMLElement; error: HTMLElement; msg: HTMLElement; retry: HTMLButtonElement } {
  document.body.innerHTML = "";
  const overlay = document.createElement("div");
  overlay.id = OVERLAY_ID;
  overlay.hidden = true;
  const loading = document.createElement("div");
  loading.id = OVERLAY_LOADING_ID;
  loading.hidden = true;
  const error = document.createElement("div");
  error.id = OVERLAY_ERROR_ID;
  error.hidden = true;
  const msg = document.createElement("p");
  msg.id = OVERLAY_ERROR_MSG_ID;
  const retry = document.createElement("button");
  retry.type = "button";
  retry.id = OVERLAY_RETRY_ID;
  overlay.append(loading, error, msg, retry);
  document.body.appendChild(overlay);
  return { overlay, loading, error, msg, retry };
}

describe("routes/card card.utils", () => {
  let els: ReturnType<typeof createOverlayDOM>;

  beforeEach(() => {
    document.querySelectorAll("#card-overlay").forEach((el) => el.remove());
    els = createOverlayDOM();
    tMock.mockClear();
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("showOverlayLoading", () => {
    it("shows overlay and loading, hides error", () => {
      showOverlayLoading();
      expect(els.overlay.hidden).toBe(false);
      expect(els.loading.hidden).toBe(false);
      expect(els.error.hidden).toBe(true);
      expect(els.loading.textContent).toBe("T");
    });
  });

  describe("hideOverlay", () => {
    it("hides overlay", () => {
      els.overlay.hidden = false;
      hideOverlay();
      expect(els.overlay.hidden).toBe(true);
    });
  });

  describe("showOverlayError", () => {
    it("shows overlay and error panel, hides loading, sets message and retry label", () => {
      showOverlayError(() => {});
      expect(els.overlay.hidden).toBe(false);
      expect(els.loading.hidden).toBe(true);
      expect(els.error.hidden).toBe(false);
      expect(els.msg.textContent).toBe("T");
      expect(tMock).toHaveBeenCalled();
    });

    it("calls onRetry when retry button is clicked", async () => {
      const onRetry = mock(async () => {});
      showOverlayError(onRetry);
      els.retry.click();
      await Promise.resolve();
      expect(onRetry).toHaveBeenCalled();
    });
  });
});

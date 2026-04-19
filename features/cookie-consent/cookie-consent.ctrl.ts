import { loadMatomo } from "@features/cookie-consent/matomo.loader";
import {
  COOKIE_CONSENT_ACCEPT_ID,
  COOKIE_CONSENT_BANNER_ID,
  COOKIE_CONSENT_REFUSE_ID,
  COOKIE_CONSENT_STORAGE_KEY,
  type CookieConsentValue,
} from "@features/cookie-consent/cookie-consent.const";

function readConsent(): CookieConsentValue | null {
  try {
    const v = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (v === "analytics" || v === "rejected") return v;
  } catch {
    /* navigation privée, quota */
  }
  return null;
}

function writeConsent(value: CookieConsentValue): void {
  try {
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, value);
  } catch {
    /* ignore */
  }
}

let boundAccept: (() => void) | null = null;
let boundRefuse: (() => void) | null = null;

export const cookieConsentCtrl = {
  init(): void {
    cookieConsentCtrl.cleanUp();

    const consent = readConsent();
    if (consent === "analytics") {
      loadMatomo();
      return;
    }
    if (consent === "rejected") {
      return;
    }

    const banner = document.getElementById(COOKIE_CONSENT_BANNER_ID);
    const acceptBtn = document.getElementById(COOKIE_CONSENT_ACCEPT_ID);
    const refuseBtn = document.getElementById(COOKIE_CONSENT_REFUSE_ID);
    if (!banner || !acceptBtn || !refuseBtn) return;

    banner.hidden = false;
    requestAnimationFrame(() => acceptBtn.focus());

    boundAccept = () => {
      writeConsent("analytics");
      banner.hidden = true;
      loadMatomo();
      cookieConsentCtrl.cleanUp();
    };
    boundRefuse = () => {
      writeConsent("rejected");
      banner.hidden = true;
      cookieConsentCtrl.cleanUp();
    };

    acceptBtn.addEventListener("click", boundAccept);
    refuseBtn.addEventListener("click", boundRefuse);
  },

  cleanUp(): void {
    const acceptBtn = document.getElementById(COOKIE_CONSENT_ACCEPT_ID);
    const refuseBtn = document.getElementById(COOKIE_CONSENT_REFUSE_ID);
    if (boundAccept && acceptBtn) acceptBtn.removeEventListener("click", boundAccept);
    if (boundRefuse && refuseBtn) refuseBtn.removeEventListener("click", boundRefuse);
    boundAccept = null;
    boundRefuse = null;
  },
};

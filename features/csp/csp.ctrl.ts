import { Ctrl } from "@features/routes/routes.type";
import { getCspMetaContent } from "./csp.const";
import { CSP_META_SELECTOR } from "./csp.const";

function getApiOrigin(): string {
  try {
    const base = process.env.PUBLIC_BENTEXT_API_URL ?? "https://bentext.ben-to.fr/api";
    return new URL(base).origin;
  } catch {
    return "";
  }
}

export const cspCtrl: Ctrl = {
  init() {
    const apiOrigin = getApiOrigin();
    const csp = document.querySelector(CSP_META_SELECTOR);
    const content = getCspMetaContent(apiOrigin);

    if (csp) csp.setAttribute("content", content);
  },
};

import { Ctrl } from "@features/routes/routes.type";
import { resolvePublicBentextApiUrl } from "@features/recipes/recipes.const";
import { getCspMetaContent } from "./csp.const";
import { CSP_META_SELECTOR } from "./csp.const";

function getApiOrigin(): string {
  try {
    return new URL(resolvePublicBentextApiUrl()).origin;
  } catch {
    return new URL("https://bentext.ben-to.fr/api").origin;
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

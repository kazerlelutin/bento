import { activeFooterLink } from "@/utils/active-footer-link";
import type { Ctrl } from "@features/routes/routes.type";
import { getRouteContext } from "@features/router/route-context";
import { pathWithLang } from "@features/i18n/route-path";
import { applyTranslationsToDom } from "@features/translate/translate.store";

const NOT_FOUND_HOME_LINK_ID = "not-found-home-link";

const notFoundCtrl: Ctrl = {
  init() {
    const { lang } = getRouteContext();
    activeFooterLink("/__no_footer_match__");

    applyTranslationsToDom();

    const home = document.getElementById(NOT_FOUND_HOME_LINK_ID) as HTMLAnchorElement | null;
    if (home) {
      home.href = pathWithLang(lang);
    }
  },
};

export default notFoundCtrl;

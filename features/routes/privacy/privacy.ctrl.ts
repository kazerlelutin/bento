import { activeFooterLink } from "@/utils/active-footer-link";
import { ABOUT_ITEM_TEMPLATE_ID } from "@features/routes/about/about.const";
import type { Ctrl } from "@features/routes/routes.type";
import {
  PRIVACY_CONTAINER_ID,
  PRIVACY_ITEMS_CONTAINER_ID,
  privacyContent,
  privacyPageTitle,
} from "@features/routes/privacy/privacy.const";
import { t } from "@/features/translate/translate";
import { getRouteContext } from "@features/router/route-context";
import { pathWithLang } from "@features/i18n/route-path";

const privacyCtrl: Ctrl = {
  init() {
    const { lang } = getRouteContext();
    activeFooterLink(pathWithLang(lang, "privacy"));

    const container = document.getElementById(PRIVACY_CONTAINER_ID);
    if (!container) {
      throw new Error("privacy: container not found");
    }

    const title = container.querySelector("h1");
    if (title) {
      title.textContent = t(privacyPageTitle);
    }

    const itemsContainer = container.querySelector(`#${PRIVACY_ITEMS_CONTAINER_ID}`);
    if (!itemsContainer) {
      throw new Error("privacy: items container not found");
    }

    const template = document.getElementById(ABOUT_ITEM_TEMPLATE_ID) as HTMLTemplateElement | null;
    if (!template) {
      throw new Error("privacy: about-item template not found");
    }

    const fragment = document.createDocumentFragment();

    for (const item of privacyContent) {
      const itemTemplate = template.content.cloneNode(true) as HTMLElement;
      const itemTitle = itemTemplate.querySelector("h2") as HTMLHeadingElement | null;
      if (itemTitle) {
        itemTitle.textContent = t(item.title);
      }
      const itemContent = itemTemplate.querySelector("p") as HTMLParagraphElement | null;
      if (itemContent) {
        itemContent.textContent = t(item.content);
        itemContent.classList.toggle("about-item__body--preline", Boolean(item.contentPreline));
      }
      const itemLink = itemTemplate.querySelector("a") as HTMLAnchorElement | null;
      if (itemLink) {
        if (item.link && item.linkText) {
          itemLink.href = item.link;
          itemLink.textContent = t(item.linkText);
        } else {
          itemLink.remove();
        }
      }
      fragment.appendChild(itemTemplate);
    }

    itemsContainer.appendChild(fragment);
  },
};

export default privacyCtrl;

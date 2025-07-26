import type { BaseCtrl } from "./base.types";
import { bases } from "@features/recipe/recipe.const";
import { baseStore } from "./base.store";
import { getBaseById } from "./base.utils";
import type { Base } from "@features/recipe/recipe.types";
import { t } from "@features/translate/translate";
import { ICONS } from "../icon/icon.const";
import { getStyleForIcon } from "../icon/icon";
import { getRandomVariant } from "../composer/composer.utils";
import { composerStore } from "../composer/composer.store";

const baseCtrl: BaseCtrl = {
  init() {

    const template = document.getElementById('base-choice-template') as HTMLTemplateElement;
    const container = document.getElementById("base-container");
    if (!container) throw new Error('Container not found');
    container.addEventListener('click', this.selectBase);

    const fragment = document.createDocumentFragment();
    for (const base of Array.from(bases.values()) as Base[]) {
      const content = template.content.cloneNode(true) as DocumentFragment;
      const baseChoicePage = content.firstElementChild as HTMLElement;

      const img = baseChoicePage.querySelector('[role="img"]') as HTMLImageElement;
      const text = baseChoicePage.querySelector('[data-role="text"]') as HTMLDivElement;

      baseChoicePage.setAttribute('id', base.id);

      baseChoicePage.setAttribute('role', 'button');
      baseChoicePage.setAttribute('data-type', 'base');


      getStyleForIcon(img, ICONS.get(base.id) ?? 0);

      text.innerText = `${t(base.name)}`;
      fragment.appendChild(baseChoicePage);
      if (baseStore.currentBase && baseStore.currentBase.id === base.id) {
        baseChoicePage.setAttribute('disabled', 'true');
      }
    }
    container.appendChild(fragment);

  },
  // Here because if is in utils, cause problem with proxy-sub
  selectBase(e: Event) {
    const target = (e.target as HTMLElement).closest('[data-type="base"]') as HTMLElement;
    if (!target) return;
    if (target.hasAttribute('disabled')) return;
    const baseId = target.id;

    const base = getBaseById(baseId);
    baseStore.setCurrentBase(base);
    composerStore.setCurrentVariant(getRandomVariant(baseStore.currentBase.id));

    const baseButtons = document.querySelectorAll('[data-type="base"]') as NodeListOf<HTMLButtonElement>;
    baseButtons.forEach(button => {
      button.removeAttribute('disabled');
    });
    target.setAttribute('disabled', 'true');
  },

  cleanUp() {
    const container = document.getElementById("base-container");
    if (container) {
      container.innerHTML = '';
      container.removeEventListener('click', this.selectBase);
    }
  },
}

export default baseCtrl;
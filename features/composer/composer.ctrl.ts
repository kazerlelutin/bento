import { ComposerCtrl } from "./composer.types";
import { baseStore } from "../base/base.store";
import { Base } from "../recipe/recipe.types";
import { composerStore } from "./composer.store";
import { getRandomVariant } from "./composer.utils";
import { getStyleForIcon } from "../icon/icon";
import { ICONS } from "../icon/icon.const";
import { variants } from "../recipe/variant.const";
import { t } from "../translate/translate";
import { ingredients } from "../recipe/ingredient.const";
import { UI } from "../translate/translate.const";

const composerCtrl: ComposerCtrl = {
  async init() {
    this.unsubscribeBase = baseStore.subscribe((base: Base) => {
      composerStore.setCurrentVariant(getRandomVariant(base.id));
    });

    this.unsubscribeIngredient = composerStore.subscribe(() => {
      this.updateUI();
    });

    this.updateUI();
  },

  updateUI() {
    const container = document.getElementById("composer-container");
    const template = document.getElementById('ingredient-choice-template') as HTMLTemplateElement;

    if (!container) {
      console.warn('Container not found, skipping UI update');
      return;
    }

    container.removeEventListener('click', this.selectIngredient);
    container.addEventListener('click', this.selectIngredient);
    container.innerHTML = '';

    const fragment = document.createDocumentFragment();

    const baseVariants = variants.get(baseStore.currentBase.id);

    if (!baseVariants) {
      throw new Error(`Base ${baseStore.currentBase.id} not found`);
    }

    const baseIngredients = baseStore.currentBase.ingredients || [];
    const variantIngredients = composerStore.currentVariant.ingredients || [];

    const ingredientMap = new Map();
    variantIngredients.forEach(ingredient => {
      ingredientMap.set(ingredient.id, ingredient);
    });

    baseIngredients.forEach(ingredient => {
      ingredientMap.set(ingredient.id, ingredient);
    });

    const allIngredients = Array.from(ingredientMap.values());


    const sortedIngredients = allIngredients.sort((a, b) => {
      const roleOrder: Record<string, number> = { 'core': 0, 'optional': 1, 'base': 2 };
      const roleA = a.role || 'base';
      const roleB = b.role || 'base';
      const roleDiff = roleOrder[roleA] - roleOrder[roleB];

      if (roleDiff !== 0) return roleDiff;

      const ingredientA = ingredients.get(a.id);
      const ingredientB = ingredients.get(b.id);
      const nameA = t(ingredientA?.name ?? { fr: a.id, en: a.id, ko: a.id });
      const nameB = t(ingredientB?.name ?? { fr: b.id, en: b.id, ko: b.id });

      return nameA.localeCompare(nameB);
    });


    for (const ingredient of sortedIngredients) {

      const content = template.content.cloneNode(true) as DocumentFragment;
      const ingredientPage = content.firstElementChild as HTMLElement;

      const img = ingredientPage.querySelector('[role="img"]') as HTMLImageElement;
      const text = ingredientPage.querySelector('[data-role="text"]') as HTMLDivElement;
      const actionIcon = ingredientPage.querySelector('[data-role="action-icon"]') as HTMLDivElement;

      ingredientPage.setAttribute('id', ingredient.id);

      const currentValue = composerStore.getSelectedIngredient(ingredient.id);


      const iconId = currentValue.match(/true|false/) ? ingredient.id : currentValue ?? ingredient.id;

      getStyleForIcon(img, ICONS.get(iconId) ?? 0);

      const ingredientToShow = ingredients.get(currentValue) ?? ingredients.get(ingredient.id);

      text.innerText = t(ingredientToShow?.name ?? { fr: currentValue ?? ingredient.id, en: currentValue ?? ingredient.id, ko: currentValue ?? ingredient.id });

      let iconActionName = '';

      if (ingredient.role === 'core') {
        ingredientPage.setAttribute('data-type', 'core');
        const availableVariants = Array.from(variants.get(baseStore.currentBase.id)?.values() ?? []);
        iconActionName = availableVariants.length > 1 ? 'exchange' : '';
      }

      if (ingredient.foe?.length) {
        ingredientPage.setAttribute('data-foe', ingredient.foe.join(','));
      }

      if (ingredient.role === 'optional') {

        const isSelected = composerStore.getSelectedIngredient(ingredient.id) === "true";

        iconActionName = isSelected ? 'add' : 'delete';
        ingredientPage.setAttribute('data-selected', isSelected.toString());
      }

      if (ingredient.substitutes?.length) {

        iconActionName = 'exchange';
      }

      if (iconActionName === '') {
        ingredientPage.setAttribute('data-disabled', 'true');
        actionIcon.remove();
      } else {
        const uiKey = iconActionName as keyof typeof UI;
        if (UI[uiKey]) {
          actionIcon.setAttribute('alt', t(UI[uiKey]));
          getStyleForIcon(actionIcon, ICONS.get(iconActionName) ?? 0);
        }
      }

      fragment.appendChild(ingredientPage);
    }

    container.appendChild(fragment);
  },
  selectIngredient(event: MouseEvent) {
    const target = (event.target as HTMLElement).closest('[data-role="ingredient-choice"]') as HTMLElement;
    if (!target) return;
    if (target.hasAttribute('disabled') || target.hasAttribute('data-disabled')) return;
    const ingredientId = target.getAttribute('id');

    const type = target.getAttribute('data-type');



    if (type === 'core') {
      const availableVariants = Array.from(variants.get(baseStore.currentBase.id)?.values() ?? []);
      const indexCurrentVariant = availableVariants.findIndex((variant) => variant.id === composerStore.currentVariant.id);
      const newVariant = availableVariants[indexCurrentVariant + 1] ?? availableVariants[0];
      composerStore.setCurrentVariant(newVariant);
    } else {
      if (!ingredientId) return;

      const allVariants = [composerStore.currentVariant, baseStore.currentBase].flatMap((variant) => variant.ingredients);
      const currentIngredient = allVariants.find((ing) => ing.id === ingredientId);

      if (currentIngredient?.substitutes?.length) {
        const currentValue = composerStore.getSelectedIngredient(ingredientId);
        const substitutes = [currentIngredient.id, ...currentIngredient.substitutes];
        const currentIndex = substitutes.indexOf(currentValue);
        const nextIndex = (currentIndex + 1) % substitutes.length;
        const nextSubstitute = substitutes[nextIndex];

        composerStore.setSelectedIngredients(ingredientId, nextSubstitute);

        const foesBase = baseStore.currentBase.ingredients.filter((ing) => ing.foe?.includes(ingredientId));
        if (foesBase.length) {
          foesBase.forEach((foe) => {
            composerStore.setSelectedIngredients(foe.id, "false");
          });
        }

      } else {
        const isSelected = composerStore.getSelectedIngredient(ingredientId) === "true";
        composerStore.setSelectedIngredients(ingredientId, isSelected ? "false" : "true");
        const foes = target.getAttribute('data-foe')?.split(',') ?? [];
        if (!isSelected && foes.length) {
          foes.forEach((foe: string) => {
            composerStore.setSelectedIngredients(foe, "false");
          });
        }
      }

      composerCtrl.updateUI();
    }
  },
  cleanUp() {
    this.unsubscribeBase?.();
    this.unsubscribeIngredient?.();
  },

};

export default composerCtrl;

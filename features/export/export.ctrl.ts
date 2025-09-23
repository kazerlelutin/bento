import { baseStore } from "../base/base.store";
import { composerStore } from "../composer/composer.store";
import { ingredients } from '../recipe/ingredient.const';
import { steps } from "../recipe/steps.const";
import { t } from "../translate/translate";
import { UI } from "../translate/translate.const";
import type { ExportCtrl, Recipe } from "./export.types";
import { transformTextWithIngredients } from './export .utils';
import quantitySelectorCtrl from "@features/quantity-selector/quantity-selector.ctrl";
import { quantitySelectorStore } from "../quantity-selector/quantity-selector.store";
import { translateStore } from "../translate/translate.store";

const exportCtrl: ExportCtrl = {

  multiple: 1,
  init() {
    const container = document.getElementById('stepper-export-container');

    if (container) {
      container.addEventListener('click', (e) => this.handleExportClick(e));
    }

    // composer store injection
    this.unsubscribeIngredient = composerStore.subscribe(() => {
      this.updateUI();
    });

    // quantity selector injection

    this.unsubscribeQuantitySelector = quantitySelectorStore.subscribe(() => {
      this.multiple = quantitySelectorStore.quantity;
      this.updateIngredientsUI();
    });

    this.multiple = quantitySelectorStore.quantity;
    quantitySelectorCtrl.init();

    // Update UI
    this.updateUI();
  },
  updateIngredientsUI() {
    const recipe = this.getRecipe();
    const ingredientsSection = document.getElementById('stepper-export-ingredients');

    const ingredientsTemplate = document.getElementById('stepper-export-ingredients-template') as HTMLTemplateElement;

    if (ingredientsTemplate) {
      const ingredientsFragment = ingredientsTemplate.content.cloneNode(true) as DocumentFragment;
      const ingredientsList = ingredientsFragment.getElementById('stepper-export-ingredients-list');


      if (ingredientsList) {
        recipe.ingredients.forEach((ingredient) => {
          const li = document.createElement('li');
          const strong = document.createElement('strong');

          const quantity = ingredient.quantity * this.multiple;

          const tradKey = quantity > 1 ? ingredient.unit + '-plural' : ingredient.unit;
          const tradUnit = t(UI[tradKey as keyof typeof UI]);

          strong.textContent = ingredient.name;
          li.appendChild(strong);
          li.appendChild(document.createTextNode(` ${quantity.toLocaleString()} ${tradUnit}`));
          ingredientsList.appendChild(li);

        });
      }

      if (ingredientsSection) {
        ingredientsSection.innerHTML = '';
        ingredientsSection.appendChild(ingredientsFragment);
      }
    }

  },
  updateUI() {
    const recipe = this.getRecipe();


    const container = document.getElementById('stepper-export-content');

    const titleElement = document.getElementById('stepper-export-title');
    if (titleElement) {
      titleElement.textContent = recipe.name;
    }

    const fragment = document.createDocumentFragment();

    this.updateIngredientsUI();

    const stepsTemplate = document.getElementById('stepper-export-steps-template') as HTMLTemplateElement;

    if (stepsTemplate) {
      const stepsFragment = stepsTemplate.content.cloneNode(true) as DocumentFragment;
      const stepsList = stepsFragment.getElementById('stepper-export-steps-list');

      if (stepsList) {

        recipe.steps.forEach((step, index) => {
          const stepFragment = document.getElementById('stepper-export-step-template') as HTMLTemplateElement;

          if (stepFragment) {
            const stepElement = stepFragment.content.cloneNode(true) as HTMLElement;
            if (!stepElement) return

            const stepTitle = stepElement.querySelector('.stepper-export-step-title') as HTMLHeadingElement;
            if (stepTitle) {
              stepTitle.textContent = `${index + 1}. ${step.name}`;
            }

            const stepDescription = stepElement.querySelector('#stepper-export-step-description') as HTMLParagraphElement;
            if (stepDescription) {
              stepDescription.textContent = step.description;
            }

            const stepTips = stepElement.querySelector('#stepper-export-step-tips') as HTMLUListElement;

            if (stepTips) {
              step.tips ? stepTips.textContent = step.tips : stepTips.remove();
            }

            stepsList.appendChild(stepElement);
          }
        });
      }

      const stepsSection = document.getElementById('stepper-export-steps');
      if (stepsSection) {
        stepsSection.appendChild(stepsFragment);
      }
    }

    const stepsSection = document.createElement('div');
    stepsSection.className = 'steps-section';

    const stepsTitle = document.createElement('h2');
    stepsTitle.textContent = 'Étapes';
    stepsSection.appendChild(stepsTitle);

    fragment.appendChild(stepsSection);

    if (container) {
      container.appendChild(fragment);
    }

    const elementToTranslate = document.querySelectorAll('[data-translate]');
    elementToTranslate.forEach((element) => {
      const translate = element.getAttribute('data-translate') ?? '';
      if (translate) {
        (element as HTMLElement).innerText = t(UI[translate as keyof typeof UI]);
      }
    });

  },
  handleExportClick(e: Event) {

    const target = e.target as HTMLButtonElement;

    if (target.dataset.type) {
      this.downloadFile(target.dataset.type as 'md' | 'json');
    }
  },

  updateFormatButtons(activeFormat: 'md' | 'json') {
    const buttons = document.querySelectorAll('[data-format]');
    buttons.forEach(button => {
      const htmlButton = button as HTMLButtonElement;
      if (htmlButton.dataset.format === activeFormat) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  },

  downloadFile(format: 'md' | 'json') {
    const recipe = this.getRecipe();
    let content = '';

    if (format === 'md') {
      content = this.toMd(recipe);
    } else if (format === 'json') {
      content = this.toJson(recipe);
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${recipe.name}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  },

  getRecipe() {
    const recipeName = composerStore.getRecipeName();

    const mergeBaseAndVariant = [baseStore.currentBase, composerStore.currentVariant]
    const allIngredients = mergeBaseAndVariant.flatMap((variant) => variant.ingredients);

    const allSteps = mergeBaseAndVariant.flatMap((variant) => variant.steps);

    const filteredSteps = allSteps.filter((step) => {

      // Step no need ingredients
      if (!step.ingredients || step.ingredients.length === 0) {
        return true;
      }

      // Step need ingredients
      return step.ingredients.some((stepIngredientId: string) => allIngredients.some(activeIngredient =>
        activeIngredient.id === stepIngredientId || activeIngredient.substitutes?.includes(stepIngredientId)
      ));
    });

    const sortedSteps = filteredSteps.sort((a, b) => {
      const orderA = a.order || 0;
      const orderB = b.order || 0;
      return orderA - orderB;
    });

    const ingredientsForExport = allIngredients.map((ingredient, idx) => {
      const ingredientChanged = composerStore.selectedIngredients.get(ingredient.id)

      const isBase = allIngredients.slice(idx + 1).some(i => i.id === ingredient.id)

      const infos = ingredients.get(ingredientChanged !== 'true' && ingredientChanged ? ingredientChanged : ingredient.id)
      if (!infos) return null;

      return {
        id: infos.id,
        stepId: ingredient.id,
        name: t(infos.name) + (isBase ? ' (base)' : ''),
        quantity: ingredient.quantity * this.multiple,
        unit: ingredient.unit,
        allergens: infos?.allergens || [],
        nutrition: infos?.nutrition,
        description: t(infos.description)
      }
    }).filter((ingredient) => ingredient !== null);



    const stepsForExport = sortedSteps.map((step) => {
      const infos = steps.get(step.id)
      if (!infos) return null;

      if (step.ingredients.length) {
        // Touchy filter, if we have a step with ingredients and we have a substitute, we need to check if the substitute is available
        const availableIngredients = ingredientsForExport.filter(i => step.ingredients.includes(i.stepId) && !step.ingredients.includes("!" + i.id)
        )
        if (!availableIngredients.length) return null
      }

      return {
        tools: [], //TODO later with other keys
        name: transformTextWithIngredients(t(infos.name), ingredientsForExport, step.ingredients),
        description: transformTextWithIngredients(t(infos.description), ingredientsForExport, step.ingredients),
        tips: infos.tips ? transformTextWithIngredients(t(infos.tips), ingredientsForExport, step.ingredients) : undefined
      }
    }).filter((step) => step !== null);

    return {
      name: recipeName,
      ingredients: ingredientsForExport,
      steps: stepsForExport
    }
  },
  toMd(recipe: Recipe) {

    let md = ''

    md += `# ${recipe.name}\n\n`;
    md += `${t(UI['quantity-selector-value']).replace('{quantity}', this.multiple.toString())}\n\n`;
    md += `${t(UI['ingredients-for']).replace('{quantity}', this.multiple.toString())}\n\n`;
    recipe.ingredients.forEach((ingredient) => {
      const tradKey = ingredient.quantity > 1 ? ingredient.unit + '-plural' : ingredient.unit;
      md += `- ${ingredient.name}: ${ingredient.quantity.toLocaleString()} ${t(UI[tradKey as keyof typeof UI])}\n`;
    });
    md += '\n\n---\n\n';

    md += `${t(UI.steps)}\n\n`;
    recipe.steps.forEach((step) => {
      if (step.description) {
        md += `#### ${t(UI.description)}\n\n${step.description}\n\n`;
      }
      if (step.tips) {
        md += `#### ${t(UI.tips)}\n\n${step.tips}\n\n`;
      }
    });

    return md
  },

  toJson(recipe: Recipe) {
    return JSON.stringify(recipe, null, 2);
  },
  cleanUp() {
    this.unsubscribeIngredient?.();
    this.unsubscribeQuantitySelector?.();
    const container = document.getElementById('stepper-export-container');
    if (container) {
      container.removeEventListener('click', (e) => this.handleExportClick(e));
    }
    quantitySelectorCtrl.cleanUp();
  }
}

export default exportCtrl;
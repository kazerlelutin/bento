import { t } from "../translate/translate";
import { UI } from "../translate/translate.const";
import { quantitySelectorStore } from "./quantity-selector.store";

export const quantitySelectorCtrl = {
  init() {
    const container = document.getElementById('quantity-selector');
    if (!container) throw new Error('Container not found');

    container.addEventListener('click', (e) => this.handleClick(e));

    this.updateUI();
  },

  handleClick(e: Event) {
    const target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON' && target.dataset.type) {
      quantitySelectorStore.setQuantity(quantitySelectorStore.quantity + (target.textContent === '-' ? -1 : 1));
      this.updateUI();
    }
  },

  updateUI() {
    const container = document.getElementById('quantity-selector-value');
    if (!container) throw new Error('Container not found');

    const translateId = quantitySelectorStore.quantity > 1 ? 'quantity-selector-value-plural' : 'quantity-selector-value';
    const translation = t(UI[translateId as keyof typeof UI]);

    const minusButton = document.querySelector('.stepper-export-quantity-selector[data-type="minus"]');
    if (minusButton) {

      const isDisabled = quantitySelectorStore.quantity > 1 ? 'false' : 'true';

      if (isDisabled === 'true') {
        minusButton.setAttribute('disabled', 'true');
      } else {
        minusButton.removeAttribute('disabled');
      }
    }
    container.textContent = translation.replace('{quantity}', quantitySelectorStore.quantity.toString());
  },
  cleanUp() {
    const container = document.getElementById('quantity-selector');
    if (container) container.innerHTML = '';
  }
}

export default quantitySelectorCtrl;
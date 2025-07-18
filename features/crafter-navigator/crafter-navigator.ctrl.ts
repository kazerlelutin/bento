import { crafterNavigatorStore } from "./crafter-navigator.store";
import type { CrafterNavigatorCtrl, Step } from "./crafter-navigator.types";
import { createButton, getCrafterNavigatorContainer, handleEventCallback } from "./crafter-navigator.utils";
import { steps } from "./crafter.navigator.const";


const crafterNavigatorCtrl: CrafterNavigatorCtrl = {

  init() {
    const container = getCrafterNavigatorContainer()
    steps.forEach(step => {
      const button = createButton(step);
      if (button) container.appendChild(button);
      if (step.name === crafterNavigatorStore.currentStep.name) button.setAttribute('aria-current', 'true');
    });

    container.addEventListener('click', handleEventCallback);
    container.addEventListener('keydown', handleEventCallback);
    this.unsubscribe = crafterNavigatorStore.subscribe((step) => {
      this.updateUI(step);
    });
  },

  updateUI(step: Step) {
    const container = getCrafterNavigatorContainer();

    const buttons = container.querySelectorAll('.crafter-stepper-button') as NodeListOf<HTMLButtonElement>;
    buttons.forEach(button => {
      const isActive = step.name === button.dataset.stepName;
      button.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  },

  cleanUp() {
    this.unsubscribe?.();
  }
}

export default crafterNavigatorCtrl;
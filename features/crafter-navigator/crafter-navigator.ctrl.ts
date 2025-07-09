import { crafterNavigatorStore } from "./crafter-navigator.store";
import type { Step } from "./crafter-navigator.types";
import { createButton, getCrafterNavigatorContainer } from "./crafter-navigator.utils";
import { steps } from "./crafter.navigator.const";

export default {
  init() {
    const container = getCrafterNavigatorContainer()

    steps.forEach(step => {
      const button = createButton(step);
      if (button) container.appendChild(button);
      if (step.id === crafterNavigatorStore.currentStep.id) button.setAttribute('aria-current', 'true');
    });

    container.addEventListener('click', (e) => {
      const button = e.target as HTMLButtonElement;
      const stepId = button.dataset.stepId;
      if (stepId) crafterNavigatorStore.setCurrentStep(stepId);
    });

    this.unsubscribe = crafterNavigatorStore.subscribe((step) => {
      this.updateUI(step);
    });
  },

  updateUI(step: Step) {
    const container = getCrafterNavigatorContainer();

    const buttons = container.querySelectorAll('.crafter-stepper-button');
    buttons.forEach(button => {
      const isActive = step.id === button.getAttribute('data-step-id');
      button.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  },

  cleanup() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}
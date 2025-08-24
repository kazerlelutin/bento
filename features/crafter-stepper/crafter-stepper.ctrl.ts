import { crafterNavigatorStore } from "../crafter-navigator/crafter-navigator.store";
import type { Step } from "../crafter-navigator/crafter-navigator.types";
import { STEPPER_CONTAINER_ID, steps } from "./crafter-stepper.const";
import { CrafterStepperCtrl } from "./crafter-stepper.types";

const crafterStepperCtrl: CrafterStepperCtrl = {

  currentStep: null,
  init() {
    this.unsubscribe = crafterNavigatorStore.subscribe((step) => {
      this.updateUI(step);
    });
    this.updateUI(crafterNavigatorStore.currentStep);
  },
  async updateUI(step: Step) {
    const stepperStep = steps.find(s => s.name === step.name);

    if (!stepperStep) throw new Error(`Stepper step ${step.name} not found`);
    const container = document.getElementById(STEPPER_CONTAINER_ID);

    if (!container) throw new Error('Stepper container not found');
    const template = document.getElementById(stepperStep.templateId) as HTMLTemplateElement;

    if (!template) throw new Error(`Stepper template ${stepperStep.templateId} not found`);
    container.innerHTML = '';
    const content = template.content.cloneNode(true) as DocumentFragment;
    container.appendChild(content.firstElementChild as Node);

    if (stepperStep.ctrl) {
      this.currentStep = stepperStep.ctrl;
      this.currentStep.init?.();
    }

  },
  cleanUp() {
    this.unsubscribe?.();
    this.currentStep?.cleanUp?.();
  }
}

export default crafterStepperCtrl;
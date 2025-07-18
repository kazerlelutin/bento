import { crafterNavigatorStore } from "../crafter-navigator/crafter-navigator.store";
import type { Step } from "../crafter-navigator/crafter-navigator.types";
import { STEPPER_CONTAINER_ID, steps } from "./crafter-stepper.const";
import { CrafterStepperCtrl } from "./crafter-stepper.types";

const crafterStepperCtrl: CrafterStepperCtrl = {

  init() {
    // @crafter-navigator
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

    if (stepperStep.ctrl) await stepperStep.ctrl();
  },
  cleanUp() {
    // @crafter-navigator
    this.unsubscribe?.();
  }
}

export default crafterStepperCtrl;
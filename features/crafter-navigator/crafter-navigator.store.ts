import type { Step } from "./crafter-navigator.types";
import { steps } from "./crafter.navigator.const";
import { createStore } from "../../utils/proxy-sub";


export const setCurrentStep = (stepId: string) => {
  const step: Step | undefined = steps.find(s => s.id === stepId);
  if (!step) throw new Error('Step not found');

  crafterNavigatorStore.currentStep = step;
}

export const crafterNavigatorStore = createStore({
  currentStep: steps[0],
  steps,
  setCurrentStep
}, {
  notifyOnProps: ['currentStep'],
  transformData: (_prop, value) => value
});
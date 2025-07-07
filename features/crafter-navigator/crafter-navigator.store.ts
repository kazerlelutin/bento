import type { CrafterNavigatorStore, Step } from "./crafter-navigator.types";
import { steps } from "./crafter.navigator.const";
import { createStore } from "../../utils/proxy-sub";

export const setCurrentStep = (stepName: string) => {
  const step: Step | undefined = steps.find(s => s.name === stepName);
  if (!step) throw new Error(`Step ${stepName} not found`);

  crafterNavigatorStore.currentStep = step;
}

export const crafterNavigatorStore = createStore<CrafterNavigatorStore>({
  currentStep: steps[0],
  steps,
  setCurrentStep
}, {
  notifyOnProps: ['currentStep'],
  transformData: (_prop, value) => value
});
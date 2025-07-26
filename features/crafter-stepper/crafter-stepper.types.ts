import type { Step } from "../crafter-navigator/crafter-navigator.types";
import type { Ctrl } from "../routes/routes.type";

export type StepperStep = {
  name: string;
  templateId: string;
  ctrl?: StepperInitializer;
}

export type StepperInitializer = Ctrl;

export type CrafterStepperCtrl = Ctrl & {
  currentStep: StepperInitializer | null;
  updateUI: (step: Step) => void;
  unsubscribe?: () => void;
}
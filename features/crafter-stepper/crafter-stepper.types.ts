import type { Step } from "../crafter-navigator/crafter-navigator.types";
import type { Ctrl } from "../routes/routes.type";

export type StepperStep = {
  name: string;
  templateId: string;
  ctrl?: StepperInitializer;
}

export type StepperInitializer = () => void | Promise<void>;

export type CrafterStepperCtrl = Ctrl & {
  updateUI: (step: Step) => void;
  unsubscribe?: () => void;
}
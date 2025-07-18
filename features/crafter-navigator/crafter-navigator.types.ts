import type { Ctrl } from "../routes/routes.type";

export type Step = {
  name: string;
  title: string;
  icon: string;
  alt: string;
}

export type CrafterNavigatorStore = {
  currentStep: Step;
  steps: Step[];
  setCurrentStep: (stepName: string) => void;
}

export type CrafterNavigatorCtrl = Ctrl & {
  updateUI: (step: Step) => void;
  unsubscribe?: () => void;
}

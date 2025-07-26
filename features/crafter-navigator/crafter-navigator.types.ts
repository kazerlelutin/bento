import type { Ctrl } from "@routes/routes.type";
import type { Translation } from "@features/translate/translate.types";

export type Step = {
  name: string;
  title: Translation;
  alt: Translation;
  description: Translation;
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

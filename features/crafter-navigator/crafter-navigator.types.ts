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

import { StepperStep } from "./crafter-stepper.types";

export const STEPPER_CONTAINER_ID = 'stepper';

export const steps: StepperStep[] = [
  {
    name: 'home',
    templateId: 'stepper-home-template',
  },
  {
    name: 'base',
    templateId: 'stepper-base-template',
  },
  {
    name: 'composer',
    templateId: 'stepper-composer-template',
  },
  {
    name: 'export',
    templateId: 'stepper-export-template',
  }
]
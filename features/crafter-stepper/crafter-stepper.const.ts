import baseCtrl from "@features/base/base.ctrl";
import composerCtrl from "@features/composer/composer.ctrl";
import exportCtrl from "@features/export/export.ctrl";
import { StepperStep } from "./crafter-stepper.types";

export const STEPPER_CONTAINER_ID = 'stepper';

export const steps: StepperStep[] = [
  {
    name: 'base',
    templateId: 'stepper-base-template',
    ctrl: baseCtrl
  },
  {
    name: 'composer',
    templateId: 'stepper-composer-template',
    ctrl: composerCtrl
  },
  {
    name: 'export',
    templateId: 'stepper-export-template',
    ctrl: exportCtrl
  }
]
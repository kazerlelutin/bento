// @crafter-navigator
import crafterNavigatorCtrl from '../../crafter-navigator/crafter-navigator.ctrl';
import crafterStepperCtrl from '../../crafter-stepper/crafter-stepper.ctrl';
import type { Ctrl } from '../routes.type';

const homeCtrl: Ctrl = {
  init() {
    // @crafter-navigator
    crafterNavigatorCtrl.init?.();
    // @crafter-stepper
    crafterStepperCtrl.init?.();
  },
  cleanUp() {
    // @crafter-navigator
    crafterNavigatorCtrl.cleanUp?.();
    // @crafter-stepper
    crafterStepperCtrl.cleanUp?.();
  }
}

export default homeCtrl;
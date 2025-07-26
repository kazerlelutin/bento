import { activeFooterLink } from '@/utils/active-footer-link';
import bentoViewerCtrl from '@features/bento-viewer/bento-viewer.ctrl';
import crafterNavigatorCtrl from '@features/crafter-navigator/crafter-navigator.ctrl';
import crafterStepperCtrl from '@features/crafter-stepper/crafter-stepper.ctrl';
import { recipeUrlCtrl } from '@features/recipe-url/recipe-url.ctrl';
import type { Ctrl } from '@features/routes/routes.type';

const homeCtrl: Ctrl = {
  init() {
    recipeUrlCtrl.init?.();
    crafterNavigatorCtrl.init?.();
    crafterStepperCtrl.init?.();
    bentoViewerCtrl.init?.();
    activeFooterLink('/');
  },
  cleanUp() {
    crafterNavigatorCtrl.cleanUp?.();
    crafterStepperCtrl.cleanUp?.();
    bentoViewerCtrl.cleanUp?.();
    recipeUrlCtrl.cleanUp?.();
  }
}

export default homeCtrl;
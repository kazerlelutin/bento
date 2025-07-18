import { beforeEach, describe, expect, it, jest } from 'bun:test';
import crafterNavigatorCtrl from './crafter-navigator.ctrl';
import { crafterNavigatorStore } from './crafter-navigator.store';
import { steps } from './crafter.navigator.const';

function setupDOM() {
  document.body.innerHTML = '';
  const container = document.createElement('div');
  container.id = 'crafter-controls';
  document.body.appendChild(container);
  return container;
}

describe('crafterNavigatorCtrl', () => {
  beforeEach(() => {
    setupDOM();
    crafterNavigatorStore.currentStep = steps[0];
  });

  it('adds buttons to the container', () => {
    const container = document.getElementById('crafter-controls') as HTMLElement;
    crafterNavigatorCtrl.init?.();
    const buttons = container.querySelectorAll('.crafter-stepper-button');
    expect(buttons.length).toBe(steps.length);

    const active = Array.from(buttons).find(
      btn => btn.getAttribute('aria-current') === 'true'
    );

    expect(active).toBeDefined();
  });

  it('updates aria-current on buttons', () => {
    crafterNavigatorCtrl.init?.();
    const container = document.getElementById('crafter-controls') as HTMLElement;
    const buttons = container.querySelectorAll('.crafter-stepper-button');
    crafterNavigatorCtrl.updateUI(steps[1]);
    const active = Array.from(buttons).find(
      btn => btn.getAttribute('aria-current') === 'true'
    ) as HTMLButtonElement;
    expect(active?.dataset.stepName).toBe(steps[1].name);
  });

  it('unsubscribes from the store', () => {
    const spy = jest.fn();
    const originalSubscribe = crafterNavigatorStore.subscribe;
    crafterNavigatorStore.subscribe = () => spy;

    crafterNavigatorCtrl.init?.();
    crafterNavigatorCtrl.cleanUp?.();

    expect(spy).toHaveBeenCalled();

    crafterNavigatorStore.subscribe = originalSubscribe;
  });

  it('clicking on a button changes the current step', () => {
    crafterNavigatorCtrl.init?.();
    const container = document.getElementById('crafter-controls') as HTMLElement;
    const button = container.querySelector('.crafter-stepper-button') as HTMLButtonElement;
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(button.dataset.stepName).toBeDefined();
  });
});

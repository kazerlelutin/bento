import type { Step } from "./crafter-navigator.types";
import { CONTAINER_ID } from "./crafter.navigator.const";

export function getCrafterNavigatorContainer(): HTMLElement {
  const container = document.getElementById(CONTAINER_ID);
  if (!container) throw new Error(`${CONTAINER_ID} not found`);
  return container;
}

export function createButton(step: Step) {
  const button = document.createElement('button');

  Object.assign(button, {
    className: 'crafter-stepper-button',
    textContent: step.name,
    title: step.title,
    role: 'button',
    'aria-current': 'false',
    'aria-disabled': 'false',
    'aria-pressed': 'false',
    'aria-label': `étape du crafter ${step.id}`,
    'aria-roledescription': 'étape du crafter',
    'aria-describedby': `étape du crafter ${step.id}`
  });

  button.dataset.stepId = step.id;

  return button;
}
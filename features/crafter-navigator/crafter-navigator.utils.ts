import { crafterNavigatorStore } from "./crafter-navigator.store";
import type { Step } from "./crafter-navigator.types";
import { CONTAINER_ID } from "./crafter.navigator.const";

export function getCrafterNavigatorContainer(): HTMLElement {
  const container = document.getElementById(CONTAINER_ID);
  if (!container) throw new Error(`${CONTAINER_ID} not found`);
  return container;
}

export function createButton(step: Step) {
  const button = document.createElement('img');
  button.className = 'crafter-stepper-button';
  button.title = step.title;
  button.role = 'button';
  button.tabIndex = 0;


  button.setAttribute('aria-current', 'false');
  button.setAttribute('aria-disabled', 'false');
  button.setAttribute('aria-pressed', 'false');
  button.setAttribute('aria-roledescription', 'étape du crafter');
  button.setAttribute('aria-describedby', `étape du crafter ${step.name}`);
  button.setAttribute('aria-label', step.alt);
  button.setAttribute('src', step.icon);
  button.setAttribute('alt', step.alt);
  button.setAttribute('width', '32px');
  button.setAttribute('height', '32px');

  button.dataset.stepName = step.name;

  return button;
}

export function handleEventCallback(e: Event) {
  const target = e.target;
  if (target instanceof HTMLElement && 'stepName' in target.dataset) {
    const stepName = target.dataset.stepName;
    if (stepName) crafterNavigatorStore.setCurrentStep(stepName);
  }
}
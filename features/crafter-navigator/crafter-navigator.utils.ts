import { ICONS } from "../icon/icon.const";
import { crafterNavigatorStore } from "./crafter-navigator.store";
import type { Step } from "./crafter-navigator.types";
import { getStyleForIcon } from "@features/icon/icon";
import { t } from "@features/translate/translate";

export function getCrafterNavigatorContainer(): HTMLElement {
  const container = document.getElementById('crafter-controls');
  if (!container) {
    throw new Error('Container crafter-controls not found');
  }
  return container;
}

export function createButton(step: Step) {
  const button = document.createElement('div');
  button.className = 'crafter-stepper-button';
  button.title = t(step.title);
  button.role = 'button';
  button.tabIndex = 0;

  button.setAttribute('aria-current', 'false');
  button.setAttribute('aria-disabled', 'false');
  button.setAttribute('aria-pressed', 'false');
  button.setAttribute('aria-roledescription', t(step.description));
  button.setAttribute('aria-label', t(step.alt));

  getStyleForIcon(button, ICONS.get(step.name) ?? 0);

  button.dataset.stepName = step.name;

  return button;
}

export function handleEventCallback(event: Event): void {
  const target = event.target as HTMLElement;
  const stepName = target.dataset.stepName;

  if (stepName && target.classList.contains('crafter-stepper-button')) {
    crafterNavigatorStore.setCurrentStep(stepName);
  }
}
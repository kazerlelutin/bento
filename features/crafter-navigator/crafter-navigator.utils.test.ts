import { beforeEach, describe, expect, it, jest } from 'bun:test';
import { getCrafterNavigatorContainer, createButton, handleEventCallback } from './crafter-navigator.utils';
import { crafterNavigatorStore } from './crafter-navigator.store';

describe('getCrafterNavigatorContainer', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('returns the container if it exists', () => {
    const div = document.createElement('div');
    div.id = 'crafter-controls';
    document.body.appendChild(div);
    expect(getCrafterNavigatorContainer()).toBe(div);
  });

  it('throws an error if the container is absent', () => {
    expect(() => getCrafterNavigatorContainer()).toThrow('crafter-controls not found');
  });
});

describe('createButton', () => {
  const step = {
    name: 'home',
    title: 'Accueil',
    icon: '/icons/home.png',
    alt: 'Accueil',
  };

  it('creates an img element with the correct attributes', () => {
    const button = createButton(step);
    expect(button.tagName).toBe('IMG');
    expect(button.className).toBe('crafter-stepper-button');
    expect(button.getAttribute('src')).toBe(step.icon);
    expect(button.getAttribute('alt')).toBe(step.alt);
    expect(button.getAttribute('title')).toBe(step.title);
    expect(button.getAttribute('role')).toBe('button');
    expect(button.dataset.stepName).toBe(step.name);
    expect(button.getAttribute('width')).toBe('32px');
    expect(button.getAttribute('height')).toBe('32px');
  });

  it('handles missing values without crashing', () => {
    const partialStep = { name: 'test', title: '', icon: '', alt: '' };
    const button = createButton(partialStep);
    expect(button).toBeInstanceOf(HTMLImageElement);
  });

  it('handles event callback', () => {
    const baseStep = {
      name: 'base',
      title: 'Base',
      icon: '/icons/base.png',
      alt: 'Base',
    };
    const button = createButton(baseStep);

    const event = new MouseEvent('click');
    Object.defineProperty(event, 'target', {
      value: button,
      writable: false
    });

    const originalSetCurrentStep = crafterNavigatorStore.setCurrentStep;
    let calledWith: string | undefined = undefined;
    crafterNavigatorStore.setCurrentStep = jest.fn((stepName: string) => {
      calledWith = stepName;
    });
    handleEventCallback(event);
    const expected = 'base' as unknown as undefined;

    expect(calledWith).toEqual(expected);

    crafterNavigatorStore.setCurrentStep = originalSetCurrentStep;
  });
});



import { beforeEach, describe, expect, it, jest } from 'bun:test';
import crafterStepperCtrl from './crafter-stepper.ctrl';
import { crafterNavigatorStore } from '../crafter-navigator/crafter-navigator.store';
import { STEPPER_CONTAINER_ID } from './crafter-stepper.const';
import type { Step } from '../crafter-navigator/crafter-navigator.types';

describe('crafterStepperCtrl', () => {
  let container: HTMLElement;
  let homeTemplate: HTMLElement;
  let baseTemplate: HTMLElement;

  describe('type checking', () => {
    it('should have the correct type with init, updateUI, and cleanup methods', () => {
      expect(typeof crafterStepperCtrl.init).toBe('function');
      expect(typeof crafterStepperCtrl.updateUI).toBe('function');
      expect(typeof (crafterStepperCtrl as any).cleanUp).toBe('function');
    });
  });

  beforeEach(() => {
    document.body.innerHTML = '';

    container = document.createElement('div');
    container.id = STEPPER_CONTAINER_ID;
    document.body.appendChild(container);

    homeTemplate = document.createElement('template');
    homeTemplate.id = 'stepper-home-template';
    homeTemplate.innerHTML = '<div class="home-content">Contenu de la page d\'accueil</div>';
    document.body.appendChild(homeTemplate);

    baseTemplate = document.createElement('template');
    baseTemplate.id = 'stepper-base-template';
    baseTemplate.innerHTML = '<div class="base-content">Contenu de la page base</div>';
    document.body.appendChild(baseTemplate);

    const composerTemplate = document.createElement('template');
    composerTemplate.id = 'stepper-composer-template';
    composerTemplate.innerHTML = '<div class="composer-header">Header</div><div class="composer-content">Contenu du composeur</div>';
    document.body.appendChild(composerTemplate);
  });

  describe('init', () => {
    it('should subscribe to crafterNavigatorStore and update UI with current step', () => {
      const updateUISpy = jest.spyOn(crafterStepperCtrl, 'updateUI');

      crafterStepperCtrl.init?.();

      expect(updateUISpy).toHaveBeenCalledWith(crafterNavigatorStore.currentStep);

      expect((crafterStepperCtrl as any).unsubscribe).toBeDefined();
    });
  });

  describe('updateUI', () => {
    it('should update container content with home template', async () => {
      const homeStep: Step = {
        name: 'home',
        title: 'Accueil',
        icon: '/icons/home.png',
        alt: 'Accueil'
      };

      await crafterStepperCtrl.updateUI(homeStep);

      expect(container.innerHTML).toContain('Contenu de la page d\'accueil');
      expect(container.querySelector('.home-content')).toBeTruthy();
    });

    it('should update container content with base template', async () => {
      const baseStep: Step = {
        name: 'base',
        title: 'Base',
        icon: '/icons/base.png',
        alt: 'Base'
      };

      await crafterStepperCtrl.updateUI(baseStep);

      expect(container.innerHTML).toContain('Contenu de la page base');
      expect(container.querySelector('.base-content')).toBeTruthy();
    });

    it('should throw error when step is not found', async () => {
      const invalidStep: Step = {
        name: 'invalid',
        title: 'Invalid',
        icon: '/icons/invalid.png',
        alt: 'Invalid'
      };

      await expect(crafterStepperCtrl.updateUI(invalidStep)).rejects.toThrow('Stepper step invalid not found');
    });

    it('should throw error when container is not found', async () => {
      container.remove();
      const homeStep: Step = {
        name: 'home',
        title: 'Accueil',
        icon: '/icons/home.png',
        alt: 'Accueil'
      };

      await expect(crafterStepperCtrl.updateUI(homeStep)).rejects.toThrow('Stepper container not found');
    });

    it('should throw error when template is not found', async () => {
      homeTemplate.remove();
      const homeStep: Step = {
        name: 'home',
        title: 'Accueil',
        icon: '/icons/home.png',
        alt: 'Accueil'
      };

      await expect(crafterStepperCtrl.updateUI(homeStep)).rejects.toThrow('Stepper template stepper-home-template not found');
    });

    it('should replace previous content when switching steps', async () => {
      const homeStep: Step = {
        name: 'home',
        title: 'Accueil',
        icon: '/icons/home.png',
        alt: 'Accueil'
      };

      const baseStep: Step = {
        name: 'base',
        title: 'Base',
        icon: '/icons/base.png',
        alt: 'Base'
      };

      await crafterStepperCtrl.updateUI(homeStep);
      expect(container.innerHTML).toContain('Contenu de la page d\'accueil');

      await crafterStepperCtrl.updateUI(baseStep);
      expect(container.innerHTML).toContain('Contenu de la page base');
      expect(container.innerHTML).not.toContain('Contenu de la page d\'accueil');
    });

    it('should properly clone template content using cloneNode', async () => {
      const homeStep: Step = {
        name: 'home',
        title: 'Accueil',
        icon: '/icons/home.png',
        alt: 'Accueil'
      };

      await crafterStepperCtrl.updateUI(homeStep);

      expect(container.firstElementChild).toBeTruthy();
      expect(container.firstElementChild?.className).toBe('home-content');
      expect(container.children.length).toBe(1);
    });

    it('should clear container before adding new content', async () => {
      const homeStep: Step = {
        name: 'home',
        title: 'Accueil',
        icon: '/icons/home.png',
        alt: 'Accueil'
      };

      const baseStep: Step = {
        name: 'base',
        title: 'Base',
        icon: '/icons/base.png',
        alt: 'Base'
      };

      container.innerHTML = '<div>Contenu initial</div>';
      expect(container.children.length).toBe(1);

      await crafterStepperCtrl.updateUI(homeStep);
      expect(container.children.length).toBe(1);
      expect(container.firstElementChild?.className).toBe('home-content');

      await crafterStepperCtrl.updateUI(baseStep);
      expect(container.children.length).toBe(1);
      expect(container.firstElementChild?.className).toBe('base-content');
    });

    it('should use firstElementChild when template has multiple elements', async () => {
      const composerStep: Step = {
        name: 'composer',
        title: 'Composeur',
        icon: '/icons/composer.png',
        alt: 'Composeur'
      };

      await crafterStepperCtrl.updateUI(composerStep);

      expect(container.children.length).toBe(1);
      expect(container.firstElementChild?.className).toBe('composer-header');
      expect(container.innerHTML).toContain('Header');
      expect(container.innerHTML).not.toContain('Contenu du composeur');
    });
  });

  describe('cleanUp', () => {
    it('should unsubscribe from crafterNavigatorStore', () => {
      const unsubscribeSpy = jest.fn();
      (crafterStepperCtrl as any).unsubscribe = unsubscribeSpy;

      (crafterStepperCtrl as any).cleanUp();

      expect(unsubscribeSpy).toHaveBeenCalled();
    });
  });

  describe('integration with crafterNavigatorStore', () => {
    it('should update UI when store step changes', async () => {
      const updateUISpy = jest.spyOn(crafterStepperCtrl, 'updateUI');

      crafterStepperCtrl.init?.();

      const newStep: Step = {
        name: 'base',
        title: 'Base',
        icon: '/icons/base.png',
        alt: 'Base'
      };

      const crafterControls = document.createElement('div');
      crafterControls.id = 'crafter-controls';
      document.body.appendChild(crafterControls);

      crafterNavigatorStore.currentStep = newStep;

      expect(updateUISpy).toHaveBeenCalledWith(newStep);
    });
  });
});

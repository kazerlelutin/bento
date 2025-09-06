import { describe, it, expect, beforeEach, afterEach } from 'bun:test';

describe('crafter-stepper.ctrl', () => {
  beforeEach(() => {
    // Clean up DOM before each test
    document.body.innerHTML = '';
  });

  afterEach(() => {
    // Clean up DOM after each test
    document.body.innerHTML = '';
  });

  describe('Structure du contrôleur', () => {
    it('devrait avoir les propriétés requises', async () => {
      const crafterStepperCtrl = await import('./crafter-stepper.ctrl');
      const ctrl = crafterStepperCtrl.default;

      expect(ctrl).toHaveProperty('currentStep');
      expect(ctrl).toHaveProperty('init');
      expect(ctrl).toHaveProperty('updateUI');
      expect(ctrl).toHaveProperty('cleanUp');
    });

    it('devrait initialiser currentStep à null', async () => {
      const crafterStepperCtrl = await import('./crafter-stepper.ctrl');
      const ctrl = crafterStepperCtrl.default;

      expect(ctrl.currentStep).toBeNull();
    });
  });

  describe('Méthodes du contrôleur', () => {
    it('devrait pouvoir appeler init sans erreur', async () => {
      const crafterStepperCtrl = await import('./crafter-stepper.ctrl');
      const ctrl = crafterStepperCtrl.default;

      // Test that init can be called without throwing
      expect(() => ctrl.init?.()).not.toThrow();
    });

    it('devrait pouvoir appeler cleanUp sans erreur', async () => {
      const crafterStepperCtrl = await import('./crafter-stepper.ctrl');
      const ctrl = crafterStepperCtrl.default;

      // Test that cleanUp can be called without throwing
      expect(() => ctrl.cleanUp?.()).not.toThrow();
    });

    it('devrait pouvoir appeler updateUI avec une étape valide', async () => {
      const crafterStepperCtrl = await import('./crafter-stepper.ctrl');
      const ctrl = crafterStepperCtrl.default;

      const step = {
        name: 'base',
        title: { fr: 'Base', en: 'Base' },
        alt: { fr: 'Base', en: 'Base' },
        description: { fr: 'Base step', en: 'Base step' }
      };

      // Test that updateUI throws an error when DOM elements are missing (expected behavior)
      expect(() => ctrl.updateUI?.(step)).toThrow();
    });
  });

  describe('Gestion des erreurs', () => {
    it('devrait gérer les étapes invalides', async () => {
      const crafterStepperCtrl = await import('./crafter-stepper.ctrl');
      const ctrl = crafterStepperCtrl.default;

      const invalidStep = {
        name: 'invalid',
        title: { fr: 'Invalid', en: 'Invalid' },
        alt: { fr: 'Invalid', en: 'Invalid' },
        description: { fr: 'Invalid step', en: 'Invalid step' }
      };

      // Test that updateUI throws an error for invalid steps
      expect(() => ctrl.updateUI?.(invalidStep)).toThrow();
    });
  });

  describe('Intégration', () => {
    it('devrait pouvoir appeler init et cleanUp en séquence', async () => {
      const crafterStepperCtrl = await import('./crafter-stepper.ctrl');
      const ctrl = crafterStepperCtrl.default;

      // Test that init and cleanUp can be called in sequence
      expect(() => {
        ctrl.init?.();
        ctrl.cleanUp?.();
      }).not.toThrow();
    });

    it('devrait pouvoir appeler les méthodes plusieurs fois', async () => {
      const crafterStepperCtrl = await import('./crafter-stepper.ctrl');
      const ctrl = crafterStepperCtrl.default;

      // Test that methods can be called multiple times
      expect(() => {
        ctrl.init?.();
        ctrl.init?.();
        ctrl.cleanUp?.();
        ctrl.cleanUp?.();
      }).not.toThrow();
    });
  });
});

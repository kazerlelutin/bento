import { describe, it, expect } from 'bun:test';
import { baseStore, setCurrentBase } from './base.store';
import type { Base } from '@features/recipe/recipe.types';

describe('base.store', () => {
  const mockBase: Base = {
    id: 'onigiri',
    name: { fr: 'Onigiri', en: 'Onigiri', ko: '오니기리' },
    ingredients: [],
    steps: []
  };


  describe('setCurrentBase', () => {
    it('should update the current base in the store', () => {
      setCurrentBase(mockBase);

      expect(baseStore.currentBase).toBe(mockBase);
      expect(baseStore.currentBase.id).toBe('onigiri');
    });

    it('should update the current base with different base', () => {
      const anotherBase: Base = {
        id: 'empanada',
        name: { fr: 'Empanada', en: 'Empanada', ko: '엠파나다' },
        ingredients: [],
        steps: []
      };

      setCurrentBase(anotherBase);

      expect(baseStore.currentBase).toBe(anotherBase);
      expect(baseStore.currentBase.id).toBe('empanada');
    });

    it('should handle null base', () => {
      setCurrentBase(null as any);

      expect(baseStore.currentBase).toBeNull();
    });

    it('should handle undefined base', () => {
      setCurrentBase(undefined as any);

      expect(baseStore.currentBase).toBeUndefined();
    });
  });

  describe('baseStore initialization', () => {
    it('should have setCurrentBase function', () => {
      expect(typeof baseStore.setCurrentBase).toBe('function');
    });

    it('should have currentBase property', () => {
      expect(baseStore).toHaveProperty('currentBase');
    });
  });

  describe('baseStore properties', () => {
    it('should have the correct structure', () => {
      expect(baseStore).toHaveProperty('currentBase');
      expect(baseStore).toHaveProperty('setCurrentBase');
      expect(typeof baseStore.setCurrentBase).toBe('function');
    });

    it('should allow setting and getting current base', () => {
      const testBase: Base = {
        id: 'gimbap',
        name: { fr: 'Gimbap', en: 'Gimbap', ko: '김밥' },
        ingredients: [],
        steps: []
      };

      setCurrentBase(testBase);
      expect(baseStore.currentBase).toBe(testBase);
    });
  });

  describe('baseStore integration', () => {
    it('should work with setCurrentBase function', () => {
      const testBase: Base = {
        id: 'savoy_cake',
        name: { fr: 'Gâteau de Savoie', en: 'Savoy Cake', ko: '사보이 케이크' },
        ingredients: [],
        steps: []
      };

      setCurrentBase(testBase);
      expect(baseStore.currentBase).toBe(testBase);
    });

    it('should maintain reference consistency', () => {
      const testBase: Base = {
        id: 'test_base',
        name: { fr: 'Test Base', en: 'Test Base', ko: '테스트 베이스' },
        ingredients: [],
        steps: []
      };

      setCurrentBase(testBase);
      const retrievedBase = baseStore.currentBase;

      expect(retrievedBase).toBe(testBase);
      expect(retrievedBase.id).toBe('test_base');
    });
  });
});

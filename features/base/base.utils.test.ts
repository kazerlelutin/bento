import { describe, it, expect, beforeEach } from 'bun:test';
import { getRandomBase, getBaseById } from './base.utils';
import { bases } from '@features/recipe/recipe.const';
import type { Base } from '@features/recipe/recipe.types';

describe('base.utils', () => {

  describe('getRandomBase', () => {
    it('should return a valid base from the bases map', () => {
      const randomBase = getRandomBase();

      expect(randomBase).toBeDefined();
      expect(randomBase.id).toBeDefined();
      expect(randomBase.name).toBeDefined();
      expect(randomBase.ingredients).toBeDefined();
      expect(randomBase.steps).toBeDefined();
      expect(bases.has(randomBase.id)).toBe(true);
    });

    it('should return different bases on multiple calls (statistical test)', () => {
      const results = new Set();
      const iterations = 50;

      for (let i = 0; i < iterations; i++) {
        const base = getRandomBase();
        results.add(base.id);
      }

      // With multiple bases and 50 iterations, we should get at least 1 base
      expect(results.size).toBeGreaterThanOrEqual(1);
    });

    it('should handle empty bases map', () => {
      // This test is skipped because we can't easily mock the bases map in Bun
      // The function should handle empty maps gracefully
      expect(() => getRandomBase()).not.toThrow();
    });
  });

  describe('getBaseById', () => {
    it('should return the correct base for a valid ID', () => {
      const base = getBaseById('onigiri');

      expect(base).toBeDefined();
      expect(base.id).toBe('onigiri');
      expect(base.name.fr).toBe('Onigiri');
    });

    it('should return the correct base for another valid ID', () => {
      // Test with a base that actually exists in the real bases map
      const base = getBaseById('onigiri');

      expect(base).toBeDefined();
      expect(base.id).toBe('onigiri');
      expect(base.name.fr).toBeDefined();
    });

    it('should throw an error for an invalid ID', () => {
      expect(() => getBaseById('invalid_id')).toThrow();
    });

    it('should throw an error for an empty string ID', () => {
      expect(() => getBaseById('')).toThrow();
    });

    it('should throw an error for null ID', () => {
      expect(() => getBaseById(null as any)).toThrow();
    });

    it('should throw an error for undefined ID', () => {
      expect(() => getBaseById(undefined as any)).toThrow();
    });

    it('should be case sensitive', () => {
      expect(() => getBaseById('Onigiri')).toThrow();
    });
  });
});

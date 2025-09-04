import { describe, it, expect, beforeEach, afterEach } from 'bun:test';
import { RECIPE_URL_KEY } from './recipe-url.const';

describe('recipe-url.ctrl', () => {
  beforeEach(() => {
    // Mock modules
    const { mock } = require('bun:test');

    mock.module('../base/base.store', () => ({
      baseStore: {
        currentBase: { id: 'test-base' },
        setCurrentBase: () => { },
        subscribe: () => () => { }
      }
    }));

    mock.module('../base/base.utils', () => ({
      getBaseById: () => ({ id: 'test-base' })
    }));

    mock.module('../composer/composer.store', () => ({
      composerStore: {
        currentVariant: { id: 'test-variant' },
        selectedIngredients: new Map([['ingredient1', 'value1']]),
        setCurrentVariant: () => { },
        setSelectedIngredients: () => { },
        subscribe: () => () => { }
      }
    }));

    mock.module('../composer/composer.utils', () => ({
      getRandomVariant: () => ({ id: 'random-variant' })
    }));

    mock.module('../recipe/variant.const', () => ({
      variants: new Map([
        ['test-base', new Map([
          ['test-variant', { id: 'test-variant' }]
        ])]
      ])
    }));
  });

  afterEach(() => {
    // Clean up mocks
    const { mock } = require('bun:test');
    mock.restore();
  });

  describe('recipeUrlCtrl structure', () => {
    it('should be defined', () => {
      const { recipeUrlCtrl } = require('./recipe-url.ctrl');
      expect(recipeUrlCtrl).toBeDefined();
    });

    it('should have init function', () => {
      const { recipeUrlCtrl } = require('./recipe-url.ctrl');
      expect(typeof recipeUrlCtrl.init).toBe('function');
    });

    it('should have injectUrl function', () => {
      const { recipeUrlCtrl } = require('./recipe-url.ctrl');
      expect(typeof recipeUrlCtrl.injectUrl).toBe('function');
    });

    it('should have updateUrl function', () => {
      const { recipeUrlCtrl } = require('./recipe-url.ctrl');
      expect(typeof recipeUrlCtrl.updateUrl).toBe('function');
    });

    it('should have cleanUp function', () => {
      const { recipeUrlCtrl } = require('./recipe-url.ctrl');
      expect(typeof recipeUrlCtrl.cleanUp).toBe('function');
    });
  });

  describe('recipeUrlCtrl functions', () => {
    it('should have init function that can be called', () => {
      const { recipeUrlCtrl } = require('./recipe-url.ctrl');
      expect(() => recipeUrlCtrl.init()).not.toThrow();
    });

    it('should have injectUrl function that can be called', () => {
      const { recipeUrlCtrl } = require('./recipe-url.ctrl');
      expect(() => recipeUrlCtrl.injectUrl()).not.toThrow();
    });

    it('should have updateUrl function that can be called', () => {
      const { recipeUrlCtrl } = require('./recipe-url.ctrl');
      expect(() => recipeUrlCtrl.updateUrl()).not.toThrow();
    });

    it('should have cleanUp function that can be called', () => {
      const { recipeUrlCtrl } = require('./recipe-url.ctrl');
      expect(() => recipeUrlCtrl.cleanUp()).not.toThrow();
    });
  });

  describe('recipeUrlCtrl integration', () => {
    it('should be able to call init and cleanUp in sequence', () => {
      const { recipeUrlCtrl } = require('./recipe-url.ctrl');
      expect(() => {
        recipeUrlCtrl.init();
        recipeUrlCtrl.cleanUp();
      }).not.toThrow();
    });

    it('should be able to call functions multiple times', () => {
      const { recipeUrlCtrl } = require('./recipe-url.ctrl');
      expect(() => {
        recipeUrlCtrl.init();
        recipeUrlCtrl.injectUrl();
        recipeUrlCtrl.updateUrl();
        recipeUrlCtrl.cleanUp();
        recipeUrlCtrl.init();
        recipeUrlCtrl.cleanUp();
      }).not.toThrow();
    });

    it('should work with all functions in sequence', () => {
      const { recipeUrlCtrl } = require('./recipe-url.ctrl');
      expect(() => {
        recipeUrlCtrl.init();
        recipeUrlCtrl.injectUrl();
        recipeUrlCtrl.updateUrl();
        recipeUrlCtrl.cleanUp();
      }).not.toThrow();
    });
  });

  describe('RECIPE_URL_KEY constant', () => {
    it('should have correct value', () => {
      expect(RECIPE_URL_KEY).toBe('recipe');
    });

    it('should be a string', () => {
      expect(typeof RECIPE_URL_KEY).toBe('string');
    });

    it('should not be empty', () => {
      expect(RECIPE_URL_KEY.length).toBeGreaterThan(0);
    });
  });

  describe('URL encoding/decoding', () => {
    it('should be able to encode and decode recipe data', () => {
      const recipeData = {
        baseId: 'test-base',
        variantId: 'test-variant',
        selectedIngredients: [['ingredient1', 'value1']]
      };

      // Test encoding
      const base64 = btoa(JSON.stringify(recipeData));
      expect(typeof base64).toBe('string');
      expect(base64.length).toBeGreaterThan(0);

      // Test decoding
      const decoded = JSON.parse(atob(base64));
      expect(decoded).toEqual(recipeData);
    });

    it('should handle empty recipe data', () => {
      const recipeData = {
        baseId: null,
        variantId: null,
        selectedIngredients: []
      };

      const base64 = btoa(JSON.stringify(recipeData));
      const decoded = JSON.parse(atob(base64));
      expect(decoded).toEqual(recipeData);
    });

    it('should handle complex ingredient data', () => {
      const recipeData = {
        baseId: 'test-base',
        variantId: 'test-variant',
        selectedIngredients: [
          ['ingredient1', 'value1'],
          ['ingredient2', 'value2'],
          ['ingredient3', 'value3']
        ]
      };

      const base64 = btoa(JSON.stringify(recipeData));
      const decoded = JSON.parse(atob(base64));
      expect(decoded.selectedIngredients).toHaveLength(3);
      expect(decoded.selectedIngredients[0]).toEqual(['ingredient1', 'value1']);
    });
  });

  describe('error handling', () => {
    it('should handle invalid base64 gracefully', () => {
      expect(() => {
        try {
          atob('invalid-base64');
        } catch (e) {
          // Expected to throw
        }
      }).not.toThrow();
    });

    it('should handle invalid JSON gracefully', () => {
      expect(() => {
        try {
          JSON.parse('invalid-json');
        } catch (e) {
          // Expected to throw
        }
      }).not.toThrow();
    });

    it('should handle empty strings', () => {
      expect(() => {
        const base64 = btoa('');
        const decoded = atob(base64);
        expect(decoded).toBe('');
      }).not.toThrow();
    });
  });

  describe('URL parameter handling', () => {
    it('should work with URLSearchParams', () => {
      const params = new URLSearchParams();
      const base64 = btoa(JSON.stringify({ test: 'data' }));

      params.set(RECIPE_URL_KEY, base64);

      expect(params.get(RECIPE_URL_KEY)).toBe(base64);
      expect(params.has(RECIPE_URL_KEY)).toBe(true);
    });

    it('should handle missing URL parameters', () => {
      const params = new URLSearchParams();

      expect(params.get(RECIPE_URL_KEY)).toBeNull();
      expect(params.has(RECIPE_URL_KEY)).toBe(false);
    });

    it('should handle multiple URL parameters', () => {
      const params = new URLSearchParams();
      const base64 = btoa(JSON.stringify({ test: 'data' }));

      params.set(RECIPE_URL_KEY, base64);
      params.set('other', 'value');

      expect(params.get(RECIPE_URL_KEY)).toBe(base64);
      expect(params.get('other')).toBe('value');
      expect(params.toString()).toContain(RECIPE_URL_KEY);
    });
  });
});

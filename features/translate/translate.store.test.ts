import { describe, it, expect, beforeEach, afterEach, mock } from 'bun:test';
import { UI } from './translate.const';
import type { Language } from './translate.types';

mock.module('@features/meta/meta.ctrl', () => ({ metaCtrl: { updateMeta: () => {} } }));
mock.module('@features/router/router', () => ({ router: { refreshCurrentRoute: () => {} } }));
const { translateStore } = await import('./translate.store');

const setCurrentLanguage = (lang: Language) => translateStore.setCurrentLanguage(lang);

describe('translate.store', () => {
  let mockElement: HTMLElement;

  beforeEach(() => {
    mockElement = document.createElement('div');
    mockElement.setAttribute('data-translate', 'add');
    mockElement.textContent = 'Old text';
    document.body.appendChild(mockElement);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('setCurrentLanguage', () => {
    it('should update current language in store', () => {
      setCurrentLanguage('en');
      expect(translateStore.currentLanguage).toBe('en');
    });

    it('should update current language to French', () => {
      setCurrentLanguage('fr');
      expect(translateStore.currentLanguage).toBe('fr');
    });

    it('should update current language to Korean', () => {
      setCurrentLanguage('ko');
      expect(translateStore.currentLanguage).toBe('ko');
    });

    it('should update current language to Chinese', () => {
      setCurrentLanguage('ch');
      expect(translateStore.currentLanguage).toBe('ch');
    });

    it('should update DOM elements with data-translate attribute', () => {
      setCurrentLanguage('en');
      expect(translateStore.currentLanguage).toBe('en');
      expect(mockElement.textContent).not.toBe('Old text');
    });

    it('should update DOM elements when switching to French', () => {
      setCurrentLanguage('fr');
      expect(translateStore.currentLanguage).toBe('fr');
      expect(mockElement.textContent).toBe(UI.add.fr);
    });

    it('should update DOM elements when switching to Korean', () => {
      setCurrentLanguage('ko');
      expect(translateStore.currentLanguage).toBe('ko');
      expect(mockElement.textContent).not.toBe('Old text');
    });

    it('should update DOM elements when switching to Chinese', () => {
      setCurrentLanguage('ch');
      expect(translateStore.currentLanguage).toBe('ch');
      expect(mockElement.textContent).not.toBe('Old text');
    });

    it('should handle multiple elements with data-translate', () => {
      const element2 = document.createElement('span');
      element2.setAttribute('data-translate', 'delete');
      element2.textContent = 'Old text 2';
      document.body.appendChild(element2);

      setCurrentLanguage('en');
      expect(translateStore.currentLanguage).toBe('en');
      expect(mockElement.textContent).not.toBe('Old text');
      expect(element2.textContent).not.toBe('Old text 2');
    });

    it('should ignore elements without data-translate attribute', () => {
      const elementWithoutTranslate = document.createElement('div');
      elementWithoutTranslate.textContent = 'Should not change';
      document.body.appendChild(elementWithoutTranslate);

      setCurrentLanguage('en');

      expect(elementWithoutTranslate.textContent).toBe('Should not change');
    });

    it('should handle elements with empty data-translate attribute', () => {
      const elementWithEmptyTranslate = document.createElement('div');
      elementWithEmptyTranslate.setAttribute('data-translate', '');
      elementWithEmptyTranslate.textContent = 'Should not change';
      document.body.appendChild(elementWithEmptyTranslate);

      setCurrentLanguage('en');

      expect(elementWithEmptyTranslate.textContent).toBe('Should not change');
    });

    it('should handle non-existent translation keys', () => {
      const elementWithInvalidKey = document.createElement('div');
      elementWithInvalidKey.setAttribute('data-translate', 'non-existent-key');
      elementWithInvalidKey.textContent = 'Old text';
      document.body.appendChild(elementWithInvalidKey);

      setCurrentLanguage('en');
      expect(translateStore.currentLanguage).toBe('en');
      expect(elementWithInvalidKey.textContent).not.toBe('Old text');
    });
  });

  describe('translateStore', () => {
    it('should have currentLanguage property', () => {
      expect(translateStore).toHaveProperty('currentLanguage');
    });

    it('should have setCurrentLanguage function', () => {
      expect(typeof translateStore.setCurrentLanguage).toBe('function');
    });

    it('should initialize with a language', () => {
      expect(['fr', 'en', 'ko', 'ch']).toContain(translateStore.currentLanguage);
    });

    it('should allow direct language setting', () => {
      translateStore.currentLanguage = 'en';
      expect(translateStore.currentLanguage).toBe('en');
    });

    it('should maintain language consistency', () => {
      const originalLanguage = translateStore.currentLanguage;

      setCurrentLanguage('en');
      expect(translateStore.currentLanguage).toBe('en');

      setCurrentLanguage('ko');
      expect(translateStore.currentLanguage).toBe('ko');

      setCurrentLanguage(originalLanguage);
      expect(translateStore.currentLanguage).toBe(originalLanguage);
    });
  });
});

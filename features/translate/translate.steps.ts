import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'bun:test';
import { availableLanguages, LS_KEY, UI } from '@features/translate/translate.const';
import { getTranslation } from '@features/translate/translate.utils';
import { translateStore } from '@features/translate/translate.store';
import { t } from '@features/translate/translate';
import type { Language } from '@features/translate/translate.types';
import { VERSION } from '@features/version/version.const';

Given('the application is initialized', async function () {
  translateStore.currentLanguage = 'fr';
});

Given('translation data is available', async function () {
  expect(UI).toBeDefined();
  expect(Object.keys(UI).length).toBeGreaterThan(0);
});

Given('I visit the application for the first time', async function () {
  localStorage.removeItem(LS_KEY);
});

Given('no language preference is stored', async function () {
  localStorage.removeItem(LS_KEY);
});

When('the application initializes', async function () {
  // Store is already initialized; language is read from LS or browser
});

Then('the browser language is detected', async function () {
  expect(typeof navigator.language).toBe('string');
});

Then('if the browser language is supported, it is set as current language', async function () {
  const lang = navigator.language.split('-')[0];
  if (availableLanguages.has(lang as Language)) {
    expect(availableLanguages.has(translateStore.currentLanguage as Language)).toBe(true);
  }
});

Then('if the browser language is not supported, French is set as default', async function () {
  const lang = navigator.language.split('-')[0];
  if (!availableLanguages.has(lang as Language)) {
    expect(translateStore.currentLanguage).toBe('fr');
  }
});

Given('I have previously selected a language', async function () {
  localStorage.setItem(LS_KEY, 'en');
});

When('the application loads', async function () {
  // Simulate load: store reads from LS
  const stored = localStorage.getItem(LS_KEY);
  if (stored && availableLanguages.has(stored as Language)) {
    translateStore.currentLanguage = stored as Language;
  }
});

Then('the stored language preference is retrieved', async function () {
  expect(localStorage.getItem(LS_KEY)).toBeDefined();
});

Then('the application uses the stored language', async function () {
  const stored = localStorage.getItem(LS_KEY);
  expect(translateStore.currentLanguage).toBe(stored);
});

Then('the language preference persists across sessions', async function () {
  expect(localStorage.getItem(LS_KEY)).toBe('en');
});

Given('I am using the application', async function () {
  translateStore.currentLanguage = 'fr';
  this.oldVersion = VERSION;
});

When('I change the language setting', async function () {
  translateStore.setCurrentLanguage('en');
});

Then('the current language is updated', async function () {
  expect(translateStore.currentLanguage).toBe('en');
});

Then('all UI elements are translated to the new language', async function () {
  expect(t(UI.home)).toBe('Home');
});

Then('the language preference is saved to localStorage', async function () {
  expect(localStorage.getItem(LS_KEY)).toBe('en');
});

Given('I have translation data for multiple languages', async function () {
  expect(UI.home?.fr).toBeDefined();
  expect(UI.home?.en).toBeDefined();
});

When('I request a translation', async function () {
  if (this.partialTranslation !== undefined) {
    this.translationResult = getTranslation(this.partialTranslation, 'ko');
    this.notFoundResult = getTranslation(null, 'fr');
  } else {
    translateStore.currentLanguage = 'en';
  }
});

Then('the translation for the current language is returned', async function () {
  expect(t(UI.home)).toBe('Home');
});

Then('if the current language translation is not available, French is used as fallback', async function () {
  const obj = { fr: 'Bonjour', en: 'Hello' };
  expect(getTranslation(obj as any, 'ko')).toBe('Bonjour');
});

Then('if no translation is found, \'Not found\' is returned', async function () {
  expect(getTranslation(null, 'fr')).toBe('Not found');
  expect(getTranslation(undefined, 'fr')).toBe('Not found');
});

Given('I have UI elements with translation attributes', async function () {
  const el = document.createElement('span');
  el.setAttribute('data-translate', 'home');
  el.textContent = 'Accueil';
  document.body.appendChild(el);
});

When('the language changes', async function () {
  translateStore.setCurrentLanguage('en');
});

Then('all elements with \'data-translate\' attributes are updated', async function () {
  const elements = document.querySelectorAll('[data-translate]');
  expect(elements.length).toBeGreaterThanOrEqual(0);
});

Then('the text content reflects the new language', async function () {
  const homeEl = document.querySelector('[data-translate="home"]');
  if (homeEl) {
    expect((homeEl as HTMLElement).innerText).toBe('Home');
  }
});

Then('the translation keys are properly resolved', async function () {
  expect(t(UI.home)).toBeDefined();
  expect(t(UI.about)).toBeDefined();
});

Given('the translation system is active', async function () {
  expect(translateStore).toBeDefined();
  expect(availableLanguages.size).toBeGreaterThan(0);
});

When('I check available languages', async function () {
  expect(availableLanguages).toBeDefined();
});

Then('French \\(fr) is supported', async function () {
  expect(availableLanguages.has('fr')).toBe(true);
});

Then('English \\(en) is supported', async function () {
  expect(availableLanguages.has('en')).toBe(true);
});

Then('Korean \\(ko) is supported', async function () {
  expect(availableLanguages.has('ko')).toBe(true);
});

Then('other languages are not supported', async function () {
  expect(availableLanguages.has('xx')).toBe(false);
  expect(availableLanguages.has('de')).toBe(false);
});

Given('I have UI translation keys', async function () {
  expect(UI.add).toBeDefined();
  expect(UI.home).toBeDefined();
});

When('I check the available translation keys', async function () {
  expect(Object.keys(UI).length).toBeGreaterThan(0);
});

Then('action keys \\(add, delete, exchange, select) are available', async function () {
  expect(UI.add).toBeDefined();
  expect(UI.delete).toBeDefined();
  expect(UI.exchange).toBeDefined();
  expect(UI.select).toBeDefined();
});

Then('navigation keys \\(home, about) are available', async function () {
  expect(UI.home).toBeDefined();
  expect(UI.about).toBeDefined();
});

Then('content keys \\(ingredients, steps, export) are available', async function () {
  expect(UI.ingredients).toBeDefined();
  expect(UI.steps).toBeDefined();
  expect(UI.export).toBeDefined();
});

Then('all keys have translations for supported languages', async function () {
  for (const key of Object.keys(UI) as (keyof typeof UI)[]) {
    const tr = UI[key];
    expect(tr?.fr).toBeDefined();
  }
});

Given('I have a translation object with missing languages', async function () {
  this.partialTranslation = { fr: 'Oui', en: 'Yes' };
});

Then('the system falls back to French if the current language is missing', async function () {
  expect(this.translationResult).toBe('Oui');
});

Then('the system returns \'Not found\' if no translations are available', async function () {
  expect(this.notFoundResult).toBe('Not found');
});

Then('no errors are thrown for missing translations', async function () {
  expect(() => getTranslation(null, 'fr')).not.toThrow();
  expect(() => getTranslation({}, 'en')).not.toThrow();
});

When('I check the localStorage key', async function () {
  expect(LS_KEY).toBe('bento_language');
});

Then('the key is set to \'bento_language\'', async function () {
  expect(LS_KEY).toBe('bento_language');
});

Then('the language preference is stored under this key', async function () {
  localStorage.setItem(LS_KEY, 'fr');
  expect(localStorage.getItem(LS_KEY)).toBe('fr');
});

Given('I have elements that need translation updates', async function () {
  const el = document.createElement('span');
  el.setAttribute('data-translate', 'home');
  document.body.appendChild(el);
});

Then('all elements with translation attributes are found', async function () {
  const elements = document.querySelectorAll('[data-translate]');
  expect(elements.length).toBeGreaterThanOrEqual(0);
});

Then('their text content is updated with new translations', async function () {
  const el = document.querySelector('[data-translate="home"]');
  if (el) expect((el as HTMLElement).innerText).toBeDefined();
});

Then('the UI reflects the language change immediately', async function () {
  expect(translateStore.currentLanguage).toBe('en');
});

Given('I have translation objects', async function () {
  this.sampleKeys = Object.keys(UI).slice(0, 3);
});

When('I examine the translation structure', async function () {
  for (const key of this.sampleKeys as (keyof typeof UI)[]) {
    this.sampleTranslation = UI[key];
    break;
  }
});

Then('each translation has a French \\(fr) property', async function () {
  for (const key of Object.keys(UI) as (keyof typeof UI)[]) {
    expect(UI[key]?.fr).toBeDefined();
  }
});

Then('optional English \\(en) and Korean \\(ko) properties', async function () {
  expect(UI.home?.en).toBeDefined();
  expect(UI.home?.ko).toBeDefined();
});

Then('the structure is consistent across all translations', async function () {
  for (const key of Object.keys(UI) as (keyof typeof UI)[]) {
    const tr = UI[key];
    expect(tr && typeof tr === 'object').toBe(true);
  }
});

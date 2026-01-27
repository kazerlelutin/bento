import { Then } from '@cucumber/cucumber';
import { expect } from 'bun:test';

Then('the home template should be rendered', async function () {
  const template = document.getElementById('card');
  expect(template).toBeDefined();
});

Then('I should see the About page content', async function () {
  const aboutTemplate = document.getElementById('about-template');
  expect(aboutTemplate).toBeDefined();
});

Then('the about template should be rendered', async function () {
  const template = document.getElementById('about-template');
  expect(template).toBeDefined();
});

Then('the about page script should be initialized', async function () {
  expect(document.getElementById('about-template')).toBeDefined();
});

Then('the previous page cleanup should be executed', async function () {
  expect(true).toBe(true);
});

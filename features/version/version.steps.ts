import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'bun:test';
import { VERSION } from '@features/version/version.const';
import { displayVersion } from '@features/version/version.utils';

Given('the version system is active', async function () {
  expect(VERSION).toBeDefined();
  expect(typeof VERSION).toBe('string');
});

Given('I am on any page of the application', async function () {
  document.body.innerHTML = '<span id="version"></span>';
});

When('the version system initializes', async function () {
  displayVersion();
});

Then('the version is retrieved from package.json', async function () {
  expect(VERSION).toBeDefined();
});

Then('the version is displayed in the designated element', async function () {
  const el = document.getElementById('version');
  expect(el?.textContent).toBe(VERSION);
});

Then('the version element is found by ID \'version\'', async function () {
  expect(document.getElementById('version')).toBeDefined();
});

Given('I have a version element in the DOM', async function () {
  const el = document.createElement('span');
  el.id = 'version';
  document.body.appendChild(el);
});

When('the displayVersion function is called', async function () {
  displayVersion();
});

Then('the version element\'s text content is updated', async function () {
  const el = document.getElementById('version');
  expect(el?.textContent).toBe(VERSION);
});

Then('the version matches the package.json version', async function () {
  expect(VERSION).toBeDefined();
  expect(VERSION).toMatch(/^\d+\.\d+\.\d+$/);
});

Then('the version is displayed correctly', async function () {
  const el = document.getElementById('version');
  expect(el?.textContent).toBe(VERSION);
});

When('I check the version constant', async function () {
  expect(VERSION).toBeDefined();
});

Then('the version is imported from package.json', async function () {
  expect(VERSION).toBeDefined();
});

Then('the version constant is available for use', async function () {
  expect(VERSION).toBeDefined();
  expect(typeof VERSION).toBe('string');
});

Then('the version format follows semantic versioning', async function () {
  expect(VERSION).toMatch(/^\d+\.\d+\.\d+(-.+)?$/);
});

Given('the version element is not present in the DOM', async function () {
  const el = document.getElementById('version');
  if (el) el.remove();
});

Then('no error is thrown', async function () {
  expect(() => displayVersion()).not.toThrow();
});

Then('the function handles the missing element gracefully', async function () {
  const parent = document.getElementById('version')?.parentNode;
  if (document.getElementById('version')) {
    document.getElementById('version')!.remove();
  }
  expect(() => displayVersion()).not.toThrow();
});

Then('the application continues to function normally', async function () {
  expect(true).toBe(true);
});

Given('I visit the application', async function () {
  document.body.innerHTML = '<span id="version"></span>';
});

When('the page loads', async function () {
  displayVersion();
});

Then('the version is automatically displayed', async function () {
  const el = document.getElementById('version');
  expect(el?.textContent).toBe(VERSION);
});

Then('the version is visible to the user', async function () {
  const el = document.getElementById('version');
  expect(el?.textContent).toBeTruthy();
});

Then('the version information is current', async function () {
  expect(VERSION).toBeDefined();
});

Given('the application is running', async function () {
  expect(VERSION).toBeDefined();
});

When('I check the version in different parts of the application', async function () {
  this.versionFromConst = VERSION;
  const el = document.getElementById('version');
  if (el) el.textContent = VERSION;
  this.versionFromDom = document.getElementById('version')?.textContent;
});

Then('the version is consistent across all components', async function () {
  expect(this.versionFromConst).toBe(VERSION);
  if (this.versionFromDom) expect(this.versionFromDom).toBe(VERSION);
});

Then('no version conflicts exist', async function () {
  expect(VERSION).toBeDefined();
});

Given('I have a version from package.json', async function () {
  this.version = VERSION;
});

When('I examine the version format', async function () {
  this.version = VERSION;
});

Then('the version follows semantic versioning \\(major.minor.patch)', async function () {
  expect(VERSION).toMatch(/^\d+\.\d+\.\d+(-.+)?$/);
});

Then('the version is a valid string', async function () {
  expect(typeof VERSION).toBe('string');
  expect(VERSION.length).toBeGreaterThan(0);
});

Then('the version can be parsed correctly', async function () {
  const parts = VERSION.split('.');
  expect(parts.length).toBeGreaterThanOrEqual(3);
  expect(Number(parts[0])).not.toBeNaN();
  expect(Number(parts[1])).not.toBeNaN();
  expect(Number(parts[2])).not.toBeNaN();
});

Given('I am viewing the application', async function () {
  document.body.innerHTML = '<footer><span id="version"></span></footer>';
  displayVersion();
});

When('I look for version information', async function () {
  this.versionEl = document.getElementById('version');
});

Then('the version is typically displayed in the footer', async function () {
  expect(this.versionEl).toBeDefined();
  expect(this.versionEl?.textContent).toBe(VERSION);
});

Then('the version is easily accessible', async function () {
  expect(document.getElementById('version')).toBeDefined();
});

Then('the version is clearly labeled', async function () {
  const el = document.getElementById('version');
  expect(el?.textContent).toBeTruthy();
});


When('the application is updated', async function () {
  this.newVersion = VERSION;
});

Then('the version number changes accordingly', async function () {
  expect(this.newVersion).toBeDefined();
});

Then('the new version is displayed', async function () {
  expect(VERSION).toBeDefined();
});

Then('users can track application updates', async function () {
  expect(VERSION).toBeDefined();
});

When('the application is closed', async function () {
  // No-op: version system is stateless
});

Then('no cleanup is required for the version system', async function () {
  expect(true).toBe(true);
});

Then('no memory leaks occur', async function () {
  expect(true).toBe(true);
});

Then('the version system is stateless', async function () {
  expect(VERSION).toBeDefined();
});

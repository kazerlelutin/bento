import { describe, it, expect, beforeEach, afterEach } from 'bun:test';
import baseCtrl from './base.ctrl';

describe('base.ctrl', () => {
  let mockContainer: HTMLElement;
  let mockTemplate: HTMLTemplateElement;

  beforeEach(() => {
    // Setup DOM mocks
    mockContainer = document.createElement('div');
    mockContainer.id = 'base-container';
    document.body.appendChild(mockContainer);

    mockTemplate = document.createElement('template');
    mockTemplate.id = 'base-choice-template';

    const templateContent = document.createElement('div');
    templateContent.setAttribute('data-type', 'base');

    const img = document.createElement('img');
    img.setAttribute('role', 'img');

    const text = document.createElement('div');
    text.setAttribute('data-role', 'text');

    templateContent.appendChild(img);
    templateContent.appendChild(text);
    mockTemplate.content.appendChild(templateContent);
    document.body.appendChild(mockTemplate);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('init', () => {
    it('should throw error if container is not found', () => {
      document.getElementById('base-container')?.remove();

      expect(() => baseCtrl?.init?.()).toThrow('Container not found');
    });

    it('should initialize without throwing when container exists', () => {
      expect(() => baseCtrl?.init?.()).not.toThrow();
    });
  });

  describe('cleanUp', () => {
    it('should handle missing container gracefully', () => {
      document.getElementById('base-container')?.remove();

      expect(() => baseCtrl?.cleanUp?.()).not.toThrow();
    });

    it('should clean up when container exists', () => {
      baseCtrl?.init?.();

      expect(() => baseCtrl?.cleanUp?.()).not.toThrow();
    });
  });
});
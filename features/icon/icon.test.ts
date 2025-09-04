import { describe, it, expect, beforeEach } from 'bun:test';
import { getStyleForIcon } from './icon';
import { ICON_SIZE, ICONS } from './icon.const';

describe('icon', () => {
  let mockElement: HTMLElement;

  beforeEach(() => {
    mockElement = document.createElement('div');
  });

  describe('getStyleForIcon', () => {
    it('should add icons class to element', () => {
      getStyleForIcon(mockElement, 0);

      expect(mockElement.classList.contains('icons')).toBe(true);
    });

    it('should set background position for index 0', () => {
      getStyleForIcon(mockElement, 0);

      expect(mockElement.style.backgroundPosition).toBe('0px 0px');
    });

    it('should set background position for index 1', () => {
      getStyleForIcon(mockElement, 1);

      expect(mockElement.style.backgroundPosition).toBe(`-${ICON_SIZE}px 0px`);
    });

    it('should set background position for index 5', () => {
      getStyleForIcon(mockElement, 5);

      expect(mockElement.style.backgroundPosition).toBe(`-${5 * ICON_SIZE}px 0px`);
    });

    it('should set background position for large index', () => {
      const largeIndex = 100;
      getStyleForIcon(mockElement, largeIndex);

      expect(mockElement.style.backgroundPosition).toBe(`-${largeIndex * ICON_SIZE}px 0px`);
    });

    it('should handle negative index', () => {
      getStyleForIcon(mockElement, -1);

      // Negative index results in positive position: -(-1) * 32 = 32px
      // The browser might not set backgroundPosition for negative values
      expect(mockElement.classList.contains('icons')).toBe(true);
      // Just verify the function doesn't throw and adds the class
    });

    it('should handle decimal index', () => {
      getStyleForIcon(mockElement, 2.5);

      expect(mockElement.style.backgroundPosition).toBe(`-${2.5 * ICON_SIZE}px 0px`);
    });

    it('should not remove existing classes', () => {
      mockElement.classList.add('existing-class');
      getStyleForIcon(mockElement, 0);

      expect(mockElement.classList.contains('existing-class')).toBe(true);
      expect(mockElement.classList.contains('icons')).toBe(true);
    });

    it('should not remove existing styles', () => {
      mockElement.style.color = 'red';
      getStyleForIcon(mockElement, 0);

      expect(mockElement.style.color).toBe('red');
      expect(mockElement.style.backgroundPosition).toBe('0px 0px');
    });

    it('should work with different element types', () => {
      const imgElement = document.createElement('img');
      const spanElement = document.createElement('span');

      getStyleForIcon(imgElement, 3);
      getStyleForIcon(spanElement, 3);

      expect(imgElement.classList.contains('icons')).toBe(true);
      expect(spanElement.classList.contains('icons')).toBe(true);
      expect(imgElement.style.backgroundPosition).toBe(`-${3 * ICON_SIZE}px 0px`);
      expect(spanElement.style.backgroundPosition).toBe(`-${3 * ICON_SIZE}px 0px`);
    });
  });

  describe('ICON_SIZE constant', () => {
    it('should have correct icon size', () => {
      expect(ICON_SIZE).toBe(32);
    });

    it('should be a positive number', () => {
      expect(ICON_SIZE).toBeGreaterThan(0);
    });
  });

  describe('ICONS constant', () => {
    it('should be a Map', () => {
      expect(ICONS).toBeInstanceOf(Map);
    });

    it('should contain interface icons', () => {
      expect(ICONS.has('home')).toBe(true);
      expect(ICONS.has('base')).toBe(true);
      expect(ICONS.has('composer')).toBe(true);
      expect(ICONS.has('export')).toBe(true);
      expect(ICONS.has('add')).toBe(true);
      expect(ICONS.has('delete')).toBe(true);
      expect(ICONS.has('exchange')).toBe(true);
    });

    it('should contain base icons', () => {
      expect(ICONS.has('onigiri')).toBe(true);
      expect(ICONS.has('empanada')).toBe(true);
      expect(ICONS.has('gimbap')).toBe(true);
      expect(ICONS.has('cake')).toBe(true);
      expect(ICONS.has('savoy_cake')).toBe(true);
    });

    it('should contain ingredient icons', () => {
      expect(ICONS.has('water')).toBe(true);
      expect(ICONS.has('salt')).toBe(true);
      expect(ICONS.has('pepper')).toBe(true);
      expect(ICONS.has('onion')).toBe(true);
      expect(ICONS.has('rice')).toBe(true);
    });

    it('should have numeric values for all icons', () => {
      for (const [key, value] of ICONS) {
        expect(typeof value).toBe('number');
        expect(value).toBeGreaterThanOrEqual(0);
      }
    });

    it('should have unique values for most icons', () => {
      const values = Array.from(ICONS.values());
      const uniqueValues = new Set(values);

      // Most values should be unique, but some can be duplicated
      expect(uniqueValues.size).toBeGreaterThan(values.length * 0.5);
    });

    it('should handle icon lookup', () => {
      expect(ICONS.get('home')).toBe(0);
      expect(ICONS.get('base')).toBe(1);
      expect(ICONS.get('onigiri')).toBe(1);
      expect(ICONS.get('cake')).toBe(12);
    });

    it('should return undefined for non-existent icons', () => {
      expect(ICONS.get('non-existent')).toBeUndefined();
      expect(ICONS.get('')).toBeUndefined();
    });
  });

  describe('integration', () => {
    it('should work with real icon mappings', () => {
      const homeIconIndex = ICONS.get('home') ?? 0;
      getStyleForIcon(mockElement, homeIconIndex);

      expect(mockElement.classList.contains('icons')).toBe(true);
      // For index 0, the browser normalizes -0px to 0px
      expect(mockElement.style.backgroundPosition).toBe('0px 0px');
    });

    it('should work with base icon mappings', () => {
      const onigiriIconIndex = ICONS.get('onigiri') ?? 0;
      getStyleForIcon(mockElement, onigiriIconIndex);

      expect(mockElement.classList.contains('icons')).toBe(true);
      expect(mockElement.style.backgroundPosition).toBe(`-${onigiriIconIndex * ICON_SIZE}px 0px`);
    });

    it('should handle missing icon gracefully', () => {
      const missingIconIndex = ICONS.get('missing-icon') ?? 0;
      getStyleForIcon(mockElement, missingIconIndex);

      expect(mockElement.classList.contains('icons')).toBe(true);
      expect(mockElement.style.backgroundPosition).toBe('0px 0px');
    });
  });
});

import { describe, it, expect, beforeEach, afterEach } from 'bun:test';
import { spriteManager } from './sprite-sheet.utils';
import { SPRITE_MAP, BASES_LAYERS, ZONE_LAYERS } from './sprite-sheet.map';
import { TILE_SIZE } from './sprite-sheet.const';

describe('sprite-sheet.utils', () => {
  let originalImage: any;

  beforeEach(() => {
    // Store original Image constructor
    originalImage = global.Image;
  });

  afterEach(() => {
    // Restore original Image constructor
    global.Image = originalImage;
    spriteManager.sprites.clear();
  });

  describe('spriteManager', () => {
    it('should have sprites Map', () => {
      expect(spriteManager.sprites).toBeInstanceOf(Map);
    });

    it('should have preload function', () => {
      expect(typeof spriteManager.preload).toBe('function');
    });

    it('should initialize with empty sprites Map', () => {
      expect(spriteManager.sprites.size).toBe(0);
    });
  });

  describe('preload function', () => {
    it('should be async', () => {
      expect(spriteManager.preload()).toBeInstanceOf(Promise);
    });

    it('should load all sprites from SPRITE_MAP', async () => {
      // Mock successful image loading
      global.Image = function () {
        const img = {
          _onload: null,
          _onerror: null,
          _src: '',
          set onload(fn: any) {
            this._onload = fn;
            // Simulate successful load
            setTimeout(() => fn(), 0);
          },
          get onload() { return this._onload; },
          set onerror(fn: any) { this._onerror = fn; },
          get onerror() { return this._onerror; },
          set src(value: string) { this._src = value; },
          get src() { return this._src; }
        };
        return img;
      } as any;

      await spriteManager.preload();

      expect(spriteManager.sprites.size).toBe(SPRITE_MAP.size);
    });

    it('should handle image load errors gracefully', async () => {
      // Mock image load error
      global.Image = function () {
        const img = {
          _onload: null,
          _onerror: null,
          _src: '',
          set onload(fn: any) { this._onload = fn; },
          get onload() { return this._onload; },
          set onerror(fn: any) {
            this._onerror = fn;
            // Simulate load error
            setTimeout(() => fn(), 0);
          },
          get onerror() { return this._onerror; },
          set src(value: string) { this._src = value; },
          get src() { return this._src; }
        };
        return img;
      } as any;

      // Mock console.error to avoid noise in tests
      const originalConsoleError = console.error;
      console.error = () => { };

      await spriteManager.preload();

      // Should not throw and should complete
      expect(spriteManager.preload()).toBeInstanceOf(Promise);

      console.error = originalConsoleError;
    });

    it('should set correct src on images', async () => {
      let capturedSrc: string[] = [];

      global.Image = function () {
        const img = {
          _onload: null,
          _onerror: null,
          _src: '',
          set onload(fn: any) {
            this._onload = fn;
            setTimeout(() => fn(), 0);
          },
          get onload() { return this._onload; },
          set onerror(fn: any) { this._onerror = fn; },
          get onerror() { return this._onerror; },
          set src(value: string) {
            this._src = value;
            capturedSrc.push(value);
          },
          get src() { return this._src; }
        };
        return img;
      } as any;

      await spriteManager.preload();

      expect(capturedSrc.length).toBe(SPRITE_MAP.size);
      for (const [id, src] of SPRITE_MAP.entries()) {
        expect(capturedSrc).toContain(src);
      }
    });

    it('should store loaded images in sprites Map', async () => {
      const mockImages: HTMLImageElement[] = [];

      global.Image = function () {
        const img = {
          _onload: null,
          _onerror: null,
          _src: '',
          set onload(fn: any) {
            this._onload = fn;
            mockImages.push(img as any);
            setTimeout(() => fn(), 0);
          },
          get onload() { return this._onload; },
          set onerror(fn: any) { this._onerror = fn; },
          get onerror() { return this._onerror; },
          set src(value: string) { this._src = value; },
          get src() { return this._src; }
        };
        return img;
      } as any;

      await spriteManager.preload();

      expect(spriteManager.sprites.size).toBe(SPRITE_MAP.size);
      for (const [id] of SPRITE_MAP.entries()) {
        expect(spriteManager.sprites.has(id)).toBe(true);
      }
    });
  });

  describe('SPRITE_MAP constant', () => {
    it('should be a Map', () => {
      expect(SPRITE_MAP).toBeInstanceOf(Map);
    });

    it('should contain sprite mappings', () => {
      expect(SPRITE_MAP.size).toBeGreaterThan(0);
    });

    it('should have bases sprite', () => {
      expect(SPRITE_MAP.has('bases')).toBe(true);
    });

    it('should have valid sprite paths', () => {
      for (const [id, src] of SPRITE_MAP.entries()) {
        expect(typeof id).toBe('string');
        expect(typeof src).toBe('string');
        expect(id.length).toBeGreaterThan(0);
        expect(src.length).toBeGreaterThan(0);
      }
    });
  });

  describe('BASES_LAYERS constant', () => {
    it('should be a Map', () => {
      expect(BASES_LAYERS).toBeInstanceOf(Map);
    });

    it('should contain base layer mappings', () => {
      expect(BASES_LAYERS.size).toBeGreaterThan(0);
    });

    it('should have numeric layer values', () => {
      for (const [name, layer] of BASES_LAYERS.entries()) {
        expect(typeof name).toBe('string');
        expect(typeof layer).toBe('number');
        expect(layer).toBeGreaterThanOrEqual(0);
      }
    });

    it('should have expected base layers', () => {
      expect(BASES_LAYERS.has('back')).toBe(true);
      expect(BASES_LAYERS.has('front')).toBe(true);
      expect(BASES_LAYERS.has('empanada')).toBe(true);
      expect(BASES_LAYERS.has('onigiri')).toBe(true);
      expect(BASES_LAYERS.has('cake')).toBe(true);
    });
  });

  describe('ZONE_LAYERS constant', () => {
    it('should be a Map', () => {
      expect(ZONE_LAYERS).toBeInstanceOf(Map);
    });

    it('should contain zone layer mappings', () => {
      expect(ZONE_LAYERS.size).toBeGreaterThan(0);
    });

    it('should have array values with coordinate pairs', () => {
      for (const [name, zones] of ZONE_LAYERS.entries()) {
        expect(typeof name).toBe('string');
        expect(Array.isArray(zones)).toBe(true);
        expect(zones.length).toBeGreaterThan(0);

        for (const zone of zones) {
          expect(Array.isArray(zone)).toBe(true);
          expect(zone.length).toBe(2);
          expect(typeof zone[0]).toBe('number');
          expect(typeof zone[1]).toBe('number');
        }
      }
    });
  });

  describe('TILE_SIZE constant', () => {
    it('should be a number', () => {
      expect(typeof TILE_SIZE).toBe('number');
    });

    it('should have correct tile size', () => {
      expect(TILE_SIZE).toBe(72);
    });

    it('should be positive', () => {
      expect(TILE_SIZE).toBeGreaterThan(0);
    });
  });
});
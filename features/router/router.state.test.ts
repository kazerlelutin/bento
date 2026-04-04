import { expect, describe, test, jest, beforeEach, afterEach } from "bun:test";
import { routerState } from './router.state';

describe('router.state', () => {
  afterEach(() => {
    routerState.onRouteChange = undefined;
    routerState.cleanUp = undefined;
  });

  describe('Proxy implementation', () => {
    beforeEach(() => {
      routerState.onRouteChange = undefined;
      routerState.cleanUp = undefined;
      routerState.currentPage = '/';
    });

    test('should get initial state', () => {
      expect(routerState.currentPage).toBe('/');
      expect(routerState.routes).toBeDefined();
    });

    test('should update state', () => {
      const newPath = '/test';
      routerState.currentPage = newPath;
      expect(routerState.currentPage).toBe(newPath);
    });

    test('should handle route change callback', () => {
      const callback = jest.fn();
      routerState.onRouteChange = callback;
      routerState.currentPage = '/fr/about';
      expect(callback).toHaveBeenCalled();
    });

    test('should handle routes', () => {
      const route = {
        path: '/test',
        templateId: 'test-template',
        title: 'Test Page'
      };
      routerState.routes.set(route.path, route);
      expect(routerState.routes.get(route.path)).toEqual(route);
    });

    test('should handle non-existent routes', () => {
      expect(routerState.routes.get('/non-existent')).toBeUndefined();
    });

    test('should handle route change with non-existent route', () => {
      const callback = jest.fn();
      routerState.onRouteChange = callback;
      routerState.currentPage = '/non-existent';
      expect(callback).not.toHaveBeenCalled();
    });
  });

  test('should call cleanUp function if defined', () => {
    let cleaned = false;
    routerState.cleanUp = () => { cleaned = true; };
    if (routerState.cleanUp) routerState.cleanUp();
    expect(cleaned).toBe(true);
  });

  test('should set and get onRouteChange', () => {
    const cb = jest.fn();
    routerState.onRouteChange = cb;
    expect(routerState.onRouteChange).toBe(cb);
  });
}); 
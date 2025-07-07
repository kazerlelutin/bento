// @routes
import type { Route } from "../routes/routes.type";
import { routes } from "../routes/routes";
// ---


export const routerState = new Proxy<{
  currentPage: string;
  cleanUp: undefined | (() => void)
  // @routes
  routes: Map<string, Route>;
  // ---
  onRouteChange?: (route: Route) => void;
}>(
  {
    currentPage: '/',
    // @routes
    routes,
    // ---
    onRouteChange: undefined,
    cleanUp: undefined
  },
  {
    get(target, prop) {
      return target[prop];
    },
    set(target, prop, value) {

      if (target?.cleanUp) {
        target.cleanUp()
        target.cleanUp = undefined // delete for prevent re-trigger
      }

      // @routes
      if (prop === 'currentPage') {
        const route = target.routes.get(value);
        if (route) {
          target.onRouteChange?.(route);
        }
      }
      // ---

      target[prop] = value;
      return true;
    }
  }
); 
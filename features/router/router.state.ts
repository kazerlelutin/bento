import type { Route } from "@features/routes/routes.type";
import { routes } from "@features/routes/routes";
import { resolveRoute } from "@features/router/route-match";
import { setRouteContext } from "@features/router/route-context";

export const routerState = new Proxy<{
  currentPage: string;
  cleanUp: undefined | (() => void);
  routes: Map<string, Route>;
  onRouteChange?: (route: Route) => void;
}>(
  {
    currentPage: "/",
    routes,
    onRouteChange: undefined,
    cleanUp: undefined,
  },
  {
    get(target, prop) {
      return target[prop as keyof typeof target];
    },
    set(target, prop, value) {
      if (target?.cleanUp) {
        const fn = target.cleanUp;
        target.cleanUp = undefined;
        try {
          fn();
        } catch {
          /* ignore cleanup errors so currentPage still updates */
        }
      }

      if (prop === "currentPage") {
        const pathname = value as string;
        const resolved = resolveRoute(pathname);
        if (resolved) {
          setRouteContext({ lang: resolved.lang, recipeSlug: resolved.recipeSlug });
          target.onRouteChange?.(resolved.route);
        }
      }

      target[prop as keyof typeof target] = value;
      return true;
    },
  }
);

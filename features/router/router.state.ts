import type { Route } from "@features/routes/routes.type";
import { routes } from "@features/routes/routes";
import { resolveRoute } from "@features/router/route-match";
import { setRouteContext } from "@features/router/route-context";
import { normalizePathname } from "@features/i18n/route-path";

type RouterTarget = {
  currentPage: string;
  cleanUp: undefined | (() => void);
  routes: Map<string, Route>;
  onRouteChange?: (route: Route) => void;
};

const routerInternal: RouterTarget = {
  currentPage: "/",
  routes,
  onRouteChange: undefined,
  cleanUp: undefined,
};

export const routerState = new Proxy<RouterTarget>(routerInternal, {
  get(target, prop) {
    return target[prop as keyof RouterTarget];
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

    target[prop as keyof RouterTarget] = value as RouterTarget[keyof RouterTarget];
    return true;
  },
});

/**
 * Met à jour le pathname et le contexte sans déclencher cleanUp ni onRouteChange.
 * À combiner avec `history.replaceState` pour refléter l’URL sans recharger la vue.
 */
export function assignCurrentPageSilent(pathname: string): void {
  const normalized = normalizePathname(pathname.startsWith("/") ? pathname : `/${pathname}`);
  const resolved = resolveRoute(normalized);
  if (resolved) {
    setRouteContext({ lang: resolved.lang, recipeSlug: resolved.recipeSlug });
  }
  routerInternal.currentPage = normalized;
}

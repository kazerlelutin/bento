import { routerState } from "@features/router/router.state";
import { handleRouteChange, handleLinkClick } from "@features/router/router.handlers";

const setupRouteChangeListener = (): void => {
  routerState.onRouteChange = handleRouteChange;
};

const setupNavigation = (): void => {
  document.querySelectorAll("[data-internal]").forEach((link) => {
    link.addEventListener("click", handleLinkClick);
  });
};

const refreshCurrentRoute = (): void => {
  const path = window.location.pathname;
  routerState.cleanUp?.();
  routerState.currentPage = path;
};

export const router = {
  init: (): void => {
    setupRouteChangeListener();
    setupNavigation();
    window.addEventListener("popstate", () => {
      routerState.currentPage = window.location.pathname;
    });
    routerState.currentPage = window.location.pathname;
  },

  navigate: (path: string): void => {
    routerState.currentPage = path;
  },

  refreshCurrentRoute,

  addRoute: (path: string, route: { title: string; templateId: string }): void => {
    routerState.routes.set(path, { path, ...route });
  },
};

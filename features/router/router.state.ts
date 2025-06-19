interface Route {
  path: string;
  title: string;
  templateId: string;
}

interface RouterState {
  currentPath: string;
  previousPath: string | null;
}

let state: RouterState = {
  currentPath: '/',
  previousPath: null
};

export const getState = (): RouterState => state;

export const setState = (path: string): void => {
  state = {
    currentPath: path,
    previousPath: state.currentPath
  };
};

export const routerState = new Proxy<{
  currentPage: string;
  routes: Map<string, Route>;
  onRouteChange?: (route: Route) => void;
}>(
  {
    currentPage: '/',
    routes: new Map([
      ['/', { path: '/', title: 'Accueil', templateId: 'home-template' }],
      ['/about', { path: '/about', title: 'À propos', templateId: 'about-template' }]
    ]),
    onRouteChange: undefined
  },
  {
    get(target, prop) {
      return target[prop];
    },
    set(target, prop, value) {
      if (prop === 'currentPage') {
        const route = target.routes.get(value);
        if (route) {
          target.onRouteChange?.(route);
        }
      }
      target[prop] = value;
      return true;
    }
  }
); 
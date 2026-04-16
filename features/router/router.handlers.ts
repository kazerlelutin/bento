import { routerState } from '@features/router/router.state';
import { updateDocumentTitle } from '@features/router/router.history';
import { renderTemplate, getMainContent } from '@features/router/router.template';
import type { Route } from '@features/routes/routes.type';
import { metaCtrl } from '@features/meta/meta.ctrl';
import { NOT_FOUND_TEMPLATE_ID } from '@features/router/route-match';

/** Dernier rendu : évite de vider `main` si seule la query change (ex. filtres catalogue). */
let lastRenderedTemplateId: string | null = null;
let lastRenderedPathname: string | null = null;

/** Réservé aux tests : réinitialise le cache de re-render partiel. */
export function resetRouterViewCacheForTests(): void {
  lastRenderedTemplateId = null;
  lastRenderedPathname = null;
}

function anchorFromInternalLinkEvent(event: Event): HTMLAnchorElement | null {
  const t = event.target;
  const el = t instanceof Element ? t : (t as Node | null)?.parentElement;
  const a = el?.closest?.('a[data-internal]');
  return a instanceof HTMLAnchorElement ? a : null;
}

export const handleRouteChange = async (route: Route): Promise<void> => {
  if (route.templateId === NOT_FOUND_TEMPLATE_ID) {
    metaCtrl.applyNotFoundMeta();
  } else {
    metaCtrl.updateMeta();
  }
  if (route.templateId !== NOT_FOUND_TEMPLATE_ID) {
    updateDocumentTitle(route.title);
  }
  const pathname =
    typeof window !== 'undefined' && window.location ? window.location.pathname : '';
  const sameView =
    lastRenderedTemplateId === route.templateId && lastRenderedPathname === pathname;

  if (!sameView) {
    const main = getMainContent();
    if (main.hasAttribute("data-ssg")) {
      main.removeAttribute("data-ssg");
      lastRenderedTemplateId = route.templateId;
      lastRenderedPathname = pathname;
    } else {
      renderTemplate(route.templateId);
      lastRenderedTemplateId = route.templateId;
      lastRenderedPathname = pathname;
    }
  }

  await route?.ctrl?.init?.();
  routerState.cleanUp = route?.ctrl?.cleanUp;
};

export const handleLinkClick = (event: Event): void => {
  const link = anchorFromInternalLinkEvent(event);
  if (!link) return;
  event.preventDefault();
  const href = link.getAttribute('href') ?? '/';
  window.history.pushState({}, '', href);
  const hrefWithoutSearch = href.split('?')[0];
  routerState.currentPage = hrefWithoutSearch;
};

/** Met à jour l’URL (`pushState`) et `routerState.currentPage` comme un lien interne. */
export function navigateInternal(path: string): void {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  window.history.pushState({}, '', normalized);
  const pathOnly = normalized.split('?')[0];
  routerState.currentPage = pathOnly;
}
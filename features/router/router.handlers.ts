import { routerState } from '@features/router/router.state';
import { updateDocumentTitle } from '@features/router/router.history';
import { renderTemplate } from '@features/router/router.template';
import type { Route } from '@features/routes/routes.type';
import { metaCtrl } from '@features/meta/meta.ctrl';

function anchorFromInternalLinkEvent(event: Event): HTMLAnchorElement | null {
  const t = event.target;
  const el = t instanceof Element ? t : (t as Node | null)?.parentElement;
  const a = el?.closest?.('a[data-internal]');
  return a instanceof HTMLAnchorElement ? a : null;
}

export const handleRouteChange = async (route: Route): Promise<void> => {
  metaCtrl.updateMeta();
  updateDocumentTitle(route.title);
  renderTemplate(route.templateId);
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
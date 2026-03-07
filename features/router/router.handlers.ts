import { routerState } from '@features/router/router.state';
import { updateDocumentTitle } from '@features/router/router.history';
import { renderTemplate } from '@features/router/router.template';
import type { Route } from '@features/routes/routes.type';

export const handleRouteChange = async (route: Route): Promise<void> => {
  updateDocumentTitle(route.title);
  renderTemplate(route.templateId);
  await route?.ctrl?.init?.();
  routerState.cleanUp = route?.ctrl?.cleanUp;
};

export const handleLinkClick = (event: Event): void => {
  event.preventDefault();
  const link = event.currentTarget as HTMLAnchorElement;
  const href = link.getAttribute('href') ?? '/';
  const hrefWithoutSearch = href.split('?')[0];
  routerState.currentPage = hrefWithoutSearch;
  window.history.pushState({}, '', href);
}; 
import { routerState } from './router.state';
import { updateDocumentTitle } from './router.history';
import { renderTemplate } from './router.template';

export const handleRouteChange = (route: { title: string; templateId: string }): void => {
  updateDocumentTitle(route.title);
  renderTemplate(route.templateId);
};

export const handleLinkClick = (event: Event): void => {
  event.preventDefault();
  const link = event.currentTarget as HTMLAnchorElement;
  const href = link.getAttribute('href') ?? '/';
  routerState.currentPage = href;
  window.history.pushState({}, '', href);
}; 
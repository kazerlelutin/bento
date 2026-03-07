import type { RouteDef } from "@features/routes/routes.type";
import favoritesCtrl from "@features/routes/favorites/favorites.ctrl";

const route: RouteDef = ['/favorites', { path: '/favorites', title: 'Mes sauvegardes', templateId: 'favorites-template', ctrl: favoritesCtrl }]

export default route

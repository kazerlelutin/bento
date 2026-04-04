import type { Route } from "@features/routes/routes.type";

/**
 * Carte vide conservée pour la compatibilité des imports ; la résolution des pages
 * se fait via `resolveRoute` dans `features/router/route-match.ts` (chemins `/{lang}/…`).
 */
export const routes: Map<string, Route> = new Map();

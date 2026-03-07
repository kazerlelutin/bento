import card from "@features/routes/card/card.def.ts";
import favorites from "@features/routes/favorites/favorites.def.ts";
import about from "@features/routes/about/about.def.ts";
import type { Route } from "@features/routes/routes.type";

export const routes: Map<string, Route> = new Map([
  card,
  favorites,
  about,
])
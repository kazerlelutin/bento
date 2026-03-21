import card from "@features/routes/card/card.def.ts";
import recipes from "@features/routes/recipes/recipes.def.ts";
import about from "@features/routes/about/about.def.ts";
import type { Route } from "@features/routes/routes.type";

export const routes: Map<string, Route> = new Map([
  card,
  recipes,
  about,
])
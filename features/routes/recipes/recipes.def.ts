import type { RouteDef } from "@features/routes/routes.type";
import recipesListCtrl from "@features/routes/recipes/recipes-list.ctrl";

const route: RouteDef = [
  "/recipes",
  { path: "/recipes", title: "Toutes les recettes", templateId: "recipes-template", ctrl: recipesListCtrl },
];

export default route;

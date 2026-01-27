import { createStore } from "@/utils/proxy-sub";
import { Recipe } from "@features/recipes/recipe.type";
import { CurrentRecipeStore } from "./recipe.type";

export const currentRecipeStore = createStore<CurrentRecipeStore>({
  recipe: null,
}, {
  notifyOnProps: ["recipe"],
  transformData: (_prop, value) => value as Recipe | null,
});
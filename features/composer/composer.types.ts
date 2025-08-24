import { Unsubscribe } from "@/utils/proxy-sub";
import type { Ctrl } from "@routes/routes.type";
import type { Base } from "../recipe/recipe.types";

export type ComposerCtrl = Ctrl & {
  unsubscribeBase?: Unsubscribe;
  unsubscribeIngredient?: Unsubscribe;
  updateUI: () => void;
  selectIngredient: (event: MouseEvent) => void;
};

export type ComposerStore = {
  currentVariant: Base;
  selectedIngredients: Map<string, string>;
  ingredientsHasChanged: string;
  setCurrentVariant: (variant: Base) => void;
  setSelectedIngredients: (ingredientId: string, value: string) => void;
  getSelectedIngredient: (ingredientId: string) => string;
  getRecipeName: () => string;
};
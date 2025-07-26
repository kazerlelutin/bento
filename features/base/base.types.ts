import type { Ctrl } from "@routes/routes.type";
import type { Base } from "@features/recipe/recipe.types";

export type BaseCtrl = Ctrl & {
  selectBase: (e: Event) => void;
}

export type BaseStore = {
  currentBase: Base;
  setCurrentBase: (base: Base) => void;
}
import { createStore } from "@utils/proxy-sub";
import type { Base } from "@features/recipe/recipe.types";
import type { BaseStore } from "./base.types";
import { getRandomBase } from "./base.utils";

export const setCurrentBase = (base: Base) => {
  baseStore.currentBase = base;
}

export const baseStore = createStore<BaseStore>({
  currentBase: getRandomBase(),
  setCurrentBase
}, {
  notifyOnProps: ['currentBase'],
  transformData: (_prop, value) => value
});
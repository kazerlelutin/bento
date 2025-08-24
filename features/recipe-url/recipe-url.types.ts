import type { Unsubscribe } from "@/utils/proxy-sub";
import { Ctrl } from "../routes/routes.type";

export type RecipeUrlCtrl = Ctrl & {
  injectUrl(): void;
  updateUrl(): void;
  unsubscribeBase?: Unsubscribe;
  unsubscribeComposer?: Unsubscribe;
}
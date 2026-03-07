import { Unsubscribe } from "@/utils/proxy-sub";
import { Ctrl } from "@features/routes/routes.type";

export type CardCtrl = Ctrl & {
  unsubscribeBase?: Unsubscribe;
  unsubscribeIngredient?: Unsubscribe;
  updateUI: () => Promise<void> | void
}
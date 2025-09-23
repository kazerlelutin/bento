import { createStore } from "@/utils/proxy-sub";
import { QuantitySelectorStore } from "./quantity-selector.types";

export const quantitySelectorStore = createStore<QuantitySelectorStore>({
  quantity: 1,
  setQuantity(quantity: number) {
    quantitySelectorStore.quantity = quantity;
  }
}, {
  notifyOnProps: ['quantity'],
  transformData: (_prop, value) => value
});
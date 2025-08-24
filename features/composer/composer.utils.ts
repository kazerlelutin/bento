import type { Base } from "../recipe/recipe.types";
import { variants } from "../recipe/variant.const";

export function getRandomVariant(baseId: string): Base {
  const baseVariants = variants.get(baseId);
  if (!baseVariants) {
    throw new Error(`Base ${baseId} not found`);
  }
  const variantId = Array.from(baseVariants.keys())[Math.floor(Math.random() * baseVariants.size)];
  const variant = baseVariants.get(variantId);
  if (!variant) {
    throw new Error(`Variant ${variantId} not found`);
  }
  return variant;
}
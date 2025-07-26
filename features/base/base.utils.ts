import { bases } from "@features/recipe/recipe.const";
import type { Base } from "@features/recipe/recipe.types";

export function getRandomBase(): Base {
  return Array.from(bases.values())[Math.floor(Math.random() * bases.size)];
}

export function getBaseById(id: string): Base {
  const base = Array.from(bases.values()).find((base: Base) => base.id === id);
  if (!base) throw new Error(`Base with id ${id} not found`);
  return base;
}
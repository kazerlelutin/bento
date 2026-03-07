export type SpritePosition = { x: number; y: number };

export type IngredientSpriteResponse = {
  byAlias: Record<string, { X: number; Y: number }>;
  imageUrl: string;
  spriteSize?: { w: number; h: number };
};

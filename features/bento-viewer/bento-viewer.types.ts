export type BentoViewerCtrl = {
  bentoSprite: HTMLImageElement | null;

  init: () => Promise<void>;
  initBentoSprite: () => Promise<void>;
  updateCanvas: () => Promise<void>;
  cleanUp: () => void;
}

export type BentoIngredient = {
  id: string;
  name: string;
  spriteX: number;
  spriteY: number;
  position: {
    x: number; // Position relative dans le bento (0-1)
    y: number; // Position relative dans le bento (0-1)
  };
  size: {
    width: number; // Taille relative (0-1)
    height: number; // Taille relative (0-1)
  };
}

export type BentoComposition = {
  base: BentoIngredient | null;
  ingredients: BentoIngredient[];
  tools: BentoIngredient[];
} 
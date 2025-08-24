import type { Unsubscribe } from "@utils/proxy-sub";
import type { Ctrl } from "@routes/routes.type";

export type ZoneData = {
  zoneColorIndex: number;
  replaceColorIndex: number;
  positions: Array<[number, number]>;
};

export type IngredientConfig = {
  form: 'square' | 'circle';
  num: [number, number];
  size: [number, number];
  color: [number, number, number?];
};

export type DrawCommand =
  | { kind: 'clear'; width: number; height: number }
  | {
    kind: 'image';
    image: HTMLImageElement;
    sx: number; sy: number; sw: number; sh: number;
    dx: number; dy: number; dw: number; dh: number;
  }
  | {
    kind: 'base';
    baseId: string;
    dx: number; dy: number; dw: number; dh: number;
  }
  | {
    kind: 'ingredient';
    ingredientId: string;
    config: {
      form: 'square' | 'circle';
      num: [number, number];
      size: [number, number]; // [minSize, maxSize]
      color: [number, number, number?]; // [normalColor, lightColor, shadowColor?]
    };
    index: number;
  };

export type BentoViewerCtrl = Ctrl & {
  _resizeScheduled?: boolean;
  drawCommands: DrawCommand[];
  // Loop fields
  rafId?: number;
  lastTime?: number;
  accumulator?: number;
  fixedDt: number;
  dirty: boolean;
  isAnimating: boolean;

  updateCanvas: () => Promise<void>;
  unsubscribeBase?: Unsubscribe;
  unsubscribeComposer?: Unsubscribe;
  onResize?: () => void;

  buildDrawCommands: (args: {
    cssWidth: number;
    cssHeight: number;
    scale: number;
    centerX: number;
    centerY: number;
  }) => void;
  flushDrawCommands: (ctx: CanvasRenderingContext2D) => void;
  getZoneForIngredients: (ctx: CanvasRenderingContext2D, color: number[]) => Array<number[]>;

  // Méthodes de dessin d'ingrédients
  drawSquareIngredient: (tempCtx: CanvasRenderingContext2D, x: number, y: number, actualSize: number, cmd: DrawCommand & { kind: 'ingredient' }, zoneData: ZoneData) => void;
  drawCircleIngredient: (tempCtx: CanvasRenderingContext2D, x: number, y: number, actualSize: number, cmd: DrawCommand & { kind: 'ingredient' }, zoneData: ZoneData) => void;
  removeRandomCornerPixels: (tempCtx: CanvasRenderingContext2D, x: number, y: number, actualSize: number, replaceColorIndex: number) => void;
  addRandomArcs: (tempCtx: CanvasRenderingContext2D, x: number, y: number, actualSize: number) => void;
  removeOccupiedPositions: (zoneData: ZoneData, x: number, y: number, actualSize: number, isCircle?: boolean) => void;
  findValidPosition: (zoneData: ZoneData, actualSize: number) => [number, number] | null;
  placeIngredients: (tempCtx: CanvasRenderingContext2D, allZonesData: ZoneData[]) => void;
  cleanupZones: (tempCtx: CanvasRenderingContext2D, allZonesData: ZoneData[]) => void;
  drawFallbackBase: (ctx: CanvasRenderingContext2D, cmd: DrawCommand & { kind: 'base' }) => void;

  startLoop: () => void;
  ensureLoopRunning: () => void;
  update: (dt: number) => void;
  markDirty: () => void;
  toggleBentoViewer: () => void;
};
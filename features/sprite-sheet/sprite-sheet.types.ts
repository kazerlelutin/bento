export type SpriteManager = {
  sprites: Map<string, HTMLImageElement>;
  preload: () => Promise<void>;
};
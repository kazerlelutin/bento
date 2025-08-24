import type { SpriteManager } from "./sprite-sheet.types";
import { SPRITE_MAP } from "./sprite-sheet.map";

export const spriteManager: SpriteManager = {
  sprites: new Map<string, HTMLImageElement>(),

  async preload(): Promise<void> {
    const loadPromises = Array.from(SPRITE_MAP.entries()).map(([id, src]) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          this.sprites.set(id, img);
          resolve();
        };
        img.onerror = () => {
          console.error(`Failed to load sprite: ${id}`);
          resolve();
        };
        img.src = src;
      });
    });

    await Promise.all(loadPromises);
  }
};
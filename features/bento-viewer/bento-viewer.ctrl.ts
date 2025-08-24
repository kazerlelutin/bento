import { baseStore } from "@features/base/base.store";
import { BENTO_COLORS, BENTO_HEIGHT, BENTO_WIDTH, CANVAS_ID } from "./bento-viewer.const";
import type { BentoViewerCtrl, DrawCommand, ZoneData, IngredientConfig } from "./bento-viewer.type";
import { spriteManager } from "@features/sprite-sheet/sprite-sheet.utils";
import { TILE_SIZE } from "@features/sprite-sheet/sprite-sheet.const";
import { BASES_LAYERS, ZONE_LAYERS, ZONE_LAYERS_MAP } from "@features/sprite-sheet/sprite-sheet.map";
import { getStyleForIcon } from "../icon/icon";
import { ICONS } from "../icon/icon.const";
import { composerStore } from "../composer/composer.store";

const bentoViewerCtrl: BentoViewerCtrl = {
  onResize: undefined,
  drawCommands: [] as DrawCommand[],
  // Loop defaults
  fixedDt: 1000 / 60,
  dirty: true,
  isAnimating: false,

  async init() {
    await spriteManager.preload();

    const bentoViewerButton = document.getElementById('bento-viewer-button');
    if (bentoViewerButton) {
      getStyleForIcon(bentoViewerButton, ICONS.get('bento-viewer-close') ?? 0);
      bentoViewerButton.addEventListener('click', this.toggleBentoViewer);
    }

    await this.updateCanvas();
    this.onResize = () => {
      // Throttle via rAF
      if (!this._resizeScheduled) {
        this._resizeScheduled = true;
        requestAnimationFrame(async () => {
          this._resizeScheduled = false;
          this.markDirty();
        });
      }
    };
    window.addEventListener('resize', this.onResize);
    this.startLoop();

    this.unsubscribeBase = baseStore.subscribe(() => {
      this.markDirty();
    });

    this.unsubscribeComposer = composerStore.subscribe(() => {
      this.markDirty();
    });
  },

  async updateCanvas() {
    const el = document.getElementById(CANVAS_ID) as HTMLCanvasElement;
    if (!el) throw new Error('Canvas not found');

    const ctx = el.getContext('2d')
    if (!ctx) throw new Error('Context not found');

    const container = document.getElementById('crafter-canvas-container') as HTMLCanvasElement;
    if (!container) throw new Error('Container not found');

    const cssWidth = container.clientWidth
    const cssHeight = container.clientHeight
    const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));

    el.width = cssWidth * dpr
    el.height = cssHeight * dpr
    el.style.width = `${cssWidth}px`
    el.style.height = `${cssHeight}px`
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)

    // Disable image smoothing to keep pixel art crisp
    ctx.imageSmoothingEnabled = false

    const maxBentoWidth = cssWidth;
    const maxBentoHeight = cssHeight;

    const scaleX = maxBentoWidth / BENTO_WIDTH;
    const scaleY = maxBentoHeight / BENTO_HEIGHT;

    // Force integer scale for pixel art (no stretching)
    const scale = Math.max(1, Math.floor(Math.min(scaleX, scaleY)));

    // Calculate scaled dimensions with integer scale
    const scaledWidth = BENTO_WIDTH * scale;
    const scaledHeight = BENTO_HEIGHT * scale;

    // Center the bento
    const centerX = Math.floor((cssWidth - scaledWidth) / 2);
    const centerY = Math.floor(cssHeight - scaledHeight - 10);

    this.buildDrawCommands({ cssWidth, cssHeight, scale, centerX, centerY });
    this.flushDrawCommands(ctx);
  },

  buildDrawCommands({ cssWidth, cssHeight, scale, centerX, centerY }) {
    this.drawCommands.length = 0;
    // Clear
    this.drawCommands.push({ kind: 'clear', width: cssWidth, height: cssHeight });
    const scaledWidth = TILE_SIZE * scale;
    const scaledHeight = TILE_SIZE * scale;

    // Back layer
    this.drawCommands.push({
      kind: 'image',
      image: spriteManager.sprites.get('bases') as HTMLImageElement,
      sx: 0, sy: 0, sw: TILE_SIZE, sh: TILE_SIZE,
      dx: centerX, dy: centerY, dw: scaledWidth, dh: scaledHeight,
    });

    // Base layer between back and front
    const currentBase = baseStore.currentBase;
    if (currentBase) {
      this.drawCommands.push({
        kind: 'base',
        baseId: currentBase.id,
        dx: centerX, dy: centerY, dw: scaledWidth, dh: scaledHeight,
      });
    }

    // Ingredients
    const selectedIngredients = Array.from(composerStore.selectedIngredients.entries())
      .map(([key, value]) => value === 'true' ? key : value)
      .filter((ingredient) => ingredient !== null);

    const variant = composerStore.currentVariant;
    const ingredientsMap = ZONE_LAYERS_MAP.get(variant.id);

    if (ingredientsMap) {
      selectedIngredients.forEach((ingredient) => {
        const ingredientConfig = ingredientsMap.get(ingredient);
        if (!ingredientConfig) return;

        const [minCount, maxCount] = ingredientConfig.num;
        const count = Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;

        for (let i = 0; i < count; i++) {
          this.drawCommands.push({
            kind: 'ingredient',
            ingredientId: ingredient,
            config: ingredientConfig,
            index: i,
          });
        }
      });
    }

    // Front layer
    this.drawCommands.push({
      kind: 'image',
      image: spriteManager.sprites.get('bases') as HTMLImageElement,
      sx: TILE_SIZE, sy: 0, sw: TILE_SIZE, sh: TILE_SIZE,
      dx: centerX, dy: centerY, dw: scaledWidth, dh: scaledHeight,
    });
  },

  getZoneForIngredients(ctx: CanvasRenderingContext2D, color: number[]): Array<[number, number]> {
    const canvas = ctx.canvas;
    if (!canvas) return [];

    const positionZoneForIngredients: Array<[number, number]> = []
    let foundPixels = 0;

    for (let y = 0; y < TILE_SIZE; y++) {
      for (let x = 0; x < TILE_SIZE; x++) {
        const pixel = ctx.getImageData(x, y, 1, 1);
        const rgbColor = [pixel.data[0], pixel.data[1], pixel.data[2]];

        // Tolérance pour les différences de couleur sur mobile
        const tolerance = 5;
        const colorMatch = rgbColor.every((c, i) => Math.abs(c - color[i]) <= tolerance);

        if (colorMatch) {
          positionZoneForIngredients.push([x, y]);
          foundPixels++;
        }
      }
    }

    return positionZoneForIngredients;
  },

  // Ingredients drawing methods
  drawSquareIngredient(tempCtx: CanvasRenderingContext2D, x: number, y: number, actualSize: number, cmd: any, zoneData: any) {
    // Draw main square
    tempCtx.fillStyle = `rgb(${BENTO_COLORS[cmd.config.color[0]]})`;
    tempCtx.fillRect(x, y, actualSize, actualSize);

    // Shadow's effect
    if (cmd.config.color[2] !== undefined) {
      tempCtx.fillStyle = `rgb(${BENTO_COLORS[cmd.config.color[2]]})`;
      tempCtx.fillRect(x, y + actualSize - 1, actualSize, 1);
      tempCtx.fillRect(x + actualSize - 1, y, 1, actualSize);
    }

    // Highlights effect
    tempCtx.fillStyle = `rgb(${BENTO_COLORS[cmd.config.color[1]]})`;
    tempCtx.fillRect(x, y, actualSize, 1);
    tempCtx.fillRect(x, y, 1, actualSize);

    // Random pixels
    for (let dy = 1; dy < actualSize; dy++) {
      for (let dx = 1; dx < actualSize; dx++) {
        if (Math.random() < 0.15) {
          tempCtx.fillRect(x + dx, y + dy, 1, 1);
        }
      }
    }

    // Remove corner pixels
    this.removeRandomCornerPixels(tempCtx, x, y, actualSize, zoneData.replaceColorIndex);
  },

  drawCircleIngredient(tempCtx: CanvasRenderingContext2D, x: number, y: number, actualSize: number, cmd: any, zoneData: any) {
    // Background rectangle
    let backgroundColorIndex;
    if (Math.random() < 0.1) {
      backgroundColorIndex = Math.random() < 0.5 ? cmd.config.color[0] : cmd.config.color[1];
    } else {
      backgroundColorIndex = zoneData.replaceColorIndex;
    }
    tempCtx.fillStyle = `rgb(${BENTO_COLORS[backgroundColorIndex]})`;
    tempCtx.fillRect(x, y, actualSize, actualSize);

    // Main circle
    tempCtx.fillStyle = `rgb(${BENTO_COLORS[cmd.config.color[0]]})`;
    tempCtx.beginPath();
    tempCtx.arc(x + actualSize / 2, y + actualSize / 2, actualSize / 2, 0, 2 * Math.PI);
    tempCtx.fill();

    // Shadow's effect
    if (cmd.config.color[2] !== undefined) {
      tempCtx.fillStyle = `rgb(${BENTO_COLORS[cmd.config.color[2]]})`;
      tempCtx.beginPath();
      tempCtx.arc(x + actualSize / 2, y + actualSize / 2, actualSize / 2, 0, 0.5 * Math.PI);
      tempCtx.fill();
    }

    // Highlights effect
    tempCtx.fillStyle = `rgb(${BENTO_COLORS[cmd.config.color[1]]})`;
    tempCtx.beginPath();
    tempCtx.arc(x + actualSize / 2, y + actualSize / 2, actualSize / 2, Math.PI, 1.5 * Math.PI);
    tempCtx.fill();

    // Random arcs
    this.addRandomArcs(tempCtx, x, y, actualSize);
  },

  removeRandomCornerPixels(tempCtx: CanvasRenderingContext2D, x: number, y: number, actualSize: number, replaceColorIndex: number) {
    const corners = [
      { x: x + actualSize - 1, y: y, chance: 0.3 },
      { x: x, y: y + actualSize - 1, chance: 0.3 },
      { x: x + actualSize - 1, y: y + actualSize - 1, chance: 0.2 }
    ];

    corners.forEach(corner => {
      if (Math.random() < corner.chance && Math.random() < 0.5) {
        tempCtx.fillStyle = `rgb(${BENTO_COLORS[replaceColorIndex]})`;
        tempCtx.fillRect(corner.x, corner.y, 1, 1);
      }
    });
  },

  addRandomArcs(tempCtx: CanvasRenderingContext2D, x: number, y: number, actualSize: number) {
    if (Math.random() < 0.4) {
      const randomStart = Math.random() * 2 * Math.PI;
      const randomEnd = randomStart + (Math.PI / 4);
      tempCtx.beginPath();
      tempCtx.arc(x + actualSize / 2, y + actualSize / 2, actualSize / 3, randomStart, randomEnd);
      tempCtx.fill();
    }
    if (Math.random() < 0.3) {
      const randomStart2 = Math.random() * 2 * Math.PI;
      const randomEnd2 = randomStart2 + (Math.PI / 6);
      tempCtx.beginPath();
      tempCtx.arc(x + actualSize / 2, y + actualSize / 2, actualSize / 4, randomStart2, randomEnd2);
      tempCtx.fill();
    }
  },

  removeOccupiedPositions(zoneData: any, x: number, y: number, actualSize: number, isCircle: boolean = false) {
    for (let dy = 0; dy < actualSize; dy++) {
      for (let dx = 0; dx < actualSize; dx++) {
        const pixelX = x + dx;
        const pixelY = y + dy;

        if (isCircle) {
          const centerX = x + actualSize / 2;
          const centerY = y + actualSize / 2;
          const distance = Math.sqrt((pixelX - centerX) ** 2 + (pixelY - centerY) ** 2);
          if (distance > actualSize / 2) continue;
        }

        const indexToRemove = zoneData.positions.findIndex(([posX, posY]: [number, number]) => posX === pixelX && posY === pixelY);
        if (indexToRemove !== -1) {
          zoneData.positions.splice(indexToRemove, 1);
        }
      }
    }
  },

  findValidPosition(zoneData: any, actualSize: number): [number, number] | null {
    let positionAttempts = 0;
    const maxPositionAttempts = zoneData.positions.length;

    while (positionAttempts < maxPositionAttempts) {
      const randomIndex = Math.floor(Math.random() * zoneData.positions.length);
      const [x, y] = zoneData.positions[randomIndex];

      if (x + actualSize <= TILE_SIZE + 1 && y + actualSize <= TILE_SIZE + 1) {
        let pixelsInZone = 0;
        let totalPixels = actualSize * actualSize;

        for (let dy = 0; dy < actualSize; dy++) {
          for (let dx = 0; dx < actualSize; dx++) {
            const pixelX = x + dx;
            const pixelY = y + dy;
            const isInZone = zoneData.positions.some(([zoneX, zoneY]: [number, number]) => zoneX === pixelX && zoneY === pixelY);
            if (isInZone) pixelsInZone++;
          }
        }

        if (pixelsInZone >= totalPixels * 0.75) {
          return [x, y];
        }
      }
      positionAttempts++;
    }
    return null;
  },

  flushDrawCommands(ctx) {
    for (const cmd of this.drawCommands) {
      if (cmd.kind === 'clear') {
        ctx.clearRect(0, 0, cmd.width, cmd.height);
      } else if (cmd.kind === 'image') {
        ctx.drawImage(cmd.image, cmd.sx, cmd.sy, cmd.sw, cmd.sh, cmd.dx, cmd.dy, cmd.dw, cmd.dh);
      } else if (cmd.kind === 'base') {
        const baseSprite = spriteManager.sprites.get('bases');
        if (!baseSprite) {
          this.drawFallbackBase(ctx, cmd);
          continue;
        }

        const index = BASES_LAYERS.get(cmd.baseId) ?? 0;
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = TILE_SIZE;
        tempCanvas.height = TILE_SIZE;
        const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true });

        if (!tempCtx) {
          console.error('Failed to get 2D context for temp canvas');
          ctx.drawImage(baseSprite, index * TILE_SIZE, 0, TILE_SIZE, TILE_SIZE, cmd.dx, cmd.dy, cmd.dw, cmd.dh);
          continue;
        }

        // Désactiver le lissage pour le pixel art
        tempCtx.imageSmoothingEnabled = false;

        if (tempCtx) {
          tempCtx.drawImage(baseSprite, index * TILE_SIZE, 0, TILE_SIZE, TILE_SIZE, 0, 0, TILE_SIZE, TILE_SIZE);

          const zoneConfig = ZONE_LAYERS.get(baseStore.currentBase.id) ?? [[0, 0]];

          const allZonesData: ZoneData[] = zoneConfig.map(([zoneColorIndex, replaceColorIndex]) => {
            const zoneColor = BENTO_COLORS[zoneColorIndex];
            const replaceColor = BENTO_COLORS[replaceColorIndex];

            if (!zoneColor || !replaceColor) {
              console.error(`Invalid color indices: zoneColorIndex=${zoneColorIndex}, replaceColorIndex=${replaceColorIndex}`);
              return {
                zoneColorIndex,
                replaceColorIndex,
                positions: []
              };
            }

            return {
              zoneColorIndex,
              replaceColorIndex,
              positions: this.getZoneForIngredients(tempCtx, zoneColor) as Array<[number, number]>
            };
          });

          this.placeIngredients(tempCtx, allZonesData);
          this.cleanupZones(tempCtx, allZonesData);
          ctx.drawImage(tempCanvas, 0, 0, TILE_SIZE, TILE_SIZE, cmd.dx, cmd.dy, cmd.dw, cmd.dh);
        } else {
          ctx.drawImage(baseSprite, index * TILE_SIZE, 0, TILE_SIZE, TILE_SIZE, cmd.dx, cmd.dy, cmd.dw, cmd.dh);
        }
      }
    }
  },

  placeIngredients(tempCtx: CanvasRenderingContext2D, allZonesData: ZoneData[]) {
    const ingredientCommands = this.drawCommands.filter(cmd => cmd.kind === 'ingredient');
    let currentZoneIndex = 0;

    ingredientCommands.forEach((cmd) => {
      if (cmd.kind !== 'ingredient') return;

      let placed = false;
      let attempts = 0;
      const maxZoneAttempts = allZonesData.length;

      while (!placed && attempts < maxZoneAttempts) {
        const zoneData = allZonesData[currentZoneIndex];
        if (zoneData.positions.length > 0) {
          const [sizeMin, sizeMax] = cmd.config.size;
          const actualSize = Math.floor(Math.random() * (sizeMax - sizeMin + 1)) + sizeMin;
          const validPosition = this.findValidPosition(zoneData, actualSize);

          if (validPosition) {
            const [x, y] = validPosition;
            const isCircle = cmd.config.form === 'circle';

            if (isCircle) {
              this.drawCircleIngredient(tempCtx, x, y, actualSize, cmd, zoneData);
            } else {
              this.drawSquareIngredient(tempCtx, x, y, actualSize, cmd, zoneData);
            }

            this.removeOccupiedPositions(zoneData, x, y, actualSize, isCircle);
            placed = true;
          }
        }
        currentZoneIndex = (currentZoneIndex + 1) % allZonesData.length;
        attempts++;
      }

      if (!placed) {
        console.count(`${cmd.ingredientId} no available zone`);
      }
    });
  },

  cleanupZones(tempCtx: CanvasRenderingContext2D, allZonesData: ZoneData[]) {
    let totalCleaned = 0;
    allZonesData.forEach((zoneData, zoneIndex) => {
      zoneData.positions.forEach((zone: [number, number]) => {
        const replaceColor = BENTO_COLORS[zoneData.replaceColorIndex] as number[];
        tempCtx.fillStyle = `rgb(${replaceColor[0]}, ${replaceColor[1]}, ${replaceColor[2]})`;
        tempCtx.fillRect(zone[0], zone[1], 1, 1);
        totalCleaned++;
      });
    });
  },

  drawFallbackBase(ctx: CanvasRenderingContext2D, cmd: DrawCommand & { kind: 'base' }) {
    ctx.fillStyle = 'rgba(255, 255, 0, 0.3)';
    ctx.fillRect(cmd.dx, cmd.dy, cmd.dw, cmd.dh);
    ctx.fillStyle = 'black';
    ctx.font = '12px monospace';
    ctx.fillText(cmd.baseId, cmd.dx + 5, cmd.dy + 20);
  },

  startLoop() {
    this.lastTime = performance.now();
    const loop = (now: number) => {
      const delta = now - (this.lastTime ?? now);
      this.lastTime = now;
      this.accumulator = (this.accumulator ?? 0) + delta;

      while ((this.accumulator ?? 0) >= this.fixedDt) {
        this.update(this.fixedDt);
        this.accumulator = (this.accumulator ?? 0) - this.fixedDt;
      }

      if (this.dirty || this.isAnimating) {
        void this.updateCanvas();
        this.dirty = false;
      }

      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  },

  ensureLoopRunning() {
    if (this.rafId == null) this.startLoop();
  },

  update(_dt: number) {
    if (this.isAnimating) this.dirty = true;
  },

  markDirty() {
    this.dirty = true;
    this.ensureLoopRunning();
  },

  async toggleBentoViewer() {
    const bentoViewerButton = document.getElementById('bento-viewer-button') as HTMLButtonElement;
    const container = document.getElementsByClassName('crafter-page')[0] as HTMLCanvasElement;
    if (!container) return;

    const isViewerOpen = container.classList.contains('mini-bento-viewer');
    getStyleForIcon(bentoViewerButton, isViewerOpen ? ICONS.get('bento-viewer-close') ?? 0 : ICONS.get('bento-viewer') ?? 0);
    container.classList.toggle('mini-bento-viewer');
    if (isViewerOpen) {
      await bentoViewerCtrl.updateCanvas();
    }
  },

  cleanUp() {
    this.unsubscribeBase?.();
    if (this.onResize) window.removeEventListener('resize', this.onResize);
    if (this.rafId != null) cancelAnimationFrame(this.rafId);
    const bentoViewerButton = document.getElementById('bento-viewer-button');
    if (bentoViewerButton) {
      bentoViewerButton.removeEventListener('click', this.toggleBentoViewer);
    }
  }
}

export default bentoViewerCtrl;
# 🎨 Sprite and Icon System Documentation

## Overview

The Bento project uses a sophisticated sprite and icon system to create visually appealing recipes. This system combines artistic assets created in Aseprite with intelligent procedural rendering to maximize reuse and visual variety.

## 📁 Asset Structure

### Artistic Sources (Aseprite)

```
asset_sources/
├── base.aseprite      # Base sprites for bentos
├── bases.aseprite     # Sprites for different bento types
├── icons.aseprite     # Interface icons sprite sheet
└── og-img.aseprite    # Social media image
```

### Final Assets (PNG)

```
public/sprites/
├── bases.png          # Bento sprite sheet (72x72px per tile)
└── icons.png          # Icon sprite sheet (32x32px per icon)
```

## 🖼️ Icon System

### Icon Configuration

```typescript
// Fixed icon size
export const ICON_SIZE = 32

// Icon mapping by index in sprite sheet
export const ICONS = new Map<string, number>([
  // User interface
  ['home', 0],
  ['base', 1],
  ['composer', 2],
  ['export', 3],
  ['add', 5],
  ['delete', 6],
  ['exchange', 7],
  ['bento-viewer', 9],
  ['bento-viewer-close', 10],

  // Recipe bases
  ['cake', 12],
  ['onigiri', 1],
  ['empanada', 4],
  ['gimbap', 36],
  ['savoy_cake', 63],

  // Ingredients by category
  // Liquids
  ['water', 13],
  ['lemon_juice', 14],
  ['orange_juice', 15],
  ['oil', 0],
  ['olive_oil', 0],
  ['sesame_oil', 0],

  // Fruits
  ['lemon', 18],
  ['orange', 33],
  ['apple', 34],
  ['peach', 65],

  // Spices and powders
  ['salt', 19],
  ['pepper', 20],
  ['paprika', 29],
  ['cumin', 30],
  ['cinnamon', 26],
  ['ginger', 50],

  // Fats
  ['butter', 29],
  ['margarine', 29],

  // Flours
  ['flour', 24],
  ['flour_t55', 24],
  ['flour_t65', 24],

  // Cheeses
  ['mozzarella', 8],
  ['cheddar', 57],
  ['gruyere', 41],
  ['comte', 56],
  ['ricotta', 58],

  // Vegetables
  ['onion', 0],
  ['carrot', 38],
  ['tomato', 0],
  ['spinach', 59],
  ['cucumber', 45],

  // Bell peppers
  ['red_bell_pepper', 46],
  ['green_bell_pepper', 48],
  ['yellow_bell_pepper', 49],
  ['orange_bell_pepper', 47],

  // Rice and cereals
  ['rice', 42],
  ['jasmine_rice', 42],
  ['brown_rice', 42],
])
```

### Icon Application

```typescript
// Function to apply an icon to an HTML element
export function getStyleForIcon(element: HTMLElement, index: number): void {
  element.classList.add('icons')
  element.style.backgroundPosition = `-${index * ICON_SIZE}px 0`
}

// Usage
const iconIndex = ICONS.get('lemon') || 0
getStyleForIcon(lemonElement, iconIndex)
```

## 🎮 Bento Sprite System

### Sprite Manager

```typescript
export type SpriteManager = {
  sprites: Map<string, HTMLImageElement>
  preload: () => Promise<void>
}

export const spriteManager: SpriteManager = {
  sprites: new Map<string, HTMLImageElement>(),

  async preload(): Promise<void> {
    const loadPromises = Array.from(SPRITE_MAP.entries()).map(([id, src]) => {
      return new Promise<void>((resolve) => {
        const img = new Image()
        img.onload = () => {
          this.sprites.set(id, img)
          resolve()
        }
        img.onerror = () => {
          console.error(`Failed to load sprite: ${id}`)
          resolve()
        }
        img.src = src
      })
    })

    await Promise.all(loadPromises)
  },
}
```

### Sprite Mapping

```typescript
// Sprite configuration
export const SPRITE_MAP = new Map<string, string>([
  ['bases', bases], // Reference to bases.png file
])

// Bento base layers
export const BASES_LAYERS = new Map<string, number>([
  ['back', 0], // Back layer
  ['front', 1], // Front layer
  ['empanada', 2], // Empanada sprite
  ['onigiri', 3], // Onigiri sprite
  ['cake', 4], // Cake sprite
  ['gimbap', 5], // Gimbap sprite
  ['savoy_cake', 6], // Savoy cake sprite
])

// Ingredient placement zones
export const ZONE_LAYERS = new Map<string, [number, number][]>([
  [
    'onigiri',
    [
      [41, 1],
      [10, 1],
    ],
  ],
  [
    'gimbap',
    [
      [41, 1],
      [10, 1],
    ],
  ],
  [
    'cake',
    [
      [41, 29],
      [17, 28],
    ],
  ],
  [
    'empanada',
    [
      [41, 30],
      [10, 1],
    ],
  ],
  [
    'savoy_cake',
    [
      [41, 28],
      [10, 28],
    ],
  ],
])
```

## 🎨 Procedural Ingredient Rendering

### Ingredient Configuration

```typescript
export const ZONE_LAYERS_MAP = new Map<
  string,
  Map<
    string,
    {
      form: 'square' | 'circle' // Ingredient shape
      num: [number, number] // Quantity [min, max]
      size: [number, number] // Size [width, height]
      color: [number, number, number?] // Colors [normal, light, shadow?]
    }
  >
>([
  [
    'empanada_black_beans',
    new Map([
      [
        'black_beans',
        {
          form: 'circle',
          num: [2, 10], // 2-10 beans
          size: [2, 4], // 2x4 pixels
          color: [54, 53, 52], // Palette colors
        },
      ],
      [
        'red_bell_pepper',
        {
          form: 'square',
          color: [26, 25],
          num: [4, 6], // 4-6 pieces
          size: [1, 2], // 1x2 pixels
        },
      ],
      [
        'corn_kernels',
        {
          form: 'circle',
          num: [3, 10], // 3-10 kernels
          size: [1, 2], // 1x2 pixels
          color: [33, 34],
        },
      ],
    ]),
  ],

  [
    'onigiri_kimchi',
    new Map([
      [
        'kimchi',
        {
          form: 'circle',
          num: [4, 15], // 4-15 pieces
          color: [25, 27, 26],
          size: [2, 6], // 2x6 pixels
        },
      ],
      [
        'mozzarella',
        {
          form: 'square',
          num: [4, 10], // 4-10 pieces
          color: [29, 28],
          size: [4, 4], // 4x4 pixels
        },
      ],
    ]),
  ],
])
```

### Draw Command Generation

```typescript
// Render command construction
buildDrawCommands({ cssWidth, cssHeight, scale, centerX, centerY }) {
  this.drawCommands.length = 0;

  // Canvas cleanup
  this.drawCommands.push({
    kind: 'clear',
    width: cssWidth,
    height: cssHeight
  });

  const scaledWidth = TILE_SIZE * scale;
  const scaledHeight = TILE_SIZE * scale;

  // Base layer (bento background)
  this.drawCommands.push({
    kind: 'image',
    image: spriteManager.sprites.get('bases') as HTMLImageElement,
    sx: 0, sy: 0, sw: TILE_SIZE, sh: TILE_SIZE,
    dx: centerX, dy: centerY, dw: scaledWidth, dh: scaledHeight,
  });

  // Selected base layer
  const currentBase = baseStore.currentBase;
  if (currentBase) {
    this.drawCommands.push({
      kind: 'base',
      baseId: currentBase.id,
      dx: centerX, dy: centerY, dw: scaledWidth, dh: scaledHeight,
    });
  }

  // Selected ingredients
  const selectedIngredients = Array.from(composerStore.selectedIngredients.entries())
    .map(([key, value]) => value === 'true' ? key : value)
    .filter((ingredient) => ingredient !== null);

  const variant = composerStore.currentVariant;
  const ingredientsMap = ZONE_LAYERS_MAP.get(variant.id);

  if (ingredientsMap) {
    selectedIngredients.forEach((ingredient) => {
      const ingredientConfig = ingredientsMap.get(ingredient);
      if (!ingredientConfig) return;

      // Random quantity generation
      const [minCount, maxCount] = ingredientConfig.num;
      const count = Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;

      // Command creation for each element
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

  // Front layer (bento lid)
  this.drawCommands.push({
    kind: 'image',
    image: spriteManager.sprites.get('bases') as HTMLImageElement,
    sx: 0, sy: TILE_SIZE, sw: TILE_SIZE, sh: TILE_SIZE,
    dx: centerX, dy: centerY, dw: scaledWidth, dh: scaledHeight,
  });
}
```

## 🔧 Technical Optimizations

### HiDPI Support

```typescript
// Configuration for Retina displays
const dpr = window.devicePixelRatio || 1
canvas.width = cssWidth * dpr
canvas.height = cssHeight * dpr
ctx.scale(dpr, dpr)
ctx.imageSmoothingEnabled = false // Preserves pixel art
```

### Asynchronous Loading

- All sprites are preloaded at startup
- Error handling for missing sprites
- Parallel loading to optimize performance

### Asset Reuse

- **Smart categorization**: Similar ingredients share the same sprite
- **Dynamic mapping**: Facilitates adding new ingredients
- **Procedural variations**: Colors and quantities generated dynamically

## 🚀 Production Workflow

### 1. Artistic Creation

- Assets drawn in **Aseprite**
- Organization by layers and animations
- Optimization for pixel art

### 2. Export and Conversion

- Manual export of `.aseprite` files to PNG
- Size optimization and compression
- Placement in `public/sprites/`

### 3. Code Configuration

- Index mapping in `icon.const.ts`
- Zone configuration in `sprite-sheet.map.ts`
- Color and shape definitions

### 4. Validation

```bash
# Recipe system validation
bun run validate:recipes
```

**Automatic checks:**

- Consistent ingredient references
- Correct sprite mapping
- Valid placement zones
- Existing palette colors

### 5. Rendering and Animation

- Display list system for rendering
- Optimized animation loop
- Resize handling

## 📊 System Statistics

- **80+ icons** mapped for ingredients
- **5 different** bento bases
- **15+ zones** for ingredient placement
- **50+ colors** in the palette
- **2 shapes**: square and circle
- **Real-time rendering** with random variations

## 🎯 System Benefits

1. **Efficiency**: Maximum asset reuse
2. **Flexibility**: Easy addition of new ingredients
3. **Performance**: Optimized rendering and preloading
4. **Quality**: HiDPI support and crisp pixel art
5. **Maintainability**: Centralized configuration and automatic validation

This system allows creating visually rich recipes with minimal assets while maintaining optimal performance and smooth user experience.

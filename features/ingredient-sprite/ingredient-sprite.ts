import { INGREDIENTS_SPRITE_PATH } from "./ingredient-sprite.const";
import type { IngredientSpriteResponse, SpritePosition } from "./ingredient-sprite.type";

let cached: IngredientSpriteResponse | null = null;

const DEFAULT_SIZE = { w: 32, h: 32 };

function normalizeAlias(alias: string): string {
  return alias.trim().toLowerCase();
}

export async function load(): Promise<IngredientSpriteResponse> {
  if (cached) return cached;
  const base = process.env.PUBLIC_BENTEXT_API_URL ?? "";
  if (!base) throw new Error("PUBLIC_BENTEXT_API_URL is not set");
  const url = `${base}${INGREDIENTS_SPRITE_PATH}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to load ingredient sprite: ${response.status} ${response.statusText}`);
  const data = (await response.json()) as IngredientSpriteResponse;
  cached = data;
  return data;
}

function getImageUrl(): string {
  if (!cached?.imageUrl) return "";
  const base = process.env.PUBLIC_BENTEXT_API_URL ?? "";
  if (!base) return "";
  try {
    return new URL(cached.imageUrl, base).href;
  } catch {
    return "";
  }
}

export function getSpriteSize(): { w: number; h: number } {
  if (!cached?.spriteSize) return DEFAULT_SIZE;
  return {
    w: cached.spriteSize.w ?? DEFAULT_SIZE.w,
    h: cached.spriteSize.h ?? DEFAULT_SIZE.h,
  };
}

export function getPosition(alias: string): SpritePosition | null {
  if (!cached?.byAlias) return null;
  const normalizedAlias = normalizeAlias(alias);
  const keys = Object.keys(cached.byAlias);
  const found = keys.find((key) => normalizeAlias(key) === normalizedAlias);
  if (!found) return null;
  const pos = cached.byAlias[found];
  return { x: pos.X, y: pos.Y };
}

export function getRandomAliases(count: number): string[] {
  if (!cached?.byAlias) return [];
  const keys = Object.keys(cached.byAlias);
  if (keys.length === 0) return [];
  const shuffled = [...keys].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, keys.length));
}
export function applySprite(element: HTMLElement, alias: string): void {
  const pos = getPosition(alias);
  const imageUrl = getImageUrl();
  console.log('imageUrl', imageUrl);
  const size = getSpriteSize();
  if (!pos || !imageUrl) return;
  element.classList.add("ingredient-sprite");
  element.style.backgroundImage = `url(${imageUrl})`;
  // Fixed failed background-position calculation
  element.style.backgroundPosition = `-${pos.x + 2}px -${pos.y + 2}px`;
  element.style.width = `${size.w}px`;
  element.style.height = `${size.h}px`;
  element.style.minWidth = `${size.w}px`;
  element.style.minHeight = `${size.h}px`;
  element.style.maxWidth = `${size.w}px`;
  element.style.maxHeight = `${size.h}px`;
}

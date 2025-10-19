export type RenderTask = () => void;

let frameId: number | null = null;

const readTasksByKey = new Map<string, RenderTask>();
const writeTasksByKey = new Map<string, RenderTask>();

const readTasksByElem = new WeakMap<HTMLElement, RenderTask>();
const writeTasksByElem = new WeakMap<HTMLElement, RenderTask>();
const readElements = new Set<HTMLElement>();
const writeElements = new Set<HTMLElement>();

function scheduleFrame(): void {
  if (frameId != null) return;
  frameId = requestAnimationFrame(() => {
    frameId = null;

    const readFromKeys = Array.from(readTasksByKey.values());
    const readFromElements: RenderTask[] = [];
    for (const el of readElements) {
      const t = readTasksByElem.get(el);
      if (t) readFromElements.push(t);
      readTasksByElem.delete(el);
    }
    readTasksByKey.clear();
    readElements.clear();

    for (const task of readFromKeys) task();
    for (const task of readFromElements) task();

    const writeFromKeys = Array.from(writeTasksByKey.values());
    const writeFromElements: RenderTask[] = [];
    for (const el of writeElements) {
      const t = writeTasksByElem.get(el);
      if (t) writeFromElements.push(t);
      writeTasksByElem.delete(el);
    }
    writeTasksByKey.clear();
    writeElements.clear();

    for (const task of writeFromKeys) task();
    for (const task of writeFromElements) task();
  });
}

export function recipe(key: string, task: RenderTask): void {
  readTasksByKey.set(key, task);
  scheduleFrame();
}

export function cook(key: string, task: RenderTask): void {
  writeTasksByKey.set(key, task);
  scheduleFrame();
}

export function cancel(key: string): void {
  readTasksByKey.delete(key);
  writeTasksByKey.delete(key);
}

export function recipeFor(element: HTMLElement, task: RenderTask): void {
  readTasksByElem.set(element, task);
  readElements.add(element);
  scheduleFrame();
}

export function cookFor(element: HTMLElement, task: RenderTask): void {
  writeTasksByElem.set(element, task);
  writeElements.add(element);
  scheduleFrame();
}

export function cancelFor(element: HTMLElement): void {
  readTasksByElem.delete(element);
  writeTasksByElem.delete(element);
  readElements.delete(element);
  writeElements.delete(element);
}

export function plate(key: string, producer: () => void): void {
  cook(key, producer);
}

export async function service(): Promise<void> {
  return new Promise((resolve) => {
    scheduleFrame();
    requestAnimationFrame(() => resolve());
  });
}


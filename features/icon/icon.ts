import { ICON_SIZE } from "./icon.const";

export function getStyleForIcon(element: HTMLElement, index: number): void {
  element.classList.add('icons');
  element.style.backgroundPosition = `-${index * ICON_SIZE}px 0`;
}
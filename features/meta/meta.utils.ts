export function setMetaContent(selector: string, attr: string, value: string): void {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

/**
 * 
 * @param { HTMLElement } el 
 * @param { String } attr 
 * @param { String } value 
 * @returns 
 */
export function getByDataAttr(el, attr, value) {
  if (!el) return;
  if (!value) return el.querySelector(`[data-${attr}]`);
  return el.querySelector(`[data-${attr}="${value}"]`);
}

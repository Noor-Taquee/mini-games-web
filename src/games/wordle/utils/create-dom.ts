/**
 * Creates an element and returns it
 */
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: Partial<HTMLElementTagNameMap[K]> = {},
  nodes: Node[] = [],
) {
  const element = document.createElement(tag);
  Object.assign(element, props);
  element.append(...nodes);
  return element;
}

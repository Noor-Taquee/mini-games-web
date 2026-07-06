

export function createElement<K extends keyof HTMLElementTagNameMap>(
  name: K,
  props: Partial<HTMLElementTagNameMap[K]> = {},
  nodes: Node[] = []
) {
  const element = document.createElement( name );
  Object.assign( element, props );
  element.append( ...nodes );
  return element;
}

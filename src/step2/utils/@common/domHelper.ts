export function $<T extends HTMLElement = HTMLElement>(
  selector: string,
  scope: Document | HTMLElement = document
): T {
  if (!selector) throw new Error('Selector is not selected');
  return scope.querySelector(selector) as T;
}

export function $$<T extends NodeListOf<Element>>(
  selector: string,
  scope: Document | HTMLElement = document
): T {
  if (!selector) throw new Error('Selector is not selected');
  return scope.querySelectorAll(selector) as T;
}

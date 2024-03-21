export const $ = <T extends Element = HTMLElement>(selector: string, target: HTMLElement | Document = document): T => {
  const $element = target.querySelector<T>(selector);
  if (!$element) {
    throw new Error('Element not found: ' + selector);
  }
  return $element;
};

export const $$ = <T extends Element = HTMLElement>(
  selector: string,
  target: HTMLElement | Document = document
): NodeListOf<T> => target.querySelectorAll<T>(selector);

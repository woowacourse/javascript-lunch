export const $ = <T extends Element = HTMLElement>(
  selector: string,
  target: HTMLElement | Document = document
): T | null => target.querySelector<T>(selector);

export const $$ = <T extends Element = HTMLElement>(
  selector: string,
  target: HTMLElement | Document = document
): NodeListOf<T> => target.querySelectorAll<T>(selector);

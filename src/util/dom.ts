export const $ = (selector: string, target: HTMLElement | Document = document): Element | null =>
  target.querySelector(selector);

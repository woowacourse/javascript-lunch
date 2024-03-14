export const $ = (selector: string, target: HTMLElement | Document = document) =>
  target.querySelector(selector) as HTMLElement;

export const $$ = (selector: string, target: HTMLElement | Document = document) => target.querySelectorAll(selector);

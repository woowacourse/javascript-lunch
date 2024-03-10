export const $ = (selectors: string, target: HTMLElement | ShadowRoot | Document = document) =>
  target.querySelector(selectors);
export const $$ = (selectors: string, target: HTMLElement | ShadowRoot | Document = document) =>
  target.querySelectorAll(selectors);

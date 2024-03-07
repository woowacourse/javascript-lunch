export const $ = <T extends string>(selector: T, target = document) =>
  target.querySelector(selector) as HTMLElement;

export const $$ = <T extends string>(selector: T, target = document) =>
  target.querySelectorAll(selector);

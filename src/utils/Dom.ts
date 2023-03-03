export const $ = (selector: string, target = document) =>
  target.querySelector(selector);
export const $$ = (selector: string, target = document) =>
  target.querySelectorAll(selector);

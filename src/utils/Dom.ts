export const $ = (selector: string, target = document) =>
  target.querySelector(selector);
export const $$ = (selector: string, target = document) =>
  target.querySelectorAll(selector);

export const createElement = (tag: string) => document.createElement(tag);

export const render = (element: Element) => {
  $(".body")?.append(element);
};

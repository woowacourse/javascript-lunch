export const $ = (selector: string): HTMLElement | null => {
  return document.querySelector(selector);
};

export const $$ = (selector: string): NodeListOf<Element> => {
  return document.querySelectorAll(selector);
};

export const $inBody = (selector: string): HTMLElement | null => {
  return $('body')!.querySelector(selector);
};

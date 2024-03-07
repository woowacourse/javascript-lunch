const $ = (target: string): Element | null => {
  return document.querySelector(target);
};

const $$ = (target: string): NodeList | null => {
  return document.querySelectorAll(target);
};

export { $, $$ };

export const $ = (selectors: string) => {
  return document.querySelector(selectors);
};

export const $$ = (selectors: string) => {
  return document.querySelectorAll(selectors);
};

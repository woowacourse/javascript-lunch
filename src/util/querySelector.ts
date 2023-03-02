export const $ = (className: string) => {
  return document.querySelector(className);
};

export const $$ = (className: string) => {
  return document.querySelectorAll(className);
};

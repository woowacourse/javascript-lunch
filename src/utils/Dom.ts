export const $ = (selector: string, target = document) =>
  target.querySelector(selector);
export const $$ = (selector: string, target = document) =>
  target.querySelectorAll(selector);

export const hide = (className: string) => $(className)?.classList.add("hide");
export const show = (className: string) =>
  $(className)?.classList.remove("hide");

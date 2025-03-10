export const $ = (selector) => {
  return document.querySelector(selector);
};

export const $all = (selector) => {
  return document.querySelectorAll(selector);
};

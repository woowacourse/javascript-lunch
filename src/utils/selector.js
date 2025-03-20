export const $ = ($target = document, selector) => {
  return $target.querySelector(selector);
};

export const $all = ($target = document, selector) => {
  return $target.querySelectorAll(selector);
};

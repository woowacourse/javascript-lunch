export const $ = ($target, selector) => {
  return $target.querySelector(selector);
};

export const $all = ($target, selector) => {
  return $target.querySelectorAll(selector);
};

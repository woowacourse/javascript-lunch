const $ = (container, selector) => {
  const shadow = document.querySelector(container).shadowRoot;
  return shadow.querySelector(selector);
};

const $$ = (container, selector) => {
  const shadow = document.querySelector(container).shadowRoot;
  return shadow.querySelectorAll(selector);
};

export { $, $$ };

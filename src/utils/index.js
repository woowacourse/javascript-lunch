const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);

const $$$ = (parent, selector) => $(parent).shadowRoot.querySelector(selector);

const $$$$ = (parent, selector) =>
  $(parent).shadowRoot.querySelectorAll(selector);

export { $, $$, $$$, $$$$ };

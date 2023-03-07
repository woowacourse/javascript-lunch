const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);

const $$$ = (parent, selector) => $(parent).shadowRoot.querySelector(selector);

const $$$$ = (parent, selector) =>
  $(parent).shadowRoot.querySelectorAll(selector);

const shortenString = (word, range) => {
  if (word.length > range) {
    return `${word.slice(0, range)}···`;
  }
  return word;
};

export { $, $$, $$$, $$$$, shortenString };

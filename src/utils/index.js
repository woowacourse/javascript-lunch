const $ = (selector) => document.querySelector(selector);

const shortenString = (word, range) => {
  if (word.length > range) {
    return `${word.slice(0, range)}···`;
  }

  return word;
};

export { $, shortenString };

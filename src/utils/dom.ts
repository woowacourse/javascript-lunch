export const $ = (selector: string) => {
  const element = document.querySelector(selector);

  if (element) {
    return document.querySelector(selector);
  }

  return console.error('[ERROR]');
};

export const $setAttribute = (selector: string, key: string, value: string): void => {
  const element = document.querySelector(selector);

  if (element) {
    return element.setAttribute(key, value);
  }

  return console.error('[ERROR]');
};

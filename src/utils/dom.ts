export const $ = (selector: string) => {
  const element = document.querySelector(selector);

  if (!element) {
    throw new Error('[ERROR]');
  }

  return element;
};

export const $setAttribute = (selector: string, key: string, value: string) => {
  const element = document.querySelector(selector);

  if (!element) {
    throw new Error('[ERROR]');
  }

  return element.setAttribute(key, value);
};

export const $addEvent = (selector: string, type: string, listener: EventListenerOrEventListenerObject) => {
  const element = document.querySelector(selector);

  if (!element) {
    throw new Error('[ERROR]');
  }

  return element.addEventListener(type, listener);
};

export const $removeEvent = (selector: string, type: string, listener: EventListenerOrEventListenerObject) => {
  const element = document.querySelector(selector);

  if (!element) {
    throw new Error('[ERROR]');
  }

  return element.removeEventListener(type, listener);
};

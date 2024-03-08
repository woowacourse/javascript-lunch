export const $ = (selector: string) => {
  const element = document.querySelector(selector);

  if (element) {
    return document.querySelector(selector);
  }

  return console.error('[ERROR]');
};

export const $setAttribute = (selector: string, key: string, value: string) => {
  const element = document.querySelector(selector);

  if (element) {
    return element.setAttribute(key, value);
  }

  return console.error('[ERROR]');
};

export const $addEvent = (selector: string, type: string, listener: EventListenerOrEventListenerObject) => {
  const element = document.querySelector(selector);

  if (element) {
    return element.addEventListener(type, listener);
  }

  return console.error('[ERROR]');
};

export const $removeEvent = (selector: string, type: string, listener: EventListenerOrEventListenerObject) => {
  const element = document.querySelector(selector);

  if (element) {
    return element.removeEventListener(type, listener);
  }

  return console.error('[ERROR]');
};

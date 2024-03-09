export const $ = (selector: string) => {
  const element = document.querySelector(selector);

  if (!element) {
    console.error(`[ERROR] Invalid selector: ${selector}`);
    return;
  }

  if (typeof selector !== 'string' || selector.trim() === '') {
    console.error(`[ERROR] Invalid selector: ${selector}`);
    return;
  }

  return element;
};

export const $setAttribute = (selector: string, key: string, value: string) => {
  const element = document.querySelector(selector);

  if (!element) {
    console.error(`[ERROR] Invalid selector: ${selector}`);
    return;
  }

  if (typeof selector !== 'string' || selector.trim() === '') {
    console.error(`[ERROR] Invalid selector: ${selector}`);
    return;
  }

  if (typeof key !== 'string' || key.trim() === '') {
    console.error(`[ERROR] Invalid key: ${key}`);
    return;
  }

  if (value === null || value === undefined) {
    console.error(`[ERROR] Invalid value: ${value}`);
    return;
  }

  return element.setAttribute(key, value);
};

export const $addEvent = (selector: string, type: string, listener: EventListenerOrEventListenerObject) => {
  const element = document.querySelector(selector);

  if (!element) {
    console.error(`[ERROR] Invalid selector: ${selector}`);
    return;
  }

  if (typeof selector !== 'string' || selector.trim() === '') {
    console.error(`[ERROR] Invalid selector: ${selector}`);
    return;
  }

  if (typeof type !== 'string' || type.trim() === '') {
    console.error(`[ERROR] Invalid type: ${type}`);
    return;
  }

  if (typeof listener !== 'function' && (typeof listener !== 'object' || listener === null)) {
    console.error(`[ERROR] Invalid listener: ${listener}`);
    return;
  }

  return element.addEventListener(type, listener);
};

export const $removeEvent = (selector: string, type: string, listener: EventListenerOrEventListenerObject) => {
  const element = document.querySelector(selector);

  if (!element) {
    console.error(`[ERROR] Invalid selector: ${selector}`);
    return;
  }

  if (typeof selector !== 'string' || selector.trim() === '') {
    console.error(`[ERROR] Invalid selector: ${selector}`);
    return;
  }

  if (typeof type !== 'string' || type.trim() === '') {
    console.error(`[ERROR] Invalid type: ${type}`);
    return;
  }

  if (typeof listener !== 'function' && (typeof listener !== 'object' || listener === null)) {
    console.error(`[ERROR] Invalid listener: ${listener}`);
    return;
  }

  return element.removeEventListener(type, listener);
};

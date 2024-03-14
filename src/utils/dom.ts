export const $ = ($target: Element, selector: string) => {
  const element = $target.querySelector(selector);

  if (!element) {
    throw new Error('[ERROR]');
  }

  return element;
};

export const $$ = ($target: Element, selector: string) => {
  const element = $target.querySelectorAll(selector);

  if (!element) {
    throw new Error('[ERROR]');
  }

  return element;
};

export const $addEvent = (
  $target: Element,
  selector: string,
  type: string,
  listener: EventListenerOrEventListenerObject,
) => {
  const element = $target.querySelector(selector);

  if (!element) {
    throw new Error('[ERROR]');
  }

  return element.addEventListener(type, listener);
};

export const $removeEvent = (
  $target: Element,
  selector: string,
  type: string,
  listener: EventListenerOrEventListenerObject,
) => {
  const element = $target.querySelector(selector);

  if (!element) {
    throw new Error('[ERROR]');
  }

  return element.removeEventListener(type, listener);
};

export const $setAttribute = ($target: Element, selector: string, key: string, value: string) => {
  const element = $target.querySelector(selector);

  if (!element) {
    throw new Error('[ERROR]');
  }

  return element.setAttribute(key, value);
};

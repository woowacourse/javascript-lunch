import { ERROR } from '../constants/Message';

export const $ = <E extends Element>($target: Element | Document, selector: string): E => {
  const element = $target.querySelector<E>(selector);

  if (!element) {
    throw new Error(ERROR.NO_ELEMENT);
  }

  return element;
};

export const $$ = ($target: Element | Document, selector: string) => {
  const element = $target.querySelectorAll(selector);

  if (!element) {
    throw new Error(ERROR.NO_ELEMENT);
  }

  return element;
};

export const $addEvent = (
  $target: Element | Document,
  selector: string,
  type: string,
  listener: EventListenerOrEventListenerObject,
) => {
  const element = $target.querySelector(selector);

  if (!element) {
    throw new Error(ERROR.NO_ELEMENT);
  }

  element.addEventListener(type, listener);
};

export const $setAttribute = ($target: Element | Document, selector: string, key: string, value: string) => {
  const element = $target.querySelector(selector);

  if (!element) {
    throw new Error(ERROR.NO_ELEMENT);
  }

  element.setAttribute(key, value);
};

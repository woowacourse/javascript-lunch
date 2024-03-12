import { ERROR_MESSAGE } from '@/constants/Message';

export const $ = <T extends HTMLElement>(selector: string) => {
  const element = document.querySelector(selector);
  if (element === null || element === undefined) {
    throw new Error(`${ERROR_MESSAGE.NULL_SELECTOR(selector)}`);
  }

  return element as T;
};

export const $$ = (selector: string) => {
  return document.querySelectorAll(selector);
};

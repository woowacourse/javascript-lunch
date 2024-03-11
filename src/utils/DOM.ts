import { ErrorMessage } from '@/constants/Message';

export const $ = (selector: string) => {
  return document.querySelector(selector);
};

export const $$ = (selector: string) => {
  return document.querySelectorAll(selector);
};

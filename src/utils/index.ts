import { Attributes } from '../types';

export const getDeepCopiedArray = <T>(array: T): T =>
  JSON.parse(JSON.stringify(array)) as T;

export const setObjectAttribute = (
  attributes: Attributes,
  el: HTMLElement,
): HTMLElement => {
  Object.entries(attributes).forEach(([key, value]) => {
    if (value === null) return;

    if (key === 'required' && 'required' in el) {
      el.setAttribute('required', '');
      return;
    }

    el.setAttribute(key, value);
  });

  return el;
};

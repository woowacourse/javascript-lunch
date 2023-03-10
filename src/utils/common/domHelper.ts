export interface Attribute {
  class: string;
  [key: string]: string;
}

export const $ = (selector: string, parentNode: ParentNode | null = document) =>
  parentNode && parentNode.querySelector(selector);
export const $$ = (selector: string, parentNode: ParentNode | null = document) =>
  parentNode && parentNode.querySelectorAll(selector);

export const isTarget = (
  target: EventTarget | null,
  { targetSelector, parentSelector }: { targetSelector: string; parentSelector: string }
) => {
  const children = $$(targetSelector, $(parentSelector));
  if (target instanceof Element && children)
    return [...children].includes(target) || target.closest(targetSelector);

  return false;
};

export const getClosest = (target: EventTarget | null, selector: string) => {
  if (!(target instanceof Element)) return null;
  if (!(target.closest(selector) instanceof HTMLElement)) return null;

  return target.closest(selector) as HTMLElement;
};

export const parseAttribute = (attribute: Attribute) => {
  return Object.entries(attribute)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');
};

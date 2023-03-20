export interface Attribute {
  class: string;
  [key: string]: string | boolean;
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

export const isHTMLElement = (target: Element): target is HTMLElement =>
  target instanceof HTMLElement;

export const getClosest = (target: Element | EventTarget | null, selector: string) => {
  if (!(target instanceof Element)) return null;

  const parent = target.closest(selector);
  if (!parent) return null;
  if (!isHTMLElement(parent)) return null;

  return parent;
};

export const parseAttribute = (attribute: Attribute) => {
  return Object.entries(attribute)
    .map(([key, value]) =>
      typeof value === 'boolean' ? (value === true ? `${key}` : '') : `${key}="${value}"`
    )
    .join(' ');
};

export const parseClassToSelector = (className: string) => '.' + className.split(' ').join('.');

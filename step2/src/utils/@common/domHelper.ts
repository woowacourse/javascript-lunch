export interface Attribute {
  class: string;
  [key: string]: string | boolean;
}

export function $<T extends HTMLElement = HTMLElement>(
  selector: string,
  scope: Document | HTMLElement = document
): T {
  if (!selector) throw new Error('Selector is not selected');
  return scope.querySelector(selector) as T;
}

export function $$<T extends NodeListOf<Element>>(
  selector: string,
  scope: Document | HTMLElement = document
): T {
  if (!selector) throw new Error('Selector is not selected');
  return scope.querySelectorAll(selector) as T;
}

export const parseAttribute = (attribute: Attribute) => {
  return Object.entries(attribute)
    .map(([key, value]) =>
      typeof value === 'boolean'
        ? value === true
          ? `${key}`
          : ''
        : `${key}="${value}"`
    )
    .join(' ');
};

export const isTarget = (
  target: EventTarget | null,
  {
    targetSelector,
    parentSelector,
  }: { targetSelector: string; parentSelector: string }
) => {
  const children = $$(targetSelector, $(parentSelector));

  if (target instanceof Element && children)
    return [...children].includes(target) || target.closest(targetSelector);

  return false;
};

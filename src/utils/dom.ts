type Attributes = Record<
  string,
  string | string[] | number | boolean | Function
>;

type ElementAttributes = {
  class?: string[];
  textContent?: string;
} & Attributes;

export const $ = <T extends HTMLElement = HTMLElement>(selector: string) =>
  document.querySelector<T>(selector);

export const createElement = <T extends keyof HTMLElementTagNameMap>(
  tagName: T,
  attributes: ElementAttributes = {}
) => {
  const $el = document.createElement(tagName);

  attributes.class?.length && $el.classList.add(...attributes.class);
  delete attributes.class;

  attributes.textContent && ($el.textContent = attributes.textContent);
  delete attributes.textContent;

  attributes.innerHTML && ($el.innerHTML = String(attributes.innerHTML));
  delete attributes.innerHTML;

  Object.entries(attributes).forEach(([key, value]) => {
    if (key.startsWith("on") && typeof value === "function") {
      const eventName = key.slice(2).toLowerCase();
      $el.addEventListener(eventName, value as EventListener);
      return;
    }

    if (value != null) {
      $el.setAttribute(key, String(value));
    }
  });

  return $el;
};

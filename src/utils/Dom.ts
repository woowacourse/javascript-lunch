export const $ = (selector: string, target = document) =>
  target.querySelector(selector);
export const $$ = (selector: string, target = document) =>
  target.querySelectorAll(selector);

interface Atrribute {
  id?: string;
  class?: string[];
  name?: string;
  required?: boolean;
  src?: string;
  alt?: string;
  ["aria-label"]?: string;
  type?: string;
  for?: string;
  cols?: string;
  rows?: string;
  value?: string;
}

export const createElement = (tag: string, atrribute: Atrribute = {}) => {
  const element = document.createElement(tag);

  Object.entries(atrribute).forEach(([attributeName, value]) => {
    if (attributeName === "class") {
      value.forEach((className: string) => {
        element.classList.add(className);
      });
      return;
    }
    element.setAttribute(attributeName, value);
  });

  return element;
};

export const render = (element: Element) => {
  $(".body")?.append(element);
};

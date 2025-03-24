function $<T extends HTMLElement>(selector: string, element: HTMLElement | Document = document): T | null {
  return element.querySelector(selector) as T | null;
}

function $all<T extends HTMLElement>(selector: string, element: HTMLElement | Document = document): NodeListOf<T> {
  return element.querySelectorAll(selector);
}

export { $, $all };

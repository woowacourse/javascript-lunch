function $<T extends HTMLElement>(selector: string): T | null {
  return document.querySelector(selector) as T | null;
}

function $all<T extends HTMLElement>(selector: string): NodeListOf<T> {
  return document.querySelectorAll(selector);
}

export { $, $all };

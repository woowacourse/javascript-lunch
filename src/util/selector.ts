function $(selector: string): Element | null {
  return document.querySelector(selector);
}

function $all(selector: string): NodeListOf<Element> {
  return document.querySelectorAll(selector);
}

export { $, $all };

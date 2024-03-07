function $(selector: string, target: Element | Document = document): Element | null {
  return target.querySelector(selector);
}

function $$(selector: string, target: Element | Document = document): NodeListOf<Element> {
  return target.querySelectorAll(selector);
}

export { $, $$ };

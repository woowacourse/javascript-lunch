function $<E extends Element = Element>(selector: string, target: Element | Document = document): E | null {
  return target.querySelector(selector);
}

function $$(selector: string, target: Element | Document = document): NodeListOf<Element> {
  return target.querySelectorAll(selector);
}

export { $, $$ };

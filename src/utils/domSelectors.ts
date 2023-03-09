function $<E extends Element>(selector: string): E {
  return <E>document.querySelector(selector);
}

function $$<E extends Element>(selector: string): NodeListOf<E> {
  return document.querySelectorAll(selector);
}

export { $, $$ };

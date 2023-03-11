function $<E extends Element>(selector: string): E {
  const element = document.querySelector(selector);

  if (!element) {
    throw new Error(`DOM에 ${selector} 요소가 존재하지 않습니다.`);
  }

  return <E>element;
}

function $$<E extends Element>(selector: string): NodeListOf<E> {
  return document.querySelectorAll(selector);
}

export { $, $$ };

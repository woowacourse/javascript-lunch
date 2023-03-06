function $<E extends Element>(selector: string) {
  const $HTMLElement = document.querySelector(selector);
  if (!$HTMLElement) throw new Error(`[ERROR] DOM에 ${selector} 요소가 존재하지 않습니다.`);
  return <E>$HTMLElement;
}

function $$<E extends Element>(selector: string): NodeListOf<E> {
  return document.querySelectorAll(selector);
}

export { $, $$ };

function $<E extends HTMLElement = HTMLElement>(selector: string, target?: HTMLElement): E {
  const element = target ? target.querySelector(selector) : document.querySelector(selector);
  if (!(element instanceof HTMLElement)) {
    throw new Error(`${selector}에 해당하는 요소를 찾을 수 없습니다. 새로고침 후 다시 시도해주세요.`);
  }
  return <E>element;
}

function $$(selector: string, target?: HTMLElement): NodeListOf<HTMLElement> {
  return target ? target.querySelectorAll(selector) : document.querySelectorAll(selector);
}

export { $, $$ };

const $ = (selector: string) => {
  const selectedElement = document.querySelector(selector);

  if (!(selectedElement instanceof HTMLElement)) {
    throw Error(
      '요소를 불러오는 데 실패했습니다. 페이지를 새로고침 해 주세요.'
    );
  }

  return selectedElement;
};

const $$ = (selector: string) => document.querySelectorAll(selector);

export { $, $$ };

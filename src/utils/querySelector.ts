const $ = (selector: string) => {
  const dom = document.querySelector(selector);

  if (!dom) {
    throw new Error('[ERROR] 해당 돔을 찾을 수 없습니다!!');
  }

  return dom;
};
const $$ = (selector: string): HTMLElement[] => {
  const domList = document.querySelectorAll(selector);

  return [...domList].map((dom) => {
    if (!(dom instanceof HTMLElement)) {
      throw new Error('[ERROR] 해당 돔을 찾을 수 없습니다!!');
    }
    return dom;
  });
};

export { $, $$ };

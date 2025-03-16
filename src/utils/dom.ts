export const selectElement = (selector: string, ancestor: HTMLElement | Document = document) => {
  const element = ancestor.querySelector(selector);
  if (!element) {
    throw new Error(`${selector}가 존재하지 않습니다.`);
  }

  return element;
};

export const selectElements = (selector: string, ancestor: HTMLElement | Document = document) => {
  const element = ancestor.querySelectorAll(selector);
  if (!element) {
    throw new Error(`${selector}가 존재하지 않습니다.`);
  }

  return element;
};

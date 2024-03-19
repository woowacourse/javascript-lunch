export const dom = {
  getElement<T extends HTMLElement>(element: HTMLElement, selector: string): T {
    const result: T | null = element.querySelector<T>(selector);
    if (result === null) {
      throw new Error(`요소 ${selector}를 선택할 수 없습니다.`);
    }
    return result;
  },

  getElementAll<T extends HTMLElement>(element: HTMLElement, selector: string): NodeListOf<T> {
    const result = element.querySelectorAll<T>(selector);
    if (result === null) {
      throw new Error(`요소 ${selector}를 선택할 수 없습니다.`);
    }
    return result;
  },
};

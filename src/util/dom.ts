// export const $ = (selector, target = document) => target.querySelector(selector);

export const $ = (selector: string, target: HTMLElement | Document = document): Element | null =>
  target.querySelector(selector);

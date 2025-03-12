export const $ = (
  selector: string,
  scope: Document | HTMLElement = document
) => {
  if (!selector) throw new Error('Selector is not selected');
  return scope.querySelector(selector);
};

export const $$ = (
  selector: string,
  scope: Document | HTMLElement = document
) => {
  if (!selector) throw new Error('Selector is not selected');
  return scope.querySelectorAll(selector);
};

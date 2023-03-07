export const $ = <T extends Element>(selector: string, target?: Element) => {
  const $HTMLElement = target ? target.querySelector(selector) : document.querySelector(selector);
  if (!$HTMLElement) throw new Error(`Element is not defined.`);
  return <T>$HTMLElement;
};

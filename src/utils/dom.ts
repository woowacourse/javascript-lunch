export const $ = <T extends Element>(selector: string) => {
  const $HTMLElement = document.querySelector(selector);
  if (!$HTMLElement) throw new Error(`${$HTMLElement} is not defined.`);
  return <T>$HTMLElement;
};

export const $$ = <T extends HTMLElement>(id: string) => {
  const $HTMLElement = document.getElementById(id);
  if (!$HTMLElement) throw new Error(`${$HTMLElement} is not defined`);
  return <T>$HTMLElement;
};

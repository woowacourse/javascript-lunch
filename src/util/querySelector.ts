const $ = (selector: string) => document.querySelector(selector) as HTMLElement;
const $$ = (selector: string) => document.querySelectorAll(selector);

export { $, $$ };

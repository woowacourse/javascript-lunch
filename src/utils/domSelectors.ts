function $(selector: string) {
  return document.querySelector(selector);
}

function $$(selector: string) {
  return document.querySelectorAll(selector);
}

export { $, $$ };

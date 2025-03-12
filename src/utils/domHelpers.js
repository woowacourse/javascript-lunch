export function $(selector, scope = document) {
  if (!selector) throw "no selector";

  return scope.querySelector(selector);
}

export function $$(selector, scope = document) {
  if (!selector) throw "no selector";

  return scope.querySelectorAll(selector);
}
